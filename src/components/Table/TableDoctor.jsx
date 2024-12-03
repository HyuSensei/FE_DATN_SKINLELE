import { formatPrice } from "@/helpers/formatPrice";
import { Popconfirm, Switch, Table, Tag, Tooltip } from "antd";
import React, { useMemo, useState } from "react";
import { GrEdit } from "react-icons/gr";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";

const TableDoctor = ({
  doctors = [],
  loading = false,
  page,
  pageSize,
  totalItems,
  setPaginate,
}) => {
  const dispatch = useDispatch();

  const onStatusChange = () => {};
  const onDelete = () => {};
  const onEdit = () => {};

  const columns = useMemo(
    () => [
      {
        title: "Bác sĩ",
        dataIndex: "name",
        key: "name",
        width: 250,
        render: (text, record) => (
          <div className="flex items-center gap-3">
            <img
              src={record.avatar.url}
              alt={text}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-800">{text}</p>
              <p className="text-sm text-gray-500">{record.email}</p>
            </div>
          </div>
        ),
      },
      {
        title: "Chuyên khoa",
        dataIndex: "specialty",
        key: "specialty",
        width: 150,
        render: (specialty) => (
          <Tag color="blue" className="text-sm py-2 px-3 rounded-full">
            {specialty}
          </Tag>
        ),
      },
      {
        title: "Kinh nghiệm",
        dataIndex: "experience",
        key: "experience",
        width: 120,
        render: (years) => `${years} năm`,
      },
      {
        title: "Phí khám",
        dataIndex: "fees",
        key: "fees",
        width: 120,
        render: (fee) => `${formatPrice(fee)} VND`,
      },
      {
        title: "Liên hệ",
        dataIndex: "phone",
        key: "phone",
        width: 130,
      },
      {
        title: "Trạng thái",
        dataIndex: "isActive",
        key: "isActive",
        width: 100,
        render: (isActive, record) => (
          <Switch
            checked={isActive}
            onChange={(checked) => onStatusChange?.(record._id, checked)}
            className={`${isActive ? "bg-blue-600" : "bg-gray-200"}`}
          />
        ),
      },
      {
        title: "Thao tác",
        key: "action",
        width: 100,
        render: (_, record) => (
          <div className="flex items-center gap-3">
            <Tooltip title="Chỉnh sửa">
              <button
                onClick={() => onEdit()}
                className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors"
              >
                <GrEdit />
              </button>
            </Tooltip>
            <Popconfirm
              className="max-w-40"
              placement="topLeft"
              title={"Xác nhận xóa bác sĩ"}
              onConfirm={() => {
                onDelete();
              }}
              okText="Xóa"
              cancelText="Hủy"
              destroyTooltipOnHide={true}
            >
              <Tooltip title="Xóa">
                <button className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors">
                  <MdOutlineDeleteOutline />
                </button>
              </Tooltip>
            </Popconfirm>
          </div>
        ),
      },
    ],
    [onEdit, onDelete, onStatusChange]
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={doctors}
        rowKey={(record) => record._id}
        loading={loading}
        scroll={{ x: true }}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: totalItems,
          onChange: (page, pageSize) =>
            setPaginate((prev) => ({
              ...prev,
              page,
              pageSize,
            })),
        }}
      />
    </>
  );
};

export default TableDoctor;
