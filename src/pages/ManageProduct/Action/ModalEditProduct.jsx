import React, { useState, useEffect } from "react";
import {
  Modal,
  message,
  Form,
  Row,
  Col,
  Upload,
  Card,
  Select,
  DatePicker,
  Checkbox,
  Input,
  InputNumber,
} from "antd";
import {
  UPLOAD_SKINLELE_PRESET,
  uploadFile,
  deleteFile,
} from "@helpers/uploadCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "@redux/product/product.thunk";
import CategorySelector from "./CategorySelector";
import ProductVariantForm from "./ProductVariantForm";
import QuillEditor from "@components/QuillEditor";
import { useGetAllBrandQuery } from "@/redux/brand/brand.query";
import { useGetAllCategoryQuery } from "@/redux/category/category.query";
import { PlusOutlined } from "@ant-design/icons";
import { tags } from "@/const/tags";
import dayjs from "@utils/dayjsTz";

const ModalEditProduct = ({
  open = false,
  setOpen,
  data = {},
  setData,
  refetch,
}) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [form] = Form.useForm();
  const [mainImage, setMainImage] = useState(null);
  const [imagesVariant, setImagesVariant] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { isLoading } = useSelector((state) => state.product);

  const { data: brands = [] } = useGetAllBrandQuery();
  const { data: categories = [] } = useGetAllCategoryQuery();

  useEffect(() => {
    if (data && open) {
      form.setFieldsValue({
        name: data.name,
        brand: data.brand._id,
        price: data.price,
        capacity: data.capacity,
        level0: data.categories[0]?._id,
        level1: data.categories[1]?._id,
        level2: data.categories.slice(2).map((cat) => cat._id),
        description: data.description,
        tags: data.tags,
        enable: data.enable,
        expiry: data.expiry ? dayjs(data.expiry) : undefined,
        variants: data.variants.map((variant) => ({
          color: {
            name: variant.color.name,
            code: variant.color.code,
            image: variant.color.image,
            quantity: variant.color.quantity,
          },
        })),
        totalQuantity: data.totalQuantity,
      });
      setMainImage(data.mainImage);
      setImages(
        data.images
          ? data.images.map((img, index) => ({
              uid: String(-index - 1),
              name: `image${index}.png`,
              status: "done",
              url: img.url,
              publicId: img.publicId,
            }))
          : []
      );
    }
  }, [data, open, form]);

  const handleUpdate = async (values) => {
    try {
      console.log(values);
      setLoadingSubmit(true);
      // Handle main image upload
      let uploadedMainImage = mainImage;
      if (mainImage?.originFileObj) {
        const result = await uploadFile({
          file: mainImage.originFileObj,
          type: UPLOAD_SKINLELE_PRESET,
        });
        uploadedMainImage = {
          url: result.secure_url,
          publicId: result.public_id,
        };
      }

      // Handle multiple images upload
      const uploadedImages = await Promise.all(
        images.map(async (file) => {
          if (file.originFileObj) {
            const result = await uploadFile({
              file: file.originFileObj,
              type: UPLOAD_SKINLELE_PRESET,
            });
            return { url: result.secure_url, publicId: result.public_id };
          }
          return { url: file.url, publicId: file.publicId };
        })
      );

      // Handle variants upload
      const uploadedVariants = await Promise.all(
        values.variants.map(async (variant) => {
          let uploadedImage = variant.color.image;
          const image = variant.color.image;
          if (image.fileList && image.fileList.length > 0) {
            const result = await uploadFile({
              file: image.fileList[0].originFileObj,
              type: UPLOAD_SKINLELE_PRESET,
            });
            uploadedImage = {
              url: result.secure_url,
              publicId: result.public_id,
            };
          }
          return {
            color: {
              ...variant.color,
              code:
                typeof variant.color.code !== "string"
                  ? variant.color.code.toHexString()
                  : variant.color.code,
              image: uploadedImage,
            },
            quantity: variant.quantity,
          };
        })
      );

      const payload = {
        ...values,
        categories: [
          values.level0,
          values.level1,
          ...(Array.isArray(values.level2) ? values.level2 : []),
        ].filter(Boolean),
        mainImage: uploadedMainImage,
        images: uploadedImages,
        variants: uploadedVariants,
        expiry: values.expiry
          ? dayjs(values.expiry).format("YYYY-MM-DD")
          : null,
      };

      delete payload.level0;
      delete payload.level1;
      delete payload.level2;

      const response = await dispatch(
        updateProduct({ id: data._id, data: payload })
      ).unwrap();

      if (response.success) {
        message.success(response.message);

        if (data.mainImage.publicId !== uploadedMainImage.publicId) {
          await deleteFile(data.mainImage.publicId);
        }

        for (const oldImage of data.images) {
          if (
            !uploadedImages.find((img) => img.publicId === oldImage.publicId)
          ) {
            await deleteFile(oldImage.publicId);
          }
        }

        for (const oldVariant of data.variants) {
          if (
            oldVariant.color.image &&
            !uploadedVariants.find(
              (v) => v.color.image?.publicId === oldVariant.color.image.publicId
            )
          ) {
            await deleteFile(oldVariant.color.image.publicId);
          }
        }
        refetch();
        form.resetFields();
        setOpen(false);
        setData(null);
        setImages([]);
        setImagesVariant([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      title="Cập nhật thông tin sản phẩm"
      width="80%"
      style={{ top: 20 }}
      footer={[
        <div key="footer" className="flex justify-end gap-2">
          <button
            onClick={() => {
              setOpen(false);
              form.resetFields();
            }}
            className="px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={() => form.submit()}
            disabled={isLoading || loadingSubmit}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading || loadingSubmit ? "Đang xử lý..." : "Cập nhật"}
          </button>
        </div>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
        className="space-y-6 mt-4"
        requiredMark={false}
      >
        <Card title="Thông tin cơ bản" className="shadow-md">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                ]}
              >
                <Input placeholder="Nhập tên sản phẩm..." size="middle" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Thương hiệu"
                name="brand"
                rules={[
                  { required: true, message: "Vui lòng chọn thương hiệu" },
                ]}
              >
                <Select placeholder="Chọn thương hiệu" size="middle">
                  {brands.map((brand) => (
                    <Select.Option key={brand._id} value={brand._id}>
                      {brand.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Giá"
                name="price"
                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
              >
                <Input placeholder="Nhập giá..." size="middle" type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Dung tích" name="capacity">
                <Input placeholder="Nhập dung tích..." size="middle" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => {
              return prevValues.variants !== currentValues.variants;
            }}
          >
            {({ getFieldValue }) => {
              const variants = getFieldValue("variants") || [];
              return variants.length === 0 ? (
                <Form.Item
                  label="Số lượng"
                  name="totalQuantity"
                  rules={[
                    { required: true, message: "Vui lòng nhập số lượng" },
                  ]}
                >
                  <InputNumber
                    placeholder="Nhập số lượng..."
                    size="middle"
                    className="w-full"
                  />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
        </Card>

        <CategorySelector
          categories={categories}
          form={form}
          initialValues={{
            level0: data?.categories[0]?._id,
            level1: data?.categories[1]?._id,
            level2: data?.categories.slice(2).map((cat) => cat._id),
          }}
        />

        <Card title="Hình ảnh sản phẩm" className="shadow-md">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ảnh hiển thị"
                name="mainImage"
                rules={[
                  {
                    validator: (_, fileList) => {
                      if (!mainImage) {
                        return Promise.reject(
                          "Vui lòng tải lên ảnh hiển thị cho sản phẩm"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
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
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Danh sách ảnh"
                name="images"
                rules={[
                  {
                    validator: (_, fileList) => {
                      if (images.length < 1) {
                        return Promise.reject(
                          "Vui lòng tải lên ít nhất 1 ảnh cho sản phẩm"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
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
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <ProductVariantForm
          form={form}
          variants={data?.variants}
          images={imagesVariant}
          setImages={setImagesVariant}
        />

        <Card title="Thông tin bổ sung" className="shadow-md">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Tags" name="tags">
                <Select placeholder="Chọn tags" size="middle" mode="tags">
                  {tags?.map((item) => (
                    <Select.Option key={item.key} value={item.value}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Hạn sử dụng"
                name="expiry"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn hạn sử dụng",
                  },
                ]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current && current.isBefore(dayjs().startOf("day"))
                  }
                  placeholder="Hạn sử dụng"
                  size="middle"
                  className="w-full"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="enable"
            valuePropName="checked"
            label="Kích hoạt sản phẩm"
          >
            <Checkbox />
          </Form.Item>
        </Card>

        <Form.Item
          name="description"
          label="Mô tả sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm" }]}
        >
          <QuillEditor />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditProduct;
