import React from "react";
import { Tabs, Button, Empty, Spin } from "antd";
import {
  RiMapPinFill,
  RiPhoneFill,
  RiMailFill,
  RiUserStarFill,
  RiHeartFill,
} from "react-icons/ri";
import { IoShareSocial } from "react-icons/io5";
import { GiRoundStar } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import ClinicAbout from "./ClinicAbout";
import ClinicReview from "./ClinicReview";
import CustomButton from "@/components/CustomButton";
import { useParams } from "react-router-dom";
import { useGetClinicDetailBySlugQuery } from "@/redux/clinic/clinic.query";
import LoadingContent from "@/components/Loading/LoaingContent";

const Clinic = () => {
  const { slug } = useParams();

  const {
    data: clinic,
    isLoading: isLoadingClinic,
    error: errorClinic,
  } = useGetClinicDetailBySlugQuery({ slug }, { skip: !slug });

  if (errorClinic) {
    return (
      <Empty
        className="mt-32"
        description="Có lỗi khi tải thông tin phòng khám"
      />
    );
  }

  if (isLoadingClinic) return <LoadingContent />;

  if (!clinic) {
    return (
      <Empty
        className="mt-32"
        description="Không tìm thấy thông tin phòng khám"
      />
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[350px] sm:h-[350px] md:h-[450px] overflow-hidden bg-gradient-to-r from-sky-100 via-cyan-200 to-sky-100">
        <div className="absolute inset-0 bg-black/30"></div>
        {/* <img
          src={clinic.banners[0].url}
          alt="clinic hero"
          className="w-full h-full object-cover"
        /> */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
              <div className="flex-1 flex items-center gap-4">
                <img
                  src={clinic.logo.url}
                  alt="clinic-logo"
                  className="h-20 w-20 lg:h-28 lg:w-28 rounded-full"
                />
                <div className="text-white md:text-left pb-0 md:pb-4 w-full">
                  <h1 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                    {clinic.name}
                  </h1>

                  <div className="flex items-center gap-8 text-sm mt-4 md:text-base">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <GiRoundStar color="#fbcb18" size={20} />
                      <span>{clinic.statistics.averageRating}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <RiUserStarFill color="#fcf8d2" size={20} />
                      <span className="whitespace-nowrap">
                        {clinic.statistics.reviewCount} đánh giá
                      </span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <MdVerified color="#5ad7ff" size={20} />
                      <span className="whitespace-nowrap">Đã xác thực</span>
                    </div>
                  </div>
                </div>
              </div>
              <CustomButton variant="primary"> Đặt lịch khám</CustomButton>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between py-6 flex-wrap gap-4">
            <div className="flex items-center gap-8 text-gray-600 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <RiMapPinFill className="text-purple-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Địa chỉ</p>
                  <p
                    className="font-medium text-sm"
                    dangerouslySetInnerHTML={{
                      __html: clinic.address,
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <RiPhoneFill className="text-green-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Số điện thoại</p>
                  <p className="font-medium text-sm">{clinic.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <RiMailFill className="text-sky-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium text-sm">{clinic.email}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button type="default" className="flex items-center gap-2">
                <RiHeartFill className="text-red-500" />
                Lưu phòng khám
              </Button>
              <Button
                type="link"
                className="flex items-center gap-2 text-blue-600"
              >
                Chia sẻ <IoShareSocial />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto lg:px-16 py-12 px-4">
        <Tabs
          defaultActiveKey="1"
          size="large"
          items={[
            {
              key: "1",
              label: (
                <span className="flex items-center gap-2 px-2">Tổng quan</span>
              ),
              children: <ClinicAbout {...{ clinic }} />,
            },
            {
              key: "2",
              label: (
                <span className="flex items-center gap-2 px-2">Đánh giá</span>
              ),
              children: <ClinicReview {...{ clinic }} />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Clinic;
