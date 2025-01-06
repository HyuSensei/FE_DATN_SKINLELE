// import React from "react";
// import {
//   Card,
//   Form,
//   Input,
//   Upload,
//   Row,
//   Col,
//   ColorPicker,
//   InputNumber,
// } from "antd";
// import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
// import CustomButton from "@/components/CustomButton";

// const ProductVariantForm = ({ form }) => {
//   return (
//     <Form.List name="variants" initialValue={[]}>
//       {(fields, { add, remove }) => (
//         <div className="w-full">
//           <Row gutter={[16, 16]}>
//             {fields.map((field, index) => (
//               <Col key={field.key} xs={24} md={12} lg={8}>
//                 <Card
//                   title={`Biến thể ${index + 1}`}
//                   extra={
//                     <CustomButton
//                       variant="danger"
//                       icon={<DeleteOutlined />}
//                       onClick={() => {
//                         remove(field.name);
//                       }}
//                     >
//                       Xóa
//                     </CustomButton>
//                   }
//                 >
//                   <div className="flex items-center gap-2 flex-wrap">
//                     <Form.Item
//                       className="flex-1"
//                       name={[field.name, "color", "name"]}
//                       label="Tên màu"
//                       rules={[{ required: true, message: "Nhập tên màu" }]}
//                     >
//                       <Input size="middle" placeholder="Nhập tên màu..." />
//                     </Form.Item>

//                     <Form.Item
//                       name={[field.name, "color", "code"]}
//                       label="Mã màu"
//                       rules={[{ required: true, message: "Chọn mã màu" }]}
//                     >
//                       <ColorPicker size="middle" format="hex" showText />
//                     </Form.Item>
//                   </div>
//                   <Form.Item
//                     label="Số lượng"
//                     name={[field.name, "quantity"]}
//                     rules={[
//                       { required: true, message: "Vui lòng nhập số lượng" },
//                     ]}
//                   >
//                     <InputNumber
//                       className="w-full"
//                       placeholder="Nhập số lượng..."
//                       size="middle"
//                       type="number"
//                     />
//                   </Form.Item>
//                   <Form.Item
//                     name={[field.name, "color", "image"]}
//                     label="Ảnh màu sắc"
//                     rules={[{ required: true, message: "Chọn ảnh cho màu" }]}
//                   >
//                     <Upload
//                       listType="picture-card"
//                       maxCount={1}
//                       beforeUpload={() => false}
//                     >
//                       <div>
//                         <PlusOutlined /> Tải lên
//                       </div>
//                     </Upload>
//                   </Form.Item>
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           <button
//             type="button"
//             onClick={() => add({ color: { name: "", code: "", image: null } })}
//             className="w-full h-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors mt-4"
//           >
//             <PlusOutlined /> Thêm biến thể
//           </button>
//         </div>
//       )}
//     </Form.List>
//   );
// };

// export default ProductVariantForm;

import React from "react";
import {
  Card,
  Form,
  Input,
  Upload,
  Row,
  Col,
  ColorPicker,
  InputNumber,
  Tooltip,
} from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi2";

const ProductVariantForm = ({ form }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Form.List name="variants" initialValue={[]}>
      {(fields, { add, remove }) => (
        <div className="w-full space-y-6">
          <Row gutter={[16, 16]}>
            <AnimatePresence>
              {fields.map((field, index) => (
                <Col key={field.key} xs={24} md={12} lg={8}>
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
                        <div className="flex items-center flex-wrap gap-4">
                          <Form.Item
                            className="flex-1"
                            name={[field.name, "color", "name"]}
                            label="Tên màu"
                            rules={[
                              { required: true, message: "Nhập tên màu" }
                            ]}
                          >
                            <Input
                              size="middle"
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
                              size="middle"
                              type="number"
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
                              size="middle"
                              format="hex"
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
            onClick={() => add({ color: { name: "", code: "#FFFFFF", image: null }, quantity: 1 })}
            className="w-full h-14 border-2 border-dashed border-gray-300 
              rounded-xl text-gray-600 font-medium
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
  );
};

export default ProductVariantForm;