import React, { useEffect, useState } from "react";
import { Button, Card, Tooltip } from "antd";
import { motion } from "framer-motion";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiLipstick } from "react-icons/gi";
import { FaMoneyCheck } from "react-icons/fa6";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import StatisticalProductSelling from "../../components/Statistical/StatisticalProductSelling";
import StatisicalRevenue from "../../components/Statistical/StatisicalRevenue";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../helpers/formatPrice";
import { getStatisticalAdmin } from "../../redux/statistical/statistical.thunk";
import { getProductAlmostExpired } from "../../redux/product/product.thunk";
import TableProductAlmostExpired from "../../components/Table/TableProductAlmostExpired";

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
  const dispatch = useDispatch();
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 2,
    totalPage: 0,
    totalItems: 0,
  });
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    isLoading,
    totalOrders,
    totalProducts,
    totalCustomers,
    totalOrderAmount,
    monthlyRevenue,
    topSellingProducts,
  } = useSelector((state) => state.statistical);

  useEffect(() => {
    dispatch(getStatisticalAdmin());
  }, []);

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="shadow-lg" bordered={false}>
          <h2 className="uppercase text-sm font-semibold text-[#14134f]">
            Thống kê doanh thu
          </h2>
          <div className={`max-w-[550px] m-auto overflow-hidden`}>
            <StatisicalRevenue
              {...{
                isLoading,
                monthlyRevenue,
              }}
            />
          </div>
        </Card>

        <Card className="shadow-lg" bordered={false}>
          <div className="flex items-center justify-between mb-2 flex-wrap">
            <h2 className="uppercase text-sm font-semibold text-[#14134f] pb-2">
              Thống kê sản phẩm sắp hết hạn
            </h2>
            <Button
              onClick={() => setOpen(true)}
              disabled={products.length === 0}
              type="primary"
              className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto shadow-xl"
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
            }}
          />
        </Card>
      </div>

      <Card className="mt-6 shadow-lg" bordered={false}>
        <h2 className="uppercase text-sm font-semibold text-[#14134f]">
          Thống kê sản phẩm bán chạy
        </h2>
        <div className={`max-w-[1100px] m-auto`}>
          <StatisticalProductSelling
            {...{
              isLoading,
              topSellingProducts,
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default DashBoard;
