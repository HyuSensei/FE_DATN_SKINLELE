import { Card, Empty, Select, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "@/components/CustomButton";
import ScheduleCreate from "./Action/ScheduleCreate";
import { MdOutlineEdit } from "react-icons/md";
import ScheduleUpdate from "./Action/ScheduleUpdate";
import {
  IoTimeOutline,
  IoCalendarOutline,
  IoWarningOutline,
  IoCafeOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { updateScheduleByDoctor } from "@/redux/doctor/doctor.thunk";
import { setDoctorInfo } from "@/redux/auth/auth.slice";
import moment from "moment";

const ManageSchedule = () => {
  const dispatch = useDispatch();
  const { doctorInfo } = useSelector((state) => state.auth);
  const { schedule = [], holidays = [] } = doctorInfo;
  const [currentDate, setCurrentDate] = useState(dayjs().locale("vi"));
  const [action, setAction] = useState({
    create: false,
    update: false,
  });

  const months = dayjs
    .months()
    .map((month) => month.charAt(0).toUpperCase() + month.slice(1));
  const years = Array.from({ length: 21 }, (_, i) => dayjs().year() + i);
  const daysOfWeek = dayjs.weekdaysShort();
  const today = dayjs();

  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf("month").day();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) =>
    currentDate.date(i + 1).format("YYYY-MM-DD")
  );

  useEffect(() => {
    dayjs.locale("vi");
    setCurrentDate(dayjs().locale("vi"));
  }, []);

  const handleMonthChange = (value) => setCurrentDate(currentDate.month(value));
  const handleYearChange = (value) => setCurrentDate(currentDate.year(value));

  const isHoliday = (date) => {
    return holidays.some(
      (holiday) =>
        dayjs(holiday).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD")
    );
  };

  const handleChangeAction = (key, value) => {
    setAction((prev) => ({ ...prev, [key]: value }));
  };

  const renderScheduleContent = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedule.map((slot, index) => (
          <Card key={index} className="hover:scale-95 shadow-md cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <Tag className="px-4 py-1.5 rounded-full text-sm font-medium border-0 bg-blue-50 text-blue-600">
                {slot.dayOfWeek}
              </Tag>
              <div className="flex items-center gap-2">
                {slot.isActive ? (
                  <IoCheckmarkCircleOutline className="w-5 h-5 text-green-500" />
                ) : (
                  <IoCloseCircleOutline className="w-5 h-5 text-gray-400" />
                )}
                <span
                  className={`text-sm ${
                    slot.isActive ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {slot.isActive ? "Đang hoạt động" : "Không hoạt động"}
                </span>
              </div>
            </div>

            {/* Time Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <IoTimeOutline className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Thời gian làm việc:</span>
              </div>
              <div className="ml-6 p-2 bg-blue-50 rounded-lg flex items-center justify-between">
                <span className="text-blue-700 font-medium">
                  {slot.startTime} - {slot.endTime}
                </span>
                <Tooltip title="Thời gian khám mỗi ca">
                  <div className="flex items-center gap-1 text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                    <IoCalendarOutline className="w-4 h-4" />
                    <span>{slot.duration} phút</span>
                  </div>
                </Tooltip>
              </div>

              {/* Break Time */}
              {slot.breakTime && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <IoCafeOutline className="w-5 h-5 text-orange-500" />
                    <span className="text-sm">Giờ nghỉ:</span>
                  </div>
                  <div className="ml-6 p-2 bg-orange-50 rounded-lg">
                    <span className="text-orange-700">
                      {slot.breakTime.start} - {slot.breakTime.end}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Status Indicator */}
            {!slot.isActive && (
              <div className="mt-3 flex items-center gap-2 text-gray-500 bg-gray-100 rounded-lg p-2">
                <IoWarningOutline className="w-4 h-4" />
                <span className="text-sm">Không có lịch khám</span>
              </div>
            )}
          </Card>
        ))}
      </div>
    );
  };

  const handleUpdateHolidays = async (date) => {
    const newHolidays = holidays.some((h) =>
      moment(h).startOf("day").isSame(moment(date).startOf("day"))
    )
      ? holidays.filter(
          (h) => !moment(h).startOf("day").isSame(moment(date).startOf("day"))
        )
      : [...holidays, date];

    const res = await dispatch(
      updateScheduleByDoctor({
        id: doctorInfo._id,
        data: { holidays: newHolidays },
      })
    ).unwrap();

    if (res.success)
      dispatch(setDoctorInfo({ ...doctorInfo, holidays: res.data.holidays }));
  };

  return (
    <div className="space-y-6 mt-4">
      {/* Weekly Schedule */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Lịch làm việc theo tuần
        </h3>
        {schedule.length > 0 && (
          <>
            {!action.update ? (
              <div className="flex items-center justify-end">
                <CustomButton
                  icon={<MdOutlineEdit />}
                  onClick={() => handleChangeAction("update", true)}
                  variant="primary"
                  className="mb-4"
                >
                  Chỉnh sửa
                </CustomButton>
              </div>
            ) : (
              <ScheduleUpdate handleChangeAction={handleChangeAction} />
            )}
          </>
        )}

        {!schedule.length && (
          <>
            {!action.create ? (
              <>
                <Empty description="Vui lòng thiết lập lịch làm việc" />
                <CustomButton
                  onClick={() => handleChangeAction("create", true)}
                  variant="primary"
                  className="m-auto mt-4"
                >
                  Tạo lịch làm việc
                </CustomButton>
              </>
            ) : (
              <ScheduleCreate {...{ handleChangeAction }} />
            )}
          </>
        )}

        {!action.update && renderScheduleContent()}
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Ngày nghỉ</h3>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <Select
            className="w-full lg:w-36"
            size="middle"
            value={currentDate.month()}
            onChange={handleMonthChange}
          >
            {months.map((month, index) => (
              <Select.Option key={index} value={index}>
                {month}
              </Select.Option>
            ))}
          </Select>
          <Select
            className="w-full lg:w-36"
            size="middle"
            value={currentDate.year()}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <Select.Option key={year} value={year}>
                {year}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-600 mb-4">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-xs md:text-sm text-center py-2 rounded-full font-medium bg-[#b7dce7] text-white"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-14"></div>
          ))}
          {monthDays.map((date) => {
            const isPast = dayjs(date).isBefore(today, "day");
            const holiday = isHoliday(date);
            return (
              <div
                onClick={() => handleUpdateHolidays(date)}
                key={date}
                className={`h-14 flex flex-col items-center justify-center rounded-lg border-2 transition-all shadow-md cursor-pointer
        ${
          holiday
            ? "border-red-300 bg-red-50 text-red-800"
            : "border-gray-200 bg-gray-100 text-gray-800"
        } ${isPast ? "opacity-50" : "hover:border-blue-500 hover:shadow-md"}`}
              >
                <span className="text-xs font-medium text-gray-500">
                  {dayjs(date).format("ddd")}
                </span>
                <span className="text-lg font-semibold">
                  {dayjs(date).date()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageSchedule;
