import { useState, useEffect, useCallback } from "react";
import { Avatar, Card, Empty, Rate, Space, Select, Button, Form, Input, message, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useGetAllReviewsByCustomerQuery } from "@/redux/doctor/doctor.query";
import dayjs from "@utils/dayjsTz";
import LoadingContent from "@/components/Loading/LoaingContent";
import CustomButton from "@/components/CustomButton";
import { IoIosSend } from "react-icons/io";
import { FaRegHandPointDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { createReviewDoctor } from "@/redux/doctor/doctor.thunk";
import { capitalizeFirstLetter } from "@/helpers/formatDate";
import StarReview from "@/components/StarReview";
import { motion } from 'framer-motion';

const RatingSelect = ({ value, onChange }) => (
  <Select
    value={value}
    onChange={onChange}
    className="w-40"
    size="middle"
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

const StatisticCard = ({ stats }) => {
  return (
    <Card className="p-6 shadow-lg bg-white">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Average Rating */}
        <div className="flex flex-col items-center justify-center text-center lg:border-r-2 lg:pr-8 lg:border-gray-200">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="text-4xl font-bold text-gray-900">
              {stats.averageRating > 0 ? Number(stats.averageRating).toFixed(1) : "0.0"}
            </div>
            <StarReview rate={stats.averageRating || 0} singleMode={false} />
            <div className="text-gray-500 font-medium">
              {stats.totalReviews.toLocaleString()} đánh giá
            </div>
          </motion.div>
        </div>

        {/* Right side - Rating Distribution */}
        <div className="flex-1 min-w-0">
          <div className="space-y-3">
            {Object.entries(stats.ratingDistribution)
              .reverse()
              .map(([rating, count]) => {
                const percentage = (count / stats.totalReviews) * 100 || 0;
                return (
                  <motion.div
                    key={rating}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="min-w-[60px] text-sm text-gray-600">
                      {rating} sao
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-yellow-400 rounded-full"
                      />
                    </div>
                    <div className="min-w-[50px] text-sm text-gray-500 text-right">
                      ({count})
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </Card>
  );
};

const DoctorReview = ({ doctor }) => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
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
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [form] = Form.useForm()

  if (!doctor) return null

  const { data, isLoading, error, refetch } = useGetAllReviewsByCustomerQuery(
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

  const handleReviewDoctor = async (values) => {
    try {
      if (!isAuthenticated) return

      setLoadingSubmit(true)
      const res = await dispatch(createReviewDoctor({
        doctor: doctor._id,
        ...values
      })).unwrap()

      if (res.success) {
        message.success(res.message)
        form.resetFields()
        refetch()
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubmit(true)
    }
  }

  return (
    <div className="space-y-6">
      {data.stats && <StatisticCard stats={data.stats} />}
      <Divider />
      <div className="space-y-2">
        <div className="text-base font-medium">
          Viết đánh giá ngay
        </div>
        <div className="text-sm text-gray-400 italic flex items-center gap-2">( Chọn mức độ hài lòng<FaRegHandPointDown />)</div>
        <Form onFinish={handleReviewDoctor} form={form} layout="vertical" requiredMark={false}>
          <Form.Item name="rate">
            <Rate className="text-2xl" rules={[{ required: true, message: "Vui lòng chọn mức độ hài lòng của bạn !" }]} />
          </Form.Item>
          <Form.Item name="content" rules={[
            { required: true, message: "Vui lòng nhập nội dung đánh giá" },
            { max: 250, message: "Nội dung không quá 250 ký tự" }]}>
            <Input.TextArea rows={4} placeholder={isAuthenticated ? "Nhập nộp dung đánh giá..." : "Vui lòng đăng nhập để gửi đánh giá !"} />
          </Form.Item>
          <CustomButton isLoading={loadingSubmit} disabled={!isAuthenticated} type="submit" icon={<IoIosSend />} variant="dark">Gửi đánh giá</CustomButton>
        </Form>
      </div>
      <Divider />
      <div className="flex justify-between mb-4 items-center">
        <div className="text-base font-medium">Danh sách đánh giá</div>
        <RatingSelect value={filters.rate} onChange={handleFilterChange} />
      </div>

      <div className="space-y-4">
        {!reviews.length && !isLoading && (
          <Empty description="Chưa có đánh giá nào!" />
        )}

        {reviews.map((review) => (
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
                className="bg-blue-100"
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
