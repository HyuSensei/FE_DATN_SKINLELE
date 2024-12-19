import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
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
  deleteFile,
  UPLOAD_SKINLELE_CLINIC_PRESET,
  uploadFile,
} from "@helpers/uploadCloudinary";
import { useDispatch, useSelector } from "react-redux";
import SkinLeLeEditor from "@/components/SkinLeLeEditor";
import CustomButton from "@/components/CustomButton";
import { updateDoctorInfor } from "@/redux/doctor/doctor.thunk";
import { useScroll } from "@/components/context/ScrollProvider";
import { DURATION_OPTIONS } from "@/const/dataDefault";
import { setDoctorInfo } from "@/redux/auth/auth.slice";

const EditInfor = ({ setIsEdit }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState([]);
  const [loading, setLoading] = useState(false);
  const { doctorInfo } = useSelector((state) => state.auth);
  const { clinic = {} } = doctorInfo;
  const { scrollToTop } = useScroll()

  useEffect(() => {
    if (doctorInfo) {
      form.setFieldsValue({
        name: doctorInfo.name,
        email: doctorInfo.email,
        avatar: {
          url: doctorInfo.avatar.url,
          publicId: doctorInfo.avatar.publicId,
        },
        duration: doctorInfo.duration,
        about: doctorInfo.about,
        fees: doctorInfo.fees,
        specialty: doctorInfo.specialty,
        phone: doctorInfo.phone,
        experience: doctorInfo.experience,
      });
      setAvatar([
        { url: doctorInfo.avatar.url, publicId: doctorInfo.avatar.publicId },
      ]);
    }
  }, [doctorInfo, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let payload = {};

      if (avatar[0]?.originFileObj) {
        const result = await uploadFile({
          file: avatar[0].originFileObj,
          type: UPLOAD_SKINLELE_CLINIC_PRESET,
        });
        await deleteFile(doctorInfo.avatar.publicId);
        payload = {
          ...values,
          avatar: { url: result.secure_url, publicId: result.public_id },
          isAdmin: false
        };
      } else {
        payload = { ...values };
      }

      const res = await dispatch(
        updateDoctorInfor({ id: doctorInfo._id, data: payload })
      ).unwrap();

      if (res.success) {
        dispatch(setDoctorInfo({ ...res.data, clinic: doctorInfo.clinic }))
        message.success(res.message);
        scrollToTop()
        setIsEdit(false)
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
      initialValues={{
        about: doctorInfo.about,
      }}
    >
      {/* Basic Info */}
      <Card title="Thông tin cơ bản" className="mb-6 shadow-md">
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
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input className="rounded-lg" size="large" />
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
              <Input className="rounded-lg" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="password"
              label="Mật khẩu hiện tại"
              dependencies={["newPassword"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const newPassword = getFieldValue("newPassword");
                    if (newPassword && !value) {
                      return Promise.reject("Vui lòng nhập mật khẩu hiện tại");
                    }
                    if (value && value.length < 6) {
                      return Promise.reject("Mật khẩu phải có ít nhất 6 ký tự");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password
                className="rounded-lg"
                size="large"
                placeholder="Nhập mật khẩu hiện tại"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="newPassword"
              label="Mật khẩu mới"
              dependencies={["password"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const currentPassword = getFieldValue("password");

                    if (!value && !currentPassword) {
                      return Promise.resolve();
                    }

                    if (value && value.length < 6) {
                      return Promise.reject(
                        "Mật khẩu mới phải có ít nhất 6 ký tự"
                      );
                    }

                    if (value && value === currentPassword) {
                      return Promise.reject(
                        "Mật khẩu mới không được trùng với mật khẩu hiện tại"
                      );
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password
                className="rounded-lg"
                size="large"
                placeholder="Nhập mật khẩu mới"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input className="rounded-lg" size="large" />
        </Form.Item>
      </Card>

      {/* Professional Info */}
      <Card title="Thông tin chuyên môn" className="mb-6 shadow-md">
        <Row gutter={16}>
          <Col xs={24} md={6}>
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
                {clinic && clinic.specialties &&
                  clinic.specialties.length > 0 &&
                  clinic.specialties.map((item, index) => (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item
              name="experience"
              label="Số năm kinh nghiệm"
              rules={[
                { required: true, message: "Vui lòng nhập số năm kinh nghiệm" },
              ]}
            >
              <InputNumber min={0} className="w-full rounded-lg" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item
              name="fees"
              label="Phí khám"
              rules={[{ required: true, message: "Vui lòng nhập phí khám" }]}
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
          <Col xs={24} md={6}>
            <Form.Item
              name="duration"
              label="Thời gian khám"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian khám",
                },
              ]}
            >
              <Select
                value={doctorInfo.duration}
                size="large"
                options={DURATION_OPTIONS}
                placeholder="Chọn thời gian khám"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="about"
          label="Giới thiệu"
          rules={[{ required: true, message: "Vui lòng nhập giới thiệu" }]}
          trigger="onModelChange"
          validateTrigger="onModelChange"
        >
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue, setFieldsValue }) => (
              <SkinLeLeEditor
                model={getFieldValue("about" || "")}
                onChange={(value) => setFieldsValue({ about: value })}
              />
            )}
          </Form.Item>
        </Form.Item>
      </Card>

      <div className="flex items-center justify-end gap-2">
        <CustomButton variant="default" onClick={() => setIsEdit(false)}>Xong</CustomButton>
        <CustomButton loading={loading} type="submit" variant="primary">
          Cập nhật thông tin
        </CustomButton>
      </div>
    </Form>
  );
};

export default EditInfor;
