import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Select, Card, Button, Tooltip } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import TableProduct from "@/pages/ManageProduct/TableProduct";
import { tags } from "@const/tags";
import { useNavigate } from "react-router-dom";
import { getBrandByCreatePro } from "@redux/brand/brand.thunk";
import { getAllCategoryFilter } from "@redux/category/category.thunk";
import { getProductAdmin } from "@redux/product/product.thunk";

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
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductAdmin({ ...paginate, ...filters }));
  }, [dispatch, paginate.page, paginate.pageSize, filters]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setFilters((prev) => ({ ...prev, name: value }));
      setPaginate((prev) => ({ ...prev, page: 1 }));
    }, 1000),
    []
  );

  const handleFilterChange = (value, type) => {
    if (type === "name") {
      debouncedSearch(value);
    } else {
      setFilters((prev) => ({ ...prev, [type]: value }));
      setPaginate((prev) => ({ ...prev, page: 1 }));
    }
  };

  const handlePageChange = (newPage, newPageSize) => {
    setPaginate({ page: newPage, pageSize: newPageSize });
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-end items-center">
        <Tooltip title="Thêm sản phẩm mới">
          <Button
            size="middle"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/admin/products/create")}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Thêm sản phẩm
          </Button>
        </Tooltip>
      </div>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined className="text-gray-400" />}
            onChange={(e) => handleFilterChange(e.target.value, "name")}
            allowClear
          />
          <Select
            placeholder="Danh mục"
            onChange={(value) => handleFilterChange(value, "category")}
            allowClear
          >
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
          <Select
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
          <Select
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
          <Select
            placeholder="Sắp xếp"
            onChange={(value) => handleFilterChange(value, "sort")}
            allowClear
          >
            <Option value="asc">Giá tăng dần</Option>
            <Option value="desc">Giá giảm dần</Option>
          </Select>
        </div>
      </Card>
      <TableProduct
        products={products}
        page={paginate.page}
        pageSize={paginate.pageSize}
        totalItems={pagination?.totalItems || 0}
        setPaginate={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ManageProduct;
