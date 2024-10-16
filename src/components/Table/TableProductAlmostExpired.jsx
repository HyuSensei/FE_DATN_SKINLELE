import { Image, Table, Tag, Tooltip } from "antd";
import React, { useMemo, useState } from "react";
import { formatDateReview } from "../../helpers/formatDate";
import { PiSpinnerBall } from "react-icons/pi";
import { formatPrice } from "../../helpers/formatPrice";
import ModalSaveProductPromotion from "../Modal/ModalSaveProductPromotion";

const TableProductAlmostExpired = ({
  products,
  isLoading,
  paginate,
  setPaginate,
  open,
  setOpen,
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

  const rowSelection = useMemo(
    () => ({
      selectedRowKeys: selectedProducts.map((p) => p.product),
      onChange: (selectedRowKeys, selectedRows) => {
        const updatedSelectedProducts = selectedRows.map((item) => ({
          product: item._id,
          discountPercentage: 0,
          maxQty: 0,
        }));
        setSelectedProducts(updatedSelectedProducts);

        const productsFieldsValue = {};
        updatedSelectedProducts.forEach((product) => {
          productsFieldsValue[product.product] = {
            discountPercentage: 0,
            maxQty: 0,
          };
        });
        form.setFieldsValue({ products: productsFieldsValue });

        const previousProductIds = selectedProducts.map((p) => p.product);
        const unselectedProductIds = previousProductIds.filter(
          (id) => !selectedRowKeys.includes(id)
        );
        unselectedProductIds.forEach((id) => {
          form.setFields([
            {
              name: ["products", id],
              value: null,
            },
          ]);
        });
      },
      getCheckboxProps: (record) => ({
        disabled: record.promotion !== null,
      }),
    }),
    [selectedProducts]
  );

  return (
    <>
      <ModalSaveProductPromotion
        {...{
          open,
          setOpen,
        }}
      />
      <Table
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
      ;
    </>
  );
};

export default TableProductAlmostExpired;
