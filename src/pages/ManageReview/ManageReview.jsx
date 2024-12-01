import React, { useState, useEffect, useCallback } from "react";
import { Input, Select, DatePicker, Card, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import TableReview from "@components/Table/TableReview";
import locale from "antd/es/date-picker/locale/vi_VN";
import { getReviewList } from "@redux/review/review.thunk";
import { FaStar } from "react-icons/fa6";

const { RangePicker } = DatePicker;

const ManageReview = () => {
  const dispatch = useDispatch();
  const { reviews, pagination, isLoading } = useSelector(
    (state) => state.review
  );

  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });

  const [filters, setFilters] = useState({
    customerName: "",
    rate: 0,
    productName: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    dispatch(getReviewList({ ...paginate, ...filters }));
  }, [dispatch, paginate.page, paginate.pageSize, filters]);

  const debouncedFilter = useCallback(
    debounce((name, value) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
      setPaginate((prev) => ({ ...prev, page: 1 }));
    }, 1000),
    []
  );

  const handleFilterChange = (name, value) => {
    debouncedFilter(name, value);
  };

  return (
    <div className="mt-4">
      <Card className="mb-4 shadow-lg">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Tên khách hàng"
              prefix={<SearchOutlined />}
              onChange={(e) =>
                handleFilterChange("customerName", e.target.value)
              }
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Tên sản phẩm"
              prefix={<SearchOutlined />}
              onChange={(e) =>
                handleFilterChange("productName", e.target.value)
              }
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Đánh giá"
              style={{ width: "100%" }}
              onChange={(value) => handleFilterChange("rate", value)}
              allowClear
            >
              <Select.Option value="">Tất cả</Select.Option>
              <Select.Option value="1">
                <div className="flex gap-2 items-center">
                  <span>1</span> <FaStar className="text-[#feb705]" />
                </div>
              </Select.Option>
              <Select.Option value="2">
                <div className="flex gap-2 items-center">
                  <span>2</span> <FaStar className="text-[#feb705]" />
                </div>
              </Select.Option>
              <Select.Option value="3">
                <div className="flex gap-2 items-center">
                  <span>3</span> <FaStar className="text-[#feb705]" />
                </div>
              </Select.Option>
              <Select.Option value="4">
                <div className="flex gap-2 items-center">
                  <span>4</span> <FaStar className="text-[#feb705]" />
                </div>
              </Select.Option>
              <Select.Option value="5">
                <div className="flex gap-2 items-center">
                  <span>5</span> <FaStar className="text-[#feb705]" />
                </div>
              </Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <RangePicker
              locale={locale}
              className="w-full"
              onChange={(_, dateStrings) => {
                setFilters((prev) => ({
                  ...prev,
                  fromDate: dateStrings[0],
                  toDate: dateStrings[1],
                }));
                dispatch(
                  getReviewList({
                    ...paginate,
                    ...filters,
                    fromDate: dateStrings[0],
                    toDate: dateStrings[1],
                    page: 1,
                  })
                );
              }}
            />
          </Col>
        </Row>
      </Card>

      <TableReview
        reviews={reviews}
        isLoading={isLoading}
        page={paginate.page}
        pageSize={paginate.pageSize}
        totalItems={pagination?.totalItems}
        setPaginate={setPaginate}
      />
    </div>
  );
};

export default ManageReview;
