import React, { useState } from "react";
import {
  Card,
  TimePicker,
  Switch,
  Button,
  Form,
  Select,
  Alert,
  Empty,
  message,
} from "antd";
import {
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const ManageSchedule = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const daysOfWeek = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ];

  const durations = [15, 30, 45, 60];

  // Convert string time to dayjs object for form initialization
  const convertTimeToDate = (timeStr) => {
    return timeStr ? dayjs(timeStr, "HH:mm") : null;
  };

  const initialValues = {
    schedule: [
      {
        dayOfWeek: "Thứ 2",
        startTime: convertTimeToDate("08:00"),
        endTime: convertTimeToDate("17:00"),
        duration: 30,
        breakTime: {
          start: convertTimeToDate("12:00"),
          end: convertTimeToDate("13:00"),
        },
        isActive: true,
      },
    ],
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Convert dayjs objects back to string format before sending to API
      const formattedSchedule = values.schedule.map((item) => ({
        ...item,
        startTime: item.startTime.format("HH:mm"),
        endTime: item.endTime.format("HH:mm"),
        breakTime: {
          start: item.breakTime.start.format("HH:mm"),
          end: item.breakTime.end.format("HH:mm"),
        },
      }));

      console.log("Formatted schedule:", formattedSchedule);
      message.success("Cập nhật lịch làm việc thành công!");
      setIsEditing(false);
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật lịch làm việc!");
    } finally {
      setLoading(false);
    }
  };

  const workTimeValidation = (_, value) => {
    if (!value) {
      return Promise.reject("Vui lòng chọn thời gian!");
    }
    return Promise.resolve();
  };

  return (
    <div className="mt-4 shadow-lg">
      <Card
        extra={
          !isEditing && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsEditing(true)}
              className="bg-blue-500"
            >
              Chỉnh sửa lịch
            </Button>
          )
        }
        bordered={false}
        className="shadow-sm"
      >
        <Alert
          message="Lưu ý"
          description="Vui lòng thiết lập lịch làm việc cho từng ngày trong tuần. Bạn có thể tắt trạng thái hoạt động cho những ngày không làm việc."
          type="info"
          showIcon
          className="mb-6"
        />

        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onFinish}
          disabled={!isEditing}
        >
          <Form.List name="schedule">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    className="bg-white shadow-sm"
                    bordered={false}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Form.Item
                          label="Ngày làm việc"
                          name={[field.name, "dayOfWeek"]}
                          rules={[
                            { required: true, message: "Vui lòng chọn ngày!" },
                          ]}
                        >
                          <Select placeholder="Chọn ngày">
                            {daysOfWeek.map((day) => (
                              <Option key={day} value={day}>
                                {day}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item label="Thời gian làm việc">
                          <div className="flex gap-2">
                            <Form.Item
                              name={[field.name, "startTime"]}
                              rules={[{ validator: workTimeValidation }]}
                              noStyle
                            >
                              <TimePicker
                                format="HH:mm"
                                placeholder="Bắt đầu"
                                className="flex-1"
                              />
                            </Form.Item>
                            <span className="text-gray-400">-</span>
                            <Form.Item
                              name={[field.name, "endTime"]}
                              rules={[{ validator: workTimeValidation }]}
                              noStyle
                            >
                              <TimePicker
                                format="HH:mm"
                                placeholder="Kết thúc"
                                className="flex-1"
                              />
                            </Form.Item>
                          </div>
                        </Form.Item>
                      </div>

                      <div>
                        <Form.Item label="Thời gian nghỉ">
                          <div className="flex gap-2">
                            <Form.Item
                              name={[field.name, "breakTime", "start"]}
                              rules={[{ validator: workTimeValidation }]}
                              noStyle
                            >
                              <TimePicker
                                format="HH:mm"
                                placeholder="Bắt đầu"
                                className="flex-1"
                              />
                            </Form.Item>
                            <span className="text-gray-400">-</span>
                            <Form.Item
                              name={[field.name, "breakTime", "end"]}
                              rules={[{ validator: workTimeValidation }]}
                              noStyle
                            >
                              <TimePicker
                                format="HH:mm"
                                placeholder="Kết thúc"
                                className="flex-1"
                              />
                            </Form.Item>
                          </div>
                        </Form.Item>

                        <Form.Item
                          label="Thời lượng khám"
                          name={[field.name, "duration"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn thời lượng!",
                            },
                          ]}
                        >
                          <Select placeholder="Chọn thời lượng">
                            {durations.map((duration) => (
                              <Option key={duration} value={duration}>
                                {duration} phút
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>

                      <div className="flex justify-between items-center">
                        <Form.Item
                          label="Trạng thái"
                          name={[field.name, "isActive"]}
                          valuePropName="checked"
                          className="mb-0"
                        >
                          <Switch />
                        </Form.Item>

                        {isEditing && fields.length > 1 && (
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => remove(field.name)}
                          />
                        )}
                      </div>
                    </div>
                  </Card>
                ))}

                {isEditing && fields.length < 7 && (
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm lịch làm việc
                  </Button>
                )}

                {fields.length === 0 && (
                  <Empty description="Chưa có lịch làm việc nào" />
                )}
              </div>
            )}
          </Form.List>

          {isEditing && (
            <div className="flex justify-end mt-6 space-x-4">
              <Button onClick={() => setIsEditing(false)}>Hủy</Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
                className="bg-blue-500"
              >
                Lưu thay đổi
              </Button>
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default ManageSchedule;
