import React, { useEffect, useState } from "react";
import {
  Form,
  TimePicker,
  Card,
  Row,
  Col,
  Checkbox,
  Button,
  message,
} from "antd";
import { MdSave } from "react-icons/md";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { updateClinicByOwner } from "@/redux/clinic/clinic.thunk";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useScroll } from "@/components/context/ScrollProvider";

const WEEKDAYS = [
  { label: "Thứ 2", value: "Thứ 2" },
  { label: "Thứ 3", value: "Thứ 3" },
  { label: "Thứ 4", value: "Thứ 4" },
  { label: "Thứ 5", value: "Thứ 5" },
  { label: "Thứ 6", value: "Thứ 6" },
  { label: "Thứ 7", value: "Thứ 7" },
  { label: "Chủ nhật", value: "Chủ nhật" },
];

const EditSchedule = ({ workingHours = [], handleChangeEdit, refetch }) => {
  const { scrollToTop } = useScroll();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialWorkingHours = workingHours.reduce((acc, day) => {
      acc[day.dayOfWeek] = {
        startTime: day.isOpen ? dayjs(day.startTime, "HH:mm") : null,
        endTime: day.isOpen ? dayjs(day.endTime, "HH:mm") : null,
        isClosed: !day.isOpen,
      };
      return acc;
    }, {});

    form.setFieldsValue({
      workingHours: initialWorkingHours,
    });
  }, [workingHours]);

  const validateTimeRange = (rule, value, callback, dayValue, field) => {
    const dayData = form.getFieldValue(["workingHours", dayValue]) || {};
    const isClosed = dayData.isClosed;

    if (isClosed) return Promise.resolve();

    if (!value) {
      return Promise.reject(
        `Vui lòng chọn ${field === "startTime" ? "giờ mở cửa" : "giờ đóng cửa"}`
      );
    }

    if (field === "startTime" && dayData.endTime) {
      if (value.isAfter(dayData.endTime)) {
        return Promise.reject("Giờ mở cửa phải trước giờ đóng cửa");
      }
    }

    if (field === "endTime" && dayData.startTime) {
      if (value.isBefore(dayData.startTime)) {
        return Promise.reject("Giờ đóng cửa phải sau giờ mở cửa");
      }
    }

    return Promise.resolve();
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formattedSchedule = WEEKDAYS.map((day) => {
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

      const res = await dispatch(
        updateClinicByOwner({ workingHours: formattedSchedule })
      ).unwrap();

      if (res.success) {
        message.success(res.message);
        handleChangeEdit("schedule", false);
        refetch();
        scrollToTop();
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật lịch làm việc");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Cập nhật lịch làm việc" className="shadow-lg rounded-xl">
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="space-y-4"
      >
        {WEEKDAYS.map((day) => (
          <div
            key={day.value}
            className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <Form.Item noStyle>
              <Row gutter={16} align="middle">
                <Col xs={24} md={6}>
                  <Form.Item
                    name={["workingHours", day.value, "isClosed"]}
                    valuePropName="checked"
                  >
                    <Checkbox className="font-medium text-gray-700">
                      {day.label} (Ngày nghỉ)
                    </Checkbox>
                  </Form.Item>
                </Col>

                <Col xs={24} md={9}>
                  <Form.Item
                    label={<span className="text-gray-600">Giờ mở cửa</span>}
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
                      className="w-full"
                      minuteStep={15}
                      placeholder="Chọn giờ"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={9}>
                  <Form.Item
                    label={<span className="text-gray-600">Giờ đóng cửa</span>}
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
                      className="w-full"
                      minuteStep={15}
                      placeholder="Chọn giờ"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </div>
        ))}

        <div className="flex justify-end gap-4">
          <Button
            icon={<IoMdArrowRoundBack className="text-lg" />}
            onClick={() => {
              handleChangeEdit("schedule", false);
              form.resetFields();
            }}
          >
            Đóng
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<MdSave className="text-lg" />}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white 
            shadow-md hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-200
            disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none
            flex items-center gap-2"
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default EditSchedule;
