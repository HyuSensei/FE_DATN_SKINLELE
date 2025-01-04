import { Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { getProductAlmostExpired } from "@redux/product/product.thunk";
import TableProductAlmostExpired from "@/pages/DashBoard/TableProductAlmostExpired";
import { PlusOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import StatsOverview from "./StatsOverview";
import StatsRevenueOrder from "./StatsRevenueOrder";
import StatsReview from "./StatsReview";

const DashBoard = () => {
  const dispatch = useDispatch();
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [open, setOpen] = useState(false);

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
    <div className="space-y-4 p-4">
      <StatsOverview />
      <StatsRevenueOrder />
      <StatsReview />
      <Card className="shadow-lg" bordered={false}>
        <div className="flex items-center justify-between mb-2 flex-wrap">
          <h2 className="text-xl font-bold m-0">Sản phẩm sắp hết hạn</h2>
          <Button
            onClick={() => setOpen(true)}
            disabled={products.length === 0}
            type="primary"
            icon={<PlusOutlined />}
            className={`bg-indigo-600 ${
              products.length > 0 ? "hover:bg-indigo-700" : ""
            } w-full sm:w-auto`}
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
  );
};

export default DashBoard;
