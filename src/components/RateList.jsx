import {
  Progress,
  Avatar,
  List,
  Rate,
  Space,
  Button,
  Select,
  Card,
} from "antd";
import { createAverageRate, createIcon } from "../ultis/createIcon";
import {
  CameraOutlined,
  CommentOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import { useCallback, useRef, useState, useEffect } from "react";
import ModalRate from "./Modal/ModalRate";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { getReviewProduct } from "../redux/review/review.thunk";

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
  const [hasNoReviews, setHasNoReviews] = useState(false);
  const apiCallCount = useRef(0);

  const fetchReviews = useCallback(() => {
    if (!isEmpty(product) && !hasNoReviews) {
      apiCallCount.current += 1;
      dispatch(
        getReviewProduct({
          productId: product._id,
          page: paginate.page,
          pageSize: paginate.pageSize,
          ...reviewFilter,
        })
      )
        .unwrap()
        .then((result) => {
          if (result.data.length === 0 && result.pagination.totalItems === 0) {
            setHasNoReviews(true);
          } else {
            setHasNoReviews(false);
          }
        });
    }
  }, [
    product?._id,
    paginate.page,
    paginate.pageSize,
    reviewFilter,
    dispatch,
    hasNoReviews,
  ]);

  useEffect(() => {
    if (apiCallCount.current < 2) {
      fetchReviews();
    }
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
                <span className="w-12">{score} sao</span>
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
                onClick={() => handleFilterChange("rate", "")}
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
                  label: `${score} sao`,
                }))}
              />
              <Button
                type={reviewFilter.hasImage === "true" ? "primary" : "default"}
                onClick={() =>
                  handleFilterChange(
                    "hasImage",
                    reviewFilter.hasImage === "true" ? "" : "true"
                  )
                }
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
                    src="https://cdni.iconscout.com/illustration/premium/thumb/empty-review-illustration-download-in-svg-png-gif-file-formats--blank-feedback-no-comments-rating-unfilled-marketplace-states-pack-windows-interface-illustrations-9824449.png"
                    alt=""
                  />
                  <div className="text-sm md:text-base italic text-center">
                    Sản phẩm chưa có đánh giá !
                  </div>
                </div>
              </div>
            </>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={reviews}
              renderItem={(review) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={review.user.avatar.url} />}
                    title={review.user.name}
                    description={
                      <>
                        <div className="flex items-center space-x-1 mb-1">
                          <Rate
                            disabled
                            character={({ index }) =>
                              createIcon({
                                index: index + 1,
                                rate: review.rate,
                                width: "16px",
                                height: "16px",
                              })
                            }
                          />
                        </div>
                        <p>{review.comment}</p>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default RateList;
