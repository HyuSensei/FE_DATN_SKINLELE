import React, { useEffect, useState } from "react";
import { Checkbox, Form, Input, message, Modal } from "antd";
import CustomButton from "../CustomButton";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginDoctor } from "@/redux/auth/auth.thunk";
import { setIsAuthenticatedDoctor } from "@/redux/auth/auth.slice";
import { set } from "@/storage/storage";

const ModalAuthDoctor = ({ open, onClose }) => {
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
      setLoading(true);
      const res = await dispatch(loginDoctor(values)).unwrap();
      if (res.success) {
        set("ACCESS_TOKEN_DOCTOR", res.data.accessToken);
        if (values.remmeber) {
          Cookies.set("emailDoctor", values.email, { expires: 30 });
          Cookies.set("passwordDoctor", values.password, { expires: 30 });
        }
        dispatch(setIsAuthenticatedDoctor(true));
        message.success(res.message);
        window.location.reload();
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
        <CustomButton
          type="submit"
          variant="primary"
          className="w-full"
          loading={loading}
        >
          Đăng nhập
        </CustomButton>
      </Form>
    </Modal>
  );
};

export default ModalAuthDoctor;
