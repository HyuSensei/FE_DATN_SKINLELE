import React, { useMemo } from "react";
import { Table, Avatar, Tag, Tooltip, Pagination, Switch } from "antd";
import { UserOutlined } from "@ant-design/icons";

const TableUser = ({
  users = [],
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
        title: "Ảnh",
        dataIndex: "avatar",
        key: "avatar",
        render: (avatar) => (
          <Avatar
            src={avatar?.url}
            icon={!avatar?.url && <UserOutlined />}
            alt="Avatar"
          />
        ),
      },
      {
        title: "Tên",
        dataIndex: "name",
        key: "name",
        render: (name) => (
          <Tooltip title={name}>
            <span className="truncate max-w-[150px]">{name}</span>
          </Tooltip>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Trạng thái",
        dataIndex: "isActive",
        key: "isActive",
        render: (isActive) => (
          <Tag color={isActive ? "green" : "red"}>
            {isActive ? "Hoạt động" : "Không hoạt động"}
          </Tag>
        ),
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (date) => new Date(date).toLocaleDateString(),
      },
      {
        title: "Thao tác",
        key: "action",
        render: (_, record) => (
          <div className="flex space-x-2">
            <Tooltip title={record.isActive ? "Vô hiệu hóa" : "Kích hoạt"}>
              <Switch
                checked={record.isActive}
                onChange={(checked) => handleToggleStatus(record._id, checked)}
              />
            </Tooltip>
          </div>
        ),
      },
    ],
    [page, pageSize]
  );

  const handleToggleStatus = (userId, status) => {
    // Implement the logic to toggle the user's status
    console.log("Toggle status for user:", userId, "New status:", status);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={users}
        rowKey={(record) => record._id}
        pagination={false}
        loading={isLoading}
        scroll={{ x: true }}
      />
      {users.length > 0 && (
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

export default React.memo(TableUser);
