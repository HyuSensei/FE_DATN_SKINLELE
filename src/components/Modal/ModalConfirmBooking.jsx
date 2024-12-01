import React from "react";
import { Modal, Form, Input, DatePicker, Select, Divider } from "antd";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
} from "react-icons/io5";

const { TextArea } = Input;
const { Option } = Select;

const ModalConfirmBooking = ({ open, onClose, bookingData }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {};

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <div className="text-lg font-bold uppercase text-center">
          Xác nhận đặt lịch khám
        </div>
      }
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={bookingData}
        className="mt-4"
      >
        <div className="bg-indigo-50/30 p-4 rounded-xl border border-indigo-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-indigo-100/50">
              <div className="w-10 h-10 rounded-full bg-indigo-100/50 flex items-center justify-center">
                <IoCalendarOutline className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Ngày khám</p>
                <p className="font-semibold text-gray-800">
                  {bookingData?.date || "24/11/2024"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-indigo-100/50">
              <div className="w-10 h-10 rounded-full bg-indigo-100/50 flex items-center justify-center">
                <IoTimeOutline className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Giờ khám</p>
                <p className="font-semibold text-gray-800">
                  {bookingData?.time || "09:30"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Divider orientation="left" className="text-gray-600 font-medium">
          Thông tin bệnh nhân
        </Divider>
        {/* Form Fields */}
        <div className="space-y-4">
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input
              prefix={<IoPersonOutline className="text-gray-400" />}
              placeholder="Họ và tên"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input
                prefix={<IoCallOutline className="text-gray-400" />}
                placeholder="Số điện thoại"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input
                prefix={<IoMailOutline className="text-gray-400" />}
                placeholder="Email"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
            >
              <Select
                placeholder="Giới tính"
                size="large"
                className="w-full rounded-lg"
              >
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
                <Option value="other">Khác</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
            >
              <DatePicker
                placeholder="Ngày sinh"
                size="large"
                className="w-full rounded-lg"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input
              prefix={<IoLocationOutline className="text-gray-400" />}
              placeholder="Địa chỉ"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item label="Ghi chú" name="note">
            <TextArea
              placeholder="Ghi chú (không bắt buộc)"
              rows={4}
              className="rounded-lg resize-none"
            />
          </Form.Item>
        </div>
        <div className="mt-4 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors mr-3"
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            Xác nhận đặt lịch
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalConfirmBooking;
