import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductAdmin } from "../../redux/product/product.thunk";
import {
  Button,
  DatePicker,
  Input,
  Table,
  InputNumber,
  Empty,
  Image,
  Tooltip,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import { PiSpinnerBall } from "react-icons/pi";
import { formatPrice } from "../../helpers/formatPrice";
import { formatDateReview } from "../../helpers/formatDate";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const CreatePromotion = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    products: [],
  });
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 5,
  });
  const {
    products,
    isLoading,
    paginateAdmin: pagination,
  } = useSelector((state) => state.product);

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    dispatch(getProductAdmin({ ...paginate }));
  }, [paginate.page, paginate.pageSize]);

  const handleInputChange = (key, value) => {
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const columns = [
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
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price) => (
        <div className="text-sm truncate-2-lines text-[#820813] font-medium">
          {formatPrice(price)} đ
        </div>
      ),
    },
    {
      title: "Chọn",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => {
            const isSelected = selectedProducts.some(
              (p) => p.product === record._id
            );
            if (isSelected) {
              setSelectedProducts(
                selectedProducts.filter((p) => p.product !== record._id)
              );
            } else {
              setSelectedProducts([
                ...selectedProducts,
                {
                  product: record._id,
                  discountPercentage: 0,
                  maxQty: 0,
                },
              ]);
            }
          }}
        >
          {selectedProducts.some((p) => p.product === record._id)
            ? "Bỏ chọn"
            : "Chọn"}
        </Button>
      ),
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="w-full lg:w-1/2">
        <h2 className="text-lg font-bold mb-4">Danh sách sản phẩm</h2>
        <Table
          columns={columns}
          dataSource={products}
          loading={isLoading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.pageSize,
            total: pagination.totalItems,
            onChange: (page, pageSize) => setPaginate({ page, pageSize }),
          }}
          scroll={{ x: true }}
        />
      </div>
      <div className="w-full lg:w-1/2">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <h2 className="text-lg font-bold">Tạo mới thông tin khuyến mãi</h2>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto"
            >
              Tạo khuyến mãi
            </Button>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#14134f] mb-1">
              Tên khuyến mãi
            </label>
            <Input
              placeholder="Nhập tên khuyến mãi..."
              value={input.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#14134f] mb-1">
              Mô tả
            </label>
            <TextArea
              rows={4}
              placeholder="Nhập mô tả..."
              value={input.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#14134f] mb-1">
              Thời gian áp dụng
            </label>
            <RangePicker
              locale={locale}
              className="w-full"
              onChange={(_, dateStrings) => {
                setInput((prev) => ({
                  ...prev,
                  startDate: dateStrings[0],
                  endDate: dateStrings[1],
                }));
              }}
            />
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2">Sản phẩm được chọn</h3>
            {selectedProducts.length === 0 && <Empty />}
            {selectedProducts.map((product, index) => (
              <div
                key={product.product}
                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-2"
              >
                <Input
                  value={products.find((p) => p._id === product.product)?.name}
                  disabled
                  className="w-full sm:w-1/3"
                />
                <InputNumber
                  placeholder="% giảm giá"
                  min={0}
                  max={100}
                  value={product.discountPercentage}
                  onChange={(value) => {
                    const updatedProducts = [...selectedProducts];
                    updatedProducts[index].discountPercentage = value;
                    setSelectedProducts(updatedProducts);
                  }}
                  className="w-full sm:w-1/3"
                />
                <InputNumber
                  placeholder="Số lượng tối đa"
                  min={0}
                  value={product.maxQty}
                  onChange={(value) => {
                    const updatedProducts = [...selectedProducts];
                    updatedProducts[index].maxQty = value;
                    setSelectedProducts(updatedProducts);
                  }}
                  className="w-full sm:w-1/3"
                />
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePromotion;
