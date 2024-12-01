import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Tooltip,
  Select,
  Progress,
  Typography,
  Row,
  Col,
  Empty,
} from "antd";
import { motion } from "framer-motion";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiLipstick } from "react-icons/gi";
import { FaMoneyCheck } from "react-icons/fa6";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import StatisticalProductSelling from "@components/Statistical/StatisticalProductSelling";
import StatisicalRevenue from "@components/Statistical/StatisicalRevenue";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "@helpers/formatPrice";
import { getStatisticalAdmin } from "@redux/statistical/statistical.thunk";
import { getProductAlmostExpired } from "@redux/product/product.thunk";
import TableProductAlmostExpired from "@components/Table/TableProductAlmostExpired";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

const { Text } = Typography;

const colors = [
  "#faad14",
  "#52c41a",
  "#ff4d4f",
  "#1890ff",
  "#bfbfbf",
  "#ff7875",
];

const gradientBgColors = [
  "from-orange-50 to-orange-100",
  "from-green-50 to-green-100",
  "from-red-50 to-red-100",
  "from-blue-50 to-blue-100",
  "from-gray-50 to-gray-100",
  "from-pink-50 to-pink-100",
];

const statusConfig = {
  pending: {
    color: "#faad14",
    label: "Đang chờ",
  },
  processing: {
    color: "#1890ff",
    label: "Đang xử lý",
  },
  shipping: { color: "#722ed1", label: "Đang giao" },
  delivered: { color: "#52c41a", label: "Hoàn thành" },
  cancelled: {
    color: "#ff4d4f",
    label: "Đã hủy",
  },
};

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

const StatusProgress = ({ status, count, total }) => {
  const config = statusConfig[status];
  const percentage = total ? (count / total) * 100 : 0;

  return (
    <div className="flex flex-col items-center">
      <Progress
        type="circle"
        percent={percentage}
        strokeColor={config?.color}
        format={() => (
          <div className="space-x-1 text-center">
            <Text strong style={{ color: config?.color }} className="text-lg">
              {count}
            </Text>{" "}
            <Text type="secondary">{config?.label}</Text>
          </div>
        )}
        className="mt-4"
        size={180}
      />
    </div>
  );
};

