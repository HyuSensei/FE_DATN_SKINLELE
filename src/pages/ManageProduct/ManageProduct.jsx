import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Select, Button, Row, Col } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import TableProduct from "../../components/Table/TableProduct";

const { Option } = Select;

const ManageProduct = () => {
  const dispatch = useDispatch();
  const {
    products,
    isLoading,
    pagination: paginateAdmin,
  } = useSelector((state) => state.product);

  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });
  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    brand: "",
    tag: "",
    sort: "",
  });

  const handleFilterChange = (value, type) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
    dispatch(
      fetchProducts({
        page: 1,
        pageSize: paginate.pageSize,
        ...filters,
        [type]: value,
      })
    );
  };

  return (
    <div className="p-4">
      <div className="mb-4 bg-white p-4 rounded-md shadow-md">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              size="large"
              placeholder="Tìm kiếm sản phẩm..."
              prefix={<SearchOutlined />}
              onChange={(e) => handleFilterChange(e.target.value, "keyword")}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              size="large"
              style={{ width: "100%" }}
              placeholder="Lọc theo danh mục"
              onChange={(value) => handleFilterChange(value, "category")}
              allowClear
            >
              {[].map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              size="large"
              style={{ width: "100%" }}
              placeholder="Lọc theo thương hiệu"
              onChange={(value) => handleFilterChange(value, "brand")}
              allowClear
            >
              {[].map((brand) => (
                <Option key={brand._id} value={brand._id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              size="large"
              style={{ width: "100%" }}
              placeholder="Lọc theo tags"
              onChange={(value) => handleFilterChange(value, "tag")}
              allowClear
            >
              <Option value="HOT">HOT</Option>
              <Option value="NEW">NEW</Option>
              <Option value="SALE">SALE</Option>
              <Option value="SELLING">SELLING</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              size="large"
              style={{ width: "100%" }}
              placeholder="Sắp xếp theo"
              onChange={(value) => handleFilterChange(value, "sort")}
              allowClear
            >
              <Option value="price:asc">Giá tăng dần</Option>
              <Option value="price:desc">Giá giảm dần</Option>
              <Option value="best_selling">Bán chạy nhất</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Button size="large" type="primary" icon={<PlusOutlined />}>
              Thêm sản phẩm
            </Button>
          </Col>
        </Row>
      </div>

      <TableProduct
        {...{
          products,
          page: paginate.page,
          pageSize: paginate.pageSize,
          totalPage: paginate.totalPage,
          totalItems: paginate.totalItems,
          setPaginate,
          isLoading,
        }}
      />
    </div>
  );
};

export default ManageProduct;
