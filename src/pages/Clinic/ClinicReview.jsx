import LoadingClinic from "@/components/Loading/LoadingClinic";
import { useGetReviewsClinicQuery } from "@/redux/clinic/clinic.query";
import { Avatar, Button, Card, Empty, Progress, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { RiHeartFill, RiStarFill } from "react-icons/ri";

const ClinicReview = ({ clinic }) => {
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const [hover, setHover] = useState(false);

  const { data, isLoading, error } = useGetReviewsClinicQuery(
    { ...params, clinicId: clinic?._id },
    { skip: !clinic }
  );

  useEffect(() => {
    if (data) {
      setParams((prev) => ({
        ...prev,
        page: data.pagination.page,
        pageSize: data.pagination.pageSize,
      }));
    }
  }, [data]);

  if (error) {
    return <Empty description="Có lỗi xảy ra khi lấy danh sách đánh giá" />;
  }

  if (isLoading) return <LoadingClinic />;

  if (!data) {
    return <Empty description="Không có danh sách đánh giá" />;
  }

  const { reviews, hasMore, statistics } = data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
      <div className="lg:col-span-2">
        {/* Rating Summary */}
        <Card
          hoverable
          className="mb-8 transition-shadow duration-300"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 mb-2">
                {Number(statistics.averageRating).toFixed(1)}
              </div>
              <Rate
                disabled
                allowHalf
                value={statistics.averageRating}
                className="text-2xl"
              />
              <div className="text-gray-500 mt-2">
                {statistics.totalReviews} đánh giá
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="space-y-4">
                {Object.entries(statistics.ratingDistribution)
                  .reverse()
                  .map(([rating, count]) => (
                    <div key={rating} className="flex items-center gap-4">
                      <div className="w-16 text-gray-600 font-medium">
                        {rating} sao
                      </div>
                      <div className="flex-1">
                        <Progress
                          percent={
                            (count / Math.max(statistics.totalReviews, 1)) * 100
                          }
                          showInfo={false}
                          strokeColor={{
                            from: "#facc15",
                            to: "#eab308",
                          }}
                          trailColor="#f3f4f6"
                          size={10}
                          className={`${hover ? "transform duration-300" : ""}`}
                        />
                      </div>
                      <div className="w-12 text-right text-gray-500">
                        {count}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Reviews List */}
        <Card hoverable className="space-y-6 mt-4 shadow-lg">
          {!reviews.length && (
            <Empty description="Chưa có đánh giá cho phòng khám !" />
          )}
          {reviews.length > 0 &&
            reviews.map((review) => (
              <div key={review.id} className="flex items-start gap-4">
                <Avatar src={review.user.avatar.url} size={48} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">
                      {review.user.name}
                    </h4>
                    <span className="text-gray-500 text-sm">
                      {review.createdAt}
                    </span>
                  </div>
                  <Rate
                    disabled
                    defaultValue={review.rate}
                    className="text-yellow-400 text-sm"
                  />
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {review.content}
                  </p>

                  <div className="flex items-center gap-6 mt-4 text-gray-500">
                    <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                      <RiHeartFill />
                      <span>Hữu ích </span>
                    </button>
                    <button className="hover:text-blue-600 transition-colors">
                      Chia sẻ
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {hasMore && (
            <div className="text-center mt-8">
              <Button
                type="default"
                size="large"
                className="px-8 h-12 flex items-center gap-2 mx-auto hover:text-blue-600 hover:border-blue-600"
              >
                Xem thêm đánh giá
              </Button>
            </div>
          )}
        </Card>
      </div>

      <div className="lg:col-span-1">
        {/* Write Review Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sticky top-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Viết đánh giá
          </h3>
          <p className="text-gray-600 mb-6">
            Chia sẻ trải nghiệm của bạn để giúp mọi người có thêm thông tin về
            phòng khám
          </p>
          <Button
            type="primary"
            size="large"
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 border-none flex items-center justify-center gap-2"
          >
            <RiStarFill />
            Viết đánh giá
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClinicReview;
