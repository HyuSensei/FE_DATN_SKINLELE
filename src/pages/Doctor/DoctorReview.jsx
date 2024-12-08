import { Avatar, Card, Empty, Rate } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useGetAllReviewsQuery } from "@/redux/doctor/doctor.query";
import LoadingClinic from "@/components/Loading/LoadingClinic";

const DoctorReview = ({ doctor }) => {
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });

  const { data, isLoading, error } = useGetAllReviewsQuery(
    { ...params, doctor: doctor?._id },
    { skip: !doctor }
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

  const { reviews, stats } = data;

  return (
    <div className="grid grid-cols-1 gap-4">
      {!reviews.length && (
        <Empty description="Chưa có đánh giá cho phòng khám !" />
      )}
      {reviews.length > 0 &&
        reviews.map((review) => (
          <Card
            key={review._id}
            className="w-full border-0 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <Avatar
                size={48}
                icon={<UserOutlined />}
                className="bg-blue-100"
              />
              <div>
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
                <p className="text-gray-600 mb-2">{review.content}</p>
                <span className="text-gray-400 text-sm">2 ngày trước</span>
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default DoctorReview;
