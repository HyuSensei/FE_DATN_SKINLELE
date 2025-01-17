import React, { useEffect, useState, useMemo } from "react";
import { Form, TimePicker, Card, Checkbox, message } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { updateClinicByOwner } from "@/redux/clinic/clinic.thunk";
import { IoMdArrowRoundBack, IoMdSave } from "react-icons/io";
import { useScroll } from "@/components/context/ScrollProvider";
import CustomButton from "@/components/CustomButton";

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

  const weekdays = useMemo(() => WEEKDAYS, []);

  useEffect(() => {
    const initialWorkingHours = workingHours.reduce((acc, day) => {
      acc[day.dayOfWeek] = {
        startTime: dayjs(day.startTime, "HH:mm") || null,
        endTime: dayjs(day.endTime, "HH:mm") || null,
        breakTimeStart: day.breakTime?.start
          ? dayjs(day.breakTime.start, "HH:mm")
          : null,
        breakTimeEnd: day.breakTime?.end
          ? dayjs(day.breakTime.end, "HH:mm")
          : null,
        isClosed: !day.isOpen,
      };
      return acc;
    }, {});

    form.setFieldsValue({
      workingHours: initialWorkingHours,
    });
  }, [workingHours, form]);

  const validateTime = (
    rule,
    value,
    callback,
    dayValue,
    field,
    isBreakTime = false
  ) => {
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

  const handleSubmit = async (values) => {
    try {
      // setLoading(true);
      const formattedSchedule = weekdays.map((day) => {
        const dayData = values.workingHours?.[day.value] || {};
        const schedule = {
          dayOfWeek: day.value,
          isOpen: !dayData.isClosed,
          startTime: dayData.startTime
            ? dayjs(dayData.startTime).format("HH:mm")
            : "08:00",
          endTime: dayData.endTime
            ? dayjs(dayData.endTime).format("HH:mm")
            : "17:00",
        };

        if (dayData.breakTimeStart && dayData.breakTimeEnd) {
          schedule.breakTime = {
            start: dayjs(dayData.breakTimeStart).format("HH:mm"),
            end: dayjs(dayData.breakTimeEnd).format("HH:mm"),
          };
        }

        return schedule;
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
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="space-y-4"
      >
        {weekdays.map((day) => (
          <div
            key={day.value}
            className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <Form.Item
              valuePropName="checked"
              name={["workingHours", day.value, "isClosed"]}
            >
              <Checkbox className="font-medium text-gray-700 mb-4">
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
                      validateTime(rule, value, null, day.value, "startTime"),
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
                      validateTime(rule, value, null, day.value, "endTime"),
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
                      validateTime(
                        rule,
                        value,
                        null,
                        day.value,
                        "breakTimeStart",
                        true
                      ),
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
                      validateTime(
                        rule,
                        value,
                        null,
                        day.value,
                        "breakTimeEnd",
                        true
                      ),
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
        ))}
        <div className="flex justify-end gap-4 mt-6">
          <CustomButton
            icon={<IoMdArrowRoundBack />}
            onClick={() => handleChangeEdit("schedule", false)}
            disabled={loading}
          >
            Đóng
          </CustomButton>
          <CustomButton
            variant="primary"
            icon={<IoMdSave />}
            type="submit"
            loading={loading}
          >
            Lưu thay đổi
          </CustomButton>
        </div>
      </Form>
    </Card>
  );
};

export default EditSchedule;
