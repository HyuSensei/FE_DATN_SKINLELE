import React, { useState, useEffect } from "react";
import { Card, DatePicker, Empty, Skeleton } from "antd";
import {
  AreaChart,
  Area,
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
import { formatPrice } from "@/helpers/formatPrice";
import { useSelector } from "react-redux";
import { useGetStatsClinicDetailQuery } from "@/redux/statistical/statistical.query";

const StatisticalDetail = () => {
  const [date, setDate] = useState(dayjs());
  const [stats, setStats] = useState(null);

  const { clinic } = useSelector((state) => state.auth.adminInfo);

  const { data, isLoading, error } = useGetStatsClinicDetailQuery(
    { clinicId: clinic?._id, year: date.year(), month: date.month() + 1 },
    { skip: !clinic }
  );

  useEffect(() => {
    if (data) {
      setStats(data);
    }
  }, [data]);

  if (error) {
    return <Empty description="Đã có lỗi xảy ra khi lấy dữ liệu" />;
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <Skeleton active />
      </div>
    );
  }

  if (!stats && !isLoading) {
    return <Empty description="Không có dữ liệu vui lòng thử lại !" />;
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <div className="mb-8 flex justify-between items-center flex-wrap gap-2">
          <div>
            <div className="font-bold text-2xl uppercase">
              Thống kê chi tiết
            </div>
            <p className="text-gray-500 mt-2">
              📊 Các biểu đô thống kê chi tiết hoạt động phòng khám
            </p>
          </div>
          <DatePicker.MonthPicker
            value={date}
            onChange={setDate}
            allowClear={false}
          />
        </div>

        <div className="space-y-8">
          {/* Booking & Revenue Chart */}
          <Card className="shadow-lg rounded-xl">
            <h3 className="text-lg font-semibold mb-6">
              Lịch khám và Doanh thu
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stats.charts.booking}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "Doanh thu" || name === "Doanh số") {
                        return formatPrice(value, true);
                      }
                      return value;
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="total"
                    name="Số lượng"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue.actual"
                    name="Doanh thu"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue.potential"
                    name="Doanh số"
                    stroke="#ffc658"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Booking Status Chart */}
          <Card className="shadow-lg rounded-xl">
            <h3 className="text-lg font-semibold mb-6">Trạng thái lịch khám</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={stats.charts.booking}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    name="Hoàn thành"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                  <Area
                    type="monotone"
                    dataKey="confirmed"
                    name="Xác nhận"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="pending"
                    name="Chờ xử lý"
                    stackId="1"
                    stroke="#ffc658"
                    fill="#ffc658"
                  />
                  <Area
                    type="monotone"
                    dataKey="cancelled"
                    name="Đã hủy"
                    stackId="1"
                    stroke="#ff8042"
                    fill="#ff8042"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Reviews Chart */}
          <Card className="shadow-lg rounded-xl">
            <h3 className="text-lg font-semibold mb-6">Đánh giá</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stats.charts.review}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis yAxisId="left" domain={[0, 5]} />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="average"
                    name="Điểm trung bình"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="total"
                    name="Số lượng đánh giá"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StatisticalDetail;
