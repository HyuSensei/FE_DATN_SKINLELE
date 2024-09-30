import React, { useMemo, useState } from "react";
import { Table, Tooltip, Pagination, Tag, Popconfirm, message } from "antd";
import { GrEdit } from "react-icons/gr";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ModalCategoryAction from "../Modal/ModalCategoryAction";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../redux/category/category.thunk";
import { setCategories } from "../../redux/category/category.slice";

const TableCategory = ({
  categories = [],
  isLoading = false,
  page,
  pageSize,
  totalItems,
  setPaginate,
}) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState({})

  const removeCategory = async (id) => {
    const res = await dispatch(deleteCategory(id)).unwrap();
    if (res.success) {
      const newCategories = categories.filter((item) => (
        item._id !== id
      ))
      message.success(res.message)
      dispatch(setCategories(newCategories))
      return
    }
  }

  const columns = useMemo(
    () => [
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
        render: (text) => (
          <Tooltip title={text}>
            <div className="max-w-64 break-words font-medium truncate-2-lines">
              {text}
            </div>
          </Tooltip>
        ),
      },
      {
        title: "Slug",
        dataIndex: "slug",
        key: "slug",
      },
      {
        title: "Danh mục cha",
        key: "parent",
        render: (_, record) => {
          if (record.parent) {
            const parentCategory = categories.find(
              (cat) => cat._id === record.parent
            );
            return parentCategory ? (
              <Tag className="text-sm" color="#65bebc">
                {parentCategory.name}
              </Tag>
            ) : (
              <Tag className="text-sm" color="#99a7bc">
                Không có
              </Tag>
            );
          }
          return (
            <Tag className="text-sm" color="#99a7bc">
              Không có
            </Tag>
          );
        },
      },
      {
        title: "Thao Tác",
        key: "action",
        width: 120,
        render: (_, record) => (
          <div className="flex gap-2 items-center text-[#00246a]">
            <Tooltip title="Sửa">
              <button onClick={() => {
                setCategory(record)
                setOpen(true)
              }} className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors">
                <GrEdit />
              </button>
            </Tooltip>
            <Popconfirm
              className="max-w-40"
              placement="topLeft"
              title={"Xác nhận xóa thông tin danh mục"}
              description={record?.name}
              onConfirm={() => removeCategory(record._id)}
              okText="Xóa"
              cancelText="Hủy"
              okButtonProps={{
                loading: isLoading,
              }}
              destroyTooltipOnHide={true}
            >
              <Tooltip title="Xóa">
                <button
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
    [page, pageSize, categories]
  );

  return (
    <>
      <ModalCategoryAction {...{
        page,
        pageSize,
        category,
        setCategory,
        open,
        setOpen
      }} />
      <Table
        columns={columns}
        dataSource={categories}
        rowKey={(record) => record._id}
        pagination={false}
        loading={isLoading}
        scroll={{ x: true }}
      />
      {categories?.length > 0 && (
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

export default React.memo(TableCategory);
