import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  Tag,
  Card,
  Select,
  Input,
  DatePicker,
  Empty,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { bookingStatus } from "@const/status";
import locale from "antd/es/date-picker/locale/vi_VN";
import { useGetBookingsByDoctorQuery } from "@/redux/booking/booking.query";
import { getStatusBooking } from "@/helpers/getStatus";
import { formatPrice } from "@/helpers/formatPrice";
import moment from "@utils/monentTz";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusBooking } from "@/redux/booking/booking.thunk";
import BookingCancelByDoctor from "./Action/BookingCancelByDoctor";

const { RangePicker } = DatePicker;

const statusTransitionRules = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  cancelled: ["pending"],
  completed: [],
};

const ManageBooking = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    fromDate: "",
    toDate: "",
  });

  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });

  const { data, isLoading, error, refetch } = useGetBookingsByDoctorQuery({
    page: paginate.page,
    pageSize: paginate.pageSize,
    ...filters,
  });
  const { socketDoctor: socket } = useSelector((state) => state.socket);
  const [open, setOpen] = useState(false)
  const [bookingDetail, setBookingDetail] = useState(null)

  useEffect(() => {
    if (data && data.pagination) {
      setPaginate((prev) => ({
        ...prev,
        ...data.pagination,
      }));
    }
  }, [data]);

  if (error) return <Empty description="Không tìm thấy thông tin lịch khám" />;

  const { bookings } = data || [];

  const getAvailableStatuses = (currentStatus) => {
    const allowedNextStatuses = statusTransitionRules[currentStatus] || [];

    return bookingStatus.map((status) => ({
      ...status,
      disabled:
        !allowedNextStatuses.includes(status.value) &&
        status.value !== currentStatus,
    }));
  };

  const columns = [
    {
      title: "Thông tin khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => (
        <div>
          <div className="font-medium">{customer.name}</div>
          <div className="text-gray-500">{customer.phone}</div>
          <div className="text-gray-500 text-sm">{customer.email}</div>
        </div>
      ),
    },
    {
      title: "Thời gian hẹn",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <>
          <div>{moment(record.date).format("DD MMMM, YYYY")}</div>
          <div className="text-gray-500">
            {record.startTime} - {record.endTime}
          </div>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusBooking(status).color}>
          {getStatusBooking(status).label.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Giá khám",
      dataIndex: "price",
      key: "price",
      render: (price) => `${formatPrice(price)} VND`,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      render: (note) => `${note ? note : "KHÔNG CÓ"}`,
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => {
        const availableStatuses = getAvailableStatuses(record.status);
        return (
          <Select
            value={record.status}
            className="w-full"
            onChange={(value) =>
              handleChangeStatus({ booking: record, status: value })
            }
          >
            {availableStatuses.map((status, index) => (
              <Select.Option
                key={index}
                value={status.value}
                disabled={status.disabled}
              >
                {status.name}
              </Select.Option>
            ))}
          </Select>
        );
      },
      width: 150,
    },
  ];

  const debouncedSearch = useCallback(
    debounce((key, value) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    }, 1000),
    []
  );

  const handleFilterChange = (value, key) => {
    debouncedSearch(key, value);
  };

  const handleChangeStatus = async ({ booking, status }) => {
    if (status === "cancelled") {
      setBookingDetail(booking);
      setOpen(true);
      return;
    }

    const res = await dispatch(
      updateStatusBooking({
        id: booking._id,
        data: { status, model: "Doctor" },
      })
    ).unwrap();

    if (res.success) {
      message.success(res.message);
      socket?.emit(
        "updateBookingStatus",
        JSON.stringify({
          recipient: res.data.user,
          model: "User",
          booking: res.data,
        })
      );
      refetch();
    }
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="flex items-center gap-4 flex-wrap">
        <BookingCancelByDoctor {...{
          open,
          booking: bookingDetail,
          onClose: (isFetch) => {
            if(isFetch){
              refetch();
            }
            setBookingDetail(null)
            setOpen(false)
          }
        }} />
        <Input
          className="w-full lg:flex-1"
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined className="text-gray-400" />}
          allowClear
          onChange={(e) => handleFilterChange(e.target.value, "search")}
        />
        <Select
          placeholder="Trạng thái"
          allowClear
          className="w-full lg:w-56"
          onChange={(value) => handleFilterChange(value, "status")}
        >
          {bookingStatus.length > 0 &&
            bookingStatus.map((item, index) => (
              <Select.Option key={index} value={item.value}>
                {item.name}
              </Select.Option>
            ))}
        </Select>
        <RangePicker
          className="w-full lg:flex-1"
          locale={locale}
          onChange={(_, dateStrings) => {
            setFilters((prev) => ({
              ...prev,
              fromDate: dateStrings[0],
              toDate: dateStrings[1],
            }));
            setPaginate((prev) => ({
              ...prev,
              page: 1,
              pageSize: 10,
            }));
          }}
        />
      </div>
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={bookings}
        rowKey={(record) => record._id}
        pagination={{
          current: paginate.page,
          pageSize: paginate.pageSize,
          total: paginate.totalItems,
          onChange: (page, pageSize) =>
            setPaginate((prev) => ({
              ...prev,
              page,
              pageSize,
            })),
        }}
        loading={isLoading}
      />
    </div>
  );
};

export default ManageBooking;
