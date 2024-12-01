import React from "react";
import { Tabs, Button } from "antd";
import {
  RiMapPinFill,
  RiPhoneFill,
  RiMailFill,
  RiCalendarFill,
  RiUserStarFill,
  RiHeartFill,
} from "react-icons/ri";
import { IoShareSocial } from "react-icons/io5";
import { GiRoundStar } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import ClinicAbout from "./ClinicAbout/ClinicAbout";
import ClinicReview from "./ClinicReview/ClinicReview";
import CustomButton from "@components/CustomButton/CustomButton";

// Mock Data
const clinicData = {
  name: "Phòng Khám Da Liễu SkinCare Premium",
  logo: {
    url: "",
  },
  address: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
  phone: "0923456789",
  email: "contact@skincare.com",
  description:
    "Phòng khám chuyên khoa Da liễu SkinCare với đội ngũ bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại, cam kết mang đến dịch vụ chăm sóc da tốt nhất cho khách hàng.",
  specialties: [
    "Da liễu",
    "Thẩm mỹ da",
    "Điều trị mụn",
    "Điều trị nám",
    "Trẻ hóa da",
    "Điều trị sẹo",
  ],
  images: [
    {
      url: "https://dalieuhanoi.com/wp-content/uploads/2017/10/phong-kham-da-lieu-ha-noi.jpg",
    },
    {
      url: "https://isofhcare-backup.s3-ap-southeast-1.amazonaws.com/images/benh-nhan-dang-doi-kham-tai-phong-kham-da-lieu-ha-noi-ivie_df455ea4_40b3_44d8_9d1f_9c4ad8bd30eb.jpg",
    },
    {
      url: "https://cdn.eva.vn/upload/2-2020/images/2020-06-26/phong-kham-da-lieu-ha-noi-dia-chi-tri-mun-uy-tin-anh-1-1593139759-505-width660height495.jpg",
    },
    {
      url: "https://ohay.vn/blog/wp-content/uploads/2022/05/phong-kham-da-lieu-vinh-long1-min.jpg",
    },
  ],
  statistics: {
    doctorCount: 12,
    reviewCount: 150,
    averageRating: 4.8,
    ratingDistribution: {
      5: 80,
      4: 45,
      3: 15,
      2: 7,
      1: 3,
    },
  },
  doctors: [
    {
      id: 1,
      name: "Dr. Nguyễn Văn A",
      specialty: "Da liễu",
      experience: 10,
      avatar: {
        url: "https://cdn.bookingcare.vn/fo/w384/2021/10/07/145448-bs-lan.jpg",
      },
      verified: true,
      rating: 4.9,
      reviewCount: 120,
    },
    {
      id: 2,
      name: "Dr. Trần Thị B",
      specialty: "Thẩm mỹ da",
      experience: 8,
      avatar: {
        url: "https://cdn.bookingcare.vn/fo/w384/2024/02/07/092226-pgs-thanh-binh-c1.jpg",
      },
      verified: true,
      rating: 4.8,
      reviewCount: 98,
    },
    {
      id: 3,
      name: "Dr. Lê Văn C",
      specialty: "Điều trị mụn",
      experience: 12,
      avatar: {
        url: "https://cdn.bookingcare.vn/fo/w384/2021/01/14/160049-bs-hoai-huong.jpg",
      },
      verified: true,
      rating: 4.7,
      reviewCount: 156,
    },
  ],
  reviews: [
    {
      id: 1,
      user: { name: "Nguyễn Văn X", avatar: { url: "/api/placeholder/40/40" } },
      rate: 5,
      content:
        "Phòng khám rất chuyên nghiệp, bác sĩ tư vấn tận tình. Tôi đã điều trị mụn ở đây và kết quả rất tốt.",
      createdAt: "2024-02-15",
      likes: 24,
      images: ["/api/placeholder/100/100", "/api/placeholder/100/100"],
    },
    {
      id: 2,
      user: { name: "Trần Thị Y", avatar: { url: "/api/placeholder/40/40" } },
      rate: 4,
      content:
        "Dịch vụ tốt, không gian thoáng mát, sạch sẽ. Nhân viên nhiệt tình, chu đáo.",
      createdAt: "2024-02-10",
      likes: 16,
      images: ["/api/placeholder/100/100"],
    },
  ],
};

const Clinic = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden bg-gradient-to-r from-sky-100 via-cyan-200 to-sky-100">
        <div className="absolute inset-0 bg-black/30"></div>
        <img
          src="/api/placeholder/1920/400"
          alt="clinic hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
              <div className="flex-1 flex items-center gap-4">
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaFbcM89sOm_g_1d4GK0dw0Reg7SgdOnKDDPkLibWWzYep2O_xAo7UAC-zEGtS1D_8M_o&usqp=CAU" ||
                    clinicData.logo.url
                  }
                  className="h-20 w-20 lg:h-28 lg:w-28 rounded-full"
                />
                <div className="text-white md:text-left pb-0 md:pb-4 w-full">
                  <h1 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                    {clinicData.name}
                  </h1>

                  <div className="flex items-center gap-8 text-sm mt-4 md:text-base">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <GiRoundStar color="#fbcb18" />
                      <span>{clinicData.statistics.averageRating}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <RiUserStarFill color="#fcf8d2" />
                      <span className="whitespace-nowrap">
                        {clinicData.statistics.reviewCount} đánh giá
                      </span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <MdVerified color="#5ad7ff" />
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
                  <p className="font-medium text-sm">{clinicData.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <RiPhoneFill className="text-green-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Số điện thoại</p>
                  <p className="font-medium text-sm">{clinicData.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <RiMailFill className="text-sky-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium text-sm">{clinicData.email}</p>
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
      <div className="mx-auto lg:px-16 py-12">
        <Tabs
          defaultActiveKey="1"
          size="large"
          className="bg-white rounded-xl shadow-sm p-6"
          items={[
            {
              key: "1",
              label: (
                <span className="flex items-center gap-2 px-2">Tổng quan</span>
              ),
              children: <ClinicAbout />,
            },
            {
              key: "2",
              label: (
                <span className="flex items-center gap-2 px-2">Đánh giá</span>
              ),
              children: <ClinicReview />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Clinic;
