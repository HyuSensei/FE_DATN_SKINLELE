import React, { useEffect } from "react";
import { Form, TimePicker, Checkbox } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";

const WEEKDAYS = [
  { label: "Thứ 2", value: "Thứ 2" },
  { label: "Thứ 3", value: "Thứ 3" },
  { label: "Thứ 4", value: "Thứ 4" },
  { label: "Thứ 5", value: "Thứ 5" },
  { label: "Thứ 6", value: "Thứ 6" },
  { label: "Thứ 7", value: "Thứ 7" },
  { label: "Chủ nhật", value: "Chủ nhật" },
];

const ScheduleSection = () => {
  const form = Form.useFormInstance();

  useEffect(() => {
    const initialWorkingHours = WEEKDAYS.reduce((acc, day) => {
      acc[day.value] = {
        startTime: dayjs("08:00", "HH:mm"),
        endTime: dayjs("17:00", "HH:mm"),
        breakTimeStart: dayjs("12:00", "HH:mm"),
        breakTimeEnd: dayjs("13:00", "HH:mm"),
        isClosed: false,
      };
      return acc;
    }, {});

    form.setFieldsValue({
      workingHours: initialWorkingHours,
    });
  }, [form]);

  const validateTime = (rule, value, dayValue, field, isBreakTime = false) => {
    const dayData = form.getFieldValue(["workingHours", dayValue]) || {};
    const isClosed = dayData.isClosed;

    if (isClosed || !value) return Promise.resolve();

    if (
      field === "startTime" &&
      dayData.endTime &&
      value.isAfter(dayData.endTime)
    ) {
      return Promise.reject("Giờ mở cửa phải trước giờ đóng cửa");
    }

    if (
      field === "endTime" &&
      dayData.startTime &&
      value.isBefore(dayData.startTime)
    ) {
      return Promise.reject("Giờ đóng cửa phải sau giờ mở cửa");
    }

    if (isBreakTime) {
      const breakTimeStart = dayData.breakTimeStart;
      const breakTimeEnd = dayData.breakTimeEnd;
      const startTime = dayData.startTime;
      const endTime = dayData.endTime;

      if (field === "breakTimeStart") {
        if (startTime && value.isBefore(startTime)) {
          return Promise.reject("Giờ nghỉ phải sau giờ mở cửa");
        }
        if (breakTimeEnd && value.isAfter(breakTimeEnd)) {
          return Promise.reject("Giờ nghỉ phải trước giờ kết thúc nghỉ");
        }
      }

      if (field === "breakTimeEnd") {
        if (endTime && value.isAfter(endTime)) {
          return Promise.reject("Giờ nghỉ phải trước giờ đóng cửa");
        }
        if (breakTimeStart && value.isBefore(breakTimeStart)) {
          return Promise.reject("Giờ kết thúc nghỉ phải sau giờ bắt đầu nghỉ");
        }
      }
    }

    return Promise.resolve();
  };

  return WEEKDAYS.map((day) => (
    <div
      key={day.value}
      className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors mb-4"
    >
      <Form.Item noStyle>
        <Checkbox
          name={["workingHours", day.value, "isClosed"]}
          className="font-medium text-gray-700 mb-4"
        >
          <span className="px-4 py-1 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-blue-200">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-bold">
              {day.label}
            </span>
          </span>{" "}
          (Ngày nghỉ)
        </Checkbox>
      </Form.Item>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Form.Item
          label="Giờ mở cửa"
          name={["workingHours", day.value, "startTime"]}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giờ mở cửa",
            },
            {
              validator: (rule, value) =>
                validateTime(rule, value, day.value, "startTime"),
            },
          ]}
          className="flex-1 mb-0"
        >
          <TimePicker
            locale={locale}
            format="HH:mm"
            className="w-full"
            minuteStep={15}
            placeholder="Chọn giờ"
          />
        </Form.Item>

        <Form.Item
          label="Giờ đóng cửa"
          name={["workingHours", day.value, "endTime"]}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giờ đóng cửa",
            },
            {
              validator: (rule, value) =>
                validateTime(rule, value, day.value, "endTime"),
            },
          ]}
          className="flex-1 mb-0"
        >
          <TimePicker
            locale={locale}
            format="HH:mm"
            className="w-full"
            minuteStep={15}
            placeholder="Chọn giờ"
          />
        </Form.Item>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Form.Item
          label="Bắt đầu giờ nghỉ"
          name={["workingHours", day.value, "breakTimeStart"]}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giờ bắt đầu nghỉ",
            },
            {
              validator: (rule, value) =>
                validateTime(rule, value, day.value, "breakTimeStart", true),
            },
          ]}
          className="flex-1 mb-0"
        >
          <TimePicker
            locale={locale}
            format="HH:mm"
            className="w-full"
            minuteStep={15}
            placeholder="Chọn giờ"
          />
        </Form.Item>

        <Form.Item
          label="Kết thúc giờ nghỉ"
          name={["workingHours", day.value, "breakTimeEnd"]}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giờ kết thúc nghỉ",
            },
            {
              validator: (rule, value) =>
                validateTime(rule, value, day.value, "breakTimeEnd", true),
            },
          ]}
          className="flex-1 mb-0"
        >
          <TimePicker
            locale={locale}
            format="HH:mm"
            className="w-full"
            minuteStep={15}
            placeholder="Chọn giờ"
          />
        </Form.Item>
      </div>
    </div>
  ));
};

export default ScheduleSection;
