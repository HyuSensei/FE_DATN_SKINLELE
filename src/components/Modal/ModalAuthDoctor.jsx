import React from "react";
import { Checkbox, Form, Input, Modal } from "antd";

const ModalAuthDoctor = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Modal open={open} onCancel={onClose} footer={null} width={500}>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="pt-6"
      >
        <div className="text-center uppercase font-bold">Đăng nhập</div>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email !" },
            { type: "email", message: "Vui lòng nhập đúng email !" },
          ]}
        >
          <Input size="large" placeholder="Email..." />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password size="large" placeholder="Mật khẩu..." />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox className="pr-2">Ghi nhớ đăng nhập</Checkbox>
        </Form.Item>
        <Form.Item>
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-[#6c9bbf] via-[#6c9bbf] to-[#58b8d8] w-full py-3 rounded-full text-base font-medium text-white"
          >
            Đăng nhập
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAuthDoctor;