const DashBoard = () => {
  const dispatch = useDispatch();
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 3,
    totalPage: 0,
    totalItems: 0,
  });
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [filterType, setFilterType] = useState("year");

  const {
    isLoading,
    totalOrders,
    totalProducts,
    totalCustomers,
    totalOrderAmount,
    monthlyRevenue,
    topSellingProducts,
    orderStatuses,
  } = useSelector((state) => state.statistical);

  useEffect(() => {
    dispatch(
      getStatisticalAdmin({
        month: selectedMonth,
        year: selectedYear,
      })
    );
  }, [selectedMonth, selectedYear, filterType]);

  const fetchProduct = async () => {
    setIsLoadingProducts(true);
    const res = await dispatch(
      getProductAlmostExpired({ ...paginate })
    ).unwrap();
    if (res.success) {
      setProducts(res.data);
      setPaginate((prev) => ({
        ...prev,
        ...res.pagination,
      }));
    }
    setIsLoadingProducts(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [paginate.page, paginate.pageSize]);

  const handleChangeType = (value) => {
    if (value === "month") {
      setSelectedMonth(moment().month() + 1);
    } else {
      setSelectedMonth("");
    }
    setFilterType(value);
  };

  return (
    <div className="p-6 mt-2 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Tổng đơn hàng"
          value={totalOrders}
          icon={PiShoppingBagOpenFill}
          color="#19c37d"
          trend="up"
          trendValue="5.2"
        />
        <DashboardCard
          title="Tổng tiền đơn hàng"
          value={`${formatPrice(totalOrderAmount)} VND`}
          icon={FaMoneyCheck}
          color="#32bffc"
          trend="up"
          trendValue="3.1"
        />
        <DashboardCard
          title="Tổng khách hàng"
          value={totalCustomers}
          icon={HiMiniUserGroup}
          color="#ff8a4d"
          trend="up"
          trendValue="2.5"
        />
        <DashboardCard
          title="Tổng sản phẩm"
          value={totalProducts}
          icon={GiLipstick}
          color="#ef5051"
          trend="down"
          trendValue="1.8"
        />
      </div>
      <Card className="shadow-lg" bordered={false}>
        <h2 className="uppercase text-sm font-semibold text-[#14134f]">
          Doanh thu
        </h2>
        <div className="space-x-4 py-4 space-y-2">
          <Select
            defaultValue={filterType}
            onChange={handleChangeType}
            className="w-36"
            optionFilterProp="label"
            options={[
              {
                key: "month",
                label: "Lọc theo tháng",
              },
              {
                key: "year",
                label: "Lọc theo năm",
              },
            ].map((item) => ({
              value: item.key,
              label: (
                <span className="w-12 flex items-center gap-2">
                  {item.label}
                </span>
              ),
            }))}
          />
          {filterType === "month" && (
            <Select
              defaultValue={selectedMonth}
              onChange={setSelectedMonth}
              className="w-36"
              optionFilterProp="label"
              options={[...Array(12)].map((_, i) => ({
                value: i + 1,
                label: (
                  <span className="w-12 flex items-center gap-2">
                    Tháng {i + 1}
                  </span>
                ),
              }))}
            />
          )}
          <Select
            defaultValue={selectedYear}
            onChange={setSelectedYear}
            className="w-36"
            optionFilterProp="label"
            options={[...Array(moment().year() - 1990 + 1)].map((_, i) => ({
              value: moment().year() + i,
              label: (
                <span className="w-12 flex items-center gap-2">
                  Năm {moment().year() + i}
                </span>
              ),
            }))}
          />
        </div>
        <div className={`m-auto overflow-hidden`}>
          <StatisicalRevenue
            isLoading={isLoading}
            yearlyStats={monthlyRevenue}
            year={selectedYear}
            month={filterType.key === "month" ? selectedMonth : null}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="shadow-lg" bordered={false}>
          <h2 className="uppercase text-sm font-semibold text-[#14134f]">
            Top sản phẩm bán chạy
          </h2>
          {!isLoading && !topSellingProducts.length && <Empty />}
          {/* <div className={`max-w-[1100px] m-auto`}>
            <StatisticalProductSelling
              {...{
                isLoading,
                topSellingProducts,
              }}
            />
          </div> */}
          <div className="space-y-6 mt-4">
            {topSellingProducts?.map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${gradientBgColors[index]} p-5 rounded-xl`}
                style={{ background: gradientBgColors[index] }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-700 font-medium capitalize text-xs">
                    {item.name}
                  </span>
                  <span className="text-gray-900 font-semibold text-base">
                    {item.totalSold}
                  </span>
                </div>
                <Progress
                  strokeColor={colors[index]}
                  percent={Math.round((item.totalSold / totalProducts) * 100)}
                  size="default"
                  trailColor="#f0f0f0"
                />
              </div>
            ))}
          </div>
        </Card>
        <Card className="shadow-lg" bordered={false}>
          <div className="flex items-center justify-between mb-2 flex-wrap">
            <h2 className="uppercase text-sm font-semibold text-[#14134f] pb-2">
              Sản phẩm sắp hết hạn
            </h2>
            <Button
              onClick={() => setOpen(true)}
              disabled={products.length === 0}
              type="primary"
              icon={<PlusOutlined />}
              className={`bg-indigo-600 ${
                products.length > 0 ? "hover:bg-indigo-700" : ""
              } w-full sm:w-auto shadow-xl`}
            >
              Tạo khuyến mãi
            </Button>
          </div>
          <TableProductAlmostExpired
            {...{
              products,
              setPaginate,
              paginate,
              isLoading: isLoadingProducts,
              open,
              setOpen,
              setProducts,
            }}
          />
        </Card>
      </div>
      <Card className="shadow-lg mt-6" bordered={false}>
        <h2 className="uppercase text-sm font-semibold text-[#14134f] mb-2">
          Trạng thái đơn hàng
        </h2>
        <Row gutter={[16, 16]}>
          {Object.entries(orderStatuses || {}).map(([status, count]) => (
            <Col xs={24} sm={12} md={8} key={status}>
              <StatusProgress
                status={status}
                count={count}
                total={totalOrders || 0}
              />
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default DashBoard;
