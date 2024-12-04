import React, { useEffect, useState } from "react";
import { Tabs, Tag, Badge, Select, Card } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { formatPrice } from "@/helpers/formatPrice";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

const ManageProfile = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().locale("vi"));
  const { doctorInfo } = useSelector((state) => state.auth);
  const {
    name,
    email,
    about,
    avatar,
    fees,
    specialty,
    phone,
    experience,
    clinic = {},
    schedule = [],
    holidays = [],
  } = doctorInfo;

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
  };

  const handleYearChange = (value) => {
    setCurrentDate(currentDate.year(value));
  };

  const isHoliday = (date) => {
    return holidays.some(
      (holiday) =>
        dayjs(holiday).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD")
    );
  };

  const items = [
    {
      key: "profile",
      label: (
        <span className="flex items-center gap-2">
          <UserOutlined />
          Thông tin cá nhân
        </span>
      ),
      children: (
        <div className="space-y-6">
          {/* Profile Info */}
          <Card className="shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={avatar.url}
                alt={name}
                className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-[#e6f0ff]"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                <Badge color="blue" text={specialty} className="mt-2" />
                <div className="flex flex-wrap gap-2 mt-3">
                  <Tag icon={<ClockCircleOutlined />} color="blue">
                    {experience} năm kinh nghiệm
                  </Tag>
                  <Tag icon={<DollarOutlined />} color="green">
                    {formatPrice(fees)} VND
                  </Tag>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-3 text-gray-700">
                    <PhoneOutlined className="text-blue-500" />
                    <span>{phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MailOutlined className="text-blue-500" />
                    <span>{email}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* About */}
          <Card className="shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Giới thiệu</h3>
            <div
              className="text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: about }}
            />
          </Card>

          {/* Clinic Info */}
          {!isEmpty(clinic) && (
            <Card className="shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Thông tin phòng khám
              </h3>
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={clinic.logo.url}
                  alt={clinic.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="text-lg font-semibold">{clinic.name}</h4>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <EnvironmentOutlined />
                      <span
                        className="text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: clinic.address }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Chuyên khoa:</div>
                    <div className="flex flex-wrap gap-2">
                      {clinic.specialties.map((specialty, index) => (
                        <Tag key={index} color="blue">
                          {specialty}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <div
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: clinic.description }}
                  />
                </div>
              </div>
            </Card>
          )}
        </div>
      ),
    },
    {
      key: "schedule",
      label: (
        <span className="flex items-center gap-2">
          <CalendarOutlined />
          Lịch làm việc
        </span>
      ),
      children: (
        <div className="space-y-6">
          {/* Weekly Schedule */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Lịch làm việc theo tuần
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedule.length > 0 &&
                schedule.map((slot, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 space-y-2 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <Tag color="blue" className="text-base">
                        {slot.dayOfWeek}
                      </Tag>
                      <Badge status="success" text="Đang hoạt động" />
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
                          Giờ nghỉ: {slot.breakTime.start} -{" "}
                          {slot.breakTime.end}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
            </div>
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
                } ${
                      isPast
                        ? "opacity-50"
                        : "hover:border-blue-500 hover:shadow-md"
                    }`}
                  >
                    <span className="text-xs font-medium text-gray-500">
                      {dayjs(date).format("ddd")}
                    </span>
                    <span className="text-lg font-semibold">
                      {dayjs(date).date()}
                    </span>
                    {holiday && (
                      <span className="text-xs font-medium text-red-600">
                        Nghỉ
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen ">
      <Tabs
        defaultActiveKey="profile"
        items={items}
        className="bg-transparent [&_.ant-tabs-content]:min-h-[calc(100vh-200px)]"
      />
    </div>
  );
};

export default ManageProfile;
