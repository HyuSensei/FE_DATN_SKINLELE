import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDoctorByAdmin } from "@redux/doctor/doctor.thunk";
import { debounce } from "lodash";
import { Button, Input } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import TableDoctor from "@/pages/ManageDoctor/TableDoctor";
import { useNavigate } from "react-router-dom";

const ManageDoctor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });
  const [filter, setFilter] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      const res = await dispatch(
        getAllDoctorByAdmin({ ...paginate, ...filter })
      ).unwrap();
      if (res.success) {
        setDoctors(res.data);
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
    fetchDoctor();
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

  const setStateByAction = ({ id, data, action = "update" }) => {
    const actions = {
      update: () => {
        setDoctors((prev) => {
          const index = prev.findIndex((item) => item._id === id);
          if (index !== -1) {
            const updatedDoctors = [...prev];
            updatedDoctors[index] = data;
            return updatedDoctors;
          }
          return prev;
        });
      },
      remove: () => {
        setDoctors((prev) => prev.filter((item) => item._id !== id));
      },
    };

    actions[action]?.();
  };

  return (
    <div className="mt-4">
      <div className="mb-4 bg-white p-4 rounded-md shadow-lg flex gap-4 items-center">
        <Input
          size="middle"
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          onChange={(e) => handleFilterChange("name", e.target.value)}
          allowClear
        />
        <Button
          onClick={() => navigate("/admin/doctors/create")}
          size="middle"
          type="primary"
          icon={<PlusOutlined />}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Thêm bác sĩ
        </Button>
      </div>
      <TableDoctor
        {...{
          doctors,
          page: paginate.page,
          pageSize: paginate.pageSize,
          totalItems: paginate.totalItems,
          setPaginate,
          loading,
          setStateByAction,
        }}
      />
    </div>
  );
};

export default ManageDoctor;
