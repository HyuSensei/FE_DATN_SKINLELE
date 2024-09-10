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

const CreateProduct = () => {
  const [input, setInput] = useState({
    name: "",
    categories: [],
    brand: "",
    price: "",
    description: "",
    mainImage: "",
    images: [],
    variants: [],
    enable: true,
    tags: [],
    capacity: "",
  });
  const [loading, setLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getBrandByCreatePro());
    dispatch(getCategoryByCreatePro());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setInput({ ...input, [name]: value });
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
    newVariants[index].color[field] = value;
    setInput({ ...input, variants: newVariants });
  };

  const removeVariant = (index) => {
    const newVariants = input.variants.filter((_, i) => i !== index);
    setInput({ ...input, variants: newVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productData = {
        ...input,
        images: await Promise.all(
          input.images.map(async (file) => {
            const result = await uploadFile(file.originFileObj);
            return { url: result.secure_url, publicId: result.public_id };
          })
        ),
        mainImage: input.mainImage
          ? await uploadFile(input.mainImage.file.originFileObj)
          : null,
      };

      // Call your API to create the product
      // await createProduct(productData);

      message.success("Sản phẩm đã được tạo thành công");
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
    } catch (error) {
      message.error("Không thể tạo sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeQill = (value) => {
    setInput((prev) => ({
      ...prev,
      description: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Tên sản phẩm
          </label>
          <Input
            size="large"
            id="name"
            name="name"
            value={input.name}
            onChange={handleInputChange}
            required
            className="mt-1 shadow-lg"
          />
        </div>

        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Thương hiệu
          </label>
          <Select
            size="large"
            id="brand"
            value={input.brand}
            onChange={(value) => handleSelectChange("brand", value)}
            className="w-full mt-1 shadow-lg"
          >
            <Option value="" disabled>
              <div className="text-sm font-bold">---</div>
            </Option>
            {brands.length > 0 &&
              brands.map((brand) => (
                <Option key={brand._id} value={brand._id}>
                  {brand.name}
                </Option>
              ))}
          </Select>
        </div>
      </div>

      <div>
        <label
          htmlFor="categories"
          className="block text-sm font-medium text-gray-700"
        >
          Danh mục
        </label>
        <Select
          size="large"
          id="categories"
          mode="multiple"
          value={input.categories}
          onChange={(value) => handleSelectChange("categories", value)}
          className="w-full mt-1 shadow-lg"
        >
          {categories.length > 0 &&
            categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Giá
          </label>
          <Input
            size="large"
            type="number"
            id="price"
            name="price"
            value={input.price}
            onChange={handleInputChange}
            required
            className="mt-1 shadow-lg"
          />
        </div>

        <div>
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-700"
          >
            Dung tích
          </label>
          <Input
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
          <label className="block text-sm font-medium text-gray-700 py-1">
            Ảnh hiển thị
          </label>
          <Upload
            listType="picture-card"
            maxCount={1}
            beforeUpload={() => false}
            onChange={({ fileList }) =>
              setInput({ ...input, mainImage: fileList[0] })
            }
          >
            <div>
              <PlusOutlined />
              <div className="mt-2">Tải lên</div>
            </div>
          </Upload>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 py-1">
            Danh sách ảnh
          </label>
          <Upload
            listType="picture-card"
            multiple
            beforeUpload={() => false}
            onChange={({ fileList }) =>
              setInput({ ...input, images: fileList })
            }
          >
            <div>
              <PlusOutlined />
              <div className="mt-2">Tải lên</div>
            </div>
          </Upload>
        </div>
      </div>

      {/* {input.variants.map((variant, index) => (
        <div
          key={index}
          className="p-4 border-2 border-[#3b71ca] rounded-md shadow-lg space-y-2"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 py-1">
              Tên màu
            </label>
            <Input
              size="large"
              value={variant.color.name}
              onChange={(e) =>
                handleVariantChange(index, "name", e.target.value)
              }
              className="shadow-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 py-1">
              Mã màu
            </label>
            <div className="flex gap-4 items-center">
              <Input
                className="flex-1 shadow-lg"
                size="large"
                value={variant.color.code}
                onChange={(e) =>
                  handleVariantChange(index, "code", e.target.value)
                }
              />
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
                  onChangeComplete={(color) =>
                    handleVariantChange(index, "code", color.hex)
                  }
                />
              </div>
            )}
          </div>
          <div>
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
              onChange={({ fileList }) =>
                handleVariantChange(index, "image", fileList[0])
              }
            >
              <div>
                <PlusOutlined />
                <div className="mt-2">Tải ảnh màu</div>
              </div>
            </Upload>
          </div>
          <div className=" flex justify-end">
            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800"
            >
              Xóa màu sản phẩm
            </button>
          </div>
        </div>
      ))} */}

      {input.variants.map((variant, index) => (
        <div
          key={index}
          className="p-4 border-2 border-[#3b71ca] rounded-md shadow-lg space-y-2"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 py-1">
              Tên màu
            </label>
            <Input
              size="large"
              value={variant.color.name}
              onChange={(e) =>
                handleVariantChange(index, "name", e.target.value)
              }
              className="shadow-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 py-1">
              Mã màu
            </label>
            <div className="flex gap-4 items-center">
              <Input
                className="flex-1 shadow-lg"
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
                  onChangeComplete={(color) =>
                    handleVariantChange(index, "code", color.hex)
                  }
                />
              </div>
            )}
          </div>
          <div>
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
              onChange={({ fileList }) =>
                handleVariantChange(index, "image", fileList[0])
              }
            >
              <div>
                <PlusOutlined />
                <div className="mt-2">Tải ảnh màu</div>
              </div>
            </Upload>
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
          className="ml-2 block text-sm text-gray-700 font-bold"
        >
          Kích hoạt sản phẩm
        </label>
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700"
        >
          Tags
        </label>
        <Select
          size="large"
          id="tags"
          mode="tags"
          value={input.tags}
          onChange={(value) => handleSelectChange("tags", value)}
          className="w-full mt-1 shadow-lg"
        >
          {tags?.map((item) => (
            <Option key={item.key} value={item.value}>
              {item.value}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 pb-1"
        >
          Mô tả
        </label>
        <QuillEditor
          {...{ value: input.description, onChange: handleChangeQill }}
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? "Đang xử lý..." : "Tạo sản phẩm"}
        </button>
      </div>
    </form>
  );
};

export default CreateProduct;
