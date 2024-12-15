import React, { useState, useEffect } from "react";
import { Card, DatePicker, Empty, Skeleton, Tag } from "antd";
import dayjs from "dayjs";
import {
  FaCalendarCheck,
  FaUserMd,
  FaStar,
  FaChartLine,
  FaRegClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCheck,
  FaMoneyBillWave,
} from "react-icons/fa";
import { formatPrice } from "@/helpers/formatPrice";
import locale from "antd/es/date-picker/locale/vi_VN";
import { useGetStatsClinicOverviewQuery } from "@/redux/statistical/statistical.query";
import { useSelector } from "react-redux";

const StatisticalOverView = () => {
  const [date, setDate] = useState(dayjs());
  const [stats, setStats] = useState(null);
  const { clinic } = useSelector((state) => state.auth.adminInfo);

  const { data, isLoading, error } = useGetStatsClinicOverviewQuery(
    { clinicId: clinic?._id, year: date.year(), month: date.month() + 1 },
    { skip: !clinic }
  );

  if (error) {
    return <Empty description="Đã có lỗi xảy ra khi lấy dữ liệu" />;
  }

  useEffect(() => {
    if (data) {
      setStats(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="p-8">
        <Skeleton active />
      </div>
    );
  }

  if (!stats && !isLoading)
    return <Empty description="Không có dữ liệu vui lòng thử lại !" />;

  return (
    <div className="mb-10">
      <div className="mx-auto">
        <div className="mb-8 flex justify-between items-center flex-wrap gap-2">
          <div>
            <div className="font-bold text-2xl uppercase">
              Thống kê tổng quan
            </div>
            <p className="text-gray-500 mt-2">
              💡 Tổng hợp hoạt động kinh doanh
            </p>
          </div>
          <DatePicker.MonthPicker
            local={locale}
            value={date}
            onChange={(value) => {
              setDate(value);
            }}
            allowClear={false}
            className="w-44"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Booking Stats */}
          <Card
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-2xl border-none"
            style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
            }}
          >
            <div className="text-white mb-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Lịch khám</span>
              <FaCalendarCheck className="text-2xl opacity-80" />
            </div>
            <div className="text-white text-3xl font-bold mb-6">
              {stats.bookings.total}
              <span className="text-sm font-normal ml-2">lịch khám</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: FaRegClock,
                  label: "Chờ xử lý",
                  value: stats.bookings.status.pending,
                  color: "rgba(255,255,255,0.9)",
                },
                {
                  icon: FaCheck,
                  label: "Xác nhận",
                  value: stats.bookings.status.confirmed,
                  color: "rgba(255,255,255,0.9)",
                },
                {
                  icon: FaTimesCircle,
                  label: "Đã hủy",
                  value: stats.bookings.status.cancelled,
                  color: "rgba(255,255,255,0.9)",
                },
                {
                  icon: FaCheckCircle,
                  label: "Hoàn thành",
                  value: stats.bookings.status.completed,
                  color: "rgba(255,255,255,0.9)",
                },
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-white/80 text-xs mb-1">
                    <item.icon />
                    <span>{item.label}</span>
                  </div>
                  <div className="text-white text-lg font-semibold">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Revenue Stats */}
          <Card
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-2xl border-none"
            style={{
              background: "linear-gradient(135deg, #10B981 0%, #047857 100%)",
            }}
          >
            <div className="text-white mb-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Doanh thu</span>
              <FaMoneyBillWave className="text-2xl opacity-80" />
            </div>
            <div className="space-y-6">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-white/80 text-sm mb-2">
                  Doanh thu thực tế
                </div>
                <div className="text-white text-2xl font-bold">
                  {formatPrice(stats.bookings.revenue.actual, true)} VND
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-white/80 text-sm mb-2">
                  Doanh số tiềm năng
                </div>
                <div className="text-white text-2xl font-bold">
                  {formatPrice(stats.bookings.revenue.potential, true)} VND
                </div>
              </div>
            </div>
          </Card>

          {/* Doctor Stats */}
          <Card
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-2xl border-none"
            style={{
              background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
            }}
          >
            <div className="text-white mb-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Bác sĩ</span>
              <FaUserMd className="text-2xl opacity-80" />
            </div>
            <div className="text-white text-3xl font-bold mb-6">
              {stats.doctors.total}
              <span className="text-sm font-normal ml-2">bác sĩ</span>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-white/80 text-sm mb-3">Chuyên khoa</div>
              <div className="flex flex-wrap gap-2">
                {stats.doctors.specialties
                  .slice(0, 3)
                  .map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 text-white rounded-full text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                {stats.doctors.specialties.length > 3 && (
                  <Tag className="rounded-full bg-gray-50 text-gray-600 border-gray-100">
                    +{stats.doctors.specialties.length - 3}
                  </Tag>
                )}
              </div>
            </div>
          </Card>

          {/* Review Stats */}
          <Card
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-2xl border-none"
            style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            }}
          >
            <div className="text-white mb-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Đánh giá</span>
              <FaStar className="text-2xl opacity-80" />
            </div>
            <div className="bg-white/10 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-white/80 text-sm">Điểm trung bình</div>
                <div className="text-white text-2xl font-bold">
                  {stats.reviews.average}/5
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.reviews.average / 5) * 100}%` }}
                />
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-white/80 text-sm mb-2">Tổng số đánh giá</div>
              <div className="text-white text-2xl font-bold">
                {stats.reviews.total}
              </div>
            </div>
          </Card>
        </div>

        {/* Completion Rate */}
        <Card
          className="mt-8 transform transition-all duration-300 hover:shadow-xl rounded-2xl border-none"
          style={{
            background: "linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)",
          }}
        >
          <div className="text-white mb-4 flex justify-between items-center">
            <div>
              <span className="text-lg font-semibold">Tỷ lệ hoàn thành</span>
              <p className="text-white/60 text-sm mt-1">
                Tỷ lệ lịch khám được hoàn thành thành công
              </p>
            </div>
            <FaChartLine className="text-2xl opacity-80" />
          </div>
          <div className="flex items-center gap-6">
            <div className="text-white text-4xl font-bold">
              {stats.bookings.completionRate}%
            </div>
            <div className="flex-1">
              <div className="w-full bg-white/20 rounded-full h-6">
                <div
                  className="bg-white rounded-full h-6 transition-all duration-500 flex items-center justify-end pr-3"
                  style={{ width: `${stats.bookings.completionRate}%` }}
                >
                  <span className="text-indigo-700 text-sm font-semibold">
                    {Math.round(stats.bookings.completionRate)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StatisticalOverView;
