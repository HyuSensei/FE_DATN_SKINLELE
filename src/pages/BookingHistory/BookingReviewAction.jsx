import CustomButton from "@/components/CustomButton";
import { createReviewDoctor } from "@/redux/doctor/doctor.thunk";
import { Avatar, Form, Input, message, Modal, Rate } from "antd";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const BookingReviewAction = ({ open, onClose, booking }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleReviewDoctor = async (values) => {
    try {
      if (!isAuthenticated) return;

      setIsLoading(true);
      const res = await dispatch(
        createReviewDoctor({
          booking: booking?._id,
          doctor: booking?.doctor._id,
          ...values,
        })
      ).unwrap();

      if (res.success) {
        message.success(res.message);
        form.resetFields();
        onClose(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Đánh giá bác sĩ"
      open={open}
      onCancel={() => onClose(false)}
      footer={null}
    >
      <Form
        onFinish={handleReviewDoctor}
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <div className="flex items-center gap-4 py-2">
          <Avatar
            src={booking.doctor.avatar?.url}
            size={64}
            className="flex-shrink-0 border-2 border-sky-400"
          />
          <div>
            <h3 className="text-lg font-semibold mb-1">
              {booking.doctor.name}
            </h3>
            <p className="text-gray-600">
              Chuyên khoa: {booking.doctor.specialty}
            </p>
          </div>
        </div>
        <Form.Item
          name="rate"
          className="flex items-center justify-center"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn mức độ hài lòng của bạn",
            },
          ]}
        >
          <Rate className="text-2xl" />
        </Form.Item>

        <Form.Item
          name="content"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung đánh giá" },
            { max: 250, message: "Nội dung không quá 250 ký tự" },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder={
              isAuthenticated
                ? "Nhập nộp dung đánh giá..."
                : "Vui lòng đăng nhập để gửi đánh giá !"
            }
          />
        </Form.Item>
        <div className="flex items-center justify-end">
          <CustomButton
            loading={isLoading}
            disabled={!isAuthenticated || isLoading}
            type="submit"
            icon={<IoIosSend />}
            variant="dark"
          >
            Gửi đánh giá
          </CustomButton>
        </div>
      </Form>
    </Modal>
  );
};

export default BookingReviewAction;
