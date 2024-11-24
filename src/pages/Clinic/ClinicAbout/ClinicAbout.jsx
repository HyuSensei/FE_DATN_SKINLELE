import { Avatar, Button } from "antd";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdOutlineVerified } from "react-icons/md";
import { RiStarFill, RiUserStarFill } from "react-icons/ri";

const clinicData = {
  name: "Phòng khám Da liễu SkinCare Premium",
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

const ClinicAbout = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
      <div className="lg:col-span-2 space-y-8">
        {/* Giới thiệu */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Giới thiệu</h3>
          <p className="text-gray-600 leading-relaxed">
            {clinicData.description}
          </p>
        </div>

        {/* Chuyên khoa */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Chuyên khoa</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {clinicData.specialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <BsFillCheckCircleFill className="text-xl text-blue-600" />
                </div>
                <span className="font-medium text-gray-700">{specialty}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hình ảnh */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Hình ảnh phòng khám
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {clinicData.images.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl"
              >
                <img
                  src={image.url}
                  alt={`Clinic ${index + 1}`}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-sm font-medium">Xem ảnh</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 space-y-8">
        {/* Thống kê */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <h3 className="text-xl font-bold text-gray-800">Thống kê</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <RiUserStarFill className="text-xl text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {clinicData.statistics.doctorCount}
              </div>
              <div className="text-sm text-gray-500">Bác sĩ</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <RiStarFill className="text-xl text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {clinicData.statistics.averageRating}/5
              </div>
              <div className="text-sm text-gray-500">Đánh giá</div>
            </div>
          </div>
        </div>

        {/* Đội ngũ bác sĩ */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Đội ngũ bác sĩ
          </h3>
          <div className="space-y-4">
            {clinicData.doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-xl p-4 hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-center gap-4 flex-wrap justify-center">
                  <Avatar
                    src={doctor.avatar.url}
                    size={56}
                    className="border-2 border-blue-100"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">
                        {doctor.name}
                      </h4>
                      {doctor.verified && (
                        <MdOutlineVerified color="#5ad7ff" size={18} />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {doctor.specialty} • {doctor.experience} năm kinh nghiệm
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <RiStarFill className="text-yellow-400" />
                        <span>{doctor.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">
                        {doctor.reviewCount} đánh giá
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="link"
              className="w-full flex items-center justify-center gap-2 text-blue-600 mt-4"
            >
              Xem tất cả bác sĩ
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            Thời gian làm việc
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Thứ 2 - Thứ 6</span>
              <span className="font-medium">08:00 - 20:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Thứ 7</span>
              <span className="font-medium">08:00 - 17:30</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Chủ nhật</span>
              <span className="font-medium">08:00 - 12:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicAbout;
