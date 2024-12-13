import { useState } from "react";
import { Card, DatePicker, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  StarOutlined,
  PieChartOutlined,
  LineChartOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { formatPrice } from "@/helpers/formatPrice";

// Gradient colors for charts
const COLORS = {
  primary: ["#4158D0", "#C850C0", "#FFCC70", "#6C9BBF"],
  secondary: ["#0093E9", "#80D0C7"],
  success: ["#00B09B", "#96C93D"],
  warning: ["#FF512F", "#DD2476"],
  info: ["#12C2E9", "#C471ED", "#F64F59", "#FF344C"],
};

// Mock data tương tự như trước
const mockOverviewData = {
  bookings: {
    total: 1250,
    today: 45,
    weekly: 285,
    monthly: 850,
    status: {
      pending: 120,
      confirmed: 380,
      cancelled: 150,
      completed: 600,
    },
  },
  totalDoctor: 12,
  reviews: {
    clinic: {
      average: 4.5,
      total: 850,
      distribution: { 1: 25, 2: 45, 3: 180, 4: 300, 5: 300 },
    },
    doctors: {
      average: 4.3,
      total: 620,
    },
  },
};

// Mock timeline data
const mockTimelineData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}/3`,
  totalBookings: Math.floor(Math.random() * 50) + 20,
  pending: Math.floor(Math.random() * 15) + 5,
  confirmed: Math.floor(Math.random() * 15) + 5,
  completed: Math.floor(Math.random() * 30) + 10,
  cancelled: Math.floor(Math.random() * 10),
  revenue: Math.floor(Math.random() * 10000000) + 5000000,
}));

const pieData = [
  { name: "Hoàn thành", value: mockOverviewData.bookings.status.completed },
  { name: "Đã hủy", value: mockOverviewData.bookings.status.cancelled },
  { name: "Chờ xác nhận", value: mockOverviewData.bookings.status.pending },
  { name: "Đã xác nhận", value: mockOverviewData.bookings.status.confirmed },
];

const StatisticalOverview = () => {
  const [dateRange, setDateRange] = useState(null);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-600 mb-2">{`Ngày: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}: </span>
              {entry.name === "Doanh thu"
                ? formatPrice(entry.value) + " VND"
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const StatCard = ({ title, value, prefix, suffix, color }) => (
    <Card
      className="h-full transform hover:scale-105 transition-transform duration-300"
      style={{
        background: `linear-gradient(135deg, ${color[0]}, ${color[1]})`,
        borderRadius: "1rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Statistic
        title={<span className="text-white opacity-90">{title}</span>}
        value={value}
        suffix={suffix}
        prefix={<span className="mr-2">{prefix}</span>}
        valueStyle={{ color: "white" }}
      />
    </Card>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="text-2xl font-bold">Hi 👋, Wellcome Admin Clinic!</div>
        <DatePicker.RangePicker
          className="w-72"
          onChange={setDateRange}
          placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
        />
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Tổng số lịch hẹn"
            value={mockOverviewData.bookings.total}
            prefix={<CalendarOutlined />}
            color={COLORS.primary}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Hoàn thành"
            value={mockOverviewData.bookings.status.completed}
            prefix={<CheckCircleOutlined />}
            color={COLORS.success}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Tổng bác sĩ"
            value={mockOverviewData.totalDoctor}
            prefix={<UserOutlined />}
            color={COLORS.secondary}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Đánh giá trung bình"
            value={mockOverviewData.reviews.clinic.average}
            prefix={<StarOutlined />}
            suffix="/5"
            color={COLORS.info}
          />
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center">
                <PieChartOutlined className="mr-2 text-blue-500" />
                Phân bố trạng thái lịch hẹn
              </div>
            }
            className="hover:shadow-lg transition-shadow duration-300 rounded-[1rem]"
          >
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#color${index})`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
                <defs>
                  {COLORS.primary.map((color, index) => (
                    <linearGradient
                      key={`color${index}`}
                      id={`color${index}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={
                          COLORS.primary[index % COLORS.primary.length]
                        }
                      />
                      <stop
                        offset="100%"
                        stopColor={
                          COLORS.primary[(index + 1) % COLORS.primary.length]
                        }
                      />
                    </linearGradient>
                  ))}
                </defs>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center">
                <LineChartOutlined className="mr-2 text-green-500" />
                Biểu đồ doanh thu
              </div>
            }
            className="hover:shadow-lg transition-shadow duration-300 rounded-[1rem]"
          >
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={mockTimelineData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4158D0" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4158D0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  stroke="#666"
                  tickFormatter={(value) => `Ngày ${value}`}
                />
                <YAxis
                  stroke="#666"
                  tickFormatter={(value) => formatPrice(value, true)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4158D0"
                  fill="url(#revenueGradient)"
                  name="Doanh thu"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24}>
          <Card
            title={
              <div className="flex items-center">
                <BarChartOutlined className="mr-2 text-purple-500" />
                Thống kê lịch hẹn theo ngày
              </div>
            }
            className="hover:shadow-lg transition-shadow duration-300 rounded-[1rem]"
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={mockTimelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="confirmed"
                  name="Đang chờ"
                  fill="url(#barGradient1)"
                  stackId="a"
                />
                <Bar
                  dataKey="confirmed"
                  name="Đã xác nhận"
                  fill="url(#barGradient2)"
                  stackId="a"
                />
                <Bar
                  dataKey="completed"
                  name="Hoàn thành"
                  fill="url(#barGradient3)"
                  radius={[4, 4, 0, 0]}
                  stackId="a"
                />
                <Bar
                  dataKey="cancelled"
                  name="Đã hủy"
                  fill="url(#barGradient4)"
                  radius={[4, 4, 0, 0]}
                  stackId="a"
                />
                <defs>
                  <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1890ff" />
                    <stop offset="100%" stopColor="#69c0ff" />
                  </linearGradient>
                  <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#52c41a" />
                    <stop offset="100%" stopColor="#95de64" />
                  </linearGradient>
                  <linearGradient id="barGradient3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff4d4f" />
                    <stop offset="100%" stopColor="#ff7875" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      {/* Quick Stats Footer */}
      <Row gutter={[16, 16]} className="mt-8">
        <Col xs={24}>
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                <p className="text-2xl font-bold">
                  {mockOverviewData.bookings.total}
                </p>
                <p>Tổng lịch hẹn</p>
              </div>
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                <p className="text-2xl font-bold">
                  {(
                    (mockOverviewData.bookings.status.completed /
                      mockOverviewData.bookings.total) *
                    100
                  ).toFixed(1)}
                  %
                </p>
                <p>Tỷ lệ hoàn thành</p>
              </div>
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                <p className="text-2xl font-bold">
                  {mockOverviewData.reviews.clinic.average}
                </p>
                <p>Điểm đánh giá</p>
              </div>
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                <p className="text-2xl font-bold">
                  {mockOverviewData.totalDoctor}
                </p>
                <p>Bác sĩ</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticalOverview;
