import { Empty } from "antd";
import React from "react";
import { motion } from "framer-motion";
import { FaUserMd, FaClock, FaCalendarCheck, FaStar } from "react-icons/fa";
import { MdHealthAndSafety, MdSupportAgent } from "react-icons/md";
import { useGetClinicsByCustomerQuery } from "@/redux/clinic/clinic.query";
import { useGetDoctorsByCustomerQuery } from "@/redux/doctor/doctor.query";
import SliderDoctors from "@/components/Slider/SliderDoctors";
import SliderClinics from "@/components/Slider/SliderClinics";
import Banner from "./Banner";

const HomeBooking = () => {
  const services = [
    {
      icon: <MdHealthAndSafety color="#09957a" size={50} />,
      title: "Điều trị mụn",
      description: "Phương pháp điều trị mụn chuyên sâu, hiệu quả",
    },
    {
      icon: <FaUserMd color="#09957a" size={50} />,
      title: "Trị nám - tàn nhang",
      description: "Công nghệ laser tiên tiến, an toàn",
    },
    {
      icon: <FaClock color="#09957a" size={50} />,
      title: "Trẻ hóa da",
      description: "Liệu trình chăm sóc và trẻ hóa toàn diện",
    },
    {
      icon: <MdSupportAgent color="#09957a" size={50} />,
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
      {/* CTA Section */}
      <Banner />
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
      <div className="py-16">
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
