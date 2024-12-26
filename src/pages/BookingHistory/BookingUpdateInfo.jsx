import CustomButton from "@/components/CustomButton";
import { DatePicker, Form, Input, message, Select } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import moment from "@utils/monentTz";
import React, { useState } from "react";
import { BsCalendarDate, BsGenderAmbiguous } from "react-icons/bs";
import { FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import { IoMdArrowRoundBack, IoMdSave } from "react-icons/io";
import { MdOutlineBookmarks } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateBookingInfo } from "@/redux/booking/booking.thunk";

const BookingUpdateInfo = ({ bookingId, customer, onClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const res = await dispatch(
        updateBookingInfo({ id: bookingId, data: { customer: values } })
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
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={handleSubmit}
      initialValues={{
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        gender: customer.gender,
        dateOfBirth: customer.dateOfBirth
          ? moment(customer.dateOfBirth)
          : undefined,
      }}
    >
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
            prefix={<BsGenderAmbiguous className="text-gray-400" size={16} />}
            className="h-11"
            options={[
              { value: "male", label: "Nam" },
              { value: "female", label: "Nữ" },
              { value: "other", label: "Khác" },
            ]}
          />
        </Form.Item>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <Form.Item
          label="Ngày sinh"
          name="dateOfBirth"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
        >
          <DatePicker
            locale={locale}
            placeholder="Chọn ngày sinh"
            prefix={<BsCalendarDate className="text-gray-400" size={16} />}
            className="h-11 w-full"
            format="DD/MM/YYYY"
          />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input
            prefix={<FaMapMarkerAlt className="text-gray-400 mr-2" />}
            placeholder="Nhập địa chỉ..."
            className="h-11"
          />
        </Form.Item>
      </div>
      <Form.Item label="Ghi chú" name="note">
        <Input.TextArea
          prefix={<MdOutlineBookmarks className="text-gray-400 mr-2" />}
          placeholder="Nhập ghi chú..."
          rows={4}
          className="resize-none"
        />
      </Form.Item>
      <div className="flex justify-end gap-4">
        <CustomButton
          icon={<IoMdArrowRoundBack />}
          onClick={() => onClose(false)}
        >
          Hủy
        </CustomButton>
        <CustomButton
          icon={<IoMdSave />}
          loading={isLoading}
          type="submit"
          variant="primary"
        >
          Lưu thông tin
        </CustomButton>
      </div>
    </Form>
  );
};

export default BookingUpdateInfo;
