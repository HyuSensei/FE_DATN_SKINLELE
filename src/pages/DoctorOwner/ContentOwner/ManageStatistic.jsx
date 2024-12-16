import React, { useState } from "react";
import { DatePicker, Spin, Empty, Card } from "antd";
import {
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  StarOutlined,
  PercentageOutlined,
  LineChartOutlined,
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

// Stat Card Component - Improved layout
const StatCard = ({ icon, title, value, subValue, color }) => (
  <Card
    bordered={false}
    className="h-full transition-all duration-300 hover:shadow-lg group"
    bodyStyle={{
      height: "100%",
      padding: "24px",
      background: `linear-gradient(135deg, ${color}08 0%, ${color}16 100%)`,
    }}
  >
    <div className="flex flex-col h-full">
      <div className={`p-2 rounded-lg bg-${color}-50 w-fit`}>{icon}</div>
      <div className="flex flex-col justify-between flex-grow mt-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
        </div>
        {subValue && <p className="mt-2 text-sm text-gray-500">{subValue}</p>}
      </div>
    </div>
  </Card>
);

const StatisticsChart = ({ data }) => (
  <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Thống kê theo ngày</h3>
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="day"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalSales"
            stroke="#2464ec"
            strokeWidth={2}
            dot={{ stroke: "#2464ec", strokeWidth: 2, r: 4 }}
            name="Doanh số"
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ stroke: "#10b981", strokeWidth: 2, r: 4 }}
            name="Doanh thu thực"
          />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ stroke: "#8b5cf6", strokeWidth: 2, r: 4 }}
            name="Hoàn thành"
          />
          <Line
            type="monotone"
            dataKey="pending"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ stroke: "#f59e0b", strokeWidth: 2, r: 4 }}
            name="Chờ xử lý"
          />
          <Line
            type="monotone"
            dataKey="cancelled"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ stroke: "#ef4444", strokeWidth: 2, r: 4 }}
            name="Đã hủy"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Empty description="Đã có lỗi xảy ra" className="text-gray-500" />
      </div>
    );
  }

  const { averageRating, totalReviews, stats, totalStats } = data;

  // Group stats for better layout
  const statGroups = [
    // Top row - Key metrics
    [
      {
        icon: <DollarOutlined className="text-emerald-600 text-xl" />,
        title: "Doanh thu thực",
        value: `${formatPrice(totalStats.revenue, true)} VND`,
        subValue: `${totalStats.revenueRate} Tỷ lệ chuyển đổi`,
        color: "emerald",
      },
      {
        icon: <LineChartOutlined className="text-violet-600 text-xl" />,
        title: "Doanh số",
        value: `${formatPrice(totalStats.totalSales, true)} VND`,
        color: "violet",
      },
    ],
    // Middle row - Booking stats
    [
      {
        icon: <CalendarOutlined className="text-blue-600 text-xl" />,
        title: "Tổng lịch hẹn",
        value: totalStats.totalBookings,
        subValue: `${totalStats.conversionRate} Tỷ lệ hoàn thành`,
        color: "blue",
      },
      {
        icon: <CheckOutlined className="text-green-600 text-xl" />,
        title: "Hoàn thành",
        value: totalStats.completed,
        color: "green",
      },
    ],
    // Bottom row - Additional metrics
    [
      {
        icon: <ClockCircleOutlined className="text-amber-600 text-xl" />,
        title: "Chờ xử lý",
        value: totalStats.pending + totalStats.confirmed,
        subValue: `${totalStats.pending} chờ và ${totalStats.confirmed} xác nhận`,
        color: "amber",
      },
      {
        icon: <CloseOutlined className="text-red-600 text-xl" />,
        title: "Đã hủy",
        value: totalStats.cancelled,
        color: "red",
      },
    ],
    // Last row - Performance metrics
    [
      {
        icon: <PercentageOutlined className="text-purple-600 text-xl" />,
        title: "Tỷ lệ chuyển đổi",
        value: totalStats.conversionRate,
        color: "purple",
      },
      {
        icon: <StarOutlined className="text-yellow-600 text-xl" />,
        title: "Đánh giá",
        value: `${averageRating} /5`,
        subValue: `${totalReviews} lượt đánh giá`,
        color: "yellow",
      },
    ],
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-gray-500 mt-1">
          Chi tiết hoạt động đặt lịch và doanh thu trong tháng
        </p>
        <DatePicker
          locale={locale}
          picker="month"
          value={dayjs(`${year}-${month}`)}
          onChange={(date) => {
            if (date) {
              setMonth(date.month() + 1);
              setYear(date.year());
            }
          }}
          format="MM/YYYY"
          allowClear={false}
          className="border-2 hover:border-blue-500 transition-colors"
        />
      </div>

      <div className="grid gap-6">
        {statGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="grid md:grid-cols-2 gap-6">
            {group.map((stat, statIndex) => (
              <StatCard key={`${groupIndex}-${statIndex}`} {...stat} />
            ))}
          </div>
        ))}
      </div>

      <StatisticsChart data={stats} />
    </div>
  );
}
