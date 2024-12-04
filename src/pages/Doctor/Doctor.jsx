import React, { useState } from "react";
import { Rate, Tabs, Tag, Avatar, Card } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import DoctorSchedule from "./DoctorSchedule/DoctorSchedule";
import DoctorReview from "./DoctorReview/DoctorReview";
import CustumButton from "@components/CustumButton/CustumButton";
import { MdVerified } from "react-icons/md";

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

const Doctor = () => {
  return (
    <div className="mx-auto lg:px-16 mt-24">
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
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 flex items-center gap-2">
                  {mockDoctor.name} <MdVerified color="#5ad7ff" />
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
              <CustumButton variant="primary" className="mt-4 md:mt-0">
                Đặt lịch khám
              </CustumButton>
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

      <Card hoverable className="shadow-xl">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Lịch khám",
              children: <DoctorSchedule />,
            },
            {
              key: "2",
              label: "Đánh giá",
              children: <DoctorReview />,
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Doctor;
