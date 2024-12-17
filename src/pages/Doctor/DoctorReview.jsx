import { useState, useEffect, useCallback } from "react";
import { Avatar, Card, Empty, Rate, Space, Select, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useGetAllReviewsByCustomerQuery } from "@/redux/doctor/doctor.query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import LoadingContent from "@/components/Loading/LoaingContent";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const RatingSelect = ({ value, onChange }) => (
  <Select
    value={value}
    onChange={onChange}
    className="w-40"
    size="large"
    placeholder="Lọc theo đánh giá"
  >
    <Select.Option value="">Tất cả đánh giá</Select.Option>
    {[5, 4, 3, 2, 1].map((rate) => (
      <Select.Option key={rate} value={rate}>
        <Space>
          <span>{rate}</span>
          <Rate disabled defaultValue={rate} count={1} className="text-sm" />
        </Space>
      </Select.Option>
    ))}
  </Select>
);

const StatisticCard = ({ stats }) => (
  <Card className="mb-4 shadow-sm">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold">
            {stats.averageRating ? stats.averageRating > 0 : "0.0"}
          </div>
          <Rate
            disabled
            value={stats.averageRating}
            className="text-sm"
            allowHalf
          />
          <div className="text-gray-500 mt-1">
            {stats.totalReviews} đánh giá
          </div>
        </div>
      </div>
      <div className="flex-1 max-w-md">
        {Object.entries(stats.ratingDistribution)
          .reverse()
          .map(([rating, count]) => {
            const percentage = (count / stats.totalReviews) * 100 || 0;
            return (
              <div key={rating} className="flex items-center gap-2 mb-2">
                <span className="min-w-[60px] text-sm">
                  {rating} sao
                </span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                ({count})
              </div>
            );
          })}
      </div>
    </div>
  </Card>
);

const DoctorReview = ({ doctor }) => {
  const [reviews, setReviews] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({
    rate: "",
  });
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, isLoading, error } = useGetAllReviewsByCustomerQuery(
    { ...paginate, ...filters, doctor: doctor?._id },
    { skip: !doctor }
  );

  useEffect(() => {
    if (data) {
      if (paginate.page === 1) {
        setReviews(data.reviews);
      } else {
        setReviews((prev) => [...prev, ...data.reviews]);
      }
      setHasMore(data.hasMore);
    }
  }, [data, paginate.page]);

  const handleFilterChange = useCallback((value) => {
    setFilters((prev) => ({ ...prev, rate: value }));
    setPaginate((prev) => ({ ...prev, page: 1 }));
    setReviews([]);
  }, []);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    setPaginate((prev) => ({ ...prev, page: prev.page + 1 }));
    setLoadingMore(false);
  }, [hasMore, loadingMore]);

  if (error) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Có lỗi xảy ra khi lấy thông tin đánh giá!"
      />
    );
  }

  if (isLoading && paginate.page === 1) return <LoadingContent />;

  if (!data && !isLoading) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Không có danh sách đánh giá"
      />
    );
  }

  return (
    <div className="space-y-6">
      {data?.stats && <StatisticCard stats={data.stats} />}

      <div className="flex justify-end mb-4">
        <RatingSelect value={filters.rate} onChange={handleFilterChange} />
      </div>

      <div className="space-y-4">
        {!reviews.length && !isLoading && (
          <Empty description="Chưa có đánh giá nào!" />
        )}

        {reviews.map((review) => (
          <Card
            key={review._id}
            className="border-0 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <Avatar
                size={48}
                src={review.user.avatar?.url}
                icon={!review.user.avatar?.url && <UserOutlined />}
                className="bg-blue-100"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-gray-800">
                    {review.user.name}
                  </h4>
                  <Rate
                    disabled
                    value={review.rate}
                    className="text-sm text-yellow-400"
                  />
                </div>
                <p className="text-gray-600 mb-2 whitespace-pre-line">
                  {review.content}
                </p>
                <span className="text-gray-400 text-sm">
                  {dayjs(review.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </Card>
        ))}

        {hasMore && (
          <div className="text-center pt-4">
            <Button
              size="large"
              onClick={loadMore}
              loading={loadingMore}
              className="min-w-[200px]"
            >
              Xem thêm đánh giá
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorReview;
