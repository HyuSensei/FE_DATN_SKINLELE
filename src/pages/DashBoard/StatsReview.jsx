import React, { useState } from "react";
import { useGetStatsAdminReviewQuery } from "@/redux/statistical/statistical.query";
import { Card, Row, Col, Select, Spin, Segmented } from "antd";
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
import { MdStarRate, MdTrendingUp } from "react-icons/md";
import dayjs from "@utils/dayjsTz";

const { Option } = Select;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg border rounded-lg min-w-[200px]">
        <p className="font-medium mb-2 text-gray-800 truncate max-w-[250px]">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4"
            style={{ color: entry.color }}
          >
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-medium">
              {entry.name === "Điểm trung bình"
                ? Number(entry.value).toFixed(1)
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const StatsReview = () => {
  const [query, setQuery] = useState({
    year: dayjs().year(),
    month: dayjs().month() + 1,
    type: "date",
  });

  const { data, isLoading } = useGetStatsAdminReviewQuery({ ...query });

  const COLORS = ["#52c41a", "#1677ff", "#722ed1", "#faad14", "#f5222d"];

  const CustomizedAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
          className="text-xs"
        >
          {payload.value.length > 25
            ? `${payload.value.substring(0, 25)}...`
            : payload.value}
        </text>
      </g>
    );
  };

  return (
    <div className="p-6">
      {/* Filters */}
      <Card className="mb-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-xl font-bold m-0">Đánh giá sản phẩm</h2>
          <div className="flex gap-4 flex-wrap">
            <Segmented
              className="w-64"
              value={query.type}
              onChange={(value) =>
                setQuery((prev) => ({ ...prev, type: value }))
              }
              options={[
                { label: "Ngày", value: "date" },
                { label: "Tháng", value: "month" },
                { label: "Năm", value: "year" },
              ]}
              block
            />

            {query.type !== "year" && (
              <Select
                value={query.year}
                onChange={(value) =>
                  setQuery((prev) => ({ ...prev, year: value }))
                }
                className="w-32"
                suffixIcon={<MdTrendingUp />}
              >
                {[...Array(5)].map((_, i) => (
                  <Option key={i} value={dayjs().year() - i}>
                    Năm {dayjs().year() - i}
                  </Option>
                ))}
              </Select>
            )}

            {query.type === "date" && (
              <Select
                value={query.month}
                onChange={(value) =>
                  setQuery((prev) => ({ ...prev, month: value }))
                }
                className="w-32"
                suffixIcon={<MdTrendingUp />}
              >
                {[...Array(12)].map((_, i) => (
                  <Option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </Option>
                ))}
              </Select>
            )}
          </div>
        </div>
      </Card>

      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {/* Đánh giá theo thời gian */}
          <Col span={24}>
            <Card>
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <MdStarRate className="text-[#faad14] text-xl" />
                  <span className="font-medium">Đánh giá theo thời gian</span>
                </div>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data?.timeStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      height={60}
                      tick={<CustomizedAxisTick />}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="avgRating"
                      name="Điểm trung bình"
                      stroke="#faad14"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="total"
                      name="Số đánh giá"
                      stroke="#1677ff"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>

          {/* Phân bố đánh giá */}
          {/* <Col xs={24} lg={12}>
            <Card>
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <MdStarRate className="text-[#faad14] text-xl" />
                  <span className="font-medium">Phân bố điểm đánh giá</span>
                </div>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data?.ratingDistribution}
                      dataKey="count"
                      nameKey="rate"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      label={({ name, percent }) =>
                        `${name} sao (${(percent * 100).toFixed(1)}%)`
                      }
                    >
                      {data?.ratingDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col> */}

          {/* Top sản phẩm đánh giá */}
          {/* <Col xs={24} lg={12}>
            <Card>
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <MdStarRate className="text-[#faad14] text-xl" />
                  <span className="font-medium">Top sản phẩm đánh giá</span>
                </div>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data?.productStats}
                    layout="vertical"
                    margin={{ left: 150, right: 30, top: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      interval={0}
                      tick={<CustomizedAxisTick />}
                      width={140}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="total"
                      name="Số đánh giá"
                      fill="#1677ff"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col> */}
        </Row>
      )}
    </div>
  );
};

export default StatsReview;
