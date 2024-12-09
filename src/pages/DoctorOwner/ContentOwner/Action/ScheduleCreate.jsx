import { useState } from "react";
import {
  Form,
  TimePicker,
  Row,
  Col,
  Switch,
  Select,
  Input,
  message,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import CustumButton from "@/components/CustumButton";
import { useDispatch, useSelector } from "react-redux";
import { createScheduleByDoctor } from "@/redux/doctor/doctor.thunk";
import { DEFAULT_TIME, DURATION_OPTIONS, WEEKDAYS } from "@/const/dataDefault";
import { setDoctorInfo } from "@/redux/auth/auth.slice";

const validateTimeRange = (form, fieldName, index, type) => {
  return async (_, value) => {
    if (!value) {
      return Promise.reject(
        `Vui lòng chọn ${type === "start" ? "giờ bắt đầu" : "giờ kết thúc"}`
      );
    }

    const schedule = form.getFieldValue("schedule")[index];
    const startTime = type === "start" ? value : dayjs(schedule.startTime);
    const endTime = type === "end" ? value : dayjs(schedule.endTime);
    const breakTime = schedule.breakTime;

    if (startTime && endTime) {
      if (startTime.isAfter(endTime)) {
        return Promise.reject("Giờ bắt đầu phải trước giờ kết thúc");
      }

      if (endTime.diff(startTime, "minutes") < schedule.duration) {
        return Promise.reject(
          `Thời gian làm việc phải lớn hơn ${schedule.duration} phút`
        );
      }
    }

    if (breakTime?.length === 2) {
      const [breakStart, breakEnd] = breakTime;
      if (breakStart.isBefore(startTime) || breakEnd.isAfter(endTime)) {
        return Promise.reject(
          "Giờ nghỉ trưa phải nằm trong khung giờ làm việc"
        );
      }
      if (breakEnd.diff(breakStart, "minutes") < 30) {
        return Promise.reject("Thời gian nghỉ trưa tối thiểu 30 phút");
      }
    }

    return Promise.resolve();
  };
};

const validateBreakTime = (form, index) => {
  return async (_, value) => {
    if (!value) return Promise.resolve();
    if (value.length !== 2) {
      return Promise.reject("Vui lòng chọn đầy đủ giờ nghỉ trưa");
    }

    const [breakStart, breakEnd] = value;
    const schedule = form.getFieldValue("schedule")[index];
    const startTime = dayjs(schedule.startTime);
    const endTime = dayjs(schedule.endTime);

    if (breakStart.isBefore(startTime) || breakEnd.isAfter(endTime)) {
      return Promise.reject("Giờ nghỉ trưa phải nằm trong khung giờ làm việc");
    }

    if (breakStart.isAfter(breakEnd)) {
      return Promise.reject("Giờ bắt đầu nghỉ phải trước giờ kết thúc nghỉ");
    }

    if (breakEnd.diff(breakStart, "minutes") < 30) {
      return Promise.reject("Thời gian nghỉ trưa tối thiểu 30 phút");
    }

    return Promise.resolve();
  };
};

const generateInitialSchedule = () => {
  return WEEKDAYS.map((day) => ({
    dayOfWeek: day,
    isActive: true,
    startTime: dayjs(DEFAULT_TIME.start, "HH:mm"),
    endTime: dayjs(DEFAULT_TIME.end, "HH:mm"),
    duration: 15,
    breakTime: [
      dayjs(DEFAULT_TIME.breakStart, "HH:mm"),
      dayjs(DEFAULT_TIME.breakEnd, "HH:mm"),
    ],
  }));
};

const ScheduleCreate = ({ handleChangeAction }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { doctorInfo } = useSelector((state) => state.auth);
  const { _id, clinic } = doctorInfo;

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formattedSchedule = values.schedule.map((slot) => ({
        ...slot,
        startTime: dayjs(slot.startTime).format("HH:mm"),
        endTime: dayjs(slot.endTime).format("HH:mm"),
        breakTime: slot.breakTime
          ? {
              start: dayjs(slot.breakTime[0]).format("HH:mm"),
              end: dayjs(slot.breakTime[1]).format("HH:mm"),
            }
          : null,
      }));

      const payload = {
        doctor: _id,
        clinic: clinic._id,
        schedule: formattedSchedule,
      };

      const res = await dispatch(createScheduleByDoctor(payload)).unwrap();
      if (res.success) {
        message.success(res.message);
        dispatch(setDoctorInfo({ ...doctorInfo, schedule: res.data.schedule }));
        handleChangeAction("create", false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        schedule: generateInitialSchedule(),
      }}
      requiredMark={false}
    >
      <Form.List name="schedule">
        {(fields) => (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.key} className="p-4 border rounded-lg bg-gray-50">
                <Form.Item name={[field.name, "dayOfWeek"]} className="hidden">
                  <Input />
                </Form.Item>

                <span className="px-4 py-1 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-blue-200">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-bold">
                    {WEEKDAYS[index]}
                  </span>
                </span>

                <Row gutter={[16, 16]} align="middle" className="mt-2">
                  <Col xs={24} lg={4}>
                    <Form.Item
                      name={[field.name, "duration"]}
                      label="Thời gian khám"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn thời gian khám",
                        },
                      ]}
                    >
                      <Select options={DURATION_OPTIONS} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} lg={4}>
                    <Form.Item
                      name={[field.name, "startTime"]}
                      label="Giờ bắt đầu"
                      dependencies={["schedule"]}
                      rules={[
                        {
                          validator: validateTimeRange(
                            form,
                            field.name,
                            index,
                            "start"
                          ),
                        },
                      ]}
                    >
                      <TimePicker
                        format="HH:mm"
                        className="w-full"
                        locale={locale}
                        minuteStep={15}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} lg={4}>
                    <Form.Item
                      name={[field.name, "endTime"]}
                      label="Giờ kết thúc"
                      dependencies={["schedule"]}
                      rules={[
                        {
                          validator: validateTimeRange(
                            form,
                            field.name,
                            index,
                            "end"
                          ),
                        },
                      ]}
                    >
                      <TimePicker
                        format="HH:mm"
                        className="w-full"
                        locale={locale}
                        minuteStep={15}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} lg={9}>
                    <Form.Item
                      name={[field.name, "breakTime"]}
                      label="Giờ nghỉ"
                      dependencies={["schedule"]}
                      rules={[{ validator: validateBreakTime(form, index) }]}
                    >
                      <TimePicker.RangePicker
                        format="HH:mm"
                        className="w-full"
                        locale={locale}
                        minuteStep={15}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} lg={3}>
                    <Form.Item
                      name={[field.name, "isActive"]}
                      label="Trạng thái"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        )}
      </Form.List>

      <div className="mt-6">
        <CustumButton
          loading={loading}
          variant="primary"
          type="submit"
          className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none rounded-full"
        >
          Tạo lịch làm việc
        </CustumButton>
      </div>
    </Form>
  );
};

export default ScheduleCreate;
