import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPromotionDetail,
  updatePromotion,
} from "../../redux/promotion/promotion.thunk";
import { getAllProductPromitionAdd } from "../../redux/product/product.thunk";
import {
  Empty,
  Spin,
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Table,
  Card,
  message,
  Image,
  Tag,
  Tooltip,
} from "antd";
import { isEmpty } from "lodash";
import moment from "moment";
import locale from "antd/es/date-picker/locale/vi_VN";
import { PiSpinnerBall } from "react-icons/pi";
import { formatPrice } from "../../helpers/formatPrice";
import { formatDateReview } from "../../helpers/formatDate";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const PromotionDetail = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { promotion, isLoading: promotionLoading } = useSelector(
    (state) => state.promotion
  );
  const {
    products,
    isLoading: productsLoading,
    paginateAdmin: pagination,
  } = useSelector((state) => state.product);
  const { id } = useParams();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [paginate, setPaginate] = useState({ page: 1, pageSize: 5 });

  useEffect(() => {
    if (id) {
      dispatch(getPromotionDetail(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getAllProductPromitionAdd(paginate));
  }, [paginate, dispatch]);

  useEffect(() => {
    if (!isEmpty(promotion)) {
      form.setFieldsValue({
        name: promotion.name,
        description: promotion.description,
        date: [moment(promotion.startDate), moment(promotion.endDate)],
      });
      setSelectedProducts(promotion.products);
    }
  }, [promotion, form]);

  const productsWithPromoInfo = useMemo(() => {
    if (isEmpty(promotion) || isEmpty(products)) return [];
    return products.map((product) => ({
      ...product,
      isInCurrentPromotion: promotion.products.some(
        (p) => p.product._id === product._id
      ),
      promotionInfo: product.promotion,
    }));
  }, [promotion, products]);

  const handleSubmit = async (values) => {
    const formattedProducts = selectedProducts.map((product) => ({
      product: product.product,
      discountPercentage: form.getFieldValue([
        "products",
        product.product,
        "discountPercentage",
      ]),
      maxQty: form.getFieldValue(["products", product.product, "maxQty"]),
    }));

    const formattedValues = {
      ...values,
      products: formattedProducts,
      startDate: values.date[0].format("YYYY-MM-DD HH:mm:ss"),
      endDate: values.date[1].format("YYYY-MM-DD HH:mm:ss"),
    };
    delete formattedValues.date;

    const res = await dispatch(
      updatePromotion({ id, data: formattedValues })
    ).unwrap();
    if (res.success) {
      message.success(res.message);
      navigate("/admin/promotions");
    }
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
          <div className="text-sm truncate-2-lines">{record.name}</div>
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
                  {formatDateReview(record.promotion.startDate)} -{" "}
                  {formatDateReview(record.promotion.endDate)}
                </span>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedProducts.map((p) => p.product),
    onChange: (selectedRowKeys, selectedRows) => {
      const updatedSelectedProducts = selectedRows.map((row) => {
        const existingProduct = selectedProducts.find(
          (p) => p.product === row._id
        );
        return {
          product: row._id,
          name: row.name,
          discountPercentage: existingProduct
            ? existingProduct.discountPercentage
            : 0,
          maxQty: existingProduct ? existingProduct.maxQty : 0,
        };
      });
      setSelectedProducts(updatedSelectedProducts);

      const productsFieldsValue = {};
      updatedSelectedProducts.forEach((product) => {
        productsFieldsValue[product.product] = {
          discountPercentage: product.discountPercentage,
          maxQty: product.maxQty,
        };
      });
      form.setFieldsValue({ products: productsFieldsValue });
    },
    getCheckboxProps: (record) => ({
      disabled: record.promotionInfo && !record.isInCurrentPromotion,
      name: record.name,
    }),
  };

  if (promotionLoading || productsLoading) {
    return (
      <div className="flex items-center justify-center flex-col h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isEmpty(promotion)) return <Empty className="mt-24" />;

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="w-full lg:w-1/2">
        <h2 className="text-lg font-bold mb-4">Danh sách sản phẩm</h2>
        <Table
          columns={columns}
          dataSource={productsWithPromoInfo}
          rowSelection={rowSelection}
          rowKey="_id"
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
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <h2 className="text-lg font-bold">Cập nhật thông tin khuyến mãi</h2>
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto"
              >
                Cập nhật khuyến mãi
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
              { required: true, message: "Vui lòng nhập tên khuyến mãi" },
            ]}
          >
            <Input size="middle" placeholder="Nhập tên khuyến mãi..." />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <TextArea rows={4} placeholder="Nhập mô tả..." />
          </Form.Item>
          <Form.Item
            name="date"
            label="Thời gian áp dụng"
            rules={[
              { required: true, message: "Vui lòng chọn thời gian áp dụng" },
            ]}
          >
            <RangePicker size="middle" locale={locale} className="w-full" />
          </Form.Item>
          <div>
            <h3 className="text-sm font-medium mb-2">Sản phẩm được chọn</h3>
            {selectedProducts.length === 0 && <Empty />}
          {selectedProducts.map((product) => (
              <Card
                size="small"
                className="shadow-md hover:shadow-lg transition-shadow duration-300 my-2"
                key={product.product}
                title={
                  <Tooltip
                    title={
                      products.find((p) => p._id === product.product)?.name
                    }
                    className="text-sm font-normal truncate"
                  >
                    {products.find((p) => p._id === product.product)?.name}
                  </Tooltip>
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
                    initialValue={product.discountPercentage}
                  >
                    <InputNumber
                      placeholder="% giảm giá"
                      min={0}
                      max={100}
                      className="w-full"
                      disabled={
                        !product.isInCurrentPromotion && product.promotionInfo
                      }
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
                    initialValue={product.maxQty}
                  >
                    <InputNumber
                      placeholder="Số lượng tối đa"
                      min={0}
                      className="w-full"
                      disabled={
                        !product.isInCurrentPromotion && product.promotionInfo
                      }
                    />
                  </Form.Item>
                </div>
              </Card>
            ))}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PromotionDetail;
