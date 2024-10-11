import React, { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProductPromitionAdd } from "../../redux/product/product.thunk";
import { createPromotion } from "../../redux/promotion/promotion.thunk";
import {
  Button,
  DatePicker,
  Input,
  Table,
  InputNumber,
  Form,
  Card,
  message,
  Image,
  Tooltip,
  Tag,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import { PiSpinnerBall } from "react-icons/pi";
import { formatPrice } from "../../helpers/formatPrice";
import { formatDateReview } from "../../helpers/formatDate";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const useProductList = () => {
  const dispatch = useDispatch();
  const {
    products,
    isLoading,
    paginateAdmin: pagination,
  } = useSelector((state) => state.product);

  const [paginate, setPaginate] = React.useState({ page: 1, pageSize: 5 });

  useEffect(() => {
    dispatch(getAllProductPromitionAdd(paginate));
  }, [dispatch, paginate]);

  return { products, isLoading, pagination, setPaginate };
};

const CreatePromotion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { products, isLoading, pagination, setPaginate } = useProductList();

  const [selectedProducts, setSelectedProducts] = React.useState([]);

  const formattedProducts = useMemo(() => {
    return products.map((item) => ({
      key: item._id,
      ...item,
    }));
  }, [products]);

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
    [selectedProducts, form]
  );

  const handleSubmit = useCallback(
    async (values) => {
      if (selectedProducts.length === 0) {
        message.warning("Vui lòng chọn sản phẩm khuyến mãi");
        return;
      }

      const formattedValues = {
        ...values,
        products: selectedProducts.map((product) => ({
          product: product.product,
          discountPercentage:
            values.products[product.product].discountPercentage,
          maxQty: values.products[product.product].maxQty,
        })),
        startDate: values.date[0].format("YYYY-MM-DD"),
        endDate: values.date[1].format("YYYY-MM-DD"),
      };
      delete formattedValues.date;

      try {
        const res = await dispatch(createPromotion(formattedValues)).unwrap();
        if (res.success) {
          message.success(res.message);
          navigate("/admin/promotions");
        }
      } catch (error) {
        message.error("Tạo khuyến mãi thất bại: " + error.message);
      }
    },
    [dispatch, navigate, selectedProducts]
  );

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="w-full lg:w-1/2">
        <h2 className="text-lg font-bold mb-4">Danh sách sản phẩm</h2>
        <Table
          columns={columns}
          dataSource={formattedProducts}
          loading={isLoading}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
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
        <Form
          className="space-y-4"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <h2 className="text-lg font-bold">Tạo mới thông tin khuyến mãi</h2>
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto"
              >
                Tạo khuyến mãi
              </Button>
              <Button
                onClick={() => navigate("/admin/promotions")}
                type="default"
              >
                Hủy
              </Button>
            </div>
          </div>
          <Form.Item
            name="name"
            label="Tên khuyến mãi"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khuyến mãi",
              },
            ]}
          >
            <Input size="middle" placeholder="Nhập tên khuyến mãi..." />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Nhập mô tả..." />
          </Form.Item>
          <Form.Item
            name="date"
            label="Thời gian áp dụng"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thời gian áp dụng",
              },
            ]}
          >
            <RangePicker size="middle" locale={locale} className="w-full" />
          </Form.Item>
          <div>
            <h3 className="text-sm font-medium mb-2">Sản phẩm được chọn</h3>
            {selectedProducts.length === 0 ? (
              <Card size="small" className="text-center py-4">
                Chưa có sản phẩm nào được chọn
              </Card>
            ) : (
              selectedProducts.map((product) => (
                <Card
                  size="small"
                  className="shadow-md hover:shadow-lg transition-shadow duration-300 my-2"
                  key={product.product}
                  title={
                    <div className="text-sm font-normal truncate">
                      {products.find((p) => p._id === product.product)?.name}
                    </div>
                  }
                >
                  <div className="flex flex-col sm:flex-row sm:space-y-0 sm:space-x-2 mb-2">
                    <Form.Item
                      name={["products", product.product, "discountPercentage"]}
                      label="Giảm giá (%)"
                      rules={[
                        { required: true, message: "Vui lòng nhập giảm giá" },
                      ]}
                      className="w-full sm:w-1/2"
                    >
                      <InputNumber
                        placeholder="% giảm giá"
                        min={1}
                        max={100}
                        className="w-full"
                      />
                    </Form.Item>
                    <Form.Item
                      name={["products", product.product, "maxQty"]}
                      label="Số lượng"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số lượng tối đa",
                        },
                      ]}
                      className="w-full sm:w-1/2"
                    >
                      <InputNumber
                        placeholder="Số lượng tối đa"
                        min={0}
                        className="w-full"
                      />
                    </Form.Item>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreatePromotion;
