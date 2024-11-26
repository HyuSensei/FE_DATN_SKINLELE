import { Form, Input, Modal, Select } from "antd";
import { isEmpty } from "lodash";
import React from "react";

const ModelAccountAction = ({ open, onClose, account = {} }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {};

  return (
    <Modal
      title={isEmpty(account) ? "Tạo tài khoản quản trị" : "Cập nhật tài khoản"}
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <div className="flex gap-4 items-center">
          <Form.Item
            className="flex-1"
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên !" }]}
          >
            <Input size="large" placeholder="Họ và tên..." />
          </Form.Item>
          <Form.Item
            className="flex-1"
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập !" },
            ]}
          >
            <Input size="large" placeholder="Tên đăng nhập..." />
          </Form.Item>
        </div>
        <div className="flex gap-4 items-center">
          <Form.Item
            className="flex-1"
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu !" }]}
          >
            <Input.Password size="large" placeholder="Mật khẩu..." />
          </Form.Item>
          <Form.Item
            className="flex-1"
            label="Nhập lại mật khẩu"
            name="rePassword"
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu !" },
            ]}
          >
            <Input.Password size="large" placeholder="Nhập lại mật khẩu..." />
          </Form.Item>
        </div>
        <Form.Item
          label="Vai trò"
          name="role"
          rules={[{ required: true, message: "Vui lòng chọn vai trò !" }]}
        >
          <Select
            size="large"
            placeholder="Chọn vai trò"
            allowClear
            className="w-48"
          >
            <Select.Option value="ADMIN">ADMIN</Select.Option>
            <Select.Option value="SUPPORT">SUPPORT</Select.Option>
            <Select.Option value="CLINIC">CLINIC</Select.Option>
          </Select>
        </Form.Item>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="py-2 px-4 rounded-md border-2 hover:opacity-80"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-base text-white rounded-md"
          >
            Tạo tài khoản
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModelAccountAction;
