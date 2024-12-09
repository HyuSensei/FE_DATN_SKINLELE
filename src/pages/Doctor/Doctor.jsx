import React, { useState } from "react";
import { Rate, Tabs, Tag, Avatar, Card, Empty } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import DoctorSchedule from "./DoctorSchedule";
import DoctorReview from "./DoctorReview";
import CustumButton from "@/components/CustumButton";
import { MdVerified } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDoctorDetailQuery } from "@/redux/doctor/doctor.query";
import { formatPrice } from "@/helpers/formatPrice";
import LoadingContent from "@/components/Loading/LoaingContent";

const Doctor = () => {
  const { slug } = useParams();

  const {
    data: doctor,
    isLoading,
    error,
  } = useGetDoctorDetailQuery({ slug }, { skip: !slug });

  if (error)
    return (
      <Empty
        className="mt-40"
        description="Có lỗi xảy ra khi lấy thông tin bác sĩ"
      />
    );

  if (isLoading) return <LoadingContent />;

  if (!doctor)
    return (
      <Empty className="mt-40" description="Không tìm thấy thông tin bác sĩ" />
    );

  return (
    <div className="mx-auto lg:px-16 mt-28">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <div className="relative">
              <Avatar
                src={doctor.avatar.url}
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
                  {doctor.name} <MdVerified color="#5ad7ff" />
                </h1>
                <Tag
                  color="blue"
                  className="rounded-full mb-3 px-3 py-1 text-sm"
                >
                  {doctor.specialty}
                </Tag>
                <div className="flex items-center gap-2">
                  <Rate
                    disabled
                    defaultValue={doctor.rating}
                    className="text-sm text-yellow-400"
                  />
                  <span className="text-gray-600">
                    ({doctor.totalReviews} đánh giá)
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
                  <p className="font-medium">{doctor.experience} năm</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <PhoneOutlined className="text-green-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Điện thoại</p>
                  <p className="font-medium">{doctor.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <MailOutlined className="text-purple-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium">{doctor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                  <DollarOutlined className="text-orange-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phí khám</p>
                  <p className="font-medium">{formatPrice(doctor.fees)} VNĐ</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-gray-800">Giới thiệu</h3>
              <p
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: doctor.about }}
              />
            </div>
          </div>
        </div>
      </div>

      <Card hoverable className="shadow-xl">
        <Tabs
          items={[
            {
              key: "1",
              label: "Lịch khám",
              children: <DoctorSchedule {...{ doctor }} />,
            },
            {
              key: "2",
              label: "Đánh giá",
              children: <DoctorReview {...{ doctor }} />,
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Doctor;
