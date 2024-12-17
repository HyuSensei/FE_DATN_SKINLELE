import { Empty } from "antd";
import React from "react";
import { motion } from "framer-motion";
import { FaUserMd, FaClock, FaCalendarCheck, FaStar } from "react-icons/fa";
import { MdHealthAndSafety, MdSupportAgent } from "react-icons/md";
import { useGetClinicsByCustomerQuery } from "@/redux/clinic/clinic.query";
import { useGetDoctorsByCustomerQuery } from "@/redux/doctor/doctor.query";
import SliderDoctors from "@/components/Slider/SliderDoctors";
import SliderClinics from "@/components/Slider/SliderClinics";

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

  const {
    data: dataClinics,
    isLoading: isLoadingClinics,
    error: errorClinics,
  } = useGetClinicsByCustomerQuery({});

  const {
    data: dataDoctors,
    isLoading: isLoadingDoctors,
    error: errorDoctors,
  } = useGetDoctorsByCustomerQuery({});

  const clinics = dataClinics ? dataClinics.clinics : [];
  const doctors = dataDoctors ? dataDoctors.doctors : [];

  return (
    <>
      {/* Hero Section */}
      {/* <div className="relative h-[550px] w-full overflow-hidden pt-10">
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

        <div className="container mx-auto px-4 py-20">
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
      </div> */}

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden h-[550px] lg:h-[600px]">
        {/* Background with animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-purple-400 to-pink-300 animate-gradient-x"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </div>

        {/* Left Doctor Image */}
        <motion.div
          className="absolute left-0 bottom-0 hidden lg:block"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <motion.img
            src="https://res.cloudinary.com/dt8cdxgji/image/upload/v1733565378/upload-static-skinlele/saivtrzyttq04wmopbfr.png"
            alt="Doctor 1"
            className="h-[500px] w-auto object-cover"
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Right Doctor Image */}
        <motion.div
          className="absolute right-0 bottom-0 hidden lg:block"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
          }}
        >
          <motion.img
            src="https://res.cloudinary.com/dt8cdxgji/image/upload/v1733566261/upload-static-skinlele/cud44odknmahayujszkx.png"
            alt="Doctor 2"
            className="h-[500px] w-auto object-cover"
            animate={{ y: [10, -10, 10] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-white mb-6 mt-20 "
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-2xl animate-bounce inline-block">✨</span>
                <span>Bắt đầu hành trình chăm sóc làn da của bạn</span>
              </motion.h2>

              <motion.p
                className="text-lg text-white/90 mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Đội ngũ bác sĩ chuyên khoa da liễu hàng đầu sẽ đồng hành cùng
                bạn{" "}
                <span className="text-2xl animate-bounce inline-block">✨</span>
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button
                  className="px-8 py-4 bg-white text-[#4f637e] rounded-full font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all group"
                  whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="group-hover:mr-2 transition-all">
                    ĐẶT LỊCH KHÁM NGAY
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-all">
                    →
                  </span>
                </motion.button>

                <motion.button
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="group-hover:mr-2 transition-all">
                    TƯ VẤN MIỄN PHÍ
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-all">
                    →
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
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

      {/* Featured Doctors Section */}
      <div className="py-16 bg-gradient-to-r from-slate-50 via-fuchsia-50 to-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 uppercase">
            Bác Sĩ Nổi Bật
          </h2>
          {(!isLoadingDoctors && !doctors.length) ||
            (errorDoctors && <Empty description="Chưa có thông tin bác" />)}
          <SliderDoctors {...{ doctors, isLoading: isLoadingDoctors }} />
        </div>
      </div>

      {/* Featured Clinics Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 uppercase">
            Phòng Khám Nổi Bật
          </h2>
          <div className="px-4">
            {(!isLoadingClinics && !clinics.length) ||
              (errorClinics && <Empty description="Chưa có phòng khám nào" />)}
            <SliderClinics {...{ clinics, isLoading: isLoadingClinics }} />
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
    </>
  );
};

export default HomeBooking;
