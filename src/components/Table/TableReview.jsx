import React, { useMemo } from "react";
import { Table, Rate, Image, Tooltip, Tag, Pagination } from "antd";
import { FaCheck, FaTimes } from "react-icons/fa";

const TableReview = ({
  reviews = [],
  isLoading = false,
  page,
  pageSize,
  totalItems,
  setPaginate,
}) => {
  const columns = useMemo(
    () => [
      {
        title: "STT",
        key: "index",
        width: 60,
        render: (_, __, index) => (page - 1) * pageSize + index + 1,
      },
      {
        title: "Sản phẩm",
        dataIndex: "product",
        key: "product",
        render: (product) => (
          <div className="flex items-center">
            <Image
              src={product.image}
              alt={product.name}
              width={50}
              height={50}
              className="object-cover mr-2"
            />
            <Tooltip title={product.name}>
              <span className="truncate max-w-[150px]">{product.name}</span>
            </Tooltip>
          </div>
        ),
      },
      {
        title: "Khách hàng",
        dataIndex: "user",
        key: "user",
        render: (user) => user.name,
      },
      {
        title: "Đánh giá",
        dataIndex: "rate",
        key: "rate",
        render: (rate) => <Rate disabled defaultValue={rate} />,
      },
      {
        title: "Bình luận",
        dataIndex: "comment",
        key: "comment",
        render: (comment) => (
          <Tooltip title={comment}>
            <span className="truncate max-w-[200px]">{comment}</span>
          </Tooltip>
        ),
      },
      {
        title: "Ngày đánh giá",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (date) => new Date(date).toLocaleDateString(),
      },
      {
        title: "Trạng thái",
        dataIndex: "display",
        key: "display",
        render: (display) => (
          <Tag color={display ? "green" : "red"}>
            {display ? "Hiển thị" : "Ẩn"}
          </Tag>
        ),
      },
      {
        title: "Thao tác",
        key: "action",
        render: (_, record) => (
          <div className="flex space-x-2">
            <Tooltip
              title={record.display ? "Ẩn đánh giá" : "Hiển thị đánh giá"}
            >
              <button
                className={`p-2 rounded ${
                  record.display ? "bg-red-500" : "bg-green-500"
                } text-white`}
                onClick={() => handleToggleDisplay(record._id)}
              >
                {record.display ? <FaTimes /> : <FaCheck />}
              </button>
            </Tooltip>
          </div>
        ),
      },
    ],
    [page, pageSize]
  );

  const handleToggleDisplay = (reviewId) => {
    // Implement the logic to toggle the display status of the review
    console.log("Toggle display for review:", reviewId);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={reviews}
        rowKey={(record) => record._id}
        pagination={false}
        loading={isLoading}
        scroll={{ x: true }}
      />
      {reviews.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={totalItems}
            onChange={(newPage, newPageSize) =>
              setPaginate((prev) => ({
                ...prev,
                page: newPage,
                pageSize: newPageSize,
              }))
            }
            showSizeChanger
            showQuickJumper
          />
        </div>
      )}
    </>
  );
};

export default React.memo(TableReview);
