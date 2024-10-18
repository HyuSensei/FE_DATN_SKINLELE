import { Image, Table, Tag, Tooltip } from "antd";
import React, { useMemo, useState } from "react";
import { formatDateReview } from "../../helpers/formatDate";
import { PiSpinnerBall } from "react-icons/pi";
import { formatPrice } from "../../helpers/formatPrice";
import ModalSaveProductPromotion from "../Modal/ModalSaveProductPromotion";
import { isEmpty } from "lodash";

const TableProductAlmostExpired = ({
  products,
  isLoading,
  paginate,
  setPaginate,
  open,
  setOpen,
  setProducts
}) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const columns = useMemo(
    () => [
      {
        title: "Ảnh",
        dataIndex: "mainImage",
        key: "mainImage",
        width: 100,
        render: (mainImage) => (
          <Image
            className="rounded-md"
            src={mainImage.url}
            alt="Product"
            width={80}
            height={80}
            placeholder={<PiSpinnerBall className="animate-spin" />}
          />
        ),
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name",
        render: (_, record) => (
          <div className="space-y-1">
            <Tooltip title={record.name}>
              <div className="text-sm truncate-2-lines">{record.name}</div>
            </Tooltip>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-bold mr-1">Hạn sử dụng:</span>
              {formatDateReview(record.expiry)}
            </div>
            <div className="text-sm truncate-2-lines">
              <span className="font-bold mr-1">Giá:</span>
              <span>{formatPrice(record.price)} đ</span>
            </div>
            {record.promotion && (
              <>
                <div className="text-sm truncate-2-lines">
                  <span className="font-bold mr-1">Khuyến mãi:</span>
                  <span className="italic">
                    {record.promotion.name}{" "}
                    <Tag color="#fc541e">
                      - {record.promotion.discountPercentage} %
                    </Tag>
                  </span>
                </div>
                <div className="text-sm truncate-2-lines">
                  <span className="font-bold mr-1">Thời gian:</span>
                  <span className="italic">
                    {formatDateReview(record.promotion.startDate)} -
                    {formatDateReview(record.promotion.endDate)}
                  </span>
                </div>
              </>
            )}
          </div>
        ),
      },
    ],
    []
  );

  const rowSelection = {
    selectedRowKeys: selectedProducts.map((p) => p.product),
    onChange: (_, selectedRows) => {
      const currentPageProducts = products.map((p) => p._id);

      const productsFromOtherPages = selectedProducts.filter(
        (p) => !currentPageProducts.includes(p.product)
      );

      const updatedCurrentPageProducts = selectedRows.map((row) => {
        const existingProduct = selectedProducts.find(
          (p) => p.product === row._id
        );
        return {
          image: row.mainImage.url,
          product: row._id,
          name: row.name,
          discountPercentage: existingProduct
            ? existingProduct.discountPercentage
            : 0,
          maxQty: existingProduct ? existingProduct.maxQty : 0,
        };
      });

      setSelectedProducts([
        ...productsFromOtherPages,
        ...updatedCurrentPageProducts,
      ]);
    },
    getCheckboxProps: (record) => ({
      disabled: !isEmpty(record.promotion),
    }),
  };

  return (
    <>
      <ModalSaveProductPromotion
        {...{
          open,
          setOpen,
          selectedProducts,
          paginate,
          setSelectedProducts,
          setProducts
        }}
      />
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={products}
        loading={isLoading}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        pagination={{
          current: paginate.page,
          pageSize: paginate.pageSize,
          total: paginate.totalItems,
          onChange: (page, pageSize) => setPaginate({ page, pageSize }),
        }}
        scroll={{ x: true }}
      />
    </>
  );
};

export default TableProductAlmostExpired;
