import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBookingByAdmin } from "@redux/booking/booking.thunk";
import { DatePicker, Input, Select } from "antd";
import { bookingStatus } from "@const/status";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import TableBooking from "@components/Table/TableBooking";
const { RangePicker } = DatePicker;

const ManageBooking = () => {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });
  const [filter, setFilter] = useState({
    status: "",
    date: "",
    search: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      const res = await dispatch(
        getAllBookingByAdmin({ ...paginate, ...filter })
      ).unwrap();
      if (res.success) {
        setBookings(res.data);
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

  return (
    <>
      <div className="mb-4 bg-white p-4 rounded-md shadow-lg flex gap-4 items-center mt-2">
        <Input
          size="middle"
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          allowClear
        />
        <Select
          size="middle"
          placeholder="Chọn trạng thái"
          onChange={(value) => handleFilterChange("status", value)}
          allowClear
          className="w-48"
        >
          {bookingStatus.map((item) => (
            <Select.Option key={item.id} value={item.value}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <TableBooking
        {...{
          bookings,
          page: paginate.page,
          pageSize: paginate.page,
          setPaginate,
          loading,
        }}
      />
    </>
  );
};

export default ManageBooking;
