import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "dayjs/locale/vi";
import { Select, List, Empty } from "antd";
import { useGetScheduleBookingDoctorQuery } from "@/redux/doctor/doctor.query";
import { monthsDefault } from "@/const/dataDefault";
import LoadingContent from "@/components/Loading/LoaingContent";
import ConfirmBooking from "./ConfirmBooking";

const DoctorSchedule = ({ doctor }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs().locale("vi"));
  const [selectedTime, setSelectedTime] = useState(null);

  const years = Array.from({ length: 21 }, (_, i) => dayjs().year() + i);
  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    dayjs().day(i).format("ddd")
  );
  const today = dayjs();

  const daysInMonth = selectedDate.daysInMonth();
  const startOfMonth = selectedDate.startOf("month").day();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) =>
    selectedDate.date(i + 1).format("YYYY-MM-DD")
  );
  const [timeSlots, setTimeSlots] = useState([]);

  if (!doctor) return null;

  useEffect(() => {
    dayjs.locale("vi");
  }, []);

  const { data, isLoading, error } = useGetScheduleBookingDoctorQuery(
    {
      doctorId: doctor._id,
      date: selectedDate.format("YYYY-MM-DD"),
    },
    { skip: !doctor }
  );

  useEffect(() => {
    if (data) {
      setTimeSlots(data.timeSlots);
    }
  }, [data]);

  if (error) return <Empty description="Chưa có thông tin lịch khám!" />;

  if (isLoading) return <LoadingContent />;

  if (!data) return <Empty description="Chưa có thông tin lịch khám!" />;

  const handleMonthChange = (value) => {
    setSelectedDate(selectedDate.month(value));
    setSelectedTime(null);
  };

  const handleYearChange = (value) => {
    setSelectedDate(selectedDate.year(value));
    setSelectedTime(null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(dayjs(date));
    setSelectedTime(null);
  };

  const isPastSlot = (slot) => {
    const slotDateTime = dayjs(
      `${selectedDate.format("YYYY-MM-DD")} ${slot.startTime}`,
      "YYYY-MM-DD HH:mm"
    );
    return slotDateTime.isBefore(dayjs());
  };

  const handleClearTime = () => {
    setSelectedDate(dayjs().locale("vi"));
    setSelectedTime(null);
  };

  const handleTimeSlotAction = ({ startTime, endTime }) => {
    setTimeSlots(
      timeSlots.filter(
        (item) => item.startTime !== startTime || item.endTime !== endTime
      )
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <Select
          className="w-full lg:w-36"
          value={selectedDate.month()}
          onChange={handleMonthChange}
        >
          {monthsDefault.map((month, index) => (
            <Select.Option key={index} value={index}>
              {month}
            </Select.Option>
          ))}
        </Select>
        <Select
          className="w-full lg:w-36"
          value={selectedDate.year()}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <Select.Option key={year} value={year}>
              {year}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center mb-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-xs md:text-sm py-2 rounded-lg bg-blue-50 text-blue-600 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="h-14" />
        ))}
        {monthDays.map((date) => {
          const isPast = dayjs(date).isBefore(today, "day");
          const isSelected = selectedDate.format("YYYY-MM-DD") === date;

          return (
            <button
              key={date}
              onClick={() => !isPast && handleDateSelect(date)}
              disabled={isPast}
              className={`
                h-14 flex flex-col items-center justify-center rounded-lg transition-all shadow-md
                ${
                  isSelected
                    ? "bg-blue-500 text-white shadow-lg ring-2 ring-blue-300"
                    : "bg-white hover:bg-blue-50 border border-gray-200"
                }
                ${isPast ? "opacity-50 cursor-not-allowed bg-slate-500" : ""}
              `}
            >
              <span
                className={`text-xs ${
                  isSelected ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {dayjs(date).format("ddd")}
              </span>
              <span className="text-lg font-medium">{dayjs(date).date()}</span>
            </button>
          );
        })}
      </div>
      {!timeSlots.length && (
        <Empty
          description={data.message || "Chưa có thông tin lịch khám !"}
          className="mt-10"
        />
      )}
      {timeSlots.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Chọn giờ khám
          </h3>
          <List
            grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 5, xl: 6, xxl: 6 }}
            dataSource={timeSlots}
            renderItem={(slot) => {
              const isDisabled = isPastSlot(slot);
              const isSelected = selectedTime?.startTime === slot.startTime;

              return (
                <List.Item>
                  <button
                    onClick={() => !isDisabled && setSelectedTime(slot)}
                    disabled={isDisabled}
                    className={`
                      w-full py-3 px-3 rounded-lg transition-all text-sm font-medium shadow-md
                      ${
                        isSelected
                          ? "bg-blue-500 text-white ring-2 ring-blue-300"
                          : "bg-white border border-gray-200 hover:bg-blue-50"
                      }
                      ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {isDisabled ? " 🟠" : "🟢"} {slot.startTime} -{" "}
                    {slot.endTime}
                  </button>
                </List.Item>
              );
            }}
          />
        </div>
      )}

      {selectedTime && (
        <ConfirmBooking
          {...{
            selectedTime,
            selectedDate,
            doctor,
            handleClearTime,
            handleTimeSlotAction,
          }}
        />
      )}
    </div>
  );
};

export default DoctorSchedule;
