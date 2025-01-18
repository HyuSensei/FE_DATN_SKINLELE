import CustomButton from "@/components/CustomButton";
import EmptyData from "@/components/Error/EmptyData";
import LoadingContent from "@/components/Loading/LoaingContent";
import { capitalizeFirstLetter } from "@/helpers/formatDate";
import { useGetReviewsClinicQuery } from "@/redux/clinic/clinic.query";
import { createReviewClinic } from "@/redux/clinic/clinic.thunk";
import {
  Avatar,
  Button,
  Card,
  Empty,
  Form,
  Input,
  message,
  Progress,
  Rate,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { RiStarFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "@utils/dayjsTz";
import StarReview from "@/components/StarReview";
import { motion } from "framer-motion";

const ClinicReview = ({ clinic, refetchClinic }) => {
  const dispatch = useDispatch();
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
  });
  const [reviews, setReviews] = useState([]);
  const [form] = Form.useForm();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { data, isLoading, error, refetch } = useGetReviewsClinicQuery(
    { ...paginate, clinicId: clinic?._id },
    { skip: !clinic }
  );

  useEffect(() => {
    if (data && paginate.page === 1) {
      setReviews(data.reviews);
    } else if (data) {
      setReviews((prev) => [...prev, ...data.reviews]);
    }
  }, [data]);

  const handleSeenMore = useCallback(() => {
    if (data?.hasMore) {
      setPaginate((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  }, [data?.hasMore]);

  if (error) {
    return <EmptyData description="Có lỗi xảy ra khi lấy danh sách đánh giá" />;
  }

  if (isLoading) return <LoadingContent />;

  if (!data && !isLoading) {
    return <EmptyData description="Không có danh sách đánh giá" />;
  }

  const { hasMore, stats } = data;

  const handleSubmitReview = async (values) => {
    try {
      if (!isAuthenticated) return;

      setLoadingSubmit(true);
      const res = await dispatch(
        createReviewClinic({
          clinic: clinic._id,
          ...values,
        })
      ).unwrap();

      if (res.success) {
        message.success(res.message);
        form.resetFields();
        refetchClinic();
        refetch();
      }
    } catch (error) {
    } finally {
      setLoadingSubmit(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
      <div className="lg:col-span-2">
        {/* Rating Summary */}
        <div className="text-base font-medium mb-4">Đánh giá tổng quan</div>
        <motion.div initial="hidden" animate="show" variants={container}>
          <Card className="mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col lg:flex-row items-center gap-8 p-4">
              <motion.div className="text-center lg:w-48" variants={item}>
                <motion.div
                  className="text-6xl font-bold text-gray-800 mb-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  {Number(stats.averageRating).toFixed(1)}
                </motion.div>
                <div className="flex items-center justify-center">
                  <StarReview rate={stats.averageRating} singleMode={false} />
                </div>
                <motion.div
                  className="text-gray-500 mt-3 text-lg"
                  variants={item}
                >
                  {stats.totalReviews} đánh giá
                </motion.div>
              </motion.div>

              <motion.div
                className="flex-1 w-full lg:max-w-2xl"
                variants={item}
              >
                <div className="space-y-5">
                  {Object.entries(stats.ratingDistribution)
                    .reverse()
                    .map(([rating, count]) => (
                      <motion.div
                        key={rating}
                        className="flex items-center gap-6"
                        variants={item}
                      >
                        <div className="w-20 text-gray-600 font-medium text-right text-base">
                          {rating} sao
                        </div>
                        <div className="flex-1">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          >
                            <Progress
                              percent={
                                (count / Math.max(stats.totalReviews, 1)) * 100
                              }
                              showInfo={false}
                              strokeColor={{
                                from: "#f4dd22",
                                to: "#f59e0b",
                              }}
                              trailColor="#f3f4f6"
                              strokeWidth={12}
                              className="hover:opacity-90 transition-opacity"
                            />
                          </motion.div>
                        </div>
                        <div className="w-16 text-right text-gray-500 font-medium text-base">
                          ({count})
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Reviews List */}
        <div className="text-base font-medium">Danh sách đánh giá</div>
        <div className="space-y-4">
          {!reviews.length && !isLoading && (
            <Empty description="Chưa có đánh giá cho phòng khám !" />
          )}

          {reviews.length > 0 &&
            reviews.map((review) => (
              <Card
                key={review._id}
                className="shadow-sm hover:shadow-md transition-shadow"
                bordered={false}
              >
                <div className="flex items-start gap-4">
                  <Avatar
                    size={48}
                    src={review.user.avatar?.url}
                    icon={!review.user.avatar?.url && <UserOutlined />}
                    className="bg-blue-100 border-2 border-sky-300"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-800">
                        {review.user.name}
                      </h4>
                    </div>
                    <Rate
                      disabled
                      value={review.rate}
                      className="text-sm text-yellow-400"
                    />
                    <p className="text-gray-600 mb-2 whitespace-pre-line">
                      {review.content}
                    </p>
                    <span className="text-gray-400 text-sm">
                      {capitalizeFirstLetter(dayjs(review.createdAt).fromNow())}
                    </span>
                  </div>
                </div>
              </Card>
            ))}

          {hasMore && (
            <div className="text-center mt-8">
              <Button
                loading={isLoading}
                onClick={handleSeenMore}
                type="default"
                size="large"
                className="px-8 h-12 flex items-center gap-2 mx-auto hover:text-blue-600 hover:border-blue-600"
              >
                Xem thêm đánh giá
              </Button>
            </div>
          )}
        </div>
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
          <Form
            form={form}
            onFinish={handleSubmitReview}
            layout="vertical"
            requiredMark={false}
            className="space-y-4"
          >
            <Form.Item
              name="rate"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn mức độ hài lòng của bạn",
                },
              ]}
            >
              <Rate className="text-4xl flex items-center justify-center" />
            </Form.Item>
            <Form.Item
              name="content"
              rules={[
                { required: true, message: "Vui lòng nhập nội dung đánh giá" },
                { max: 250, message: "Nội dung không quá 250 ký tự" },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder={
                  isAuthenticated
                    ? "Nhập nộp dung đánh giá..."
                    : "Vui lòng đăng nhập để gửi đánh giá"
                }
              />
            </Form.Item>
            <CustomButton
              loading={loadingSubmit}
              type="submit"
              variant="primary"
              icon={<RiStarFill />}
              className="w-full"
            >
              Viết đánh giá
            </CustomButton>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ClinicReview;
