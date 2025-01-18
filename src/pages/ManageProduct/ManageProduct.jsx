import React, { useState, useCallback } from "react";
import { Input, Select, Card, Button, Tooltip } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import TableProduct from "@/pages/ManageProduct/TableProduct";
import { tags } from "@const/tags";
import { useNavigate } from "react-router-dom";
import { useGetAllBrandQuery } from "@/redux/brand/brand.query";
import {
  useGetAllCategoriesByAdminQuery,
  useGetAllCategoryQuery,
} from "@/redux/category/category.query";
import { useGetAllProductByAdminQuery } from "@/redux/product/product.query";
import Loading from "@/components/Loading/Loading";

const { Option } = Select;

const ManageProduct = () => {
  const navigate = useNavigate();
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
  const { data: brands } = useGetAllBrandQuery();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetAllCategoriesByAdminQuery();
  const { data, isLoading, refetch, isFetching } = useGetAllProductByAdminQuery(
    {
      ...paginate,
      ...filters,
    }
  );

  const { data: products = [], pagination = {} } = data || {};

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
            isLoading={isLoadingCategories}
            placeholder="Danh mục"
            onChange={(value) => handleFilterChange(value, "category")}
            allowClear
          >
            {categories?.map((category) => (
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
            {brands?.map((brand) => (
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
        page={pagination?.page}
        pageSize={pagination?.pageSize}
        totalItems={pagination?.totalItems || 0}
        setPaginate={handlePageChange}
        isLoading={isLoading || isFetching}
        refetch={refetch}
      />
    </div>
  );
};

export default ManageProduct;
