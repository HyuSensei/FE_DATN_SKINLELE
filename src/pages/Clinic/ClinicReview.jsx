import { Avatar, Button, Card, Rate } from "antd";
import React from "react";
import { RiHeartFill, RiStarFill } from "react-icons/ri";

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

const ClinicReview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
      <div className="lg:col-span-2">
        {/* Rating Summary */}
        <Card hoverable>
          <div className="bg-white rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-800 mb-2">
                  {clinicData.statistics.averageRating}
                </div>
                <Rate
                  disabled
                  defaultValue={clinicData.statistics.averageRating}
                  className="text-yellow-400"
                />
                <div className="text-gray-500 mt-2">
                  {clinicData.statistics.reviewCount} đánh giá
                </div>
              </div>
              <div className="flex-1">
                <div className="space-y-2">
                  {Object.entries(clinicData.statistics.ratingDistribution)
                    .reverse()
                    .map(([rating, count]) => (
                      <div key={rating} className="flex items-center gap-4">
                        <div className="w-12 text-gray-600 font-medium">
                          {rating} sao
                        </div>
                        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                            style={{
                              width: `${
                                (count / clinicData.statistics.reviewCount) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                        <div className="w-12 text-right text-gray-500">
                          {count}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6 mt-4 shadow-lg">
          <Card hoverable>
            {clinicData.reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <Avatar src={review.user.avatar.url} size={48} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800">
                        {review.user.name}
                      </h4>
                      <span className="text-gray-500 text-sm">
                        {review.createdAt}
                      </span>
                    </div>
                    <Rate
                      disabled
                      defaultValue={review.rate}
                      className="text-yellow-400 text-sm"
                    />
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {review.content}
                    </p>

                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-3 mt-4">
                        {review.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Review ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 rounded-lg transition-colors" />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-6 mt-4 text-gray-500">
                      <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                        <RiHeartFill />
                        <span>Hữu ích ({review.likes})</span>
                      </button>
                      <button className="hover:text-blue-600 transition-colors">
                        Chia sẻ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center mt-8">
              <Button
                type="default"
                size="large"
                className="px-8 h-12 flex items-center gap-2 mx-auto hover:text-blue-600 hover:border-blue-600"
              >
                Xem thêm đánh giá
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-1">
        {/* Write Review Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sticky top-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Viết đánh giá
          </h3>
          <p className="text-gray-600 mb-6">
            Chia sẻ trải nghiệm của bạn để giúp mọi người có thêm thông tin về
            phòng khám
          </p>
          <Button
            type="primary"
            size="large"
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 border-none flex items-center justify-center gap-2"
          >
            <RiStarFill />
            Viết đánh giá
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClinicReview;
