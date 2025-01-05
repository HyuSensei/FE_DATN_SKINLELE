import React, { useEffect } from "react";
import { Card, Form, Input, Upload, Row, Col, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColorPicker } from "antd";
import CustomButton from "@/components/CustomButton";

const ProductVariantForm = ({ form, variants = [], images, setImages }) => {
  useEffect(() => {
    if (variants.length > 0) {
      setImages(
        variants.map((variant) => ({
          uid: variant.color.image.publicId,
          url: variant.color.image.url,
          publicId: variant.color.image.publicId,
        }))
      );
    }
    form.setFieldsValue({
      variants: variants,
    });
  }, [form, variants]);

  return (
    <Card title="Biến thể sản phẩm" className="shadow-md">
      <Form.List name="variants">
        {(fields, { add, remove }) => (
          <div className="space-y-4">
            <Row gutter={[16, 16]}>
              {fields.map((field, index) => (
                <Col key={field.key} xs={24} md={12} lg={8}>
                  <Card
                    title={`Biến thể ${index + 1}`}
                    extra={
                      <CustomButton
                        variant="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(field.name)}
                      >
                        Xóa
                      </CustomButton>
                    }
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Tên màu */}
                      <Form.Item
                        className="flex-1"
                        name={[field.name, "color", "name"]}
                        label="Tên màu"
                        rules={[{ required: true, message: "Nhập tên màu" }]}
                      >
                        <Input size="middle" placeholder="Nhập tên màu..." />
                      </Form.Item>

                      {/* Mã màu */}
                      <Form.Item
                        name={[field.name, "color", "code"]}
                        label="Mã màu"
                        rules={[{ required: true, message: "Chọn mã màu" }]}
                      >
                        <ColorPicker
                          size="middle"
                          format="hex"
                          onChange={(color) => {
                            form.setFieldValue(
                              [field.name, "color", "code"],
                              color.toHexString()
                            );
                          }}
                        />
                      </Form.Item>
                    </div>

                    {/* Số lượng */}
                    <Form.Item
                      label="Số lượng"
                      name={[field.name, "quantity"]}
                      rules={[
                        { required: true, message: "Vui lòng nhập số lượng" },
                        {
                          type: "number",
                          min: 1,
                          message: "Số lượng phải lớn hơn 0",
                        },
                      ]}
                    >
                      <InputNumber
                        className="w-full"
                        placeholder="Nhập số lượng..."
                        size="middle"
                        min={1}
                      />
                    </Form.Item>

                    {/* Ảnh màu sắc */}
                    <Form.Item
                      name={[field.name, "color", "image"]}
                      label="Ảnh màu sắc"
                      rules={[{ required: true, message: "Chọn ảnh cho màu" }]}
                    >
                      <Upload
                        listType="picture-card"
                        maxCount={1}
                        beforeUpload={() => false}
                        fileList={images[index] ? [images[index]] : []}
                        onChange={({ fileList }) => {
                          const updatedImages = [...images];
                          updatedImages[index] = fileList[0] || null;
                          setImages(updatedImages);
                          form.setFieldValue(
                            [field.name, "color", "image"],
                            updatedImages[index]
                          );
                        }}
                      >
                        <div>
                          <PlusOutlined /> Tải lên
                        </div>
                      </Upload>
                    </Form.Item>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Thêm biến thể */}
            <button
              type="button"
              onClick={() =>
                add({ color: { name: "", code: "", image: null }, quantity: 0 })
              }
              className="w-full h-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              <PlusOutlined /> Thêm biến thể
            </button>
          </div>
        )}
      </Form.List>
    </Card>
  );
};

export default ProductVariantForm;
