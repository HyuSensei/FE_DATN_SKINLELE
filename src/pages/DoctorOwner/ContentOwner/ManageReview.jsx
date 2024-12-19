import React, { useCallback, useEffect, useState } from "react";
import { Input, Select, Table, Avatar, Rate, Tag, Tooltip, Popconfirm, Switch } from "antd";
import {
  StarFilled,
  MessageOutlined,
  UserOutlined,
  CalendarOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useGetAllReviewsByDoctorQuery } from "@/redux/doctor/doctor.query";
import { debounce } from "lodash";
import dayjs from "dayjs";
import { MdOutlineDeleteOutline } from "react-icons/md";

const StatCard = ({ icon: Icon, title, value, subtitle, gradient }) => (
  <div className={`relative overflow-hidden rounded-2xl p-6 ${gradient}`}>
    <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-8">
      <Icon className="w-full h-full opacity-10 text-white" />
    </div>
    <div className="relative z-10">
      <p className="text-xl font-medium text-white/80">{title}</p>
      <h3 className="text-3xl font-bold text-white mt-2 mb-1">{value}</h3>
      {subtitle && <p className="text-sm text-white/70">{subtitle}</p>}
    </div>
  </div>
);

const RatingBar = ({ rating, count, total, maxWidth = 100 }) => (
  <div className="flex items-center gap-3 group">
    <div className="flex items-center gap-1 min-w-[50px]">
      <span className="text-white font-medium text-base">{rating}</span>
      <StarFilled className="text-yellow-400 text-xl" />
    </div>
    <div className="flex-1 relative h-3 rounded-full bg-gray-100 overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full rounded-full transition-all duration-500 group-hover:opacity-90"
        style={{
          width: `${(count / total) * maxWidth}%`,
          background: `linear-gradient(90deg, rgb(251, 191, 36) ${rating * 20
            }%, rgb(251, 146, 60))`,
        }}
      />
    </div>
    <span className="text-base font-medium text-white min-w-[40px]">
      {count || 0}
    </span>
  </div>
);

const ManageReview = () => {
  const { _id } = useSelector((state) => state.auth.doctorInfo);
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalItems: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    rate: "",
  });

  const { data, isLoading } = useGetAllReviewsByDoctorQuery(
    {
      doctor: _id,
      page: paginate.page,
      pageSize: paginate.pageSize,
      ...filters,
    },
    { skip: !_id }
  );

  useEffect(() => {
    if (data?.data?.pagination) {
      setPaginate((prev) => ({
        ...prev,
        ...data.data.pagination,
      }));
    }
  }, [data]);

  const { stats = {}, reviews = [] } = data || {};
  const {
    totalReviews = 0,
    averageRating = 0,
    ratingDistribution = {},
  } = stats;

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 80,
      align: "center",
      render: (_, __, index) => (
        <span className="text-gray-600 font-medium">
          {(paginate.page - 1) * paginate.pageSize + index + 1}
        </span>
      ),
    },
    {
      title: "Thông tin khách hàng",
      key: "user",
      render: (record) => (
        <div className="flex items-center gap-4">
          <Avatar
            src={record.user?.avatar?.url}
            icon={<UserOutlined />}
            size={45}
            className="border-2 border-white shadow-md"
          />
          <div>
            <div className="font-semibold text-gray-800">
              {record.user?.name}
            </div>
            <div className="text-sm text-gray-500 mt-0.5">
              {record.user?.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Đánh giá",
      key: "review",
      render: (record) => (
        <div className="space-y-2">
          <Rate disabled value={record.rate} className="text-lg" />
          <div className="text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
            {record.content}
          </div>
        </div>
      ),
    },
    {
      title: "Ngày khám",
      key: "date",
      width: 180,
      render: (record) => (
        !record.booking ? "Chưa đặt lịch" : <Tooltip
          title={dayjs(record.booking.date).format("HH:mm - DD/MM/YYYY")}
        >
          <Tag
            icon={<CalendarOutlined className="mr-1" />}
            className="px-3 py-1.5 rounded-full text-blue-600 bg-blue-50 border-blue-100"
          >
            {dayjs(record.booking.date).format("DD/MM/YYYY")}
          </Tag>
        </Tooltip>

      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record) => (
        <div className="flex gap-2 items-center">
          <Tooltip title={record.isActive ? "Ẩn đánh giá" : "Hiện đánh giá"}>
            <Switch
              checked={record?.isActive}
              onChange={(checked) => { }}
            />
          </Tooltip>
          <Popconfirm
            className="max-w-40"
            placement="topLeft"
            title={"Xác nhận xóa thông tin đánh giá"}
            onConfirm={() => { }}
            okText="Xóa"
            cancelText="Hủy"
            destroyTooltipOnHide={true}
          >
            <Tooltip title="Xóa">
              <button
                className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors"
              >
                <MdOutlineDeleteOutline />
              </button>
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const debouncedSearch = useCallback(
    debounce((key, value) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPaginate((prev) => ({ ...prev, page: 1 }));
    }, 500),
    []
  );

  return (
    <div className="space-y-8 mt-6 px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={MessageOutlined}
          title="Tổng đánh giá"
          value={totalReviews}
          gradient="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatCard
          icon={StarFilled}
          title="Điểm trung bình"
          value={`${averageRating.toFixed(1)}/5`}
          gradient="bg-gradient-to-r from-orange-500 to-pink-500"
        />
        <div className="lg:col-span-1 md:col-span-2 col-span-1">
          <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Phân bố đánh giá
            </h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <RatingBar
                  key={rating}
                  rating={rating}
                  count={ratingDistribution[rating]}
                  total={totalReviews}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-6 border-b border-gray-100 bg-white rounded-lg">
          <div className="flex flex-wrap gap-4">
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="flex-1 min-w-[300px]"
              size="large"
              allowClear
              onChange={(e) => debouncedSearch("search", e.target.value)}
            />
            <Select
              placeholder="Lọc theo đánh giá"
              className="min-w-[200px]"
              size="large"
              allowClear
              onChange={(value) => debouncedSearch("rate", value)}
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <Select.Option key={num} value={num}>
                  <div className="flex items-center gap-2">
                    <Rate disabled value={num} className="text-sm" />
                    <span className="text-gray-500">
                      ({ratingDistribution[num] || 0})
                    </span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={reviews}
          rowKey="_id"
          loading={isLoading}
          scroll={{ x: 800 }}
          pagination={{
            current: paginate.page,
            pageSize: paginate.pageSize,
            total: paginate.totalItems,
            onChange: (page, pageSize) =>
              setPaginate((prev) => ({ ...prev, page, pageSize })),
          }}
        />
      </div>
    </div>
  );
};

export default ManageReview;
