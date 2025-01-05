import React from "react";
import {
  Card,
  Form,
  Input,
  Upload,
  Row,
  Col,
  ColorPicker,
  InputNumber,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomButton from "@/components/CustomButton";

const ProductVariantForm = ({ form }) => {
  return (
    <Form.List name="variants" initialValue={[]}>
      {(fields, { add, remove }) => (
        <div className="w-full">
          <Row gutter={[16, 16]}>
            {fields.map((field, index) => (
              <Col key={field.key} xs={24} md={12} lg={8}>
                <Card
                  title={`Biến thể ${index + 1}`}
                  extra={
                    <CustomButton
                      variant="danger"
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        remove(field.name);
                      }}
                    >
                      Xóa
                    </CustomButton>
                  }
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <Form.Item
                      className="flex-1"
                      name={[field.name, "color", "name"]}
                      label="Tên màu"
                      rules={[{ required: true, message: "Nhập tên màu" }]}
                    >
                      <Input size="middle" placeholder="Nhập tên màu..." />
                    </Form.Item>

                    <Form.Item
                      name={[field.name, "color", "code"]}
                      label="Mã màu"
                      rules={[{ required: true, message: "Chọn mã màu" }]}
                    >
                      <ColorPicker size="middle" format="hex" showText />
                    </Form.Item>
                  </div>
                  <Form.Item
                    label="Số lượng"
                    name={[field.name, "quantity"]}
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
                  <Form.Item
                    name={[field.name, "color", "image"]}
                    label="Ảnh màu sắc"
                    rules={[{ required: true, message: "Chọn ảnh cho màu" }]}
                  >
                    <Upload
                      listType="picture-card"
                      maxCount={1}
                      beforeUpload={() => false}
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

          <button
            type="button"
            onClick={() => add({ color: { name: "", code: "", image: null } })}
            className="w-full h-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors mt-4"
          >
            <PlusOutlined /> Thêm biến thể
          </button>
        </div>
      )}
    </Form.List>
  );
};

export default ProductVariantForm;
