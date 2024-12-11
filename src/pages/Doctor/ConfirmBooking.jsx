import React, { useState } from "react";
import { Form, Input, Select, DatePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModelAuth } from "@/redux/auth/auth.slice";
import { FaUserAlt, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { BsCalendarDate, BsGenderAmbiguous } from "react-icons/bs";
import CustomButton from "@/components/CustomButton";
import locale from "antd/es/date-picker/locale/vi_VN";
import { createBooking } from "@/redux/booking/booking.thunk";
import { useScroll } from "@/components/context/ScrollProvider";

const ConfirmBooking = ({
  selectedTime,
  selectedDate,
  doctor,
  handleClearTime,
}) => {
  const { scrollToTop } = useScroll();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  if (!selectedTime || !selectedDate || !doctor) return null;

  const handleConfirm = async (values) => {
    if (!isAuthenticated) {
      dispatch(setOpenModelAuth(true));
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        date: selectedDate.format("YYYY-MM-DD"),
        ...selectedTime,
        doctor: doctor._id,
        clinic: doctor.clinic._id,
        customer: {
          ...values,
          dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
        },
        price: doctor.fees,
        note: values.note || "",
      };
      const res = await dispatch(createBooking(payload)).unwrap();
      if (res.success) {
        message.success(res.message);
        handleClearTime();
        form.resetFields();
        refetch()
        scrollToTop();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleConfirm}
      >
        <div className="p-4 border-b border-gray-100 bg-blue-50 rounded-t-lg">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h4 className="font-medium text-gray-800">Thời gian đã chọn</h4>
              <p className="text-gray-600">
                {selectedTime.startTime} - {selectedTime.endTime},{" "}
                {selectedDate.format("DD/MM/YYYY")}
              </p>
            </div>
            <CustomButton
              loading={isLoading}
              type="submit"
              form="booking-form"
              variant="primary"
              className="min-w-[140px]"
            >
              Xác nhận lịch
            </CustomButton>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
            <span className="font-medium">⚠️ Lưu ý:</span> Vui lòng điền đầy đủ
            thông tin bên dưới
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input
                prefix={<FaUserAlt className="text-gray-400 mr-2" />}
                placeholder="Nhập họ và tên..."
                className="h-11"
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Số điện thoại không hợp lệ!",
                },
              ]}
            >
              <Input
                prefix={<FaPhone className="text-gray-400 mr-2" />}
                placeholder="Nhập số điện thoại..."
                className="h-11"
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<FaEnvelope className="text-gray-400 mr-2" />}
                placeholder="Nhập email..."
                className="h-11"
              />
            </Form.Item>
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
            >
              <Select
                placeholder="Chọn giới tính"
                suffixIcon={
                  <BsGenderAmbiguous className="text-gray-400" size={16} />
                }
                className="h-11"
                options={[
                  { value: "male", label: "Nam" },
                  { value: "female", label: "Nữ" },
                  { value: "other", label: "Khác" },
                ]}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Ngày sinh"
            name="dateOfBirth"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
          >
            <DatePicker
              locale={locale}
              placeholder="Chọn ngày sinh"
              suffixIcon={
                <BsCalendarDate className="text-gray-400" size={16} />
              }
              className="w-full h-11"
              format="DD/MM/YYYY"
            />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            className="md:col-span-2"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input.TextArea
              prefix={<FaMapMarkerAlt className="text-gray-400 mr-2" />}
              placeholder="Nhập địa chỉ..."
              rows={4}
              className="resize-none"
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ConfirmBooking;
