import React, { useState } from "react";
import { DatePicker, Spin, Empty, Card } from "antd";
import {
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  StarOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import locale from "antd/locale/vi_VN";
import { useGetStatisticalDoctorQuery } from "@/redux/doctor/doctor.query";
import { formatPrice } from "@/helpers/formatPrice";

// Helper to define card title and icon
const CardInfo = ({ icon, color, title, value }) => (
  <Card
    bordered={false}
    className="hover:shadow-lg transition-shadow duration-300"
    style={{
      background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
      boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37)`,
    }}
  >
    <div className="flex items-center space-x-2">
      {icon}
      <h3 className={`text-sm font-medium text-${color}-600`}>{title}</h3>
    </div>
    <p className={`mt-4 text-3xl font-bold text-${color}-900`}>{value}</p>
  </Card>
);

export default function ManageStatistic({ activeMenu }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const { data, isLoading, error } = useGetStatisticalDoctorQuery(
    {
      year,
      month,
    },
    { skip: activeMenu !== "statistics" }
  );

  const handleMonthChange = (date) => {
    if (date) {
      setMonth(date.month() + 1);
      setYear(date.year());
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !data) return <Empty description="Đã xảy ra lỗi" />;

  const { averageRating, totalReviews, stats, totalStats } = data;

  return (
    <div className="space-y-6 mt-4">
      <div className="flex justify-between items-center">
        <div className="text-base font-medium text-gray-700">
          Thống kê cho chi tiết các hoạt động đặt lịch của bác sĩ
        </div>
        <DatePicker
          locale={locale}
          picker="month"
          value={dayjs(`${year}-${month}`)}
          onChange={handleMonthChange}
          format="MM/YYYY"
          allowClear={false}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Component */}
        {[
          {
            icon: <CalendarOutlined className="text-xl text-blue-600" />,
            color: "#3063d5",
            title: "Tổng lượt đặt",
            value: totalStats.totalBookings,
          },
          {
            icon: <CheckOutlined className="text-xl text-green-600" />,
            color: "#30a978",
            title: "Đã hoàn thành",
            value: totalStats.completed,
          },
          {
            icon: <CloseOutlined className="text-xl text-red-600" />,
            color: "#c13338",
            title: "Đã hủy",
            value: totalStats.cancelled,
          },
          {
            icon: <ClockCircleOutlined className="text-xl text-orange-600" />,
            color: "#d96c2e",
            title: "Đang chờ",
            value: totalStats.pending,
          },
          {
            icon: <DollarOutlined className="text-xl text-violet-600" />,
            color: "#4d1d9e",
            title: "Doanh thu",
            value: `${formatPrice(totalStats.revenue)} VND`,
          },
          {
            icon: <StarOutlined className="text-xl text-yellow-600" />,
            color: "#733d12",
            title: "Đánh giá trung bình",
            value: `${averageRating.toFixed(1)} / 5 (${totalReviews} đánh giá)`,
          },
        ].map((card, index) => (
          <CardInfo
            key={index}
            icon={card.icon}
            color={card.color}
            title={card.title}
            value={card.value}
          />
        ))}
      </div>

      <Card
        title={
          <div className="text-xl font-semibold flex items-center gap-2">
            Thống kê lịch khám
            <span className="px-4 py-1 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-blue-200">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-bold">
                Tháng {month}
              </span>
            </span>
          </div>
        }
      >
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%">
            <LineChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalBookings"
                stroke="#2464ec"
                dot={{ stroke: "#2464ec", strokeWidth: 4 }}
                name="Tổng"
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="#fdcb6e"
                dot={{ stroke: "#fdcb6e", strokeWidth: 4 }}
                name="Đang chờ"
              />
              <Line
                type="monotone"
                dataKey="cancelled"
                stroke="#d63031"
                dot={{ stroke: "#d63031", strokeWidth: 4 }}
                name="Đã hủy"
              />
              <Line
                type="monotone"
                dataKey="confirmed"
                stroke="#0984e3"
                dot={{ stroke: "#0984e3", strokeWidth: 4 }}
                name="Đã xác nhận"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#8dd566"
                dot={{ stroke: "#8dd566", strokeWidth: 4 }}
                name="Đã hoàn thành"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
