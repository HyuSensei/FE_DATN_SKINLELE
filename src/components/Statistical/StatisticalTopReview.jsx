import React from "react";
import { Card, Empty, Rate, Spin } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const StatisticalTopReview = ({ isLoading, topReviewedProducts }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );
  }

  if (!Array.isArray(topReviewedProducts) || topReviewedProducts.length === 0) {
    return <Empty />;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.4,
        type: "spring",
      },
    }),
  };

  return (
    <div className="relative mt-4">
      <div className="flex overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex space-x-4">
          {topReviewedProducts.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
            >
              <Card
                hoverable
                className="w-64 flex-shrink-0 shadow-md transition-shadow duration-300"
                cover={
                  <img
                    alt={item.name}
                    src={item.image}
                    className="h-48 w-full object-cover"
                  />
                }
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-sm font-medium mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <Rate
                        disabled
                        defaultValue={item.averageRating}
                        className="text-sm"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        {item.averageRating.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MessageOutlined className="mr-1" />
                      {item.reviewCount}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticalTopReview;
