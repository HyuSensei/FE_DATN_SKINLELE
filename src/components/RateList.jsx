import {
  Progress,
  Avatar,
  List,
  Rate,
  Space,
  Button,
  Select,
  Card,
  Spin,
  Pagination,
  Image,
} from "antd";
import { createAverageRate, createIcon, SingleStar } from "@utils/createIcon";
import {
  CameraOutlined,
  CommentOutlined,
  EyeOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import { useCallback, useState, useEffect } from "react";
import ModalRate from "@components/Modal/ModalRate";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { getReviewProduct } from "@redux/review/review.thunk";
import { formatDateReview } from "@helpers/formatDate";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { MdVerified, MdDateRange } from "react-icons/md";

const RateList = ({ product }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const { reviews, pagination, isLoading, averageRating, rateDistribution } =
    useSelector((state) => state.review);
  const [reviewFilter, setReviewFilter] = useState({
    rate: "",
    hasImage: "",
    hasComment: "",
  });
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });

  const fetchReviews = useCallback(() => {
    if (!isEmpty(product)) {
      dispatch(
        getReviewProduct({
          productId: product._id,
          page: paginate.page,
          pageSize: paginate.pageSize,
          ...reviewFilter,
        })
      );
    }
  }, [product?._id, paginate.page, paginate.pageSize, reviewFilter, dispatch]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    if (pagination) {
      setPaginate((prev) => ({
        ...prev,
        page: pagination?.page,
        pageSize: pagination?.pageSize,
        totalPage: pagination?.totalPage,
        totalItems: pagination?.totalItems,
      }));
    }
  }, [pagination]);

  const handleFilterChange = (type, value) => {
    setReviewFilter((prev) => ({
      ...prev,
      [type]: value,
    }));
    setPaginate((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const ratings = Object.entries(rateDistribution).map(([score, count]) => ({
    score,
    count,
  }));
  const totalRatings = Object.values(rateDistribution).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-base">
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <ModalRate
          {...{
            open,
            setOpen,
            rate,
            setRate,
            setHoverValue,
            hoverValue,
            product,
          }}
        />
        <div className="md:w-1/3">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold">
                {parseFloat(averageRating || 0).toFixed(1)}
              </h2>
              <div className="flex justify-center items-center space-x-1">
                <Rate
                  disabled
                  character={({ index }) =>
                    createAverageRate({
                      index: index + 1,
                      rate: parseFloat(averageRating || 0),
                      width: "24px",
                      height: "24px",
                    })
                  }
                />
              </div>
              <p className="text-gray-500 mt-2">{reviews.length} đánh giá</p>
            </div>
          </div>
          <div className="mt-4">
            {ratings.map(({ score, count }) => (
              <div key={score} className="flex items-center space-x-2 mb-2">
                <span className="w-12 flex items-center gap-2">
                  {score} <SingleStar />
                </span>
                <div className="flex-grow">
                  <Progress
                    percent={Math.round((count / totalRatings) * 100)}
                    strokeColor="#313438"
                    trailColor="#f0f0f0"
                    showInfo={false}
                    className="w-full"
                  />
                </div>
                <span className="ml-2 w-12 text-right">({count})</span>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <Space wrap>
              <Button
                type={reviewFilter.rate === "" ? "primary" : "default"}
                onClick={() => {
                  handleFilterChange("rate", "");
                  handleFilterChange("hasImage", "");
                  handleFilterChange("hasComment", "");
                }}
              >
                Tất cả
              </Button>
              <Select
                placeholder="Lọc theo đánh giá"
                optionFilterProp="label"
                allowClear
                onChange={(value) => handleFilterChange("rate", value)}
                options={[5, 4, 3, 2, 1].map((score) => ({
                  value: score,
                  label: (
                    <span className="w-12 flex items-center gap-2">
                      {score} <SingleStar />
                    </span>
                  ),
                }))}
              />
              <Button
                type={reviewFilter.hasImage === "true" ? "primary" : "default"}
                onClick={() => {
                  handleFilterChange(
                    "hasImage",
                    reviewFilter.hasImage === "true" ? "" : "true"
                  );
                }}
              >
                <CameraOutlined /> Có hình
              </Button>
              <Button
                type={
                  reviewFilter.hasComment === "true" ? "primary" : "default"
                }
                onClick={() =>
                  handleFilterChange(
                    "hasComment",
                    reviewFilter.hasComment === "true" ? "" : "true"
                  )
                }
              >
                <CommentOutlined /> Có bình luận
              </Button>
              <Button
                onClick={() => setOpen(true)}
                type="default"
                className="bg-[#313438] text-white"
              >
                <HighlightOutlined /> Viết đánh giá
              </Button>
            </Space>
          </div>
          {reviews.length === 0 ? (
            <>
              <div className="flex items-center justify-center">
                <div className="space-y-2">
                  <img
                    className="w-40 lg:w-60 m-auto"
                    src="https://res.cloudinary.com/dt8cdxgji/image/upload/v1733565402/upload-static-skinlele/pfkfbe8v6aifvf3zfj5a.png"
                    alt="empty-review"
                  />
                  <div className="text-sm md:text-base italic text-center">
                    Sản phẩm chưa có đánh giá !
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Spin spinning={isLoading}>
              <List
                itemLayout="vertical"
                dataSource={reviews}
                renderItem={(review) => (
                  <Card className="mb-4 shadow-lg hover:shadow-xl transition-all duration-300 w-full">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-start space-x-2">
                        <Avatar
                          className="w-12 h-12"
                          src={review.user.avatar.url}
                        />
                        <div className="flex-grow">
                          <div className="flex items-center justify-between w-full flex-wrap">
                            <div className="text-base">
                              <div className="flex items-center gap-4 flex-wrap">
                                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-rose-700 font-extrabold text-sm text-center uppercase">
                                  {review.user.name}
                                </div>
                                {review.order && (
                                  <div className="flex items-center gap-1">
                                    <MdVerified className="text-[#3fbaf6] text-lg" />{" "}
                                    <span className="text-sm text-[#3fbaf6] italic">
                                      Đã mua
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              <MdDateRange />
                              {formatDateReview(review.createdAt)}
                            </div>
                          </div>
                          <Rate
                            disabled
                            value={review.rate}
                            character={({ index }) =>
                              createIcon({
                                index: index + 1,
                                rate: review.rate,
                                hoverValue: review.rate,
                                width: "16px",
                                height: "16px",
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-gray-600 text-base italic">
                        <FaQuoteLeft className="text-gray-400" />
                        <span>{review.comment}</span>
                        <FaQuoteRight className="text-gray-400" />
                      </div>

                      {review.images && review.images.length > 0 && (
                        <Image.PreviewGroup>
                          <div className="flex flex-wrap gap-2">
                            {review.images.map((image, index) => (
                              <Image
                                key={index}
                                src={image.url}
                                alt={`Review image ${index + 1}`}
                                width={60}
                                height={60}
                                preview={{
                                  maskClassName: "rounded-lg",
                                  mask: (
                                    <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-50 rounded-lg">
                                      <EyeOutlined className="text-white text-2xl" />
                                    </div>
                                  ),
                                }}
                              />
                            ))}
                          </div>
                        </Image.PreviewGroup>
                      )}
                    </div>
                  </Card>
                )}
              />
              <div className="text-right mt-4">
                <Pagination
                  current={paginate.page}
                  pageSize={paginate.pageSize}
                  total={paginate.totalItems}
                  onChange={(page) =>
                    setPaginate((prev) => ({ ...prev, page }))
                  }
                  onShowSizeChange={(_, pageSize) =>
                    setPaginate((prev) => ({ ...prev, pageSize }))
                  }
                  showTotal={(total) => `Tổng ${total} đánh giá`}
                />
              </div>
            </Spin>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RateList;
