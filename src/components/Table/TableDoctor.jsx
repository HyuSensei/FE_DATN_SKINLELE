import { Pagination, Switch, Table, Tag, Tooltip } from "antd";
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
          <Tag color="blue" className="text-sm">
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
        render: (fee) =>
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(fee),
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
                onClick={() => onEdit?.(record)}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <GrEdit size={18} />
              </button>
            </Tooltip>
            <Tooltip title="Xóa">
              <button
                onClick={() => onDelete?.(record._id)}
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                <MdOutlineDeleteOutline size={20} />
              </button>
            </Tooltip>
          </div>
        ),
      },
    ],
    [onEdit, onDelete, onStatusChange]
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <Table
        columns={columns}
        dataSource={doctors}
        rowKey={(record) => record._id}
        pagination={false}
        loading={loading}
        scroll={{ x: 800 }}
        className="border-t border-gray-200"
      />
      {doctors.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200">
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
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total}`}
            className="text-right"
          />
        </div>
      )}
    </div>
  );
};

export default TableDoctor;
