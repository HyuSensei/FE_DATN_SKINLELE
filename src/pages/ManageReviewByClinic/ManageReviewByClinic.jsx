import React, { useCallback, useEffect, useState } from "react";
import { useGetReviewsByClinicQuery } from "@/redux/clinic/clinic.query";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Input,
  Select,
  Space,
  Table,
  Rate,
  Avatar,
  Button,
  Tooltip,
  Typography,
  Switch,
  Popconfirm,
  message,
} from "antd";
import {
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs from "@utils/dayjsTz";
import { capitalizeFirstLetter } from "@/helpers/formatDate";
import { debounce } from "lodash";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  removeReviewClinic,
  updateReviewClinic,
} from "@/redux/clinic/clinic.thunk";

const { Text } = Typography;

const ManageReviewByClinic = () => {
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.auth);
  const { clinic } = adminInfo;
  const [reviews, setReviews] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({
    rating: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    search: "",
  });

  const { data, isLoading, refetch } = useGetReviewsByClinicQuery(
    {
      clinicId: clinic._id,
      page: paginate.page,
      pageSize: paginate.pageSize,
      ...filters,
    },
    { skip: !clinic._id }
  );

  useEffect(() => {
    if (data) {
      setReviews(data.reviews || []);
      setPaginate((prev) => ({
        ...prev,
        totalItems: data.pagination || 0,
      }));
    }
  }, [data]);

  const { ratingDistribution = {} } = data?.stats || {};

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      setFilters((prev) => ({ ...prev, search: searchValue }));
      setPaginate((prev) => ({ ...prev, page: 1 }));
    }, 500),
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  // Handle rating filter
  const handleRatingChange = (value) => {
    setSelectedRating(value);
    setFilters((prev) => ({ ...prev, rating: value }));
    setPaginate((prev) => ({ ...prev, page: 1 }));
  };

  const handleSortOrder = () => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  const handleTableChange = (pagination) => {
    setPaginate({
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleReset = () => {
    setSearchText("");
    setSelectedRating(null);
    setFilters({
      rating: "",
      sortBy: "createdAt",
      sortOrder: "desc",
      search: "",
    });
    setPaginate({
      page: 1,
      pageSize: 10,
    });
  };

  const columns = [
    {
      title: "Người đánh giá",
      key: "user",
      width: 200,
      render: (_, record) => (
        <Space>
          <Avatar src={record.user?.avatar?.url} />
          <Text className="whitespace-nowrap">{record.user?.name}</Text>
        </Space>
      ),
    },
    {
      title: "Đánh giá",
      key: "rateContent",
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
      title: "Thời gian",
      key: "time",
      width: 150,
      render: (_, record) => (
        <Tooltip title={dayjs(record.createdAt).format("DD/MM/YYYY HH:mm:ss")}>
          <Text className="whitespace-nowrap">
            {capitalizeFirstLetter(dayjs(record.createdAt).fromNow())}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      fixed: "right",
      render: (record) => (
        <div className="flex gap-2 items-center">
          <Tooltip title={record.isActive ? "Ẩn đánh giá" : "Hiện đánh giá"}>
            <Switch
              checked={record.isActive}
              onChange={(checked) => {
                handleUpdateReview({ id: record._id, isActive: checked });
              }}
            />
          </Tooltip>
          <Popconfirm
            className="max-w-40"
            placement="topLeft"
            title="Xác nhận xóa thông tin đánh giá"
            onConfirm={() => {
              handleRemoveReview(record._id);
            }}
            okText="Xóa"
            cancelText="Hủy"
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

  const handleRemoveReview = async (id) => {
    const res = await dispatch(removeReviewClinic(id)).unwrap();
    if (res.success) {
      message.success(res.message);
      refetch();
    }
  };

  const handleUpdateReview = async ({ id, isActive }) => {
    const res = await dispatch(
      updateReviewClinic({ id, data: { isActive } })
    ).unwrap();
    if (res.success) {
      message.success(res.message);
      refetch();
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Filters Section */}
      <Card>
        <div className="flex gap-4 items-center flex-wrap">
          <Input
            placeholder="Tìm kiếm đánh giá..."
            allowClear
            value={searchText}
            onChange={handleSearchChange}
            prefix={<SearchOutlined />}
            className="flex-1"
          />
          <Select
            placeholder="Lọc theo đánh giá"
            className="min-w-[200px]"
            size="middle"
            allowClear
            value={selectedRating}
            onChange={handleRatingChange}
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
          <Button
            icon={
              filters.sortOrder === "asc" ? (
                <SortAscendingOutlined />
              ) : (
                <SortDescendingOutlined />
              )
            }
            onClick={handleSortOrder}
          >
            Sắp xếp
          </Button>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            Làm mới
          </Button>
        </div>
      </Card>

      {/* Reviews Table */}
      <Table
        columns={columns}
        dataSource={reviews}
        loading={isLoading}
        rowKey="_id"
        pagination={{
          current: paginate.page,
          pageSize: paginate.pageSize,
          total: paginate.totalItems,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default ManageReviewByClinic;
