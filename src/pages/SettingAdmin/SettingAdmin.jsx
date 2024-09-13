import React from "react";
import { Form, Input, Select, Switch, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const SettingAdmin = () => {
  return (
    <Form layout="vertical" className="py-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#14134f]"
          >
            Họ tên
          </label>
          <Input
            size="large"
            placeholder="Nhập họ tên..."
            className="w-full mt-1 shadow-lg"
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-[#14134f]"
          >
            Tên đăng nhập
          </label>
          <Input
            size="large"
            placeholder="Nhập tên đăng nhập..."
            className="w-full mt-1 shadow-lg"
            disabled
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#14134f]"
          >
            Mật khẩu
          </label>
          <Input.Password
            size="large"
            placeholder="Nhập mật khẩu mới..."
            className="w-full mt-1 shadow-lg"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#14134f]"
          >
            Vai trò
          </label>
          <Select
            size="large"
            placeholder="Chọn vai trò"
            className="w-full mt-1"
            disabled
          >
            <Option value="ADMIN">Admin</Option>
            <Option value="SUPPORT">Support</Option>
          </Select>
        </div>
      </div>

      <div>
        <label
          htmlFor="avatar"
          className="block text-sm font-medium text-[#14134f] py-1"
        >
          Ảnh đại diện
        </label>
        <Upload accept="image/*" listType="picture-card" showUploadList={false}>
          <div>
            <UploadOutlined />
            <div className="mt-2">Tải lên</div>
          </div>
        </Upload>
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
