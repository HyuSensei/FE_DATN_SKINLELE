import React, { useEffect, useState } from "react";
import { Card, Tooltip, Progress } from "antd";
import { motion } from "framer-motion";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiLipstick } from "react-icons/gi";
import { FaMoneyCheck } from "react-icons/fa6";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import StatisticalProductSelling from "../../components/StatisticalProductSelling";
import StatisicalRevenue from "../../components/StatisicalRevenue";

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  trendValue,
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card
      className="mb-4 overflow-hidden"
      bordered={false}
      style={{
        background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
        boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37)`,
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="uppercase text-sm font-semibold text-[#14134f]">
            {title}
          </h3>
          <p className="text-lg font-bold" style={{ color }}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              {trend === "up" ? (
                <FaArrowUp className="text-green-500 mr-1" />
              ) : (
                <FaArrowDown className="text-red-500 mr-1" />
              )}
              <span
                className={trend === "up" ? "text-green-500" : "text-red-500"}
              >
                {trendValue}%
              </span>
            </div>
          )}
        </div>
        <Tooltip title={title}>
          <div
            className="p-4 rounded-full"
            style={{ backgroundColor: `${color}33` }}
          >
            <Icon className="text-2xl" style={{ color }} />
          </div>
        </Tooltip>
      </div>
    </Card>
  </motion.div>
);

const DashBoard = () => {
  const [chartWidth, setChartWidth] = useState("100%");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartWidth("100%");
      } else {
        setChartWidth("90%");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-6 mt-2 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Tổng đơn hàng"
          value="100"
          icon={PiShoppingBagOpenFill}
          color="#19c37d"
          trend="up"
          trendValue="5.2"
        />
        <DashboardCard
          title="Tổng tiền đơn hàng"
          value="1.000.000 VND"
          icon={FaMoneyCheck}
          color="#32bffc"
          trend="up"
          trendValue="3.1"
        />
        <DashboardCard
          title="Tổng khách hàng"
          value="1000"
          icon={HiMiniUserGroup}
          color="#ff8a4d"
          trend="up"
          trendValue="2.5"
        />
        <DashboardCard
          title="Tổng sản phẩm"
          value="1000"
          icon={GiLipstick}
          color="#ef5051"
          trend="down"
          trendValue="1.8"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="shadow-lg" bordered={false}>
          <h2 className="uppercase text-sm font-semibold text-[#14134f]">
            Thống kê doanh thu
          </h2>
          <div style={{ width: chartWidth }}>
            <StatisicalRevenue />
          </div>
        </Card>

        <Card className="shadow-lg" bordered={false}>
          <h2 className="uppercase text-sm font-semibold text-[#14134f]">
            Thống kê sản phẩm bán chạy
          </h2>
          <div style={{ width: chartWidth }}>
            <StatisticalProductSelling />
          </div>
        </Card>
      </div>

      <Card className="mt-6 shadow-lg" bordered={false}>
        <h2 className="uppercase text-sm font-semibold text-[#14134f]">
          Mục tiêu kinh doanh
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
          <div>
            <h3 className="font-medium mb-2">Doanh thu</h3>
            <Progress percent={75} status="active" strokeColor="#32bffc" />
          </div>
          <div>
            <h3 className="font-medium mb-2">Khách hàng mới</h3>
            <Progress percent={88} status="active" strokeColor="#ff8a4d" />
          </div>
          <div>
            <h3 className="font-medium mb-2">Tỷ lệ hài lòng</h3>
            <Progress percent={92} status="active" strokeColor="#19c37d" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashBoard;
