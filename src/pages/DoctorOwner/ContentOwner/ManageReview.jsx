import React, { useState } from "react";
import { Card, Rate, Input, Statistic, Select, Table } from "antd";
import { StarFilled, MessageOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllReviewsQuery } from "@/redux/doctor/doctor.query";

const ManageReview = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState("");
  const { _id } = useSelector((state) => state.auth.doctorInfo);
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });

  const { data, isLoading, error } = useGetAllReviewsQuery({
    doctor: _id,
    page: paginate.page,
    pageSize: paginate.pageSize,
    rate,
  });

  // Mock data - thay thế bằng API data
  const reviewStats = {
    totalReviews: 125,
    averageRating: 4.8,
    ratingCounts: {
      5: 80,
      4: 30,
      3: 10,
      2: 3,
      1: 2,
    },
  };

  const reviews = [
    {
      id: 1,
      user: {
        name: "Nguyễn Văn A",
        avatar: null,
      },
      booking: {
        date: "2024-03-15",
      },
      rate: 5,
      content:
        "Bác sĩ rất tận tâm và chuyên nghiệp. Tư vấn chi tiết và rõ ràng về tình trạng bệnh. Chắc chắn sẽ quay lại khám trong những lần tới.",
      createdAt: "2024-03-16T08:00:00Z",
    },
    {
      id: 2,
      user: {
        name: "Trần Thị B",
        avatar: null,
      },
      booking: {
        date: "2024-03-14",
      },
      rate: 4,
      content:
        "Được tư vấn rất chi tiết về tình trạng bệnh. Bác sĩ nhiệt tình và thân thiện.",
      createdAt: "2024-03-15T09:00:00Z",
    },
  ];

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 60,
      render: (_, __, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: "Thông tin khách hàng",
      key: "user",
      render: (record) => <></>,
    },
    {
      title: "Đánh giá",
      key: "rate",
      render: (record) => <></>,
    },
    {
      title: "Ngày khám",
      key: "dataBooking",
      render: (record) => <></>,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record) => <></>,
    },
  ];

  return (
    <div className="mt-4">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card
          bordered={false}
          className="shadow-sm"
          style={{
            background: `linear-gradient(135deg, #b7dce722 0%, #b7dce744 100%)`,
            boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37)`,
          }}
        >
          <Statistic
            title={<span className="text-gray-600 text-sm">Tổng đánh giá</span>}
            value={reviewStats.totalReviews}
            prefix={<MessageOutlined className="text-blue-500" />}
          />
        </Card>

        <Card
          bordered={false}
          className="shadow-sm"
          style={{
            background: `linear-gradient(135deg, #fff2c622 0%, #fff2c644 100%)`,
            boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37)`,
          }}
        >
          <Statistic
            title={
              <span className="text-gray-600 text-sm">Điểm trung bình</span>
            }
            value={reviewStats.averageRating}
            prefix={<StarFilled className="text-yellow-400" />}
            suffix="/5"
            precision={1}
          />
        </Card>
      </div>

      <Card
        bordered={false}
        className="shadow-sm mb-8"
        style={{
          background: `linear-gradient(135deg, #e8f4dc22 0%, #e8f4dc44 100%)`,
          boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37)`,
        }}
      >
        <div className="space-y-3">
          <p className="text-gray-600 text-sm">Phân bố đánh giá</p>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 min-w-[50px]">
                <span className="text-sm text-gray-600">{rating}</span>
                <StarFilled className="text-yellow-400 text-sm" />
              </div>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${
                      (reviewStats.ratingCounts[rating] /
                        reviewStats.totalReviews) *
                      100
                    }%`,
                    opacity: 0.2 + rating * 0.16, // Gradient opacity based on rating
                  }}
                />
              </div>
              <span className="text-sm text-gray-500 min-w-[30px]">
                {reviewStats.ratingCounts[rating]}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <Card bordered={false} className="mb-6 shadow-sm">
        <div className="flex flex-wrap gap-4">
          <Input.Search
            placeholder="Tìm kiếm theo tên bệnh nhân..."
            className="flex-1"
            allowClear
          />
          <Select
            defaultValue="all"
            className="min-w-[150px]"
            onChange={(value) => setFilter(value)}
          >
            <Select.Option value="all">Tất cả đánh giá</Select.Option>
            <Select.Option value="5">5 sao</Select.Option>
            <Select.Option value="4">4 sao</Select.Option>
            <Select.Option value="3">3 sao</Select.Option>
            <Select.Option value="2">2 sao</Select.Option>
            <Select.Option value="1">1 sao</Select.Option>
          </Select>
        </div>
      </Card>
      <Table
        columns={columns}
        dataSource={[]}
        rowKey={(record) => record._id}
        loading={isLoading}
        scroll={{ x: true }}
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
      />
    </div>
  );
};

export default ManageReview;
