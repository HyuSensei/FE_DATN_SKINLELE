import { Pagination, Popconfirm, Switch, Table, Tag, Tooltip } from "antd";
import React, { useMemo } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";

const TableClinic = ({
  clinics = [],
  loading = false,
  page,
  pageSize,
  totalItems,
  setPaginate,
}) => {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        title: "STT",
        key: "stt",
        width: 60,
        render: (_, __, index) => (page - 1) * pageSize + index + 1,
      },
      {
        title: "Logo",
        key: "logo",
        dataIndex: "logo",
        width: 80,
        render: (logo) => (
          <img src={logo.url} className="w-full h-auto rounded-full" alt="" />
        ),
      },
      {
        title: "Tên phòng khám",
        dataIndex: "name",
        key: "name",
        render: (text) => <div className="text-sm font-bold">{text}</div>,
      },
      {
        title: "Chuyên khoa",
        dataIndex: "specialties",
        key: "specialties",
        render: (specialties) =>
          specialties?.map((specialty, idx) => (
            <Tag
              key={idx}
              className="rounded-full bg-blue-100 text-[#6c9bbf] border-blue-200"
            >
              {specialty}
            </Tag>
          )),
      },
      {
        title: "Thông tin chung",
        key: "info",
        render: (record) => (
          <div className="space-y-2">
            <div>Địa chỉ: {record.address}</div>
            <div>Số điện thoại: {record.phone}</div>
            <div>Email: {record.email}</div>
          </div>
        ),
      },
      {
        title: "Trạng thái",
        dataIndex: "isActive",
        key: "isActive",
        render: (isActive) => (
          <div className="text-base font-bold">
            {isActive ? (
              <Tag color="#a4dec6">Đang hoạt động</Tag>
            ) : (
              <Tag color="#f4dd22">Đã dừng</Tag>
            )}
          </div>
        ),
      },
      {
        title: "Thao Tác",
        key: "action",
        width: 120,
        render: (_, record) => (
          <div className="flex gap-2 items-center text-[#00246a]">
            <Tooltip title={record.isActive ? "Tạm dừng" : "Mở hoạt động"}>
              <Switch checked={record.isActive} />
            </Tooltip>
            <Popconfirm
              className="max-w-40"
              placement="topLeft"
              title={"Xác nhận xóa tài khoản"}
              description={record?.name}
              onConfirm={() => {}}
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
    [page, pageSize]
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={clinics}
        rowKey={(record) => record._id}
        pagination={false}
        loading={loading}
        scroll={{ x: true }}
      />
      {clinics.length > 0 && (
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
          />
        </div>
      )}
    </>
  );
};

export default TableClinic;
