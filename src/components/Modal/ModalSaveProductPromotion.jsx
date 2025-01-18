import {
  Button,
  Card,
  DatePicker,
  Empty,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Tooltip,
  Upload,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import React, { useState } from "react";
import { createPromotion } from "@redux/promotion/promotion.thunk";
import { useDispatch } from "react-redux";
import { getProductAlmostExpired } from "@redux/product/product.thunk";
import { formatPrice } from "@/helpers/formatPrice";
import dayjs from "@utils/dayjsTz";
import { PlusOutlined } from "@ant-design/icons";
import { UPLOAD_SKINLELE_PRESET, uploadFile } from "@/helpers/uploadCloudinary";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const ModalSaveProductPromotion = ({
  open,
  setOpen,
  selectedProducts,
  paginate,
  setSelectedProducts,
  setProducts,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleSubmit = async (values) => {
    let banner = null;
    if (uploadedImage?.originFileObj) {
      const result = await uploadFile({
        file: uploadedImage.originFileObj,
        type: UPLOAD_SKINLELE_PRESET,
      });
      banner = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }
    const formattedProducts = selectedProducts.map((product) => ({
      product: product.product,
      discountPercentage: form.getFieldValue([
        "products",
        product.product,
        "discountPercentage",
      ]),
      maxQty: form.getFieldValue(["products", product.product, "maxQty"]),
      maxDiscountAmount: form.getFieldValue([
        "products",
        product.product,
        "maxDiscountAmount",
      ]),
    }));
    const formattedValues = {
      ...values,
      banner,
      products: formattedProducts,
      startDate: values.date[0].format("YYYY-MM-DD HH:mm:ss"),
      endDate: values.date[1].format("YYYY-MM-DD HH:mm:ss"),
    };
    delete formattedValues.date;

    if (selectedProducts.length === 0) {
      message.warning("Vui lòng chọn sản phẩm");
      return;
    }
    const res = await dispatch(createPromotion(formattedValues)).unwrap();
    if (res.success) {
      message.success(res.message);
      form.resetFields();
      setSelectedProducts([]);
      setOpen(false);

      const resPro = await dispatch(
        getProductAlmostExpired({ ...paginate })
      ).unwrap();
      if (resPro.success) {
        setProducts(resPro.data);
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setSelectedProducts([]);
  };

  return (
    <Modal
      open={open}
      title={null}
      onOk={handleSubmit}
      onCancel={handleClose}
      footer={null}
      width={900}
    >
      <Form
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="space-y-4"
        initialValues={{
          products: selectedProducts.reduce((acc, product) => {
            acc[product.product] = {
              discountPercentage: product.discountPercentage,
              maxQty: product.maxQty,
              maxDiscountAmount: product.maxDiscountAmount,
            };
            return acc;
          }, {}),
        }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 pt-8">
          <h2 className="text-lg font-bold">Thông tin khuyến mãi</h2>
          <div className="flex items-center gap-2">
            <Button
              htmlType="submit"
              className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto text-white"
            >
              Tạo ngay
            </Button>
          </div>
        </div>
        <Form.Item
          name="name"
          label="Tên khuyến mãi"
          rules={[{ required: true, message: "Vui lòng nhập tên khuyến mãi" }]}
        >
          <Input size="middle" placeholder="Nhập tên khuyến mãi..." />
        </Form.Item>
        <Form.Item
          label="Banner khuyến mãi"
          name="banner"
          rules={[{ required: true, message: "Vui lòng tải lên banner" }]}
        >
          <Upload
            accept="image/*"
            listType="picture-card"
            maxCount={1}
            beforeUpload={() => false}
            fileList={uploadedImage ? [uploadedImage] : []}
            onChange={({ fileList }) => setUploadedImage(fileList[0])}
          >
            <div>
              <PlusOutlined />
              <div className="mt-2">Tải lên</div>
            </div>
          </Upload>
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
          <RangePicker
            size="middle"
            locale={locale}
            className="w-full"
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
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
                  title={product.name}
                  className="text-sm font-normal truncate"
                >
                  {product.name} - ({formatPrice(product.price) + " VND"})
                </Tooltip>
              }
            >
              <div className="flex flex-col sm:flex-row sm:space-y-0 sm:space-x-2 mb-2">
                <Image src={product.image} width={100} className="rounded-md" />
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
                    min={1}
                    className="w-full"
                  />
                </Form.Item>
                <Form.Item
                  name={["products", product.product, "maxDiscountAmount"]}
                  label="Giảm giá tối đa"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giảm giá tối đa",
                    },
                  ]}
                  className="w-full sm:w-1/2"
                >
                  <InputNumber
                    min={1}
                    placeholder="Giảm giá tối đa"
                    className="w-full"
                  />
                </Form.Item>
              </div>
            </Card>
          ))}
        </div>
      </Form>
    </Modal>
  );
};

export default ModalSaveProductPromotion;
