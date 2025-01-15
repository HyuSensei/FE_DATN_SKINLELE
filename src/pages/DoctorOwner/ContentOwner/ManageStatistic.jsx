import React, { useState } from "react";
import { DatePicker, Empty } from "antd";
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import dayjs from "dayjs";
import locale from "antd/locale/vi_VN";
import { useGetStatisticalDoctorQuery } from "@/redux/doctor/doctor.query";
import { formatPrice } from "@/helpers/formatPrice";
import LoadingClinic from "@/components/Loading/LoadingClinic";

const StatCard = ({ icon, title, value, subValue, color }) => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 p-1">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/5 dark:to-purple-400/5" />
    <div className="relative p-6 h-full">
      <div className="flex justify-between items-start">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${
            color === "emerald"
              ? "from-emerald-400 to-teal-500"
              : color === "violet"
              ? "from-violet-400 to-purple-500"
              : color === "blue"
              ? "from-blue-400 to-indigo-500"
              : color === "yellow"
              ? "from-amber-400 to-yellow-500"
              : color === "red"
              ? "from-red-400 to-rose-500"
              : color === "purple"
              ? "from-purple-400 to-fuchsia-500"
              : "from-gray-400 to-gray-500"
          }`}
        >
          <span className="text-white text-xl">{icon}</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {title}
        </h3>
        <p className="mt-3 text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          {value}
        </p>
        {subValue && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {subValue}
          </p>
        )}
      </div>
    </div>
  </div>
);

const StatisticsChart = ({ data }) => {
  const [chartType, setChartType] = useState("revenue");

  const chartTypes = {
    revenue: {
      title: "Doanh thu & Doanh số",
      data: [
        {
          key: "totalSales",
          name: "Doanh số",
          gradient: ["#3B82F6", "#1D4ED8"],
        },
        {
          key: "revenue",
          name: "Doanh thu thực",
          gradient: ["#10B981", "#047857"],
        },
      ],
    },
    bookings: {
      title: "Lượng đặt lịch",
      data: [
        {
          key: "completed",
          name: "Hoàn thành",
          gradient: ["#8B5CF6", "#6D28D9"],
        },
        { key: "pending", name: "Chờ xử lý", gradient: ["#F59E0B", "#B45309"] },
        { key: "cancelled", name: "Đã hủy", gradient: ["#EF4444", "#B91C1C"] },
      ],
    },
  };

  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl shadow-gray-200/50 dark:shadow-none">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {chartTypes[chartType].title}
          </h3>
          <div className="flex gap-2 bg-gray-100 dark:bg-slate-700 p-1 rounded-xl">
            {Object.entries(chartTypes).map(([type, config]) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  chartType === type
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {config.title}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[400px] mt-4">
          <ResponsiveContainer>
            <AreaChart data={data}>
              <defs>
                {chartTypes[chartType].data.map(({ key, gradient }) => (
                  <linearGradient
                    key={key}
                    id={`gradient-${key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={gradient[0]}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor={gradient[1]}
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="day"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                stroke="#9CA3AF"
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                stroke="#9CA3AF"
                tickFormatter={(value) => formatPrice(value, true)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.98)",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                formatter={(value) => formatPrice(value, true)}
              />
              <Legend />
              {chartTypes[chartType].data.map(({ key, name, gradient }) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={name}
                  stroke={gradient[0]}
                  strokeWidth={2}
                  fill={`url(#gradient-${key})`}
                  dot={{ fill: gradient[0], strokeWidth: 2, r: 4 }}
                  activeDot={{
                    fill: gradient[0],
                    stroke: "white",
                    strokeWidth: 2,
                    r: 6,
                  }}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

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
    return <LoadingClinic />;
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Empty description="Đã có lỗi xảy ra" className="text-gray-500" />
      </div>
    );
  }

  const { averageRating, totalReviews, stats, totalStats } = data;

  const statCards = [
    {
      icon: <DollarOutlined />,
      title: "Doanh thu thực",
      value: `${formatPrice(totalStats.revenue, true)} VND`,
      subValue: `${totalStats.revenueRate} Tỷ lệ chuyển đổi`,
      color: "emerald",
    },
    {
      icon: <LineChartOutlined />,
      title: "Doanh số",
      value: `${formatPrice(totalStats.totalSales, true)} VND`,
      color: "violet",
    },
    {
      icon: <CalendarOutlined />,
      title: "Tổng lịch hẹn",
      value: totalStats.totalBookings,
      subValue: `${totalStats.conversionRate} Tỷ lệ hoàn thành`,
      color: "blue",
    },
    {
      icon: <CheckOutlined />,
      title: "Hoàn thành",
      value: totalStats.completed,
      color: "emerald",
    },
    {
      icon: <ClockCircleOutlined />,
      title: "Chờ xử lý",
      value: totalStats.pending + totalStats.confirmed,
      subValue: `${totalStats.pending} chờ và ${totalStats.confirmed} xác nhận`,
      color: "yellow",
      trend: -3.4,
    },
    {
      icon: <CloseOutlined />,
      title: "Đã hủy",
      value: totalStats.cancelled,
      color: "red",
      trend: -8.9,
    },
    {
      icon: <PercentageOutlined />,
      title: "Tỷ lệ chuyển đổi",
      value: totalStats.conversionRate,
      color: "purple",
      trend: 6.4,
    },
    {
      icon: <StarOutlined />,
      title: "Đánh giá",
      value: `${averageRating} /5`,
      subValue: `${totalReviews} lượt đánh giá`,
      color: "yellow",
      trend: 4.2,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Chi tiết hoạt động đặt lịch và doanh thu trong tháng
          </p>
        </div>
        <DatePicker
          size="large"
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
          className="border-0 bg-white dark:bg-slate-800 shadow-lg rounded-xl px-4 hover:border-blue-500 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <StatisticsChart data={stats} />
    </div>
  );
}
