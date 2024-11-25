import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  InputNumber,
  Switch,
  Divider,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  UploadOutlined,
  MedicineBoxOutlined,
  DollarOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const ManageProfile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock data - thay thế bằng API call
  const doctorData = {
    name: "Bs. Nguyễn Văn A",
    email: "doctor@example.com",
    phone: "0123456789",
    specialty: "Chuyên khoa Tim mạch",
    experience: 10,
    about:
      "Bác sĩ chuyên khoa Tim mạch với hơn 10 năm kinh nghiệm trong điều trị các bệnh về tim mạch và mạch máu...",
    fees: 500000,
    isActive: true,
    avatar: {
      url: "https://cdn.bookingcare.vn/fo/w384/2021/10/07/145448-bs-lan.jpg",
      publicId: "avatar_123",
    },
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("Updated values:", values);
      message.success("Cập nhật thông tin thành công!");
      setIsEditing(false);
    } catch (error) {
      message.error("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="shadow-lg mt-4"
      title={<span className="text-lg font-semibold">Thông tin cá nhân</span>}
      extra={
        !isEditing ? (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Chỉnh Sửa
          </Button>
        ) : null
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={doctorData}
        onFinish={onFinish}
        disabled={!isEditing}
        className="text-gray-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Avatar Section */}
          <div className="md:col-span-2 flex justify-center">
            <div className="text-center">
              <Form.Item
                name="avatar"
                label={
                  <span className="text-base font-medium">Ảnh đại diện</span>
                }
              >
                <Upload
                  listType="picture-circle"
                  maxCount={1}
                  showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon: isEditing,
                  }}
                >
                  {isEditing && (
                    <div className="text-gray-600">
                      <UploadOutlined className="text-xl" />
                      <div className="mt-2">Tải ảnh lên</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </div>
          </div>

          <Divider className="md:col-span-2">Thông tin cơ bản</Divider>

          {/* Basic Information */}
          <Form.Item
            name="name"
            label={<span className="text-base">Họ và Tên</span>}
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input
              prefix={<UserOutlined className="text-blue-500" />}
              placeholder="Bs. Nguyễn Văn A"
              className="py-2"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span className="text-base">Email</span>}
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-blue-500" />}
              placeholder="doctor@example.com"
              className="py-2"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label={<span className="text-base">Số Điện Thoại</span>}
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="text-blue-500" />}
              placeholder="0123456789"
              className="py-2"
            />
          </Form.Item>

          <Form.Item
            name="specialty"
            label={<span className="text-base">Chuyên Khoa</span>}
            rules={[{ required: true, message: "Vui lòng nhập chuyên khoa!" }]}
          >
            <Input
              prefix={<MedicineBoxOutlined className="text-blue-500" />}
              placeholder="Ví dụ: Tim mạch, Nội khoa..."
              className="py-2"
            />
          </Form.Item>

          <Divider className="md:col-span-2">Thông tin chuyên môn</Divider>

          <Form.Item
            name="experience"
            label={<span className="text-base">Số Năm Kinh Nghiệm</span>}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số năm kinh nghiệm!",
              },
            ]}
          >
            <InputNumber
              min={0}
              className="w-full py-1"
              prefix={
                <SafetyCertificateOutlined className="text-blue-500 mr-2" />
              }
            />
          </Form.Item>

          <Form.Item
            name="fees"
            label={<span className="text-base">Phí Tư Vấn (VNĐ)</span>}
            rules={[{ required: true, message: "Vui lòng nhập phí tư vấn!" }]}
          >
            <InputNumber
              min={0}
              step={50000}
              className="w-full py-1"
              prefix={<DollarOutlined className="text-blue-500 mr-2" />}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <div className="md:col-span-2">
            <Form.Item
              name="isActive"
              label={<span className="text-base">Trạng thái</span>}
              valuePropName="checked"
            >
              <Switch className="bg-gray-300" />
            </Form.Item>
          </div>

          <div className="md:col-span-2">
            <Form.Item
              name="about"
              label={<span className="text-base">Giới Thiệu</span>}
              rules={[{ required: true, message: "Vui lòng nhập giới thiệu!" }]}
            >
              <Input.TextArea
                rows={6}
                placeholder="Mô tả về kinh nghiệm và chuyên môn của bạn..."
                className="text-base"
              />
            </Form.Item>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
              <Button
                size="large"
                onClick={() => setIsEditing(false)}
                className="px-8"
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="px-8 bg-blue-500 hover:bg-blue-600"
              >
                Lưu Thay Đổi
              </Button>
            </div>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default ManageProfile;
