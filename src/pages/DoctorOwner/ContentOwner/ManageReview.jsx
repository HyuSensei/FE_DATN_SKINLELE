import React, { useCallback, useEffect, useState } from "react";
import {
  Input,
  Select,
  Table,
  Avatar,
  Rate,
  Tag,
  Tooltip,
  Popconfirm,
  Switch,
  message,
} from "antd";
import {
  StarFilled,
  MessageOutlined,
  UserOutlined,
  CalendarOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllReviewsByDoctorQuery } from "@/redux/doctor/doctor.query";
import { debounce } from "lodash";
import dayjs from "dayjs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import RatingStats from "./Action/RatingStats";
import {
  removeReviewDoctor,
  updateReviewDoctor,
} from "@/redux/doctor/doctor.thunk";

const ManageReview = () => {
  const dispatch = useDispatch();
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

  const { data, isLoading, refetch } = useGetAllReviewsByDoctorQuery(
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
      render: (record) =>
        !record.booking ? (
          "Chưa đặt lịch"
        ) : (
          <Tooltip
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
              onChange={(checked) => {
                handleUpdateReview({ id: record._id, isActive: checked });
              }}
            />
          </Tooltip>
          <Popconfirm
            className="max-w-40"
            placement="topLeft"
            title={"Xác nhận xóa thông tin đánh giá"}
            onConfirm={() => {
              handleRemoveReview(record._id);
            }}
            okText="Xóa"
            cancelText="Hủy"
            destroyTooltipOnHide={true}
          >
            <Tooltip title="Xóa">
              <button className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors">
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

  const handleRemoveReview = async (id) => {
    const res = await dispatch(removeReviewDoctor(id)).unwrap();
    if (res.success) {
      message.success(res.message);
      refetch();
    }
  };

  const handleUpdateReview = async ({ id, isActive }) => {
    const res = await dispatch(
      updateReviewDoctor({ id, data: { isActive } })
    ).unwrap();
    if (res.success) {
      message.success(res.message);
      refetch();
    }
  };

  return (
    <div className="space-y-8 mt-6 px-2">
      <RatingStats
        totalReviews={totalReviews}
        averageRating={averageRating}
        ratingDistribution={ratingDistribution}
      />

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
