import React, { useEffect } from "react";
import { Card, Form, Input, Upload, Row, Col, InputNumber, Tooltip } from "antd";
import { HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi2";
import { ColorPicker } from "antd";
import { motion, AnimatePresence } from "framer-motion";

const ProductVariantForm = ({ form, variants = [], images, setImages }) => {
  useEffect(() => {
    if (variants.length > 0) {
      setImages(
        variants.map((variant) => ({
          uid: variant.color.image.publicId,
          url: variant.color.image.url,
          publicId: variant.color.image.publicId,
        }))
      );
    }
    form.setFieldsValue({
      variants: variants,
    });
  }, [form, variants]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Card
      title="Biến thể sản phẩm"
      className="shadow-lg rounded-xl border-0"
    >
      <Form.List name="variants">
        {(fields, { add, remove }) => (
          <div className="space-y-6">
            <Row gutter={[16, 16]}>
              <AnimatePresence>
                {fields.map((field, index) => (
                  <Col key={field.key} xs={24} lg={12} xl={8}>
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className="hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                        title={
                          <span className="text-gray-700 font-medium">
                            Biến thể {index + 1}
                          </span>
                        }
                        extra={
                          <Tooltip title="Xóa biến thể">
                            <button
                              onClick={() => remove(field.name)}
                              className="p-2 text-red-500 bg-red-50 rounded-full transition-colors"
                            >
                              <HiOutlineTrash className="w-5 h-5" />
                            </button>
                          </Tooltip>
                        }
                      >
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 flex-wrap">
                            <Form.Item
                              className="flex-1"
                              name={[field.name, "color", "name"]}
                              label="Tên màu"
                              rules={[
                                { required: true, message: "Nhập tên màu" }
                              ]}
                            >
                              <Input
                                placeholder="Nhập tên màu..."
                                className="rounded-lg"
                              />
                            </Form.Item>
                            <Form.Item
                            className="flex-1"
                              label="Số lượng"
                              name={[field.name, "quantity"]}
                              rules={[
                                { required: true, message: "Nhập số lượng" },
                                {
                                  type: "number",
                                  min: 1,
                                  message: "Số lượng phải lớn hơn 0",
                                },
                              ]}
                            >
                              <InputNumber
                                className="w-full rounded-lg"
                                placeholder="Nhập số lượng..."
                                min={1}
                              />
                            </Form.Item>
                            <Form.Item
                              name={[field.name, "color", "code"]}
                              label="Mã màu"
                              rules={[
                                { required: true, message: "Chọn mã màu" }
                              ]}
                            >
                              <ColorPicker
                                format="hex"
                                 size="middle"
                              />
                            </Form.Item>
                          </div>
                          <Form.Item
                            name={[field.name, "color", "image"]}
                            label="Ảnh màu sắc"
                            rules={[
                              { required: true, message: "Chọn ảnh cho màu" }
                            ]}
                          >
                            <Upload
                              listType="picture-card"
                              maxCount={1}
                              beforeUpload={() => false}
                              fileList={images[index] ? [images[index]] : []}
                              onChange={({ fileList }) => {
                                const updatedImages = [...images];
                                updatedImages[index] = fileList[0] || null;
                                setImages(updatedImages);
                                form.setFieldValue(
                                  [field.name, "color", "image"],
                                  updatedImages[index]
                                );
                              }}
                              className="flex justify-center"
                            >
                              <div className="flex flex-col items-center gap-1">
                                <HiOutlinePlusCircle className="w-6 h-6" />
                                <span className="text-sm">Tải lên</span>
                              </div>
                            </Upload>
                          </Form.Item>
                        </div>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </AnimatePresence>
            </Row>

            <button
              type="button"
              onClick={() =>
                add({ color: { name: "", code: "#FFFFFF", image: null }, quantity: 1})
              }
              className="w-full h-14 border-2 border-dashed border-gray-300 rounded-xl 
                text-gray-600 font-medium
                hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-all duration-200 flex items-center justify-center gap-2"
            >
              <HiOutlinePlusCircle className="w-5 h-5" />
              Thêm biến thể mới
            </button>
          </div>
        )}
      </Form.List>
    </Card>
  );
};

export default ProductVariantForm;
