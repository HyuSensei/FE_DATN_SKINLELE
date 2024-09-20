import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import TableCategory from "../../components/Table/TableCategory";
import { getCategoryList } from "../../redux/category/category.thunk";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

const ManageCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, pagination, isLoading } = useSelector(
    (state) => state.category
  );

  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
  });

  const [filter, setFilter] = useState({
    name: "",
  });

  useEffect(() => {
    dispatch(getCategoryList({ ...paginate, ...filter }));
  }, [dispatch, paginate.page, paginate.pageSize, filter]);

  useEffect(() => {
    if (pagination) {
      setPaginate((prev) => ({
        ...prev,
        page: pagination.page,
        pageSize: pagination.pageSize,
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

  const handlePageChange = (newPage, newPageSize) => {
    setPaginate({ page: newPage, pageSize: newPageSize });
  };

  return (
    <div className="p-4">
      <div className="mb-4 bg-white p-4 rounded-md shadow-lg flex gap-4 items-center">
        <Input
          size="large"
          placeholder="Tìm kiếm danh mục..."
          prefix={<SearchOutlined />}
          onChange={handleFilterChange}
        />
        <Button
          size="large"
          onClick={() => navigate("/admin/categories/create")}
          type="primary"
          icon={<PlusOutlined />}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Thêm danh mục
        </Button>
      </div>

      <TableCategory
        categories={categories}
        isLoading={isLoading}
        page={paginate.page}
        pageSize={paginate.pageSize}
        totalItems={pagination?.totalItems || 0}
        setPaginate={handlePageChange}
      />
    </div>
  );
};

export default ManageCategory;
