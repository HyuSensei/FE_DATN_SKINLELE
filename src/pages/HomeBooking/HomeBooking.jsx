import { Tag, Rate, Card } from "antd";
import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { FaUserMd, FaClock, FaCalendarCheck, FaStar } from "react-icons/fa";
import { MdHealthAndSafety, MdSupportAgent } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import CustomButton from "@components/CustomButton/CustomButton";

const HomeBooking = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stats = [
    { number: "1.500.000 +", text: "LƯỢT TRUY CẬP/THÁNG" },
    { number: "2.000 +", text: "BÁC SĨ" },
    { number: "300.000 +", text: "NGƯỜI ĐÃ SỬ DỤNG" },
    { number: "300 +", text: "PHÒNG KHÁM" },
  ];

  const clinics = [
    {
      name: "Phòng khám Da liễu Premium",
      image:
        "https://dichvuyduoc.net/wp-content/uploads/2024/05/phong-kham-da-lieu-mercy-bi-phat-vi-loat-vi-pham-y-te-2.jpg",
      rating: 4.8,
      reviews: 128,
      specialties: ["Da liễu thẩm mỹ", "Trị mụn", "Laser"],
      address: "123 Đường ABC, Quận 1, TP.HCM",
    },
    {
      name: "Skincare Clinic Center",
      image:
        "https://cdn-healthcare.hellohealthgroup.com/2023/07/1689147368_64ae57e80ed444.10827502.jpg",
      rating: 4.9,
      reviews: 156,
      specialties: ["Trẻ hóa da", "Điều trị nám", "Spa"],
      address: "456 Đường XYZ, Quận 3, TP.HCM",
    },
    {
      name: "Beauty Dermatology",
      image:
        "https://cdn-healthcare.hellohealthgroup.com/2022/11/1668051679_636c72df6c0111.96671518.jpg",
      rating: 4.7,
      reviews: 98,
      specialties: ["Điều trị sẹo", "Căng da", "Skincare"],
      address: "789 Đường DEF, Quận 2, TP.HCM",
    },
  ];

  const doctors = [
    {
      name: "BS. Nguyễn Văn A",
      image:
        "https://cdn.bookingcare.vn/fo/w384/2019/12/31/155650-gs-ha-van-quyet.jpg",
      specialty: "Da liễu thẩm mỹ",
      experience: "15 năm kinh nghiệm",
      rating: 4.9,
      reviews: 234,
    },
    {
      name: "BS. Trần Thị B",
      image:
        "https://cdn.bookingcare.vn/fo/w384/2022/12/14/104636-bs-truong-thi-tuyet-hoa.jpg",
      specialty: "Điều trị nám & tàn nhang",
      experience: "12 năm kinh nghiệm",
      rating: 4.8,
      reviews: 186,
    },
    {
      name: "BS. Lê Văn C",
      image: "https://cdn.bookingcare.vn/fo/w384/2021/10/07/145448-bs-lan.jpg",
      specialty: "Trị liệu da chuyên sâu",
      experience: "10 năm kinh nghiệm",
      rating: 4.7,
      reviews: 156,
    },
  ];

  const services = [
    {
      icon: <MdHealthAndSafety color="#f4dd22" size={50} />,
      title: "Điều trị mụn",
      description: "Phương pháp điều trị mụn chuyên sâu, hiệu quả",
    },
    {
      icon: <FaUserMd color="#f4dd22" size={50} />,
      title: "Trị nám - tàn nhang",
      description: "Công nghệ laser tiên tiến, an toàn",
    },
    {
      icon: <FaClock color="#f4dd22" size={50} />,
      title: "Trẻ hóa da",
      description: "Liệu trình chăm sóc và trẻ hóa toàn diện",
    },
    {
      icon: <MdSupportAgent color="#f4dd22" size={50} />,
      title: "Tư vấn da liễu",
      description: "Đội ngũ bác sĩ giàu kinh nghiệm tư vấn",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[550px] w-full overflow-hidden pt-10">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(59, 100, 100, 0.5), rgba(59, 99, 50, 0.5)), 
              url('https://images.squarespace-cdn.com/content/v1/591c613d03596e365f052329/1528897715162-PNJDO1JXGGKMEW7Q6MBY/Banner-6.jpg?format=1000w')`,
          }}
        />

        <div className="container mx-auto px-4 py-16">
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2">
            <motion.div
              className="flex flex-col justify-center text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="mb-4 text-2xl lg:text-4xl font-bold"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                Chăm Sóc Sức Khỏe Làn Da Của Bạn
              </motion.div>
              <motion.div
                className="mb-8 text-lg lg:text-xl font-light"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
              >
                Đặt lịch khám với các bác sĩ da liễu hàng đầu
              </motion.div>
              <motion.button
                className="w-fit rounded-full bg-yellow-400 px-8 py-3 font-semibold text-white transition-all hover:bg-yellow-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ĐẶT LỊCH NGAY
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-2 gap-1 lg:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.div
                    className="text-3xl font-bold md:text-4xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {stat.number}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Tag className="mt-1 opacity-80" color="#6c9bbf">
                      <div className="p-1 text-sm">{stat.text}</div>
                    </Tag>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 uppercase">
            Dịch vụ phòng khám
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gradient-to-t from-[#ebe8fb] to-fuchsia-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col items-center text-center">
                  {service.icon}
                  <h3 className="mt-4 text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Doctors Section */}
      <div className="py-16 bg-gradient-to-r from-slate-50 via-fuchsia-50 to-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 uppercase">
            Bác Sĩ Nổi Bật
          </h2>
          <Slider {...sliderSettings}>
            {doctors.map((doctor, index) => (
              <div key={index} className="px-4 py-2">
                <Card hoverable className="text-center shadow-md">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-32 h-32 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold">{doctor.name}</h3>
                  <p className="text-blue-600 mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600 mb-2">{doctor.experience}</p>
                  <div className="flex justify-center items-center gap-2">
                    <Rate disabled defaultValue={doctor.rating} />
                    <span className="text-gray-500">
                      ({doctor.reviews} đánh giá)
                    </span>
                  </div>
                  <button className="mt-4 bg-gradient-to-r from-[#6c9bbf] via-[#6c9bbf] to-[#58b8d8] w-full py-3 rounded-full text-base font-medium text-white">
                    Đặt Lịch Khám
                  </button>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Featured Clinics Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 uppercase">
            Phòng Khám Nổi Bật
          </h2>
          <div className="px-4">
            <Slider
              {...sliderSettings}
              dots={false}
              className="clinic-slider -mx-4"
            >
              {clinics.map((clinic, index) => (
                <div key={index} className="px-4">
                  <motion.div
                    className="bg-white rounded-xl shadow-lg overflow-hidden h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative">
                      <img
                        src={clinic.image}
                        alt={clinic.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                        <h3 className="text-xl font-semibold text-white">
                          {clinic.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Rate
                          disabled
                          defaultValue={clinic.rating}
                          className="text-sm"
                        />
                        <span className="text-gray-600 text-sm">
                          ({clinic.reviews} đánh giá)
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {clinic.specialties.map((specialty, idx) => (
                          <Tag
                            key={idx}
                            className="rounded-full bg-blue-100 text-[#6c9bbf] border-blue-200"
                          >
                            {specialty}
                          </Tag>
                        ))}
                      </div>
                      <div className="flex items-start gap-2 text-gray-600 mb-6">
                        <FaLocationDot className="mt-1 flex-shrink-0" />
                        <span className="text-sm">{clinic.address}</span>
                      </div>
                      <button className="mt-4 bg-gradient-to-r from-[#6c9bbf] via-[#6c9bbf] to-[#58b8d8] w-full py-3 rounded-full text-base font-medium text-white">
                        Xem chi tiết
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* Booking Steps Section */}
      <div className="py-16 bg-gradient-to-r from-sky-100 via-slate-50 to-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 uppercase">
            Quy Trình Đặt Lịch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserMd className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chọn Bác Sĩ</h3>
              <p className="text-gray-600">
                Lựa chọn bác sĩ phù hợp với nhu cầu của bạn
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarCheck className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chọn Lịch Khám</h3>
              <p className="text-gray-600">
                Đặt lịch vào thời gian phù hợp với bạn
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Xác Nhận Đặt Lịch</h3>
              <p className="text-gray-600">
                Nhận xác nhận và reminder trước ngày khám
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        {/* Background with animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-purple-400 to-pink-300 animate-gradient-x"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-2xl">✨</span> Bắt đầu hành trình chăm sóc
              làn da của bạn
            </motion.h2>

            <motion.p
              className="text-lg text-white/90 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Đội ngũ bác sĩ chuyên khoa da liễu hàng đầu sẽ đồng hành cùng bạn
              <span className="text-2xl"> ✨</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                className="px-8 py-4 bg-white text-[#4f637e] rounded-full font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
                whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.95 }}
              >
                ĐẶT LỊCH KHÁM NGAY
              </motion.button>

              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                TƯ VẤN MIỄN PHÍ
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBooking;
