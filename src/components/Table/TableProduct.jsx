import React, { useMemo, useState } from "react";
import {
  Image,
  Pagination,
  Table,
  Tooltip,
  Tag,
  Popconfirm,
  message,
} from "antd";
import { FaEye } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { PiSpinnerBall } from "react-icons/pi";
import { formatPrice } from "../../helpers/formatPrice";
import ModalEditProduct from "../Modal/ModalEditProduct";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  getProductAdmin,
} from "../../redux/product/product.thunk";
import { deleteFile } from "../../helpers/uploadCloudinary";

const getColorTag = (tag) => {
  switch (tag) {
    case "HOT":
      return "#eb1c26";
    case "NEW":
      return "#5bc0de";
    case "SALE":
      return "#28a745";
    case "SELLING":
      return "#fab40a";
    default:
      return "#eb1c26";
  }
};

const TableProduct = ({
  products = [],
  isLoading = false,
  page,
  pageSize,
  totalItems,
  setPaginate,
}) => {
  const [productItem, setProductItem] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();

  const removeProduct = (id) => {
    dispatch(deleteProduct(id)).then(async (res) => {
      if (res.payload.success) {
        const deletedProduct = res.payload.data;

        if (deletedProduct.mainImage && deletedProduct.mainImage.publicId) {
          await deleteFile(deletedProduct.mainImage.publicId);
        }
        y;
        if (deletedProduct.images && deletedProduct.images.length > 0) {
          await Promise.all(
            deletedProduct.images.map(async (image) => {
              if (image.publicId) {
                await deleteFile(image.publicId);
              }
            })
          );
        }

        if (deletedProduct.variants && deletedProduct.variants.length > 0) {
          await Promise.all(
            deletedProduct.variants.map(async (variant) => {
              if (variant.color.image && variant.color.image.publicId) {
                await deleteFile(variant.color.image.publicId);
              }
            })
          );
        }

        message.success(res.payload.message);
        dispatch(
          getProductAdmin({
            page: 1,
            pageSize: 10,
            name: "",
            category: "",
            brand: "",
            tag: "",
            sort: "asc",
          })
        );
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        title: "STT",
        key: "stt",
        width: 60,
        render: (_, __, index) => (page - 1) * pageSize + index + 1,
      },
      {
        title: "Ảnh",
        dataIndex: "mainImage",
        key: "mainImage",
        width: 100,
        render: (mainImage) => (
          <Image
            src={mainImage.url}
            alt="Product"
            width={80}
            height={80}
            style={{ objectFit: "cover" }}
            placeholder={<PiSpinnerBall className="animate-spin" />}
          />
        ),
      },
      {
        title: "Tên",
        dataIndex: "name",
        key: "name",
        width: 250,
        render: (text) => (
          <Tooltip title={text}>
            <div className="max-w-64 break-words font-medium truncate-2-lines text-sm">
              {text}
            </div>
          </Tooltip>
        ),
      },
      {
        title: "Thương hiệu",
        dataIndex: ["brand", "name"],
        key: "brand",
        width: 140,
        render: (text) => (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-extrabold text-sm text-center uppercase">
            {text}
          </span>
        ),
      },
      {
        title: "Phân loại",
        dataIndex: "variants",
        key: "variants",
        width: 150,
        render: (variants) => (
          <div className="flex flex-wrap gap-1">
            {variants && variants.length > 0 ? (
              variants.map((variant, index) => (
                <Tooltip key={index} title={variant.color.name}>
                  <div
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: variant.color.code }}
                  />
                </Tooltip>
              ))
            ) : (
              <Tag color="#99a7bc">Không có</Tag>
            )}
          </div>
        ),
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
        width: 120,
        render: (price) => (
          <p className="font-medium text-[#820813]">{formatPrice(price)} đ</p>
        ),
      },
      {
        title: "Danh Mục",
        dataIndex: "categories",
        key: "categories",
        width: 120,
        render: (categories) => (
          <div className="font-medium flex items-center flex-wrap gap-1">
            {categories && categories.length > 0 ? (
              categories.map((item) => (
                <Tag key={item._id} color="#deb887">
                  {item.name}
                </Tag>
              ))
            ) : (
              <Tag color="#99a7bc">Không có</Tag>
            )}
          </div>
        ),
      },
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        width: 100,
        render: (tags) => (
          <div className="flex flex-wrap gap-1">
            {tags && tags.length > 0 ? (
              tags.map((tag, index) => (
                <Tag key={index} color={getColorTag(tag)}>
                  {tag}
                </Tag>
              ))
            ) : (
              <Tag color="#99a7bc">Không có</Tag>
            )}
          </div>
        ),
      },
      {
        title: "Thao Tác",
        key: "action",
        width: 120,
        fixed: "right",
        render: (_, record) => (
          <div className="flex gap-2 items-center text-[#00246a]">
            <Tooltip title="Xem">
              <button className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors">
                <FaEye />
              </button>
            </Tooltip>
            <Tooltip title="Sửa">
              <button
                onClick={() => {
                  setProductItem(record);
                  setOpenEdit(true);
                }}
                className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors"
              >
                <GrEdit />
              </button>
            </Tooltip>

            <Popconfirm
              className="max-w-40"
              placement="topLeft"
              title={"Xác nhận xóa thông tin sản phẩm"}
              description={record?.name}
              onConfirm={() => removeProduct(record._id)}
              okText="Xóa"
              cancelText="Hủy"
              okButtonProps={{
                loading: isLoading,
              }}
              destroyTooltipOnHide={true}
            >
              <Tooltip title="Xóa">
                <button
                  onClick={() => {
                    setProductItem(record);
                  }}
                  className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors"
                >
                  <MdOutlineDeleteOutline />
                </button>
              </Tooltip>
            </Popconfirm>
          </div>
        ),
      },
    ],
    [page, pageSize]
  );

  return (
    <>
      <ModalEditProduct
        {...{
          data: productItem,
          open: openEdit,
          setOpen: setOpenEdit,
          setData: setProductItem,
        }}
      />
      <Table
        columns={columns}
        dataSource={products}
        rowKey={(record) => record._id}
        pagination={false}
        loading={isLoading}
        scroll={{ x: true }}
      />
      {products?.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={totalItems}
            onChange={(newPage, newPageSize) =>
              setPaginate(newPage, newPageSize)
            }
            showSizeChanger
            pageSizeOptions={["10", "20", "50", "100"]}
          />
        </div>
      )}
    </>
  );
};

export default React.memo(TableProduct);
