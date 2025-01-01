import React, { useCallback, useEffect, useState } from "react";
import Banner from "./Banner";
import { motion } from "framer-motion";
import { Button, Spin } from "antd";
import { FaVideo } from "react-icons/fa";
import { FaClock, FaRegCalendarCheck } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";
import DoctorConsultationCard from "./DoctorConsultationCard";
import { useGetDoctorsByCustomerQuery } from "@/redux/doctor/doctor.query";

const OnlineConsultation = () => {
  const [paginate, setPaginate] = useState({ page: 1, pageSize: 12 });
  const { data: dataDoctors, isLoading: isLoadingDoctors } =
    useGetDoctorsByCustomerQuery({
      ...paginate,
    });
  const [doctors, setDoctors] = useState(dataDoctors?.doctors || []);

  useEffect(() => {
    if (dataDoctors?.doctors) {
      if (paginate.page === 1) {
        setDoctors(dataDoctors.doctors);
      } else {
        setDoctors((prev) => {
          const existingIds = new Set(prev.map((doctor) => doctor._id));
          const newDoctors = dataDoctors.doctors.filter(
            (doctor) => !existingIds.has(doctor._id)
          );
          return [...prev, ...newDoctors];
        });
      }
    }
  }, [dataDoctors, paginate.page]);

  const handleSeeMore = useCallback(() => {
    if (dataDoctors?.hasMore) {
      setPaginate((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  }, [dataDoctors?.hasMore]);

  const { hasMore = false } = dataDoctors || {};

  return (
    <>
      <Banner />
      <div className="container mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Bác sĩ đang trực tuyến</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Các bác sĩ da liễu giàu kinh nghiệm đang sẵn sàng tư vấn cho bạn.
            Chọn một bác sĩ để bắt đầu phiên tư vấn video call hoặc đặt lịch cho
            thời gian phù hợp.
          </p>
        </div>

        {/* Quick Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center"
          >
            <FaVideo className="text-3xl text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Tư vấn ngay</h3>
            <p className="text-sm text-gray-600">
              Kết nối ngay với bác sĩ đang trực tuyến
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center"
          >
            <FaRegCalendarCheck className="text-3xl text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Đặt lịch hẹn</h3>
            <p className="text-sm text-gray-600">
              Chọn thời gian tư vấn phù hợp với bạn
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center"
          >
            <FaClock className="text-3xl text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Theo dõi liên tục</h3>
            <p className="text-sm text-gray-600">
              Được bác sĩ theo dõi điều trị dài hạn
            </p>
          </motion.div>
        </div>

        {/* Online Doctors List */}
        <Spin tip="Loading..." spinning={isLoadingDoctors}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {doctors.map((doctor, index) => (
              <DoctorConsultationCard key={index} doctor={doctor} />
            ))}
          </div>

          {/* View All Button */}
          {hasMore && (
            <div className="text-center mt-8">
              <Button
                onClick={handleSeeMore}
                type="default"
                size="large"
                icon={<BsArrowRight className="ml-2" />}
                className="font-medium"
              >
                Xem tất cả bác sĩ
              </Button>
            </div>
          )}
        </Spin>
      </div>
    </>
  );
};

export default OnlineConsultation;
