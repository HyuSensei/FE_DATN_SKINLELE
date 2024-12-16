import React, { useState } from "react";
import { Card, message, Select, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import {
  IoTimeOutline,
  IoCalendarOutline,
  IoWarningOutline,
  IoCafeOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { WEEKDAY_MAP } from "@/const/dataDefault";
import { updateDoctorInfor } from "@/redux/doctor/doctor.thunk";
import { setDoctorInfo } from "@/redux/auth/auth.slice";
import moment from "@utils/monentTz";
dayjs.locale("vi");

const ManageSchedule = () => {
  const dispatch = useDispatch();
  const { doctorInfo } = useSelector((state) => state.auth);
  const { clinic, duration, holidays: holidaysDoctor } = doctorInfo;
  const { workingHours = [], holidays: holidaysClinic } = clinic;
  const [currentDate, setCurrentDate] = useState(dayjs().locale("vi"));

  // Calendar setup
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

  const handleMonthChange = (value) => setCurrentDate(currentDate.month(value));
  const handleYearChange = (value) => setCurrentDate(currentDate.year(value));

  const renderScheduleContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workingHours.map((slot, index) => (
        <Card
          key={index}
          className="transform transition-all duration-300 hover:scale-[0.98] shadow-lg cursor-pointer border-0 bg-gradient-to-br from-white to-blue-50"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-base font-semibold flex items-center gap-2">
              <span className="px-4 py-1 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-blue-200">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-bold">
                  {slot.dayOfWeek}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              {slot.isOpen ? (
                <div className="flex items-center gap-1.5 text-green-600">
                  <IoCheckmarkCircleOutline className="w-5 h-5" />
                  <span className="text-sm font-medium">Đang hoạt động</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-gray-500">
                  <IoCloseCircleOutline className="w-5 h-5" />
                  <span className="text-sm font-medium">Không hoạt động</span>
                </div>
              )}
            </div>
          </div>

          {/* Time Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-sm font-medium">Thời gian làm việc:</span>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-between">
                <span className="text-blue-800 font-semibold">
                  {slot.startTime} - {slot.endTime}
                </span>
                <Tooltip title="Thời gian khám mỗi ca">
                  <div className="flex items-center gap-1.5 text-sm bg-white text-blue-700 px-3 py-1 rounded-full shadow-sm">
                    <span className="font-medium">{duration} phút</span>
                  </div>
                </Tooltip>
              </div>
            </div>

            {/* Break Time */}
            {slot.breakTime && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-sm font-medium">Giờ nghỉ:</span>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <span className="text-orange-800 font-semibold">
                    {slot.breakTime.start} - {slot.breakTime.end}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Status Indicator */}
          {!slot.isOpen && (
            <div className="mt-4 flex items-center gap-2 text-gray-600 bg-gray-100 rounded-lg p-3">
              <IoWarningOutline className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium">Không có lịch khám</span>
            </div>
          )}
        </Card>
      ))}
    </div>
  );

  const CalendarDay = ({ date, isPast }) => {
    const dayObj = dayjs(date);
    const dayOfWeek = WEEKDAY_MAP[dayObj.day()];
    const daySchedule = workingHours.find((h) => h.dayOfWeek === dayOfWeek);
    const isOpen = daySchedule?.isOpen;

    const isClinicHoliday = holidaysClinic?.some((holiday) =>
      dayjs(holiday).isSame(dayObj, "day")
    );

    const isDoctorHoliday = holidaysDoctor?.some((holiday) =>
      dayjs(holiday).isSame(dayObj, "day")
    );

    const getShortDayName = (date) => {
      const day = dayjs(date).day();
      return day === 0 ? "CN" : `T${day + 1}`;
    };

    const getStatusInfo = () => {
      if (isClinicHoliday && isDoctorHoliday) {
        return {
          text: "Nghỉ lễ",
          className: "border-2 border-red-200 bg-red-50",
          textColor: "text-red-600",
        };
      } else if (isClinicHoliday) {
        return {
          text: "Phòng khám nghỉ",
          className: "border-2 border-orange-200 bg-orange-50",
          textColor: "text-orange-600",
        };
      } else if (isDoctorHoliday) {
        return {
          text: "Bác sĩ nghỉ",
          className: "border-2 border-yellow-200 bg-yellow-50",
          textColor: "text-yellow-600",
        };
      } else if (isOpen) {
        return {
          text: "Có lịch",
          className: "border-2 border-green-200 bg-green-50",
          textColor: "text-green-600",
        };
      }
      return {
        text: "Nghỉ",
        className: "border border-gray-200 bg-white",
        textColor: "text-gray-500",
      };
    };

    const status = getStatusInfo();

    return (
      <div
        onClick={() => handleChangeHolidays(date)}
        className={`
          h-20 flex flex-col items-center justify-center rounded-lg transition-all cursor-pointer
          ${isPast ? "opacity-50 bg-gray-100" : "hover:shadow-lg"}
          ${status.className}
        `}
      >
        <span className="text-xs font-medium text-gray-600">
          {getShortDayName(date)}
        </span>
        <span className="text-lg font-bold text-gray-800">{dayObj.date()}</span>
        {!isPast && (
          <Tooltip
            title={
              isClinicHoliday && isDoctorHoliday
                ? "Cả phòng khám và bác sĩ đều nghỉ lễ"
                : isClinicHoliday
                ? "Phòng khám nghỉ lễ"
                : isDoctorHoliday
                ? "Bác sĩ nghỉ phép"
                : isOpen
                ? "Có lịch khám"
                : "Không có lịch khám"
            }
          >
            <span className={`text-xs ${status.textColor}`}>{status.text}</span>
          </Tooltip>
        )}
      </div>
    );
  };

  const handleChangeHolidays = async (date) => {
    const newHolidays = holidaysDoctor.some((h) =>
      moment(h).startOf("day").isSame(moment(date).startOf("day"))
    )
      ? holidaysDoctor.filter(
          (h) => !moment(h).startOf("day").isSame(moment(date).startOf("day"))
        )
      : [...holidaysDoctor, date];

    const res = await dispatch(
      updateDoctorInfor({
        id: doctorInfo._id,
        data: { holidays: newHolidays },
      })
    ).unwrap();

    if (res.success) {
      message.success("Lịch nghỉ đã được cập nhật");
      dispatch(setDoctorInfo({ ...doctorInfo, holidays: res.data.holidays }));
    }
  };

  return (
    <div className="space-y-8 mt-6">
      {/* Schedule Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          Lịch làm việc của phòng khám
        </h2>
        {renderScheduleContent()}
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          Lịch theo tháng
        </h2>

        <div className="flex gap-4 mb-6">
          <Select
            className="w-40"
            size="large"
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
            className="w-32"
            size="large"
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

        <div className="grid grid-cols-7 gap-3">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center py-2 text-sm font-semibold text-blue-700 bg-blue-50 rounded-lg"
            >
              {day}
            </div>
          ))}
          {Array(startOfMonth)
            .fill(null)
            .map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
          {monthDays.map((date) => (
            <CalendarDay
              key={date}
              date={date}
              isPast={dayjs(date).isBefore(today, "day")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageSchedule;
