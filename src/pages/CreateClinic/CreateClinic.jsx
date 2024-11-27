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
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { message, Tag } from "antd";

const weekdays = [
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
  const [tags, setTags] = useState([]);
  const [logoImage, setLogoImage] = useState(null);
  const [images, setImages] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const handleCloseTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    form.setFieldsValue({ specialties: newTags });
  };

  const showInput = () => setInputVisible(true);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
      form.setFieldsValue({ specialties: newTags });
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="py-6 mx-auto">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Card title="Thông tin cơ bản" className="shadow-md mb-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Form.Item
              name="name"
              label="Tên phòng khám"
              rules={[
                { required: true, message: "Vui lòng nhập tên phòng khám" },
              ]}
            >
              <Input
                size="large"
                placeholder="Nhập tên phòng khám"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input
                size="large"
                placeholder="Nhập số điện thoại"
                className="rounded-md"
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <Input
                size="large"
                placeholder="Nhập địa chỉ"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Vui lòng nhập email hợp lệ" },
              ]}
            >
              <Input
                size="large"
                placeholder="Nhập email"
                className="rounded-md"
              />
            </Form.Item>
          </div>
        </Card>

        <Card title="Giờ làm việc" className="shadow-md mb-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: "Vui lòng chọn ngày bắt đầu",
                  },
                ]}
                name={["workingHours", "startDay"]}
                label="Ngày bắt đầu"
              >
                <Select placeholder="Chọn ngày" size="large">
                  {weekdays.map((day) => (
                    <Select.Option key={day} value={day}>
                      {day}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: "Vui lòng chọn ngày kết",
                  },
                ]}
                name={["workingHours", "endDay"]}
                label="Ngày kết thúc"
              >
                <Select placeholder="Chọn ngày" size="large">
                  {weekdays.map((day) => (
                    <Select.Option key={day} value={day}>
                      {day}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: "Vui lòng chọn giờ bắt đầu",
                  },
                ]}
                name={["workingHours", "startTime"]}
                label="Giờ bắt đầu"
              >
                <TimePicker format="HH:mm" size="large" className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: "Vui lòng chọn giờ kết thúc",
                  },
                ]}
                name={["workingHours", "endTime"]}
                label="Giờ kết thúc"
              >
                <TimePicker format="HH:mm" size="large" className="w-full" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Ảnh hiển thị" className="shadow-md mb-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Form.Item
              name="logo"
              label="Logo phòng khám"
              rules={[
                {
                  required: "Vui lòng chọn logo phòng khám",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                maxCount={1}
              >
                <div>
                  <UploadOutlined />
                  <div className="mt-2">Tải lên</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item
              name="images"
              label="Ảnh hiển thị"
              rules={[
                {
                  required: "Vui lòng chọn ảnh hiển thị",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                maxCount={4}
              >
                <div>
                  <UploadOutlined />
                  <div className="mt-2">Tải lên</div>
                </div>
              </Upload>
            </Form.Item>
          </div>
        </Card>
        <Card title="Thông tin chuyên môn" className="shadow-md mb-4">
          <Form.Item
            name="description"
            label="Mô tả phòng khám"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Nhập mô tả"
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: "Vui lòng chọn ảnh hiển thị",
              },
            ]}
            name="specialties"
            label={<div className="dark:text-primary">Chuyên khoa</div>}
          >
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => handleCloseTag(tag)}
                  className="text-sm font-medium bg-blue-50 text-blue-600 rounded-full px-3 py-1 border border-blue-200"
                >
                  {tag}
                </Tag>
              ))}
            </div>
            {inputVisible ? (
              <Input
                placeholder="Chuyên khoa..."
                ref={inputRef}
                type="text"
                size="large"
                className="w-full rounded-full"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag
                onClick={showInput}
                className="text-sm font-medium border-dashed border-2 border-blue-300 text-blue-500 hover:text-blue-600 hover:border-blue-400 rounded-full px-4 py-3 cursor-pointer dark:bg-slate-700"
              >
                <PlusOutlined /> Thêm chuyên khoa
              </Tag>
            )}
          </Form.Item>
        </Card>
        <div className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none rounded-full"
          >
            Tạo phòng khám
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateClinic;
