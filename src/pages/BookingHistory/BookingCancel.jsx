import React, { useState } from "react";
import { Form, Radio, Input, Modal, message } from "antd";
import CustomButton from "@/components/CustomButton";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import moment from "@utils/monentTz";
import { useDispatch } from "react-redux";
import { updateStatusBooking } from "@/redux/booking/booking.thunk";

const BookingCancel = ({ open, booking, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const cancelReasons = [
    "Thay đổi lịch trình cá nhân",
    "Đã tìm được bác sĩ da liễu khác",
    "Không thể đến đúng giờ hẹn",
    "Chi phí điều trị không phù hợp",
    "Muốn đổi sang phòng khám da liễu khác",
    "Vấn đề về phương tiện đi lại",
    "Muốn tham khảo thêm ý kiến bác sĩ khác",
    "Khác",
  ];

  const handleFinish = async (values) => {
    try {
      setIsLoading(true);
      const reason =
        values.reason === "Khác" ? values.customReason : values.reason;
      const res = await dispatch(
        updateStatusBooking({
          id: booking._id,
          data: {
            status: "cancelled",
            cancelReason: reason,
            model: "User",
          },
        })
      ).unwrap();
      if (res.success) {
        message.success(res.message);
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
      title="Xác nhận hủy lịch khám"
      open={open}
      onCancel={() => onClose(false)}
      footer={null}
      className="max-w-2xl"
    >
      <div className="py-4 mt-4">
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-700 mb-2">
            Thông tin lịch khám:
          </h3>
          <p className="text-sm text-blue-600">
            Bác sĩ: {booking?.doctor?.name}
          </p>
          <p className="text-sm text-blue-600">
            Thời gian: {booking?.startTime} -{" "}
            {moment(booking.date).format("DD MMMM, YYYY")}
          </p>
        </div>

        <Form
          form={form}
          onFinish={handleFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="reason"
            label="Vui lòng chọn lý do hủy:"
            rules={[{ required: true, message: "Vui lòng chọn lý do hủy" }]}
          >
            <Radio.Group className="flex flex-col gap-3">
              {cancelReasons.map((reason) => (
                <Radio key={reason} value={reason} className="text-gray-700">
                  {reason}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prev, curr) => prev?.reason !== curr?.reason}
          >
            {({ getFieldValue }) =>
              getFieldValue("reason") === "Khác" && (
                <Form.Item
                  name="customReason"
                  rules={[
                    { required: true, message: "Vui lòng nhập lý do hủy" },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Nhập lý do hủy chi tiết..."
                    className="resize-none"
                  />
                </Form.Item>
              )
            }
          </Form.Item>

          <div className="flex justify-end gap-4 mt-6">
            <CustomButton
              onClick={() => onClose(false)}
              icon={<IoMdArrowRoundBack />}
            >
              Quay lại
            </CustomButton>
            <CustomButton
              type="submit"
              variant="danger"
              loading={isLoading}
              icon={<MdOutlineCancel />}
            >
              Xác nhận hủy
            </CustomButton>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default BookingCancel;
