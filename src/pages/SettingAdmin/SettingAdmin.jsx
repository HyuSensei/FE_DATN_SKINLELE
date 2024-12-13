import React from "react";
import { Form, Input, Select, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CustomButton from "@/components/CustomButton";

const { Option } = Select;

const SettingAdmin = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("values", values);
  };

  return (
    <Form
      requiredMark={false}
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className="py-4 min-w-96 max-w-xl mx-auto"
    >
      <Form.Item
        name="avatar"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) return e;
          return e?.fileList;
        }}
        rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện" }]}
        className="flex items-center justify-center w-full"
      >
        <Upload
          accept="image/*"
          listType="picture-circle"
          showUploadList={false}
        >
          <div>
            <UploadOutlined />
            <div className="mt-2">Tải lên</div>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item
        name="fullName"
        label="Họ và tên"
        className="w-full lg:flex-1"
        rules={[
          { required: true, message: "Vui lòng nhập họ và tên" },
          { min: 3, message: "Họ và tên phải có ít nhất 3 ký tự" },
        ]}
      >
        <Input
          size="large"
          placeholder="Nhập họ tên..."
          className="w-full mt-1 shadow-lg"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Mật khẩu"
        className="w-full lg:flex-1"
        rules={[
          { required: true, message: "Vui lòng nhập mật khẩu" },
          { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
        ]}
      >
        <Input.Password
          size="large"
          placeholder="Nhập mật khẩu..."
          className="w-full mt-1 shadow-lg"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Nhập mật khẩu mới"
        className="w-full lg:flex-1"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Vui lòng nhập lại mật khẩu" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu nhập lại không khớp"));
            },
          }),
        ]}
      >
        <Input.Password
          size="large"
          placeholder="Nhập mật khẩu mới..."
          className="w-full mt-1 shadow-lg"
        />
      </Form.Item>
      <CustomButton variant="primary" type="submit" className="w-full">
        Cập nhật tài khoản
      </CustomButton>
    </Form>
  );
};

export default SettingAdmin;
