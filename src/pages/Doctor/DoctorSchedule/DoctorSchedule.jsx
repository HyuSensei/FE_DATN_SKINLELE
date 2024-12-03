import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "dayjs/locale/vi";
import { Select, List, Empty } from "antd";

const DoctorSchedule = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().locale("vi"));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Mock data for time slots
  const mockTimeSlots = [
    { startTime: "09:00", endTime: "09:30", isAvailable: true },
    { startTime: "09:30", endTime: "10:00", isAvailable: true },
    { startTime: "10:00", endTime: "10:30", isAvailable: false },
    { startTime: "10:30", endTime: "11:00", isAvailable: true },
    { startTime: "14:00", endTime: "14:30", isAvailable: true },
    { startTime: "14:30", endTime: "15:00", isAvailable: true },
    { startTime: "15:00", endTime: "15:30", isAvailable: false },
    { startTime: "15:30", endTime: "16:00", isAvailable: true },
  ];

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

  const handleMonthChange = (value) => {
    setCurrentDate(currentDate.month(value));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleYearChange = (value) => {
    setCurrentDate(currentDate.year(value));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
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
          return (
            <button
              key={date}
              onClick={() => !isPast && handleDateSelect(date)}
              disabled={isPast}
              className={`
                h-14 flex flex-col items-center justify-center rounded-lg border-2 transition-all shadow-md 
                ${
                  selectedDate === date
                    ? "border-blue-600 bg-blue-500 text-white shadow-lg"
                    : "border-gray-200 bg-gray-100 text-gray-800 hover:border-blue-400 hover:bg-gray-200"
                }
                ${isPast ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <span
                className={`text-xs font-medium ${
                  selectedDate === date ? "text-white" : "text-gray-500"
                }`}
              >
                {dayjs(date).format("ddd")}
              </span>
              <span className="text-lg font-semibold">
                {dayjs(date).date()}
              </span>
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Chọn giờ khám</h3>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
            dataSource={mockTimeSlots}
            renderItem={(slot) => (
              <List.Item>
                <button
                  onClick={() => slot.isAvailable && setSelectedTime(slot)}
                  disabled={!slot.isAvailable}
                  className={`
                    w-full py-3 px-4 rounded-lg border-2 transition-all
                    ${
                      selectedTime === slot
                        ? "border-blue-600 bg-blue-500 text-white"
                        : slot.isAvailable
                        ? "border-gray-200 hover:border-blue-400"
                        : "bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed"
                    }
                  `}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              </List.Item>
            )}
          />
        </div>
      )}

      {selectedDate && selectedTime && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h4 className="font-semibold">Thời gian đã chọn</h4>
              <p className="text-gray-600">
                {selectedTime.startTime} - {selectedTime.endTime},{" "}
                {dayjs(selectedDate).format("DD/MM/YYYY")}
              </p>
            </div>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Xác nhận lịch
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorSchedule;
