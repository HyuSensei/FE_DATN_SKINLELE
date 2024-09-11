import React, { useState, useEffect } from "react";
import { Upload, message, Select, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SketchPicker } from "react-color";
import { uploadFile } from "../../helpers/uploadCloudinary";
import { tags } from "../../const/tags";
import QuillEditor from "../../components/QuillEditor";
import { useDispatch, useSelector } from "react-redux";
import { getBrandByCreatePro } from "../../redux/brand/brand.thunk";
import { getCategoryByCreatePro } from "../../redux/category/category.thunk";
import { createProduct } from "../../redux/product/product.thunk";
import {
  validateCreateProductSchema,
  validateForm,
} from "../../validate/validate";
import ErrorMessage from "../../components/Error/ErrorMessage";

const CreateProduct = () => {
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
    capacity: "",
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedLevel0, setSelectedLevel0] = useState(null);
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);
  const [validates, setValidates] = useState({});

  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const { isLoading } = useSelector((state) => state.product);
  const [loadingUpload, setLoadingUpload] = useState(false);

  useEffect(() => {
    dispatch(getBrandByCreatePro());
    dispatch(getCategoryByCreatePro());
  }, []);

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
    const newVariants = [...input.variants];
    if (field === "image") {
      newVariants[index].color.image = value;
    } else {
      newVariants[index].color[field] = value;
    }
    setInput((prev) => ({ ...prev, variants: newVariants }));
  };

  const removeVariant = (index) => {
    setInput((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const clearInput = () => {
    setInput({
      name: "",
      categories: [],
      brand: "",
      price: "",
      description: "",
      mainImage: null,
      images: [],
      variants: [],
      enable: true,
      tags: [],
      capacity: "",
    });
    setSelectedLevel0("");
    setSelectedLevel1("");
    setMainImage(null);
    setImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedImages = await Promise.all(
      images.map(async (file) => {
        if (file.originFileObj) {
          const result = await uploadFile(file.originFileObj);
          if (result && result.secure_url && result.public_id) {
            return { url: result.secure_url, publicId: result.public_id };
          }
        }
        return null;
      })
    );
    setLoadingUpload(true);
    const uploadedMainImage =
      mainImage && mainImage.originFileObj
        ? await uploadFile(mainImage.originFileObj)
        : null;

    const uploadedVariants = await Promise.all(
      input.variants.map(async (variant) => {
        let uploadedImage = null;
        if (variant.color.image && variant.color.image.originFileObj) {
          uploadedImage = await uploadFile(variant.color.image.originFileObj);
        }
        return {
          ...variant,
          color: {
            ...variant.color,
            image: uploadedImage
              ? {
                  url: uploadedImage.secure_url,
                  publicId: uploadedImage.public_id,
                }
              : null,
          },
        };
      })
    );
    setLoadingUpload(false);
    const payload = {
      ...input,
      mainImage: uploadedMainImage
        ? {
            url: uploadedMainImage.secure_url,
            publicId: uploadedMainImage.public_id,
          }
        : null,
      images: uploadedImages.map((img) => ({
        url: img.url,
        publicId: img.publicId,
      })),
      variants: uploadedVariants || [],
    };

    const validationErrors = await validateForm({
      input: {
        ...input,
        mainImage: mainImage,
        images: images,
      },
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
      return;
    }

    dispatch(createProduct(payload)).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message);
        clearInput();
        return;
      }
    });
  };

  const handleChangeQill = (value) => {
    setInput((prev) => ({
      ...prev,
      description: value,
    }));
    setValidates((prev) => ({ ...prev, description: "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#14134f]"
          >
            Tên sản phẩm
          </label>
          <Input
            placeholder="Nhập tên sản phẩn..."
            size="large"
            id="name"
            name="name"
            value={input.name}
            onChange={handleInputChange}
            className="mt-1 shadow-lg"
          />
          {validates.name && <ErrorMessage message={validates.name} />}
        </div>

        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-[#14134f]"
          >
            Thương hiệu
          </label>
          <Select
            name="brand"
            placeholder="Chọn thương hiệu"
            size="large"
            value={input.brand}
            onChange={(value) => {
              handleSelectChange("brand", value);
              setValidates((prev) => ({
                ...prev,
                brand: "",
              }));
            }}
            className="w-full mt-1 shadow-lg"
          >
            <Select.Option value="" disabled>
              <div className="text-gray-500">---</div>
            </Select.Option>
            {brands.length > 0 &&
              brands?.map((brand) => (
                <Select.Option key={brand._id} value={brand._id}>
                  {brand.name}
                </Select.Option>
              ))}
          </Select>
          {validates.brand && <ErrorMessage message={validates.brand} />}
        </div>
      </div>
      <div>
        <label
          htmlFor="categories"
          className="block text-sm font-medium text-[#14134f]"
        >
          Danh mục (0)
        </label>
        <Select
          placeholder="Chọn danh mục"
          size="large"
          value={selectedLevel0}
          onChange={(value) => {
            handleLevel0Change(value);
            setValidates((prev) => ({
              ...prev,
              categories: "",
            }));
          }}
          className="w-full mt-1 shadow-lg"
        >
          {categories.length > 0 &&
            categories?.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
        </Select>
        {validates.categories && (
          <ErrorMessage message={validates.categories} />
        )}
        <div className="flex gap-4 items-center flex-wrap mt-4">
          {selectedLevel0 && (
            <div className="flex-1 ">
              <label
                htmlFor="categories"
                className="block text-sm font-medium text-[#14134f]"
              >
                Danh mục (1)
              </label>
              <Select
                placeholder="Chọn danh mục con"
                size="large"
                value={selectedLevel1}
                onChange={handleLevel1Change}
                className="w-full shadow-lg mt-1"
              >
                {categories.length > 0 &&
                  categories
                    ?.find((category) => category._id === selectedLevel0)
                    .children?.map((category) => (
                      <Select.Option key={category._id} value={category._id}>
                        {category.name}
                      </Select.Option>
                    ))}
              </Select>
            </div>
          )}
          {selectedLevel1 && (
            <div className="flex-1">
              <label
                htmlFor="categories"
                className="block text-sm font-medium text-[#14134f]"
              >
                Danh mục (2)
              </label>

              <Select
                placeholder="Chọn danh mục con"
                size="large"
                mode="multiple"
                value={input.categories.slice(2)}
                onChange={handleLevel2Change}
                className="w-full shadow-lg mt-1"
              >
                {categories.length > 0 &&
                  categories
                    ?.find((category) => category._id === selectedLevel0)
                    .children?.find(
                      (category) => category._id === selectedLevel1
                    )
                    .children.map((category) => (
                      <Select.Option key={category._id} value={category._id}>
                        {category.name}
                      </Select.Option>
                    ))}
              </Select>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-[#14134f]"
          >
            Giá
          </label>
          <Input
            placeholder="Nhập tên giá..."
            size="large"
            type="number"
            id="price"
            name="price"
            value={input.price}
            onChange={handleInputChange}
            className="w-full mt-1 shadow-lg"
          />
          {validates.price && <ErrorMessage message={validates.price} />}
        </div>

        <div>
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-[#14134f]"
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
            className="mt-1 shadow-lg"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div>
          <label className="block text-sm font-medium text-[#14134f] py-1">
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

        <div>
          <label className="block text-sm font-medium text-[#14134f] py-1">
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
      </div>

      {input.variants.map((variant, index) => (
        <div
          key={index}
          className="p-4 border-2 border-[#3b71ca] rounded-md shadow-lg space-y-2"
        >
          <div>
            <label className="block text-sm font-medium text-[#14134f] py-1">
              Tên màu
            </label>
            <Input
              size="large"
              value={variant.color.name}
              onChange={(e) => {
                handleVariantChange(index, "name", e.target.value);
                setValidates((prev) => ({
                  ...prev,
                  variants: {
                    ...prev.variants,
                    [`variants[${index}].color.name`]: "",
                  },
                }));
              }}
              className="shadow-lg"
            />
            {validates?.variants && (
              <ErrorMessage
                message={validates?.variants[`variants[${index}].color.name`]}
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#14134f] py-1">
              Mã màu
            </label>
            <div className="flex gap-4 items-center">
              <Input
                className="flex-1 shadow-lg"
                size="large"
                value={variant.color.code}
                onChange={(e) => {
                  handleVariantChange(index, "code", e.target.value);
                  setValidates((prev) => ({
                    ...prev,
                    variants: {
                      ...prev.variants,
                      [`variants[${index}].color.code`]: "",
                    },
                  }));
                }}
              />
              {variant.color.code && (
                <div
                  className="w-10 h-10 rounded-full border border-gray-300 flex-shrink-0"
                  style={{ backgroundColor: variant.color.code }}
                ></div>
              )}
              <button
                type="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Chọn màu
              </button>
            </div>
            {showColorPicker && (
              <div className="absolute mt-2 z-10">
                <SketchPicker
                  color={variant.color.code}
                  onChangeComplete={(color) => {
                    handleVariantChange(index, "code", color.hex);
                    setShowColorPicker(false);
                    setValidates((prev) => ({
                      ...prev,
                      variants: {
                        ...prev.variants,
                        [`variants[${index}].color.code`]: "",
                      },
                    }));
                  }}
                />
              </div>
            )}
          </div>
          {validates.variants && (
            <ErrorMessage
              message={validates.variants[`variants[${index}].color.code`]}
            />
          )}
          <div>
            <Upload
              accept="image/*"
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
              fileList={variant.color.image ? [variant.color.image] : []}
              onChange={({ fileList }) => {
                handleVariantChange(index, "image", fileList[0]);
                setValidates((prev) => ({
                  ...prev,
                  variants: {
                    ...prev.variants,
                    [`variants[${index}].color.image.url`]: "",
                  },
                }));
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
                  validates?.variants[`variants[${index}].color.image.url`]
                }
              />
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800"
            >
              Xóa màu sản phẩm
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addVariant}
        className="mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Thêm màu sản phẩm
      </button>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="enable"
          name="enable"
          checked={input.enable}
          onChange={(e) => setInput({ ...input, enable: e.target.checked })}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label
          htmlFor="enable"
          className="ml-2 block text-sm text-[#14134f] font-bold"
        >
          Kích hoạt sản phẩm
        </label>
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-[#14134f]"
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
          className="w-full mt-1 shadow-lg"
        >
          {tags?.map((item) => (
            <Select.Option key={item.key} value={item.value}>
              {item.value}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-[#14134f] pb-1"
        >
          Mô tả
        </label>
        <QuillEditor
          {...{ value: input.description, onChange: handleChangeQill }}
        />
        {validates.description && (
          <ErrorMessage message={validates.description} />
        )}
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading || loadingUpload}
          className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading || loadingUpload ? "Đang xử lý..." : "Tạo sản phẩm"}
        </button>
      </div>
    </form>
  );
};

export default CreateProduct;
