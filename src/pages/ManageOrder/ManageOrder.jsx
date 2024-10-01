import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Select, Row, Col, Card, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import TableOrder from "../../components/Table/TableOrder";
import { getOrderListAdmin } from "../../redux/order/order.thunk";
import { orderStatus } from "../../const/status";
import locale from "antd/es/date-picker/locale/vi_VN";

const { RangePicker } = DatePicker;

const ManageOrder = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, pagination } = useSelector((state) => state.order);

  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });

  const [filter, setFilter] = useState({
    search: "",
    status: "",
    paymentMethod: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    dispatch(getOrderListAdmin({ ...paginate, ...filter }));
  }, [paginate.page, paginate.pageSize, filter]);

  useEffect(() => {
    if (pagination) {
      setPaginate((prev) => ({
        ...prev,
        page: pagination?.page,
        pageSize: pagination?.pageSize,
        totalPage: pagination?.totalPage,
        totalItems: pagination?.totalItems,
      }));
    }
  }, [pagination]);

  const debouncedSearch = useCallback(
    debounce((key, value) => {
      setFilter(prev => (
        {
          ...prev,
          [key]: value
        }
      ));
    }, 1000),
    []
  );

  const handleFilterChange = (value, key) => {
    debouncedSearch(key, value);
  };

  return (
    <div className="p-4">
      <Card className="mb-4 bg-white rounded-md shadow-lg">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8} lg={6}>
            <Input
              placeholder="Tìm kiếm khách hàng..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={(e) => handleFilterChange(e.target.value, "search")}
              allowClear
            />
          </Col>
          <Col xs={24} md={16} lg={18}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Select
                  placeholder="Trạng thái"
                  onChange={(value) => handleFilterChange(value, "status")}
                  allowClear
                  className="w-full"
                >
                  {orderStatus.length > 0 &&
                    orderStatus.map((item, index) => (
                      <Select.Option key={index} value={item.value}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Select
                  className="w-full"
                  placeholder="Phương thức"
                  onChange={(value) =>
                    handleFilterChange(value, "paymentMethod")
                  }
                  allowClear
                >
                  <Select.Option value="COD">COD</Select.Option>
                  <Select.Option value="STRIPE">Stripe</Select.Option>
                  <Select.Option value="VNPAY">VNPay</Select.Option>
                </Select>
              </Col>
              <Col xs={24} sm={24} md={8} lg={12}>
                <RangePicker
                  locale={locale}
                  className="w-full"
                  onChange={(_, dateStrings) => {
                    setFilter((prev) => (
                      {
                        ...prev,
                        fromDate: dateStrings[0],
                        toDate: dateStrings[1]
                      }
                    ))
                    setPaginate(prev => ({
                      ...prev,
                      page: 1,
                      pageSize: 10
                    }))
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Card className="shadow-md">
        <TableOrder
          orders={orders}
          page={paginate.page}
          pageSize={paginate.pageSize}
          totalPage={paginate.totalPage}
          totalItems={paginate.totalItems}
          setPaginate={setPaginate}
          isLoading={isLoading}
          setFilter={setFilter}
        />
      </Card>
    </div>
  );
};

export default ManageOrder;
