import React from "react";
import { List, Pagination, Rate, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice } from "../../helpers/formatPrice";
import { defaultProduct } from "../../const/defaultProduct";
import { createIcon } from "../../ultis/createIcon";
import ImageCarousel from "../ImageCarousel";

const ProductList = ({
  isLoading,
  products = defaultProduct,
  title = "",
  setPagination,
  pagination = { page: 1, pageSize: 12, totalPage: 0, totalItems: 0 },
  isPagination = true,
}) => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const renderItem = (item) => (
    <List.Item>
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer flex flex-col h-full"
        onClick={() => navigate(`/detail/${item.slug}`)}
      >
        <ImageCarousel
          images={[item.mainImage, ...(item.images || [])].filter(
            (img) => img && img.url
          )}
          name={item.name}
        />
        <div className="font-bold text-sm pt-2 text-center">
          {item.brand.name}
        </div>
        <div className="mt-2 flex-grow">
          <h3 className="text-xs line-clamp-2 items-center leading-5">
            {item.name}
          </h3>
          <div className="mt-2 flex items-center justify-center gap-6">
            <span className="font-bold text-sm">
              {formatPrice(item.price)}đ
            </span>
            <span className="text-slate-400 line-through text-sm">
              {formatPrice(item.price * 1.3)}đ
            </span>
          </div>
          <div className="py-2 flex items-center justify-center gap-2">
            <Rate
              disabled
              character={({ index }) =>
                createIcon({
                  index: index + 1,
                  rate: 5,
                  width: "12px",
                  height: "12px",
                })
              }
            />
            <span className="font-medium">(0)</span>
          </div>
        </div>
      </motion.div>
    </List.Item>
  );

  const Loading = () => (
    <div className="flex items-center justify-center">
      <Spin size="large" />
    </div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto px-4 py-8 md:px-8"
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold uppercase mb-6"
        >
          {title}
        </motion.h2>
      )}
      <List
        grid={{
          gutter: [24, 32],
          xs: 2,
          sm: 3,
          md: 4,
          lg: 5,
          xl: 5,
          xxl: 5,
        }}
        dataSource={isLoading ? Array(10).fill({}) : products}
        renderItem={isLoading ? Loading : renderItem}
      />
      {!isLoading &&
        products?.length > 0 &&
        pagination.totalPage > 1 &&
        isPagination && (
          <div className="mt-8 flex justify-end">
            <Pagination
              {...pagination}
              onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
              onShowSizeChange={(_, pageSize) =>
                setPagination((prev) => ({ ...prev, pageSize }))
              }
              defaultCurrent={1}
            />
          </div>
        )}
    </motion.div>
  );
};

export default ProductList;
