import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Row,
  Col,
  Card,
  InputNumber,
  Select,
  message,
} from "antd";
import { IoCloudUpload } from "react-icons/io5";
import {
  UPLOAD_SKINLELE_CLINIC_PRESET,
  uploadFile,
} from "@helpers/uploadCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createDoctorByAdmin } from "@redux/doctor/doctor.thunk";

const CreateDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState([]);
  const [loading, setLoading] = useState(false);
  const { clinic } = useSelector((state) => state.auth.adminInfo);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const uploadAvatar = avatar[0]?.originFileObj
        ? await uploadFile({
            file: avatar[0].originFileObj,
            type: UPLOAD_SKINLELE_CLINIC_PRESET,
          })
        : null;

      const payload = {
        ...values,
        avatar: {
          url: uploadAvatar.secure_url,
          publicId: uploadAvatar.public_id,
        },
      };
      const res = await dispatch(createDoctorByAdmin(payload)).unwrap();
      if (res.success) {
        message.success(res.message);
        navigate("/admin/doctors");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="mt-4"
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
    >
      {/* Basic Info */}
      <Card title="Thông tin cơ bản" className="mb-6 shadow-md">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input
                placeholder="VD: Nguyễn Văn A"
                className="rounded-lg"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              ]}
            >
              <Input
                placeholder="0123456789"
                className="rounded-lg"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input
                placeholder="email@example.com"
                className="rounded-lg"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
              ]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu"
                className="rounded-lg"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Professional Info */}
      <Card title="Thông tin chuyên môn" className="mb-6 shadow-md">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="specialty"
              label="Chuyên khoa"
              rules={[{ required: true, message: "Vui lòng chọn chuyên khoa" }]}
            >
              <Select
                size="large"
                className="rounded-lg"
                placeholder="Chọn chuyên khoa"
              >
                {clinic &&
                  clinic.specialties.length > 0 &&
                  clinic.specialties.map((item, index) => (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="experience"
              label="Số năm kinh nghiệm"
              rules={[
                { required: true, message: "Vui lòng nhập số năm kinh nghiệm" },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="VD: 5"
                className="w-full rounded-lg"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="fees"
              label="Phí tư vấn (VNĐ)"
              rules={[{ required: true, message: "Vui lòng nhập phí tư vấn" }]}
            >
              <InputNumber
                min={0}
                step={10000}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                className="w-full rounded-lg"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="isIndependent"
              label="Loại bác sĩ"
              rules={[{ required: true, message: "Vui lòng chọn loại bác sĩ" }]}
            >
              <Select
                size="large"
                className="rounded-lg"
                placeholder="Chọn loại bác sĩ"
                options={[
                  { value: false, label: "Bác sĩ phòng khám" },
                  { value: true, label: "Bác sĩ độc lập" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="about"
          label="Giới thiệu"
          rules={[{ required: true, message: "Vui lòng nhập giới thiệu" }]}
        >
          <Input.TextArea
            rows={8}
            placeholder="Giới thiệu về kinh nghiệm, chuyên môn..."
            className="rounded-lg"
          />
        </Form.Item>
      </Card>

      {/* Avatar Upload */}
      <Card title="Hình ảnh" className="mb-6 shadow-md">
        <Form.Item
          name="avatar"
          label="Ảnh đại diện"
          rules={[{ required: true, message: "Vui lòng tải lên ảnh đại diện" }]}
        >
          <Upload
            accept="image/*"
            onChange={({ fileList }) => setAvatar(fileList)}
            fileList={avatar}
            listType="picture-card"
            beforeUpload={() => false}
            maxCount={1}
          >
            {avatar.length === 0 && (
              <div className="flex flex-col items-center">
                <IoCloudUpload className="w-6 h-6" />
                <div className="mt-2">Tải ảnh</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Card>

      <div className="w-full">
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none rounded-full"
        >
          Tạo ngay
        </Button>
      </div>
    </Form>
  );
};

export default CreateDoctor;
