import React, { useEffect, useState } from "react";
import { Checkbox, Form, Input, message, Modal } from "antd";
import CustumButton from "../CustumButton";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginDoctor } from "@/redux/auth/auth.thunk";
import {
  setDoctorInfo,
  setIsAuthenticatedDoctor,
} from "@/redux/auth/auth.slice";
import { set } from "@/storage/storage";
import { useNavigate } from "react-router-dom";

const ModalAuthDoctor = ({ open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Cookies.get("emailDoctor") && Cookies.get("passwordDoctor")) {
      form.setFieldsValue({
        email: Cookies.get("emailDoctor"),
        password: Cookies.get("passwordDoctor"),
      });
    }
  }, []);

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      setLoading(true);
      const res = await dispatch(loginDoctor(values)).unwrap();
      if (res.success) {
        dispatch(setIsAuthenticatedDoctor(true));
        dispatch(setDoctorInfo(res.data));
        set("ACCESS_TOKEN_DOCTOR", res.data.accessToken);
        if (values.remmeber) {
          Cookies.set("emailDoctor", values.email, { expires: 30 });
          Cookies.set("passwordDoctor", values.password, { expires: 30 });
        }
        message.success(res.message);
        navigate("/doctor-owner");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={500}>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="pt-6"
        requiredMark={false}
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
        <CustumButton
          type="submit"
          variant="primary"
          className="w-full"
          loading={loading}
        >
          Đăng nhập
        </CustumButton>
      </Form>
    </Modal>
  );
};

export default ModalAuthDoctor;
