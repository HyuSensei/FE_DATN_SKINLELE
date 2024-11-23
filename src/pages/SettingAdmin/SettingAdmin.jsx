import React from "react";
import { Form, Input, Select, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const SettingAdmin = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("values", values);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className="py-4"
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

      <div className="flex items-center gap-4 flex-wrap">
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
          name="role"
          label="Chọn vai trò"
          className="w-full lg:flex-1"
        >
          <Select
            size="large"
            placeholder="Chọn vai trò"
            className="w-full mt-1"
            disabled
          >
            <Option value="ADMIN">Admin</Option>
            <Option value="SUPPORT">Support</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
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
                return Promise.reject(
                  new Error("Mật khẩu nhập lại không khớp")
                );
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
      </div>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className="bg-indigo-600 hover:bg-indigo-700 w-full mt-4"
      >
        Cập nhật
      </Button>
    </Form>
  );
};

export default SettingAdmin;
