import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  TimePicker,
  Row,
  Col,
  Card,
  Checkbox,
  Tag,
  message,
} from "antd";
import { IoAdd, IoCloudUpload } from "react-icons/io5";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import {
  UPLOAD_SKINLELE_CLINIC_PRESET,
  uploadFile,
} from "../../helpers/uploadCloudinary";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createClinicByAdmin } from "../../redux/clinic/clinic.thunk";

const WEEKDAYS = [
  { label: "Thứ 2", value: "Thứ 2" },
  { label: "Thứ 3", value: "Thứ 3" },
  { label: "Thứ 4", value: "Thứ 4" },
  { label: "Thứ 5", value: "Thứ 5" },
  { label: "Thứ 6", value: "Thứ 6" },
  { label: "Thứ 7", value: "Thứ 7" },
  { label: "Chủ nhật", value: "Chủ nhật" },
];

const CreateClinic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [specialties, setSpecialties] = useState([]);
  const [logoImage, setLogoImage] = useState([]);
  const [images, setImages] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const initialWorkingHours = WEEKDAYS.reduce((acc, day) => {
      acc[day.value] = {
        startTime: dayjs("08:00", "HH:mm"),
        endTime: dayjs("17:00", "HH:mm"),
        isClosed: false,
      };
      return acc;
    }, {});

    form.setFieldsValue({
      workingHours: initialWorkingHours,
    });
  }, []);

  const handleSpecialtyClose = (removedTag) => {
    const newSpecialties = specialties.filter((tag) => tag !== removedTag);
    setSpecialties(newSpecialties);
    form.setFieldsValue({ specialties: newSpecialties });
  };

  const showSpecialtyInput = () => {
    setInputVisible(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSpecialtyInputChange = (e) => setInputValue(e.target.value);

  const handleSpecialtyInputConfirm = () => {
    if (inputValue && !specialties.includes(inputValue)) {
      const newSpecialties = [...specialties, inputValue];
      setSpecialties(newSpecialties);
      form.setFieldsValue({ specialties: newSpecialties });
    }
    setInputVisible(false);
    setInputValue("");
  };

  const validateTimeRange = (rule, value, callback, dayValue, field) => {
    const dayData = form.getFieldValue(["workingHours", dayValue]) || {};
    const isClosed = dayData.isClosed;

    if (isClosed) {
      return Promise.resolve();
    }

    if (!value) {
      return Promise.reject(
        new Error(
          `Vui lòng chọn ${
            field === "startTime" ? "giờ mở cửa" : "giờ đóng cửa"
          }`
        )
      );
    }

    if (field === "startTime" && dayData.endTime) {
      if (value.isAfter(dayData.endTime)) {
        return Promise.reject(new Error("Giờ mở cửa phải trước giờ đóng cửa"));
      }
    }

    if (field === "endTime" && dayData.startTime) {
      if (value.isBefore(dayData.startTime)) {
        return Promise.reject(new Error("Giờ đóng cửa phải sau giờ mở cửa"));
      }
    }

    return Promise.resolve();
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const uploadLogoImage =
        logoImage && logoImage[0].originFileObj
          ? await uploadFile({
              file: logoImage[0].originFileObj,
              type: UPLOAD_SKINLELE_CLINIC_PRESET,
            })
          : null;
      const uploadedImages = await Promise.all(
        images.map(async (file) => {
          if (file.originFileObj) {
            const result = await uploadFile({
              file: file.originFileObj,
              type: UPLOAD_SKINLELE_CLINIC_PRESET,
            });
            if (result && result.secure_url && result.public_id) {
              return { url: result.secure_url, publicId: result.public_id };
            }
          }
          return null;
        })
      );

      const workingHours = WEEKDAYS.map((day) => {
        const dayData = values.workingHours?.[day.value] || {};
        return {
          dayOfWeek: day.value,
          isOpen: !dayData.isClosed,
          startTime: dayData.startTime
            ? dayjs(dayData.startTime).format("HH:mm")
            : "08:00",
          endTime: dayData.endTime
            ? dayjs(dayData.endTime).format("HH:mm")
            : "17:00",
        };
      });

      const payload = {
        ...values,
        workingHours,
        logo: {
          url: uploadLogoImage.secure_url,
          publicId: uploadLogoImage.public_id,
        },
        images: uploadedImages.map((img) => ({
          url: img.url,
          publicId: img.publicId,
        })),
      };
      const res = await dispatch(createClinicByAdmin(payload)).unwrap();
      if (res.success) {
        message.success(res.message);
        navigate("/admin/clinics");
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
      {/* Basic Info Card - Same as before */}
      <Card title="Thông tin cơ bản" className="mb-6 shadow-md">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="Tên phòng khám"
              rules={[
                { required: true, message: "Vui lòng nhập tên phòng khám" },
              ]}
            >
              <Input
                placeholder="VD: Phòng khám Da liễu"
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
        </Row>

        <Row gutter={16}>
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
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <Input
                placeholder="Số nhà, đường, phường/xã..."
                className="rounded-lg"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Working Hours Card - Updated with validation */}
      <Card title="Lịch làm việc" className="mb-6 shadow-md">
        {WEEKDAYS.map((day) => (
          <div
            key={day.value}
            className="mb-4 p-4 border rounded-lg bg-gray-50"
          >
            <Form.Item noStyle>
              <Row gutter={16} align="middle">
                <Col xs={24} md={6} className="mb-4 md:mb-0">
                  <Form.Item
                    name={["workingHours", day.value, "isClosed"]}
                    valuePropName="checked"
                  >
                    <Checkbox className="font-medium">
                      {day.label} (Ngày nghỉ)
                    </Checkbox>
                  </Form.Item>
                </Col>

                <Col xs={24} md={9}>
                  <Form.Item
                    label="Giờ mở cửa"
                    name={["workingHours", day.value, "startTime"]}
                    rules={[
                      {
                        validator: (rule, value) =>
                          validateTimeRange(
                            rule,
                            value,
                            null,
                            day.value,
                            "startTime"
                          ),
                      },
                    ]}
                  >
                    <TimePicker
                      locale={locale}
                      format="HH:mm"
                      size="large"
                      className="w-full"
                      minuteStep={15}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={9}>
                  <Form.Item
                    label="Giờ đóng cửa"
                    name={["workingHours", day.value, "endTime"]}
                    rules={[
                      {
                        validator: (rule, value) =>
                          validateTimeRange(
                            rule,
                            value,
                            null,
                            day.value,
                            "endTime"
                          ),
                      },
                    ]}
                  >
                    <TimePicker
                      locale={locale}
                      format="HH:mm"
                      size="large"
                      className="w-full"
                      minuteStep={15}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </div>
        ))}
      </Card>

      {/* Images Card - Same as before */}
      <Card title="Hình ảnh" className="mb-6 shadow-md">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="logo"
              label="Logo phòng khám"
              rules={[{ required: true, message: "Vui lòng tải lên logo" }]}
            >
              <Upload
                accept="image/*"
                onChange={({ fileList }) => setLogoImage(fileList)}
                fileList={logoImage}
                listType="picture-card"
                beforeUpload={() => false}
                maxCount={1}
              >
                {logoImage.length === 0 && (
                  <div className="flex flex-col items-center">
                    <IoCloudUpload className="w-6 h-6" />
                    <div className="mt-2">Tải logo</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="images"
              label="Ảnh phòng khám"
              rules={[
                { required: true, message: "Vui lòng tải lên ít nhất 1 ảnh" },
              ]}
            >
              <Upload
                accept="image/*"
                onChange={({ fileList }) => setImages(fileList)}
                fileList={images}
                listType="picture-card"
                beforeUpload={() => false}
                maxCount={4}
                multiple
              >
                {images.length < 4 && (
                  <div className="flex flex-col items-center">
                    <IoCloudUpload className="w-6 h-6" />
                    <div className="mt-2">Tải ảnh</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Professional Info Card - Same as before */}
      <Card title="Thông tin chuyên môn" className="mb-6 shadow-md">
        <Form.Item
          name="description"
          label="Mô tả phòng khám"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Giới thiệu về phòng khám, trang thiết bị, đội ngũ..."
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="specialties"
          label="Chuyên khoa"
          rules={[
            { required: true, message: "Vui lòng thêm ít nhất 1 chuyên khoa" },
          ]}
        >
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <Tag
                  key={specialty}
                  closable
                  onClose={() => handleSpecialtyClose(specialty)}
                  className="py-1 px-3 rounded-full bg-blue-50 text-blue-600 border-blue-200"
                >
                  {specialty}
                </Tag>
              ))}
            </div>

            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="middle"
                className="w-full max-w-xs rounded-full"
                value={inputValue}
                onChange={handleSpecialtyInputChange}
                onBlur={handleSpecialtyInputConfirm}
                onPressEnter={handleSpecialtyInputConfirm}
                placeholder="Nhập tên chuyên khoa..."
              />
            ) : (
              <Tag
                onClick={showSpecialtyInput}
                className="py-2 px-4 rounded-full border-2 border-dashed border-blue-300 text-blue-600 hover:border-blue-400 cursor-pointer"
              >
                <IoAdd className="inline w-4 h-4 mr-2" />
                Thêm chuyên khoa
              </Tag>
            )}
          </div>
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
          Tạo phòng khám
        </Button>
      </div>
    </Form>
  );
};

export default CreateClinic;
