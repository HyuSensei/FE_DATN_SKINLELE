import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Badge } from "antd";
import {
  UnorderedListOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../redux/order/order.thunk";
import OrderAll from "../Order/OrderAll";
import OrderWait from "../Order/OrderWait";
import OrderProcess from "../Order/OrderProcess";
import OrderShip from "../Order/OrderShip";
import OrderComplete from "../Order/OrderComplete";
import OrderCancel from "../Order/OrderCancel";
import { debounce } from "lodash";

const OrderTabs = () => {
  const dispatch = useDispatch();
  const {
    orderHistories: orders,
    pagination,
    isLoading,
    statusCounts,
  } = useSelector((state) => state.order);
  const [status, setStatus] = useState("all");
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 1,
    totalPage: 0,
    totalItems: 0,
  });

  const fetchOrderHistory = useCallback(() => {
    dispatch(
      getOrderHistory({
        status,
        page: paginate.page,
        pageSize: paginate.pageSize,
      })
    );
  }, [dispatch, status, paginate.page, paginate.pageSize]);

  useEffect(() => {
    const debouncedFetch = debounce(fetchOrderHistory, 300);
    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [fetchOrderHistory]);

  useEffect(() => {
    if (orders.length > 0 && pagination) {
      setPaginate((prev) => {
        if (
          prev.page !== pagination.page ||
          prev.pageSize !== pagination.pageSize ||
          prev.totalPage !== pagination.totalPage ||
          prev.totalItems !== pagination.totalItems
        ) {
          return {
            ...prev,
            page: pagination.page,
            pageSize: pagination.pageSize,
            totalPage: pagination.totalPage,
            totalItems: pagination.totalItems,
          };
        }
        return prev;
      });
    }
  }, [orders, pagination]);

  const items = [
    {
      key: "all",
      label: <TabLabel icon={<UnorderedListOutlined />} text="Tất cả" />,
      children: (
        <OrderAll
          {...{
            isLoading,
            orders,
            page: paginate.page,
            pageSize: paginate.pageSize,
            totalPage: paginate.totalPage,
            totalItems: paginate.totalItems,
            setPaginate,
          }}
        />
      ),
    },
    {
      key: "pending",
      label: (
        <TabLabel
          icon={<ClockCircleOutlined />}
          text="Chờ xác nhận"
          badgeCount={statusCounts.pending}
        />
      ),
      children: (
        <OrderWait
          {...{
            isLoading,
            orders,
            page: paginate.page,
            pageSize: paginate.pageSize,
            totalPage: paginate.totalPage,
            totalItems: paginate.totalItems,
            setPaginate,
          }}
        />
      ),
    },
    {
      key: "processing",
      label: (
        <TabLabel
          icon={<SyncOutlined />}
          text="Đang xử lý"
          badgeCount={statusCounts.processing}
        />
      ),
      children: (
        <OrderProcess
          {...{
            isLoading,
            orders,
            page: paginate.page,
            pageSize: paginate.pageSize,
            totalPage: paginate.totalPage,
            totalItems: paginate.totalItems,
            setPaginate,
          }}
        />
      ),
    },
    {
      key: "shipping",
      label: (
        <TabLabel
          icon={<CarOutlined />}
          text="Đang giao"
          badgeCount={statusCounts.shipping}
        />
      ),
      children: (
        <OrderShip
          {...{
            isLoading,
            orders,
            page: paginate.page,
            pageSize: paginate.pageSize,
            totalPage: paginate.totalPage,
            totalItems: paginate.totalItems,
            setPaginate,
          }}
        />
      ),
    },
    {
      key: "delivered",
      label: (
        <TabLabel
          icon={<CheckCircleOutlined />}
          text="Đã giao"
          badgeCount={statusCounts.delivered}
        />
      ),
      children: (
        <OrderComplete
          {...{
            isLoading,
            orders,
            page: paginate.page,
            pageSize: paginate.pageSize,
            totalPage: paginate.totalPage,
            totalItems: paginate.totalItems,
            setPaginate,
          }}
        />
      ),
    },
    {
      key: "cancelled",
      label: (
        <TabLabel
          icon={<CloseCircleOutlined />}
          text="Đã hủy"
          badgeCount={statusCounts.cancelled}
        />
      ),
      children: (
        <OrderCancel
          {...{
            isLoading,
            orders,
            page: paginate.page,
            pageSize: paginate.pageSize,
            totalPage: paginate.totalPage,
            totalItems: paginate.totalItems,
            setPaginate,
          }}
        />
      ),
    },
  ];

  return (
    <Tabs
      defaultActiveKey="all"
      items={items}
      className="custom-tabs"
      onChange={(key) => setStatus(key)}
    />
  );
};

const TabLabel = ({ icon, text, badgeCount }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span className="font-medium">{text}</span>
    {badgeCount > 0 && (
      <Badge color="#e38282" count={badgeCount} className="ml-1" />
    )}
  </div>
);

export default OrderTabs;
