import CustomButton from "@/components/CustomButton";
import { Form, Input } from "antd";
import React, { useState } from "react";
import { FaClinicMedical, FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

const ContactForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      form.resetFields();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      className="bg-white rounded-2xl p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          name="name"
          label="Tên phòng khám"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên phòng khám!",
            },
          ]}
        >
          <Input
            prefix={<FaClinicMedical className="text-gray-400" />}
            className="h-12 rounded-lg"
            placeholder="Nhập tên phòng khám..."
          />
        </Form.Item>

        <Form.Item
          name="contactPerson"
          label="Người liên hệ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên người liên hệ!",
            },
          ]}
        >
          <Input
            prefix={<FaUserAlt className="text-gray-400" />}
            className="h-12 rounded-lg"
            placeholder="Nhập tên người liên hệ..."
          />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input
            prefix={<FaEnvelope className="text-gray-400" />}
            className="h-12 rounded-lg"
            placeholder="Nhập email liên hệ..."
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
            {
              pattern: /^[0-9]{10}$/,
              message: "Số điện thoại không hợp lệ!",
            },
          ]}
        >
          <Input
            prefix={<FaPhone className="text-gray-400" />}
            className="h-12 rounded-lg"
            placeholder="Nhập số điện thoại..."
          />
        </Form.Item>
      </div>

      <Form.Item
        name="address"
        label="Địa chỉ phòng khám"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
      >
        <Input
          prefix={<FaMapMarkerAlt className="text-gray-400" />}
          className="h-12 rounded-lg"
          placeholder="Nhập địa chỉ phòng khám..."
        />
      </Form.Item>

      <Form.Item
        name="content"
        label="Nội dung"
        rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
      >
        <Input.TextArea
          className="rounded-lg resize-none"
          rows={4}
          placeholder="Nhập thông tin thêm về phòng khám và mong muốn hợp tác..."
        />
      </Form.Item>

      <div className="flex justify-end">
        <CustomButton type="submit" variant="primary">
          Gửi thông tin
        </CustomButton>
      </div>
    </Form>
  );
};

export default ContactForm;
