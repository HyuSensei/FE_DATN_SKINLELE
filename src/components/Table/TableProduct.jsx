import React from "react";
import { Image, Pagination, Table, Tooltip } from "antd";
import { FaEye } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ModalConfirm from "../../pages/ManageProduct/ModalConfirm";
import { PiSpinnerBall } from "react-icons/pi";

const TableProduct = ({
  products = [],
  isLoading = false,
  page,
  pageSize,
  totalPage,
  setPaginate,
}) => {
  const columns = [
    {
      title: "STT",
      key: "stt",
      width: 60,
      render: (_, __, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text) => (
        <Tooltip title={text}>
          <div className="max-w-56 truncate">{text}</div>
        </Tooltip>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      width: 150,
      render: (text) => (
        <Tooltip title={text}>
          <div className="max-w-56 truncate">{text}</div>
        </Tooltip>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "mainImage",
      key: "mainImage",
      width: 100,
      render: (text) => (
        <Image
          src={text.url}
          alt="Product"
          width={80}
          height={80}
          style={{ objectFit: "cover" }}
          placeholder={<PiSpinnerBall className="animate-spin" />}
        />
      ),
    },
    {
      title: "Phân loại",
      dataIndex: "variants",
      key: "variants",
      render: (variants) => (
        <div className="flex flex-wrap gap-2 max-w-[200px]">KHÔNG CÓ</div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (text) => (
        <p className="font-medium text-[#820813]">
          {new Intl.NumberFormat("vi-VN", {
            currency: "VND",
          }).format(text)}{" "}
          đ
        </p>
      ),
    },
    {
      title: "Danh Mục",
      dataIndex: ["categories"],
      key: "categories",
      width: 150,
      render: (text) => <div className="font-medium">CHƯA CÓ</div>,
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
            <button className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors">
              <GrEdit />
            </button>
          </Tooltip>

          <ModalConfirm>
            <Tooltip title="Xóa">
              <button className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors">
                <MdOutlineDeleteOutline />
              </button>
            </Tooltip>
          </ModalConfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={products}
        rowKey={(record) => record._id}
        pagination={false}
        loading={isLoading}
      />
      {products?.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Pagination
            current={data.page}
            pageSize={data.pageSize}
            total={data.totalItems}
            onChange={(page) =>
              setPaginate((prev) => ({
                ...prev,
                page: page,
              }))
            }
            onShowSizeChange={(_, size) =>
              setPaginate((prev) => ({
                ...prev,
                pageSize: size,
              }))
            }
            showSizeChanger
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
        </div>
      )}
    </>
  );
};

export default TableProduct;
