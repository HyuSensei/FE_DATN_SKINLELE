import { Progress, Avatar, List, Rate, Space, Button, Select } from "antd";
import { FaStar } from "react-icons/fa";
import { createIcon } from "../ultis/createIcon";
import { CameraOutlined, CommentOutlined } from "@ant-design/icons";

const RateList = () => {
  const ratings = [
    { score: 5, count: 120 },
    { score: 4, count: 40 },
    { score: 3, count: 10 },
    { score: 2, count: 5 },
    { score: 1, count: 2 },
  ];

  const totalRatings = ratings.reduce((sum, rating) => sum + rating.count, 0);
  const averageRating =
    ratings.reduce((sum, rating) => sum + rating.score * rating.count, 0) /
    totalRatings;

  const reviews = [
    {
      avatar: "https://joeschmoe.io/api/v1/random",
      name: "Nguyễn Văn A",
      content: "Sản phẩm tuyệt vời, chất lượng rất tốt. Tôi rất hài lòng.",
      rating: 5,
    },
    {
      avatar: "https://joeschmoe.io/api/v1/random",
      name: "Trần Thị B",
      content: "Giao hàng nhanh, sản phẩm đúng như mô tả. Cảm ơn shop!",
      rating: 4,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
      <div className="md:w-1/3">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold">{averageRating.toFixed(1)}</h2>
            <div className="flex justify-center items-center space-x-1">
              <Rate
                disabled
                character={({ index }) =>
                  createIcon({
                    index: index + 1,
                    rate: 5,
                    width: "24px",
                    height: "24px",
                  })
                }
              />
            </div>
            <p className="text-gray-500 mt-2">{totalRatings} đánh giá</p>
          </div>
        </div>
        <div className="mt-4">
          {ratings.map((rating) => (
            <div
              key={rating.score}
              className="flex items-center space-x-2 mb-2"
            >
              <span className="w-12">{rating.score} sao</span>
              <div className="flex-grow">
                <Progress
                  percent={Math.round((rating.count / totalRatings) * 100)}
                  strokeColor="#313438"
                  trailColor="#f0f0f0"
                  strokeWidth={12}
                  showInfo={false}
                  className="w-full"
                />
              </div>
              <span className="ml-2 w-12 text-right">({rating.count})</span>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-between items-center mb-4">
          <Space wrap>
            <Button type="primary">Tất cả</Button>
            <Select placeholder="Lọc theo đánh giá" allowClear>
              <Select.Option value={5}>
                <div className="flex items-center space-x-1">
                  <span>5 sao</span>
                </div>
              </Select.Option>
              <Select.Option value={4}>
                <div className="flex items-center space-x-1">
                  <span>4 sao</span>
                </div>
              </Select.Option>
              <Select.Option value={3}>
                <div className="flex items-center space-x-1">
                  <span>3 sao</span>
                </div>
              </Select.Option>
              <Select.Option value={2}>
                <div className="flex items-center space-x-1">
                  <span>2 sao</span>
                </div>
              </Select.Option>
              <Select.Option value={1}>
                <div className="flex items-center space-x-1">
                  <span>1 sao</span>
                </div>
              </Select.Option>
            </Select>
            <Button type="default">
              <CameraOutlined /> Có hình
            </Button>
            <Button type="default">
              <CommentOutlined /> Có bình luận
            </Button>
          </Space>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={reviews}
          renderItem={(review) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={review.avatar} />}
                title={review.name}
                description={
                  <>
                    <div className="flex items-center space-x-1 mb-1">
                      <Rate
                        disabled
                        character={({ index }) =>
                          createIcon({
                            index: index + 1,
                            rate: 5,
                            width: "16px",
                            height: "16px",
                          })
                        }
                      />
                    </div>
                    <p>{review.content}</p>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default RateList;
