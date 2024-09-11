import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Select, Row, Col, Card, Button, Tooltip } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import TableProduct from "../../components/Table/TableProduct";
import { tags } from "../../const/tags";
import { useNavigate } from "react-router-dom";
import { getBrandByCreatePro } from "../../redux/brand/brand.thunk";
import { getAllCategoryFilter } from "../../redux/category/category.thunk";
import { getProductAdmin } from "../../redux/product/product.thunk";

const { Option } = Select;

const ManageProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    products,
    isLoading,
    paginateAdmin: pagination,
  } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);

  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });

  const [filters, setFilters] = useState({
    name: "",
    category: "",
    brand: "",
    tag: "",
    sort: "asc",
  });

  useEffect(() => {
    dispatch(getBrandByCreatePro());
    dispatch(getAllCategoryFilter());
  }, []);

  useEffect(() => {
    dispatch(getProductAdmin({ ...paginate, ...filters }));
  }, [paginate.page, paginate.pageSize]);

  useEffect(() => {
    if (pagination) {
      setPaginate((prev) => ({
        ...prev,
        page: pagination?.currentPage,
        pageSize: pagination?.pageSize,
        totalPage: pagination?.totalPages,
        totalItems: pagination?.totalItems,
      }));
    }
  }, [pagination]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(
        getProductAdmin({ ...paginate, ...filters, name: value, page: 1 })
      );
    }, 2000),
    [filters, paginate]
  );

  const handleFilterChange = (value, type) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    if (type === "name") {
      debouncedSearch(value);
    } else {
      dispatch(
        getProductAdmin({ ...paginate, ...filters, [type]: value, page: 1 })
      );
    }
  };

  return (
    <div className="p-2 lg:p-6 bg-gradient-to-r from-[#d4edda] to-sky-100 mt-2 rounded-md">
      <Card className="mb-6 shadow-md">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8} lg={6}>
            <Input
              size="large"
              placeholder="Tìm kiếm sản phẩm..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={(e) => handleFilterChange(e.target.value, "name")}
              className="w-full shadow-lg"
            />
          </Col>
          <Col xs={24} md={16} lg={18}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Select
                  size="large"
                  placeholder="Danh mục"
                  onChange={(value) => handleFilterChange(value, "category")}
                  allowClear
                  className="shadow-lg w-full"
                >
                  {categories.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Select
                  size="large"
                  className="shadow-lg w-full"
                  placeholder="Thương hiệu"
                  onChange={(value) => handleFilterChange(value, "brand")}
                  allowClear
                >
                  {brands.map((brand) => (
                    <Option key={brand._id} value={brand._id}>
                      {brand.name}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Select
                  size="large"
                  className="shadow-lg w-full"
                  placeholder="Tags"
                  onChange={(value) => handleFilterChange(value, "tag")}
                  allowClear
                >
                  {tags.map((item) => (
                    <Option key={item.key} value={item.value}>
                      {item.value}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Select
                  size="large"
                  className="shadow-lg w-full"
                  placeholder="Sắp xếp"
                  onChange={(value) => handleFilterChange(value, "sort")}
                  allowClear
                >
                  <Option value="asc">Giá tăng dần</Option>
                  <Option value="desc">Giá giảm dần</Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Card
        className="shadow-md"
        title={
          <div className="flex justify-end items-center">
            <Tooltip title="Thêm sản phẩm mới">
              <Button
                size="large"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate("/admin/products/create")}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Thêm sản phẩm
              </Button>
            </Tooltip>
          </div>
        }
      >
        <TableProduct
          products={products}
          page={paginate.page}
          pageSize={paginate.pageSize}
          totalPage={paginate.totalPage}
          totalItems={paginate.totalItems}
          setPaginate={setPaginate}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
};

export default ManageProduct;
