import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { sendOtp } from "@redux/auth/auth.thunk";
import { setEmailVerify } from "@redux/auth/auth.slice";
import CustomButton from "../CustomButton";

const SendOtp = ({ setStep, setIsReset }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const { email } = values;

    try {
      const res = await dispatch(sendOtp({ email })).unwrap();

      if (res.success) {
        message.success(res.message);
        dispatch(setEmailVerify(email));
        setIsReset(true);
        setStep("verify");
      }
    } catch (error) {
      message.error("Gửi OTP thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-xl font-bold text-center">GỬI MÃ OTP</div>
      <Form
        name="sendOtpForm"
        layout="vertical"
        requiredMark={false}
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email của bạn" size="large" />
        </Form.Item>
        <CustomButton
          type="submit"
          className="w-full font-bold bg-gradient-to-r from-yellow-300 via-orange-600 to-purple-800 text-white hover:bg-sky-800 focus:outline-none"
        >
          Gửi OTP
        </CustomButton>
      </Form>
    </div>
  );
};

export default SendOtp;
