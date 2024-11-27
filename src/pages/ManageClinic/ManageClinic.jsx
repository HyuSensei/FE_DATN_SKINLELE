import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash/debounce";
import { useEffect } from "react";
import { getAllClinicAdmin } from "../../redux/clinic/clinic.thunk";
import { Button, Input } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import TableClinic from "../../components/Table/TableClinic";
import { useNavigate } from "react-router-dom";

const ManageClinic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clinics, setClinics] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });
  const [filter, setFilter] = useState({
    search: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchClinic = async () => {
    try {
      setLoading(true);
      const res = await dispatch(
        getAllClinicAdmin({ ...paginate, ...filter })
      ).unwrap();
      if (res.success) {
        setClinics(res.data);
        setPaginate((prev) => ({
          ...prev,
          ...res.pagination,
        }));
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinic();
  }, [dispatch, paginate.page, paginate.pageSize, filter]);

  const debouncedFilter = useCallback(
    debounce((key, value) => {
      setFilter((prev) => ({
        ...prev,
        [key]: value,
      }));
      setPaginate((prev) => ({ ...prev, page: 1 }));
    }, 1000),
    []
  );

  const handleFilterChange = (key, value) => {
    debouncedFilter(key, value);
  };

  return (
    <div className="mt-4">
      <div className="mb-4 bg-white p-4 rounded-md shadow-lg flex gap-4 items-center">
        <Input
          size="middle"
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          allowClear
        />
        <Button
          onClick={() => navigate("/admin/clinics/create")}
          size="middle"
          type="primary"
          icon={<PlusOutlined />}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Thêm phòng khám
        </Button>
      </div>
      <TableClinic
        {...{
          clinics,
          page: paginate.page,
          pageSize: paginate.page,
          setPaginate,
          loading,
        }}
      />
    </div>
  );
};

export default ManageClinic;
