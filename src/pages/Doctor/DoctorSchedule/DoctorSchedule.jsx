import React, { useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import dayjs from "dayjs";
import "dayjs/locale/vi";

const DoctorSchedule = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const getWeekDays = (date) => {
    const startOfWeek = date.startOf("week");
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
  };

  const weekDays = getWeekDays(currentDate);

  const navigateWeek = (direction) => {
    setCurrentDate(currentDate.add(direction * 1, "week"));
  };

  const isToday = (date) => {
    return date.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
  };

  const isPastDate = (date) => {
    return date.isBefore(dayjs(), "day");
  };

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl shadow-lg border border-indigo-100 overflow-hidden mb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-gradient-to-r from-violet-50 via-indigo-50 to-white border-b border-indigo-100">
        <div className="flex items-center mb-4 md:mb-0">
          <div>
            <h2 className="text-xl font-bold uppercase">Lịch khám</h2>
            <p className="text-gray-600 mt-1 text-sm">
              Tháng {currentDate.format("MM/YYYY")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-all duration-200"
          >
            <IoChevronBackOutline className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigateWeek(1)}
            className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-all duration-200"
          >
            <IoChevronForwardOutline className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Week View */}
      <div className="p-6">
        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {weekDays.map((date) => (
            <button
              key={date.format("YYYY-MM-DD")}
              onClick={() => !isPastDate(date) && setSelectedDate(date)}
              disabled={isPastDate(date)}
              className={`
                relative rounded-xl p-3 md:p-4 transition-all duration-200 backdrop-blur-sm
                ${
                  isPastDate(date)
                    ? "bg-gray-50/50 cursor-not-allowed"
                    : selectedDate?.format("YYYY-MM-DD") ===
                      date.format("YYYY-MM-DD")
                    ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl"
                    : "bg-white/50 hover:bg-indigo-50 border border-indigo-100/50 hover:border-indigo-200 shadow-md"
                }
                ${isToday(date) ? "ring-2 ring-indigo-400 ring-offset-2" : ""}
              `}
            >
              <p
                className={`text-xs md:text-sm font-medium mb-1
                ${
                  selectedDate?.format("YYYY-MM-DD") ===
                  date.format("YYYY-MM-DD")
                    ? "text-indigo-100"
                    : "text-indigo-500"
                }`}
              >
                {date.locale("vi").format("ddd")}
              </p>
              <p className="text-base md:text-xl font-bold">
                {date.format("DD")}
              </p>
              {isToday(date) && (
                <span className="absolute -top-2 right-0 bg-gradient-to-r from-emerald-400 to-teal-400 text-white text-xs px-2 py-0.5 rounded-full shadow-lg">
                  Hôm nay
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="border-t border-indigo-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center flex-wrap gap-2 py-2 uppercase">
            Khung giờ khám
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`
                  px-3 py-3 rounded-lg text-center transition-all duration-200
                  ${
                    selectedTime === time
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg transform scale-105"
                      : "bg-white/50 hover:bg-indigo-50 border border-indigo-100/50 hover:border-indigo-200 text-gray-700 shadow-md"
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Time Summary */}
      {selectedDate && selectedTime && (
        <div className="border-t border-indigo-100 p-6 bg-gradient-to-r from-violet-50 via-indigo-50 to-white">
          <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-gray-800 uppercase">
                Thời gian đã chọn
              </h4>
              <span className="inline-flex items-center px-4 py-1.5 bg-white rounded-lg border-2 border-indigo-500/20 shadow-md">
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent font-bold">
                  {selectedTime} - {selectedDate.format("DD/MM/YYYY")}
                </span>
              </span>
            </div>
            <button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Xác nhận đặt lịch
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorSchedule;
