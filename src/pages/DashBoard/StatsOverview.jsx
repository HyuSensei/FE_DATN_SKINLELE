import React, { useState } from "react";
import { useGetStatsAdminOverviewQuery } from "@/redux/statistical/statistical.query";
import dayjs from "@utils/dayjsTz";
import { formatPrice } from "@/helpers/formatPrice";
import { Card, Row, Col, Select, Statistic, Spin, Progress, Empty } from "antd";
import { FaUsers, FaShoppingBag, FaDollarSign } from "react-icons/fa";
import {
  MdPayment,
  MdStarRate,
  MdOutlineInventory,
  MdTrendingUp,
} from "react-icons/md";
import { motion } from "framer-motion";

const { Option } = Select;

const StatCard = ({
  icon: Icon,
  title,
  value,
  subTitle,
  subValue,
  color,
  prefix,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card
      bordered={false}
      className="hover:shadow-lg shadow-md cursor-pointer transition-shadow duration-300"
      style={{
        background: `linear-gradient(135deg, ${color}15 0%, white 100%)`,
        borderTop: `3px solid ${color}`,
      }}
    >
      <div className="flex justify-between">
        <div className="flex-grow">
          <Statistic
            title={
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Icon className="text-xl" style={{ color }} />
                <span className="font-medium">{title}</span>
              </div>
            }
            value={value}
            prefix={prefix}
            valueStyle={{ color: color, fontWeight: "bold" }}
            formatter={
              typeof value === "number" && !prefix
                ? (val) => formatPrice(val)
                : undefined
            }
          />
        </div>
        {/* Progress circle for percentage metrics */}
        {subValue && typeof subValue === "number" && subValue <= 100 && (
          <Progress
            type="circle"
            percent={subValue}
            size={50}
            strokeColor={color}
            className="opacity-80"
          />
        )}
      </div>
      {subTitle && (
        <div className="mt-2 text-gray-500 flex items-center gap-1">
          <MdTrendingUp className="text-green-500" />
          {subTitle}:{" "}
          {typeof subValue === "number" && subValue > 100
            ? formatPrice(subValue)
            : subValue}
        </div>
      )}
    </Card>
  </motion.div>
);

const StatsOverview = () => {
  const [query, setQuery] = useState({
    year: dayjs().year(),
    month: dayjs().month() + 1,
  });

  const { data, isLoading, error } = useGetStatsAdminOverviewQuery({
    ...query,
  });

  if ((!isLoading && !data) || error)
    return <Empty description="Đã có lỗi xảy ra" />;

  const { order = {}, product = {}, user = {}, review = {} } = data || {};

  return (
    <div className="mt-2">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex justify-between items-center flex-wrap"
      >
        <h2 className="text-xl font-bold m-0">Tổng quan</h2>
        <div className="flex gap-4 flex-wrap">
          <Select
            value={query.year}
            onChange={(value) => setQuery((prev) => ({ ...prev, year: value }))}
            className="w-32"
            suffixIcon={<MdTrendingUp />}
          >
            {[...Array(5)].map((_, i) => (
              <Option key={i} value={dayjs().year() - i}>
                Năm {dayjs().year() - i}
              </Option>
            ))}
          </Select>
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
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={FaDollarSign}
              title="Doanh Thu"
              value={order?.revenue || 0}
              subTitle="Doanh số"
              subValue={order?.totalAmount || 0}
              color="#1677ff"
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={FaShoppingBag}
              title="Đơn Hàng"
              value={order?.total || 0}
              subTitle="Tỷ lệ hoàn thành"
              subValue={(
                ((order?.status?.delivered?.count || 0) / (order?.total || 1)) *
                100
              ).toFixed(1)}
              color="#52c41a"
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={MdPayment}
              title="Thanh toán thành công"
              value={order?.status?.delivered?.amount || 0}
              subTitle="Chờ xử lý"
              subValue={order?.status?.pending?.amount || 0}
              color="#722ed1"
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={MdOutlineInventory}
              title="Sản Phẩm"
              value={product?.total || 0}
              subTitle="Sắp hết hạn"
              subValue={product?.almostExpired || 0}
              color="#13c2c2"
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={FaUsers}
              title="Người Dùng"
              value={user?.total || 0}
              subTitle="Hoạt động"
              subValue={(
                ((user?.active || 0) / (user?.total || 1)) *
                100
              ).toFixed(1)}
              color="#fa8c16"
            />
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <StatCard
              icon={MdStarRate}
              title="Đánh Giá"
              value={review?.averageRating || 0}
              subTitle="Tổng đánh giá"
              subValue={review?.total || 0}
              color="#eb2f96"
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default StatsOverview;
