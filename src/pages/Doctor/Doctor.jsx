import React, { useState } from "react";
import { Rate, Tabs, Calendar, Tag, Avatar, Card } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const mockDoctor = {
  name: "Bs.CK2 Nguyễn Thị Hương",
  avatar: {
    url: "https://cdn.bookingcare.vn/fo/w384/2021/10/07/145448-bs-lan.jpg",
  },
  specialty: "Da liễu thẩm mỹ",
  experience: 8,
  email: "huong.nguyen@skinlele.com",
  phone: "0123 456 789",
  about:
    "Bác sĩ Nguyễn Thị Hương là bác sĩ chuyên khoa da liễu với hơn 8 năm kinh nghiệm trong lĩnh vực điều trị da và thẩm mỹ. Bác sĩ chuyên sâu về điều trị các bệnh lý da liễu và cung cấp các giải pháp chăm sóc da tiên tiến.",
  fees: 850000,
  rating: 4.8,
  totalReviews: 124,
  isActive: true,
};

const mockSchedule = {
  availableDays: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 6"],
  timeSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
};

const CustomButton = ({
  children,
  variant = "default",
  className = "",
  onClick,
}) => {
  const baseStyle =
    "px-6 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-200",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    default: "bg-gray-100 hover:bg-gray-200 text-gray-800",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Doctor = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-14">
      {/* Thông tin bác sĩ */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <div className="relative">
              <Avatar
                src={mockDoctor.avatar.url}
                size={240}
                className="w-full rounded-xl shadow-md"
              />
              <span className="absolute top-4 right-4 bg-green-500 w-4 h-4 rounded-full shadow-lg"></span>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                  {mockDoctor.name}
                </h1>
                <Tag
                  color="blue"
                  className="rounded-full mb-3 px-3 py-1 text-sm"
                >
                  {mockDoctor.specialty}
                </Tag>
                <div className="flex items-center gap-2">
                  <Rate
                    disabled
                    defaultValue={mockDoctor.rating}
                    className="text-sm text-yellow-400"
                  />
                  <span className="text-gray-600">
                    ({mockDoctor.totalReviews} đánh giá)
                  </span>
                </div>
              </div>
              <CustomButton variant="primary" className="mt-4 md:mt-0">
                Đặt lịch khám
              </CustomButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <UserOutlined className="text-blue-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Kinh nghiệm</p>
                  <p className="font-medium">{mockDoctor.experience} năm</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <PhoneOutlined className="text-green-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Điện thoại</p>
                  <p className="font-medium">{mockDoctor.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <MailOutlined className="text-purple-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium">{mockDoctor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                  <DollarOutlined className="text-orange-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phí khám</p>
                  <p className="font-medium">
                    {mockDoctor.fees.toLocaleString()} VNĐ
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-gray-800">Giới thiệu</h3>
              <p className="text-gray-600 leading-relaxed">
                {mockDoctor.about}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Lịch khám",
            children: (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Chọn ngày khám
                    </h3>
                    <Calendar
                      fullscreen={false}
                      onSelect={(date) => setSelectedDate(date)}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Khung giờ khám
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {mockSchedule.timeSlots.map((time, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedTime(time)}
                          className={`
                            px-4 py-3 rounded-lg text-center cursor-pointer transition-all duration-300
                            ${
                              selectedTime === time
                                ? "bg-blue-600 text-white shadow-lg"
                                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                            }
                          `}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            key: "2",
            label: "Đánh giá",
            children: (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-1 gap-4">
                  {[1, 2, 3].map((review) => (
                    <Card
                      key={review}
                      className="w-full border-0 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar
                          size={48}
                          icon={<UserOutlined />}
                          className="bg-blue-100"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-800">
                              Nguyễn Văn A
                            </h4>
                            <Rate
                              disabled
                              defaultValue={5}
                              className="text-sm text-yellow-400"
                            />
                          </div>
                          <p className="text-gray-600 mb-2">
                            Bác sĩ rất tận tâm và chuyên nghiệp. Tôi rất hài
                            lòng với quá trình điều trị.
                          </p>
                          <span className="text-gray-400 text-sm">
                            2 ngày trước
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Doctor;
