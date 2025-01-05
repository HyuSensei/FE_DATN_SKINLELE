import React, { useState } from "react";
import {
  Upload,
  message,
  Select,
  Input,
  DatePicker,
  Card,
  Row,
  Col,
  Checkbox,
  Form,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UPLOAD_SKINLELE_PRESET, uploadFile } from "@helpers/uploadCloudinary";
import { tags } from "@const/tags";
import QuillEditor from "@components/QuillEditor";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "@redux/product/product.thunk";
import CategorySelector from "./CategorySelector";
import ProductVariantForm from "./ProductVariantForm";
import CustomButton from "@/components/CustomButton";
import dayjs from "@utils/dayjsTz";
import { useGetAllBrandQuery } from "@/redux/brand/brand.query";
import { useGetAllCategoryQuery } from "@/redux/category/category.query";

const CreateProduct = () => {
  const [form] = Form.useForm();
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.product);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { data: brands = [] } = useGetAllBrandQuery();
  const { data: categories = [] } = useGetAllCategoryQuery();

  const clearInput = () => {
    form.resetFields();
    setMainImage(null);
    setImages([]);
  };

  const onFinish = async (values) => {
    try {
      setLoadingSubmit(true);
      const uploadedImages = await Promise.all(
        images.map(async (file) => {
          if (file.originFileObj) {
            const result = await uploadFile({
              file: file.originFileObj,
              type: UPLOAD_SKINLELE_PRESET,
            });
            if (result && result.secure_url && result.public_id) {
              return { url: result.secure_url, publicId: result.public_id };
            }
          }
          return null;
        })
      );
      const uploadedMainImage =
        mainImage && mainImage.originFileObj
          ? await uploadFile({
              file: mainImage.originFileObj,
              type: UPLOAD_SKINLELE_PRESET,
            })
          : null;

      const uploadedVariants = await Promise.all(
        values.variants.map(async (variant) => {
          let uploadedImage = null;
          if (variant.color.image && variant.color.image.fileList.length > 0) {
            uploadedImage = await uploadFile({
              file: variant.color.image.fileList[0].originFileObj,
              type: UPLOAD_SKINLELE_PRESET,
            });
          }
          return {
            ...variant,
            color: {
              ...variant.color,
              code: variant.color.code.toHexString(),
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

      const payload = {
        ...values,
        categories: [
          values.level0,
          values?.level1,
          ...(Array.isArray(values?.level2) ? values.level2 : []),
        ].filter((item) => item !== undefined && item !== null),
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
        expiry: dayjs(values.expiry).format("YYYY-MM-DD"),
      };

      delete payload.level0;
      delete payload.level1;
      delete payload.level2;

      dispatch(createProduct(payload)).then((res) => {
        if (res.payload.success) {
          message.success(res.payload.message);
          clearInput();
          return;
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Form
      requiredMark={false}
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="space-y-6 mt-4"
      initialValues={{
        enable: true,
      }}
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
              rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
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
        <div className="flex flex-wrap gap-4 items-center">
          <Form.Item
            className="flex-1"
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <Input placeholder="Nhập giá..." size="middle" />
          </Form.Item>
          <Form.Item label="Dung tích" name="capacity" className="flex-1">
            <Input placeholder="Nhập dung tích..." size="middle" />
          </Form.Item>
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
                  className="flex-1"
                  label="Số lượng"
                  name="totalQuantity"
                  rules={[
                    { required: true, message: "Vui lòng nhập số lượng" },
                  ]}
                >
                  <InputNumber
                    className="w-full"
                    placeholder="Nhập số lượng..."
                    size="middle"
                    type="number"
                  />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
        </div>
      </Card>
      <Card title="Danh mục sản phẩm" className="shadow-md mt-6">
        <CategorySelector categories={categories} form={form} />
      </Card>
      <Card title="Hình ảnh sản phẩm" className="shadow-md mt-6">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ảnh hiển thị"
              name="mainImage"
              rules={[
                {
                  required: true,
                  message: "Vui lòng tải lên ảnh hiển thị cho sản phẩm",
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
                  required: true,
                  message: "Vui lòng tải lên ít nhất 1 ảnh cho sản phẩm",
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

      <Card title="Biến thể sản phẩm" className="shadow-md mt-6">
        <ProductVariantForm
          onChange={(variants) => {
            form.setFieldValue("variants", variants);
          }}
          form={form}
        />
      </Card>

      <Card title="Thông tin bổ sung" className="shadow-md mt-6">
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

      <Card title="Mô tả sản phẩm" className="shadow-md mt-6">
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả sản phẩm",
            },
          ]}
        >
          <QuillEditor />
        </Form.Item>
      </Card>

      <CustomButton
        className="w-full"
        type="submit"
        disabled={isLoading || loadingSubmit}
        variant="primary"
      >
        {isLoading || loadingSubmit ? "Đang xử lý..." : "Tạo sản phẩm"}
      </CustomButton>
    </Form>
  );
};

export default CreateProduct;
