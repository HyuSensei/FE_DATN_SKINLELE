import React, { useState } from "react";
import { Tabs, Button, Empty, Dropdown } from "antd";
import {
  RiMapPinFill,
  RiPhoneFill,
  RiMailFill,
  RiUserStarFill,
} from "react-icons/ri";
import { IoShareSocial } from "react-icons/io5";
import { GiRoundStar } from "react-icons/gi";
import { MdEmail, MdVerified } from "react-icons/md";
import ClinicAbout from "./ClinicAbout";
import ClinicReview from "./ClinicReview";
import { useParams } from "react-router-dom";
import { useGetClinicDetailBySlugQuery } from "@/redux/clinic/clinic.query";
import {
  FaFacebook,
  FaLinkedin,
  FaSquareXTwitter,
  FaTelegram,
} from "react-icons/fa6";
import { socialShare } from "@/utils/socialShare";
import { FaWhatsappSquare } from "react-icons/fa";
import LoadingClinic from "@/components/Loading/LoadingClinic";

const FE_URL = import.meta.env.VITE_APP_FE_URL;

const Clinic = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("1");

  const {
    data: clinic,
    isLoading: isLoadingClinic,
    error: errorClinic,
    refetch,
  } = useGetClinicDetailBySlugQuery({ slug }, { skip: !slug });

  if (errorClinic) {
    return (
      <Empty
        className="mt-32"
        description="Có lỗi khi tải thông tin phòng khám"
      />
    );
  }

  if (isLoadingClinic) return <LoadingClinic />;

  if (!clinic) {
    return (
      <Empty
        className="mt-32"
        description="Không tìm thấy thông tin phòng khám"
      />
    );
  }

  const menuItems = [
    {
      key: "fb",
      label: (
        <div className="flex gap-2 items-center">
          <FaFacebook size={20} className="text-[#1877F2]" />
          Chia sẻ lên Facebook
        </div>
      ),
      onClick: () => {
        socialShare.facebook({ url: `${FE_URL}/clinic-detail/${clinic.slug}` });
      },
    },
    {
      key: "twitter",
      label: (
        <div className="flex gap-2 items-center">
          <FaSquareXTwitter size={20} className="text-black" />
          Chia sẻ lên X (Twitter)
        </div>
      ),
      onClick: () => {
        socialShare.twitter({
          url: `${FE_URL}/clinic-detail/${clinic.slug}`,
        });
      },
    },
    {
      key: "linkedin",
      label: (
        <div className="flex gap-2 items-center">
          <FaLinkedin size={20} className="text-[#0A66C2]" />
          Chia sẻ lên LinkedIn
        </div>
      ),
      onClick: () => {},
    },
    {
      key: "telegram",
      label: (
        <div className="flex gap-2 items-center">
          <FaTelegram size={20} className="text-[#26A5E4]" />
          Chia sẻ lên Telegram
        </div>
      ),
      onClick: () => {
        socialShare.telegram({
          url: `${FE_URL}/clinic-detail/${clinic.slug}`,
        });
      },
    },
    {
      key: "whatsapp",
      label: (
        <div className="flex gap-2 items-center">
          <FaWhatsappSquare size={20} className="text-[#25D366]" />
          Chia sẻ lên WhatsApp
        </div>
      ),
      onClick: () => {
        socialShare.whatsapp({
          url: `${FE_URL}/clinic-detail/${clinic.slug}`,
        });
      },
    },
    {
      key: "email",
      label: (
        <div className="flex gap-2 items-center">
          <MdEmail size={20} className="text-[#EA4335]" />
          Chia sẻ qua Email
        </div>
      ),
      onClick: () => {
        socialShare.email({
          url: `${FE_URL}/clinic-detail/${clinic.slug}`,
        });
      },
    },
  ];

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
                      <GiRoundStar color="#fbcb18" size={24} />
                      <span>{clinic.statistics.averageRating}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <RiUserStarFill color="#fcf8d2" size={24} />
                      <span className="whitespace-nowrap">
                        {clinic.statistics.reviewCount} đánh giá
                      </span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <MdVerified color="#5ad7ff" size={24} />
                      <span className="whitespace-nowrap">Đã xác thực</span>
                    </div>
                  </div>
                </div>
              </div>
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
              {/* <Button type="default" className="flex items-center gap-2">
                <RiHeartFill className="text-red-500" />
                Lưu phòng khám
              </Button> */}
              <Dropdown
                menu={{ items: menuItems }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button
                  type="link"
                  className="flex items-center gap-2 text-blue-600"
                >
                  Chia sẻ <IoShareSocial />
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto lg:px-16 py-12 px-4">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
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
              children: (
                <ClinicReview {...{ clinic, refetchClinic: refetch }} />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Clinic;
