import React, { useState, useEffect } from "react";
import { Modal, Upload, message, Select, Input, Spin, Card, Row, Col, Checkbox, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SketchPicker } from "react-color";
import {
  deleteFile,
  UPLOAD_SKINLELE_PRESET,
  uploadFile,
} from "@helpers/uploadCloudinary";
import { tags } from "@const/tags";
import QuillEditor from "@components/QuillEditor";
import { useDispatch, useSelector } from "react-redux";
import { getBrandByCreatePro } from "@redux/brand/brand.thunk";
import { getCategoryByCreatePro } from "@redux/category/category.thunk";
import { getProductAdmin, updateProduct } from "@redux/product/product.thunk";
import { validateCreateProductSchema, validateForm } from "@validate/validate";
import ErrorMessage from "@components/Error/ErrorMessage";
import moment from "moment";

const ModalEditProduct = ({ open = false, setOpen, data = {}, setData }) => {
  const [input, setInput] = useState({
    name: "",
    categories: [],
    brand: "",
    price: "",
    description: "",
    mainImage: {
      url: "",
      publicId: "",
    },
    images: [],
    variants: [],
    enable: true,
    tags: [],
    expiry: "",
    capacity: "",
  });
  const [categoryDataLoaded, setCategoryDataLoaded] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedLevel0, setSelectedLevel0] = useState(null);
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);
  const [validates, setValidates] = useState({});
  const [activeColorIndex, setActiveColorIndex] = useState(null);

  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);
  const { categories, isLoading: categoriesLoading } = useSelector(
    (state) => state.category
  );
  const { isLoading } = useSelector((state) => state.product);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const { paginateAdmin } = useSelector((state) => state.product);

  useEffect(() => {
    if (open) {
      dispatch(getBrandByCreatePro());
      dispatch(getCategoryByCreatePro()).then(() =>
        setCategoryDataLoaded(true)
      );
    }
  }, [open, dispatch]);

  useEffect(() => {
    if ((data && categories.length > 0, open)) {
      setInput((prev) => ({
        ...prev,
        name: data.name,
        categories: data.categories.map((item) => item._id),
        brand: data.brand._id,
        price: data.price,
        description: data.description,
        mainImage: data.mainImage,
        images: data.images,
        variants: data.variants,
        enable: data.enable,
        tags: data.tags,
        expiry: data.expiry || "",
        capacity: data.capacity,
      }));
      setMainImage(data.mainImage);
      setImages(data.images);
      setSelectedLevel0(data.categories[0]._id);
      setSelectedLevel1(data.categories[1]._id);
    }
  }, [data, categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setValidates((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSelectChange = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  const handleLevel0Change = (value) => {
    setSelectedLevel0(value);
    setSelectedLevel1(null);
    setInput((prevInput) => ({
      ...prevInput,
      categories: [value],
    }));
  };

  const handleLevel1Change = (value) => {
    setSelectedLevel1(value);
    setInput((prevInput) => ({
      ...prevInput,
      categories: [selectedLevel0, value],
    }));
  };

  const handleLevel2Change = (value) => {
    setInput((prevInput) => ({
      ...prevInput,
      categories: [...prevInput.categories.slice(0, 2), ...value],
    }));
  };

  const renderCategoryOptions = (categoryList) => {
    if (!categoryList || !Array.isArray(categoryList)) {
      return null;
    }
    return categoryList.map((category) => (
      <Select.Option key={category._id} value={category._id}>
        {category.name}
      </Select.Option>
    ));
  };

  const getLevel1Categories = () => {
    if (!categories || !Array.isArray(categories)) {
      return [];
    }
    const level0Category = categories.find((cat) => cat._id === selectedLevel0);
    return level0Category && level0Category.children
      ? level0Category.children
      : [];
  };

  const getLevel2Categories = () => {
    const level1Categories = getLevel1Categories();
    const level1Category = level1Categories.find(
      (cat) => cat._id === selectedLevel1
    );
    return level1Category && level1Category.children
      ? level1Category.children
      : [];
  };

  const addVariant = () => {
    setInput({
      ...input,
      variants: [
        ...input.variants,
        { color: { name: "", code: "", image: null } },
      ],
    });
  };

  const handleVariantChange = (index, field, value) => {
    setInput((prevInput) => {
      const newVariants = prevInput.variants.map((variant, i) => {
        if (i === index) {
          const updatedVariant = { ...variant };
          if (field === "image") {
            updatedVariant.color = { ...updatedVariant.color, image: value };
          } else {
            updatedVariant.color = { ...updatedVariant.color, [field]: value };
          }
          return updatedVariant;
        }
        return variant;
      });
      return { ...prevInput, variants: newVariants };
    });
  };

  const removeVariant = (index) => {
    setInput((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleUpdate = async () => {
    setLoadingUpload(true);

    let uploadedMainImage = input.mainImage;
    if (mainImage && mainImage.originFileObj) {
      const result = await uploadFile({
        file: mainImage.originFileObj,
        type: UPLOAD_SKINLELE_PRESET,
      });
      uploadedMainImage = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    const uploadedImages = await Promise.all(
      images.map(async (file) => {
        if (file.originFileObj) {
          const result = await uploadFile({
            file: file.originFileObj,
            type: UPLOAD_SKINLELE_PRESET,
          });
          return { url: result.secure_url, publicId: result.public_id };
        }
        return { url: file.url, publicId: file.publicId || file.uid };
      })
    );

    const uploadedVariants = await Promise.all(
      input.variants.map(async (variant) => {
        let uploadedImage = variant.color.image;
        if (variant.color.image && variant.color.image.originFileObj) {
          const result = await uploadFile({
            file: variant.color.image.originFileObj,
            type: UPLOAD_SKINLELE_PRESET,
          });
          uploadedImage = {
            url: result.secure_url,
            publicId: result.public_id,
          };
        }
        return {
          ...variant,
          color: {
            ...variant.color,
            image: uploadedImage,
          },
        };
      })
    );

    const payload = {
      ...input,
      mainImage: uploadedMainImage,
      images: uploadedImages,
      variants: uploadedVariants,
    };

    const validationErrors = await validateForm({
      input: payload,
      validateSchema: validateCreateProductSchema,
    });

    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.mainImage) {
        message.warning(validationErrors.mainImage);
      }
      if (validationErrors.images) {
        message.warning(validationErrors.images);
      }
      setValidates(validationErrors);
      setLoadingUpload(false);
      return;
    }

    const response = await dispatch(
      updateProduct({ id: data._id, data: payload })
    ).unwrap();

    if (response.success) {
      message.success(response.message);
      if (data.mainImage.publicId !== uploadedMainImage.publicId) {
        await deleteFile(data.mainImage.publicId);
      }
      for (let i = 0; i < data.images.length; i++) {
        if (
          !uploadedImages.find(
            (img) => img.publicId === data.images[i].publicId
          )
        ) {
          await deleteFile(data.images[i].publicId);
        }
      }
      for (let i = 0; i < data.variants.length; i++) {
        if (
          data.variants[i].color.image &&
          !uploadedVariants.find(
            (v) =>
              v.color.image &&
              v.color.image.publicId === data.variants[i].color.image.publicId
          )
        ) {
          await deleteFile(data.variants[i].color.image.publicId);
        }
      }
      dispatch(
        getProductAdmin({
          page: paginateAdmin.page,
          pageSize: paginateAdmin.pageSize,
          name: "",
          category: "",
          brand: "",
          tag: "",
          sort: "asc",
        })
      );
      setOpen(false);
      setData(null);
    }
    setLoadingUpload(false);
  };

  const handleChangeQill = (value) => {
    setInput((prev) => ({
      ...prev,
      description: value,
    }));
    setValidates((prev) => ({ ...prev, description: "" }));
  };

  return (
    <Modal
      open={open}
      title={
        <div className="text-lg md:text-2xl font-bold text-center">
          Cập nhật thông tin sản phẩm
        </div>
      }
      onOk={handleUpdate}
      onCancel={() => setOpen(false)}
      footer={[
        <div key="footer" className="flex gap-1 items-center justify-end">
          <button
            key="cancel"
            onClick={() => setOpen(false)}
            className="bg-white border-2 text-gray-700 flex justify-center py-4 px-4 rounded-md shadow-sm text-sm font-medium"
          >
            Hủy
          </button>
          <button
            key="update"
            onClick={handleUpdate}
            disabled={isLoading || loadingUpload}
            className="flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading || loadingUpload ? "Đang xử lý..." : "Cập nhật sản phẩm"}
          </button>
        </div>,
      ]}
      width={"80%"}
      style={{ top: 20 }}
    >
      {categoriesLoading || !categoryDataLoaded ? (
        <div className="flex justify-center items-center h-20">
          <Spin />
          <span className="ml-2">Đang tải...</span>
        </div>
      ) : (
        <form className="space-y-6 mt-4">
          <Card title="Thông tin cơ bản" className="shadow-md">
            <Row gutter={16}>
              <Col span={12}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#14134f] mb-1"
                  >
                    Tên sản phẩm
                  </label>
                  <Input
                    placeholder="Nhập tên sản phẩm..."
                    size="large"
                    id="name"
                    name="name"
                    value={input.name}
                    onChange={handleInputChange}
                  />
                  {validates.name && <ErrorMessage message={validates.name} />}
                </div>
              </Col>
              <Col span={12}>
                <div className="mb-4">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-[#14134f] mb-1"
                  >
                    Thương hiệu
                  </label>
                  <Select
                    name="brand"
                    placeholder="Chọn thương hiệu"
                    size="large"
                    value={input.brand}
                    onChange={(value) => handleSelectChange("brand", value)}
                    className="w-full"
                  >
                    {brands.length > 0 &&
                      brands.map((brand) => (
                        <Select.Option key={brand._id} value={brand._id}>
                          {brand.name}
                        </Select.Option>
                      ))}
                  </Select>
                  {validates.brand && (
                    <ErrorMessage message={validates.brand} />
                  )}
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-[#14134f] mb-1"
                  >
                    Giá
                  </label>
                  <Input
                    placeholder="Nhập giá..."
                    size="large"
                    type="number"
                    id="price"
                    name="price"
                    value={input.price}
                    onChange={handleInputChange}
                  />
                  {validates.price && (
                    <ErrorMessage message={validates.price} />
                  )}
                </div>
              </Col>
              {/* <Col span={12}>
                <div className="mb-4">
                  <label
                    htmlFor="capacity"
                    className="block text-sm font-medium text-[#14134f] mb-1"
                  >
                    Dung tích
                  </label>
                  <Input
                    placeholder="Nhập dung tích..."
                    size="large"
                    id="capacity"
                    name="capacity"
                    value={input.capacity}
                    onChange={handleInputChange}
                  />
                </div>
              </Col> */}
            </Row>
          </Card>

          <Card title="Danh mục sản phẩm" className="shadow-md">
            <div className="mb-4">
              <label
                htmlFor="categories"
                className="block text-sm font-medium text-[#14134f] mb-1"
              >
                Danh mục (0)
              </label>
              <Select
                placeholder="Chọn danh mục"
                size="large"
                value={selectedLevel0}
                onChange={handleLevel0Change}
                className="w-full"
              >
                {renderCategoryOptions(categories)}
              </Select>
            </div>
            {selectedLevel0 && (
              <div className="mb-4">
                <label
                  htmlFor="categories"
                  className="block text-sm font-medium text-[#14134f] mb-1"
                >
                  Danh mục (1)
                </label>
                <Select
                  placeholder="Chọn danh mục con"
                  size="large"
                  value={selectedLevel1}
                  onChange={handleLevel1Change}
                  className="w-full"
                >
                  {renderCategoryOptions(getLevel1Categories())}
                </Select>
              </div>
            )}
            {selectedLevel1 && (
              <div className="mb-4">
                <label
                  htmlFor="categories"
                  className="block text-sm font-medium text-[#14134f] mb-1"
                >
                  Danh mục (2)
                </label>
                <Select
                  placeholder="Chọn danh mục con"
                  size="large"
                  mode="multiple"
                  value={input.categories.slice(2)}
                  onChange={handleLevel2Change}
                  className="w-full"
                >
                  {renderCategoryOptions(getLevel2Categories())}
                </Select>
              </div>
            )}
          </Card>

          <Card title="Hình ảnh sản phẩm" className="shadow-md">
            <Row gutter={16}>
              <Col span={12}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#14134f] mb-1">
                    Ảnh hiển thị
                  </label>
                  <Upload
                    accept="image/*"
                    listType="picture-card"
                    maxCount={1}
                    beforeUpload={() => false}
                    fileList={mainImage ? [mainImage] : []}
                    onChange={({ fileList }) => setMainImage(fileList[0])}
                  >
                    <div>
                      <PlusOutlined />
                      <div className="mt-2">Tải lên</div>
                    </div>
                  </Upload>
                </div>
              </Col>
              <Col span={12}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#14134f] mb-1">
                    Danh sách ảnh
                  </label>
                  <Upload
                    accept="image/*"
                    listType="picture-card"
                    multiple
                    maxCount={3}
                    beforeUpload={() => false}
                    fileList={images}
                    onChange={({ fileList }) => setImages(fileList)}
                  >
                    <div>
                      <PlusOutlined />
                      <div className="mt-2">Tải lên</div>
                    </div>
                  </Upload>
                </div>
              </Col>
            </Row>
          </Card>

          <Card title="Biến thể sản phẩm" className="shadow-md">
            {input.variants.map((variant, index) => (
              <Card
                key={index}
                type="inner"
                title={`Màu sản phẩm ${index + 1}`}
                extra={
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Xóa màu sản phẩm
                  </button>
                }
                className="mb-4"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#14134f] mb-1">
                        Tên màu
                      </label>
                      <Input
                        size="large"
                        value={variant.color.name}
                        onChange={(e) =>
                          handleVariantChange(index, "name", e.target.value)
                        }
                      />
                      {validates?.variants && (
                        <ErrorMessage
                          message={
                            validates?.variants[`variants[${index}].color.name`]
                          }
                        />
                      )}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#14134f] mb-1">
                        Mã màu
                      </label>
                      <div className="flex gap-4 items-center">
                        <Input
                          className="flex-1"
                          size="large"
                          value={variant.color.code}
                          onChange={(e) =>
                            handleVariantChange(index, "code", e.target.value)
                          }
                        />
                        {variant.color.code && (
                          <div
                            className="w-10 h-10 rounded-full border border-gray-300 flex-shrink-0"
                            style={{ backgroundColor: variant.color.code }}
                          ></div>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveColorIndex(index);
                            setShowColorPicker(!showColorPicker);
                          }}
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Chọn màu
                        </button>
                      </div>
                      {showColorPicker && activeColorIndex === index && (
                        <div className="absolute mt-2 z-10">
                          <SketchPicker
                            color={variant.color.code}
                            onChangeComplete={(color) => {
                              handleVariantChange(index, "code", color.hex);
                              setShowColorPicker(false);
                            }}
                          />
                        </div>
                      )}
                      {validates.variants && (
                        <ErrorMessage
                          message={
                            validates.variants[`variants[${index}].color.code`]
                          }
                        />
                      )}
                    </div>
                  </Col>
                </Row>
                <div className="mb-4">
                  <Upload
                    accept="image/*"
                    listType="picture-card"
                    maxCount={1}
                    beforeUpload={() => false}
                    fileList={variant.color.image ? [variant.color.image] : []}
                    onChange={({ fileList }) => {
                      handleVariantChange(index, "image", fileList[0]);
                    }}
                  >
                    <div>
                      <PlusOutlined />
                      <div className="mt-2">Tải ảnh màu</div>
                    </div>
                  </Upload>
                  {validates?.variants && (
                    <ErrorMessage
                      message={
                        validates?.variants[
                          `variants[${index}].color.image.url`
                        ]
                      }
                    />
                  )}
                </div>
              </Card>
            ))}
            <button
              type="button"
              onClick={addVariant}
              className="mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Thêm màu sản phẩm
            </button>
          </Card>

          <Card title="Thông tin bổ sung" className="shadow-md">
            <Row gutter={16}>
              <Col span={12}>
                <div className="mb-4">
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-[#14134f] mb-1"
                  >
                    Tags
                  </label>
                  <Select
                    placeholder="Chọn tags"
                    size="large"
                    id="tags"
                    mode="tags"
                    value={input.tags}
                    onChange={(value) => handleSelectChange("tags", value)}
                    className="w-full"
                  >
                    {tags?.map((item) => (
                      <Select.Option key={item.key} value={item.value}>
                        {item.value}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col span={12}>
                <div className="mb-4">
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium text-[#14134f] mb-1"
                  >
                    Hạn sử dụng
                  </label>
                  <DatePicker
                    value={input.expiry ? moment(input.expiry) : ""}
                    placeholder="Hạn sử dụng"
                    onChange={(_, dateString) => {
                      setInput((prev) => ({ ...prev, expiry: dateString }));
                    }}
                    size="large"
                    className="w-full"
                  />
                </div>
              </Col>
            </Row>
            <div className="mb-4">
              <Checkbox
                id="enable"
                checked={input.enable}
                onChange={(e) =>
                  setInput({ ...input, enable: e.target.checked })
                }
              >
                <span className="ml-2 text-sm text-[#14134f] font-medium">
                  Kích hoạt sản phẩm
                </span>
              </Checkbox>
            </div>
          </Card>

          <Card title="Mô tả sản phẩm" className="shadow-md">
            <div className="mb-4">
              <QuillEditor
                value={input.description}
                onChange={handleChangeQill}
              />
              {validates.description && (
                <ErrorMessage message={validates.description} />
              )}
            </div>
          </Card>
        </form>
      )}
    </Modal>
  );
};

export default ModalEditProduct;
