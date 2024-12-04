import React, { useState } from "react";
import {
  Card,
  Select,
  DatePicker,
  Spin,
  Statistic,
  Row,
  Col,
} from "antd";
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
import {
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import locale from "antd/locale/vi_VN";
import { useGetStatisticalDoctorQuery } from "@/redux/doctor/doctor.query";

const ManageStatistic = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const { data, isLoading } = useGetStatisticalDoctorQuery({
    year,
    month,
  });

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

  const statistics = data?.data || {};

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Thống kê lịch đặt dịch vụ</h1>
        <DatePicker
          locale={locale}
          picker="month"
          value={dayjs(`${year}-${month}`)}
          onChange={handleMonthChange}
          format="MM/YYYY"
          allowClear={false}
        />
      </div>

      {/* Stats Overview */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng lượt đặt"
              value={statistics.totalStats?.totalBookings || 0}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đã hoàn thành"
              value={statistics.totalStats?.completed || 0}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đã hủy"
              value={statistics.totalStats?.cancelled || 0}
              prefix={<CloseCircleOutlined style={{ color: "#ff4d4f" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Đánh giá trung bình"
              value={statistics.averageRating || 0}
              prefix={<StarOutlined style={{ color: "#faad14" }} />}
              suffix={`/ 5 (${statistics.totalReviews || 0} đánh giá)`}
              precision={1}
            />
          </Card>
        </Col>
      </Row>

      {/* Chart */}
      <Card className="mt-6">
        <h3 className="text-lg font-semibold mb-4">
          Biểu đồ thống kê theo ngày
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={statistics.stats || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tickFormatter={(day) => `Ngày ${day}`} />
            <YAxis allowDecimals={false} />
            <Tooltip
              formatter={(value, name) => {
                const labels = {
                  pending: "Chờ xác nhận",
                  confirmed: "Đã xác nhận",
                  cancelled: "Đã hủy",
                  completed: "Hoàn thành",
                };
                return [value, labels[name] || name];
              }}
              labelFormatter={(day) => `Ngày ${day}`}
            />
            <Legend
              formatter={(value) => {
                const labels = {
                  pending: "Chờ xác nhận",
                  confirmed: "Đã xác nhận",
                  cancelled: "Đã hủy",
                  completed: "Hoàn thành",
                };
                return labels[value] || value;
              }}
            />
            <Line type="monotone" dataKey="pending" stroke="#faad14" />
            <Line type="monotone" dataKey="confirmed" stroke="#1890ff" />
            <Line type="monotone" dataKey="cancelled" stroke="#ff4d4f" />
            <Line type="monotone" dataKey="completed" stroke="#52c41a" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default ManageStatistic;
