import { Badge, Empty, Select, Tag } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClockCircleOutlined } from "@ant-design/icons";
import CustumButton from "@/components/CustumButton";
import ScheduleCreate from "./Action/ScheduleCreate";
import { MdDone, MdOutlineEdit } from "react-icons/md";
import ScheduleUpdate from "./Action/ScheduleUpdate";

const ManageSchedule = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().locale("vi"));
  const { doctorInfo } = useSelector((state) => state.auth);
  const { schedule = [], holidays = [] } = doctorInfo;
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
    return schedule.map((slot, index) => (
      <div
        key={index}
        className="bg-[#f9fafc] rounded-lg p-4 space-y-2 shadow-md"
      >
        <div className="flex items-center justify-between">
          <Tag color="blue" className="text-base rounded-full">
            {slot.dayOfWeek}
          </Tag>
          <Badge
            status="success"
            text={<span className="text-[#5cb929]">Đang hoạt động</span>}
          />
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <ClockCircleOutlined className="text-blue-500" />
          <span>
            {slot.startTime} - {slot.endTime}
          </span>
        </div>
        {slot.breakTime && (
          <div className="bg-orange-50 rounded-lg p-2 text-sm">
            <span className="text-orange-600">
              Giờ nghỉ: {slot.breakTime.start} - {slot.breakTime.end}
            </span>
          </div>
        )}
      </div>
    ));
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
                <CustumButton
                  icon={<MdOutlineEdit />}
                  onClick={() => handleChangeAction("update", true)}
                  variant="primary"
                  className="mb-4"
                >
                  Chỉnh sửa
                </CustumButton>
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
                <CustumButton
                  onClick={() => handleChangeAction("create", true)}
                  variant="primary"
                  className="m-auto mt-4"
                >
                  Tạo lịch làm việc
                </CustumButton>
              </>
            ) : (
              <ScheduleCreate {...{ handleChangeAction }} />
            )}
          </>
        )}

        {!action.update && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderScheduleContent()}
          </div>
        )}
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
                {holiday && (
                  <span className="text-xs font-medium text-red-600">Nghỉ</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageSchedule;
