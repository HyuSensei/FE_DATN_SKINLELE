import React, { useRef, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  TimePicker,
  Row,
  Col,
  Card,
  message,
  Tag,
} from "antd";
import { IoAdd, IoCloudUpload, IoTrash } from "react-icons/io5";
import moment from "moment";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";

const WEEKDAYS = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];

const CreateClinic = () => {
  const [form] = Form.useForm();
  const [specialties, setSpecialties] = useState([]);
  const [logoImage, setLogoImage] = useState([]);
  const [images, setImages] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleSpecialtyClose = (removedTag) => {
    const newSpecialties = specialties.filter((tag) => tag !== removedTag);
    setSpecialties(newSpecialties);
    form.setFieldsValue({ specialties: newSpecialties });
  };

  const showSpecialtyInput = () => {
    setInputVisible(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSpecialtyInputChange = (e) => {
    setInputValue(e.target.value.trim());
  };

  const handleSpecialtyInputConfirm = () => {
    if (inputValue && !specialties.includes(inputValue)) {
      const newSpecialties = [...specialties, inputValue];
      setSpecialties(newSpecialties);
      form.setFieldsValue({ specialties: newSpecialties });
    }
    setInputVisible(false);
    setInputValue("");
  };

  const isDaySelected = (day, currentIndex, fields) => {
    return fields.some((_, index) => {
      const currentDay = form.getFieldValue([
        "workingHours",
        index,
        "dayOfWeek",
      ]);
      return currentDay === day && index !== currentIndex;
    });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formattedWorkingHours = values.workingHours.map((slot) => ({
        ...slot,
        startTime: dayjs(slot.startTime).format("HH:mm"),
        endTime: dayjs(slot.endTime).format("HH:mm"),
      }));

      const payload = {
        ...values,
        workingHours: formattedWorkingHours,
      };
    } catch (error) {
      console.log(error);
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

      <Card title="Lịch làm việc" className="mb-6 shadow-md">
        <Form.List name="workingHours">
          {(fields, { add, remove }) => (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  className="p-4 border rounded-lg bg-gray-50"
                >
                  <Row gutter={16} align="middle">
                    <Col xs={24} md={7}>
                      <Form.Item
                        label="Ngày trong tuần"
                        name={[field.name, "dayOfWeek"]}
                        rules={[
                          { required: true, message: "Vui lòng chọn ngày" },
                          {
                            validator: (_, value) =>
                              value && isDaySelected(value, index, fields)
                                ? Promise.reject("Ngày này đã được chọn")
                                : Promise.resolve(),
                          },
                        ]}
                      >
                        <Select placeholder="Chọn ngày" size="large">
                          {WEEKDAYS.map((day) => (
                            <Select.Option
                              key={day}
                              value={day}
                              disabled={isDaySelected(day, index, fields)}
                            >
                              {day}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={7}>
                      <Form.Item
                        label="Giờ mở cửa"
                        name={[field.name, "startTime"]}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn giờ mở cửa",
                          },
                          {
                            validator: (_, value) => {
                              const endTime = form.getFieldValue([
                                "workingHours",
                                field.name,
                                "endTime",
                              ]);
                              return !endTime || value <= endTime
                                ? Promise.resolve()
                                : Promise.reject(
                                    "Giờ mở cửa phải trước hoặc bằng giờ đóng cửa"
                                  );
                            },
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

                    <Col xs={24} md={7}>
                      <Form.Item
                        label="Giờ đóng cửa"
                        name={[field.name, "endTime"]}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn giờ đóng cửa",
                          },
                          {
                            validator: (_, value) => {
                              const startTime = form.getFieldValue([
                                "workingHours",
                                field.name,
                                "startTime",
                              ]);
                              return !startTime || value >= startTime
                                ? Promise.resolve()
                                : Promise.reject(
                                    "Giờ đóng cửa phải sau hoặc bằng giờ mở cửa"
                                  );
                            },
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

                    <Col
                      xs={24}
                      md={3}
                      className="flex items-center justify-end"
                    >
                      {fields.length > 1 && (
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => remove(field.name)}
                          >
                            <IoTrash className="text-2xl text-red-400" />
                          </button>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              ))}

              {fields.length < 7 && (
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  className="rounded-lg"
                >
                  <IoAdd className="text-lg inline-block mr-2" />
                  Thêm lịch làm việc
                </Button>
              )}
            </div>
          )}
        </Form.List>
      </Card>

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
            {
              required: true,
              message: "Vui lòng thêm ít nhất 1 chuyên khoa",
            },
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
