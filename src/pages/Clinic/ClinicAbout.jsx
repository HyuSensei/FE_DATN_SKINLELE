import EmptyData from "@/components/Error/EmptyData";
import LoadingContent from "@/components/Loading/LoaingContent";
import { useGetDoctorsByCustomerQuery } from "@/redux/doctor/doctor.query";
import { Button, Empty } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { RiStarFill, RiUserStarFill } from "react-icons/ri";
import DoctorItem from "./DoctorItem";
import { Link } from "react-router-dom";

const ClinicAbout = ({ clinic }) => {
  const [params, setParams] = useState({
    page: 1,
    pageSize: 5,
  });
  const [doctors, setDoctors] = useState([]);

  const {
    data,
    isLoading: isLoadingDoctor,
    errorDoctor,
  } = useGetDoctorsByCustomerQuery(
    { ...params, clinic: clinic._id },
    { skip: !clinic }
  );

  useEffect(() => {
    if (data && params.page === 1) {
      setDoctors(data.doctors);
    }
  }, [data]);

  const sortedHours = [...clinic.workingHours].sort((a, b) => {
    const order = {
      "Thứ 2": 1,
      "Thứ 3": 2,
      "Thứ 4": 3,
      "Thứ 5": 4,
      "Thứ 6": 5,
      "Thứ 7": 6,
      "Chủ nhật": 7,
    };
    return order[a.dayOfWeek] - order[b.dayOfWeek];
  });

  const handleSeenMore = useCallback(() => {
    if (data?.hasMore) {
      setParams((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }

    if (data?.doctors) {
      console.log(data?.doctors);

      setDoctors((prev) => {
        const existingIds = new Set(prev.map((doctor) => doctor._id));
        const newDoctors = data.doctors.filter(
          (doctor) => !existingIds.has(doctor._id)
        );
        return [...prev, ...newDoctors];
      });
    }
  }, [data?.hasMore, data?.doctors]);

  if (errorDoctor) {
    return <EmptyData description="Có lỗi xảy ra khi lấy danh sách bác sĩ" />;
  }

  if (isLoadingDoctor) return <LoadingContent />;

  if (!data) {
    return (
      <EmptyData description="Không tìm thấy thông tin bác sĩ trong phòng khám" />
    );
  }

  const { hasMore } = data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
      <div className="lg:col-span-2 space-y-8">
        {/* Giới thiệu */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Giới thiệu</h3>
          <p
            className="text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: clinic.description,
            }}
          />
        </div>

        {/* Chuyên khoa */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Chuyên khoa</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {clinic.specialties.map((specialty, index) => (
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
            {clinic.images.map((image, index) => (
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
                    <span
                      className="text-sm font-medium cursor-pointer"
                      onClick={() => {
                        window.open(image.url, "_blank");
                      }}
                    >
                      Xem ảnh
                    </span>
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
                {clinic.statistics.doctorCount}
              </div>
              <div className="text-sm text-gray-500">Bác sĩ</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <RiStarFill className="text-xl text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {clinic.statistics.averageRating}/5
              </div>
              <div className="text-sm text-gray-500">Đánh giá</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Đội ngũ bác sĩ
          </h3>
          <div className="space-y-4">
            {!doctors.length && !isLoadingDoctor && (
              <Empty description="Chưa có thông tin bác sĩ" />
            )}
            {doctors.length > 0 &&
              doctors.map((doctor, index) => (
                <Link key={index} to={`/doctor-detail/${doctor.slug}`}>
                  <DoctorItem {...{ doctor }} />
                </Link>
              ))}
            {hasMore && (
              <Button
                onClick={handleSeenMore}
                type="link"
                className="w-full flex items-center justify-center gap-2 text-blue-600 mt-4"
              >
                Xem thêm
              </Button>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            Thời gian làm việc
          </h3>
          <div className="space-y-3">
            {sortedHours.map(
              (schedule) =>
                schedule.isOpen && (
                  <div
                    key={schedule._id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-600">{schedule.dayOfWeek}</span>
                    <span className="font-medium">
                      {`${schedule.startTime} - ${schedule.endTime}`}
                    </span>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicAbout;
