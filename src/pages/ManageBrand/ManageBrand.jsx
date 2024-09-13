import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Row, Col, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import TableBrand from "../../components/Table/TableBrand";
import { getBrandList } from "../../redux/brand/brand.thunk";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

const ManageBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { brands, pagination, isLoading } = useSelector((state) => state.brand);

  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });

  const [filter, setFilter] = useState({
    name: "",
  });

  useEffect(() => {
    dispatch(getBrandList({ ...paginate, ...filter }));
  }, [dispatch, paginate.page, paginate.pageSize, filter]);

  useEffect(() => {
    if (pagination) {
      setPaginate((prev) => ({
        ...prev,
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
        totalPage: pagination.totalPages,
        totalItems: pagination.totalItems,
      }));
    }
  }, [pagination]);

  const debouncedFilter = useCallback(
    debounce((value) => {
      setFilter({ name: value });
      setPaginate((prev) => ({ ...prev, page: 1 }));
    }, 1000),
    []
  );

  const handleFilterChange = (e) => {
    debouncedFilter(e.target.value);
  };

  return (
    <div className="p-4">
      <div className="mb-4 bg-white p-4 rounded-md shadow-lg flex gap-4 items-center">
        <Input
          size="large"
          placeholder="Tìm kiếm thương hiệu..."
          prefix={<SearchOutlined />}
          onChange={handleFilterChange}
        />
        <Button
          size="large"
          onClick={() => navigate("/admin/brands/create")}
          type="primary"
          icon={<PlusOutlined />}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Thêm thương hiệu
        </Button>
      </div>

      <TableBrand
        brands={brands}
        isLoading={isLoading}
        page={paginate.page}
        pageSize={paginate.pageSize}
        totalItems={paginate.totalItems}
        setPaginate={setPaginate}
      />
    </div>
  );
};

export default ManageBrand;
