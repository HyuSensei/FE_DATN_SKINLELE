// import React, { useEffect, useState } from "react";
// import { Modal, Rate, Spin, Upload, message, notification } from "antd";
// import {
//   UploadOutlined,
//   LoadingOutlined,
//   HeartFilled,
// } from "@ant-design/icons";
// import {
//   uploadFile,
//   deleteFile,
//   UPLOAD_SKINLELE_PRESET,
// } from "@helpers/uploadCloudinary";
// import { validateForm, validateReviewSchema } from "@validate/validate";
// import ErrorValidate from "@components/Error/ErrorMessage";
// import { useDispatch, useSelector } from "react-redux";
// import { createReview, getReviewProduct } from "@redux/review/review.thunk";
// import { useNavigate } from "react-router-dom";
// import { getOrderHistory } from "@redux/order/order.thunk";
// import { createIcon } from "@utils/createIcon";
// import { IoMdCloseCircle } from "react-icons/io";

// const ModalRate = ({
//   product = {},
//   order = "",
//   open,
//   setOpen,
//   rate,
//   setRate,
//   setHoverValue,
//   hoverValue,
//   refetch,
// }) => {
//   const [review, setReview] = useState({
//     order: "",
//     product: "",
//     rate: 0,
//     images: [],
//     comment: "",
//   });
//   const [fileList, setFileList] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [validates, setValidates] = useState({});
//   const dispatch = useDispatch();
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const { isLoading } = useSelector((state) => state.review);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setReview((prev) => ({
//       ...prev,
//       product: product?._id,
//       rate: rate,
//       order: order,
//     }));
//   }, [rate]);

//   const handleImageUpload = async (options) => {
//     const { onSuccess, onError, file, onProgress } = options;

//     setUploading(true);
//     try {
//       onProgress({ percent: 0 });
//       const result = await uploadFile({
//         file,
//         type: UPLOAD_SKINLELE_PRESET,
//       });
//       onProgress({ percent: 100 });
//       onSuccess(result);
//       setReview((prev) => ({
//         ...prev,
//         images: [
//           ...prev.images,
//           { url: result.secure_url, publicId: result.public_id },
//         ],
//       }));
//       setFileList((prevFileList) => [
//         ...prevFileList,
//         {
//           uid: result.public_id,
//           name: file.name,
//           status: "done",
//           url: result.secure_url,
//         },
//       ]);
//     } catch (error) {
//       onError({ error });
//       message.error(`${file.name} tải lên thất bại.`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleImageDelete = async (file) => {
//     const index = review.images.findIndex((img) => img.url === file.url);
//     if (index > -1) {
//       setUploading(true);
//       try {
//         await deleteFile(review.images[index].publicId);
//         setReview((prev) => ({
//           ...prev,
//           images: prev.images.filter((_, i) => i !== index),
//         }));
//         setFileList((prevFileList) =>
//           prevFileList.filter((item) => item.uid !== file.uid)
//         );
//       } catch (error) {
//         message.error("Có lỗi xảy ra khi xóa ảnh. Vui lòng thử lại.");
//       } finally {
//         setUploading(false);
//       }
//     }
//   };

//   const openNotification = () => {
//     notification.success({
//       message: (
//         <span className="text-lg text-white font-semibold">
//           Đánh giá sản phẩm thành công
//         </span>
//       ),
//       description: (
//         <div>
//           <p className="text-base text-white font-medium">
//             Cảm ơn bạn đã dành thời gian chia sẻ trải nghiệm!
//           </p>
//           <p className="text-sm text-white mt-1">
//             Đánh giá của bạn sẽ giúp ích cho cộng đồng người mua hàng.
//           </p>
//         </div>
//       ),
//       placement: "top",
//       duration: 5,
//       icon: <HeartFilled style={{ color: "#d1402c" }} />,
//       style: {
//         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//         width: "600px",
//         borderRadius: 10,
//       },
//       className:
//         "bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 zoom-in-zoom-out",
//     });
//   };

//   const handleRate = async (e) => {
//     e.preventDefault();

//     if (!isAuthenticated) {
//       navigate("/auth");
//       return;
//     }

//     const validationErrors = await validateForm({
//       input: review,
//       validateSchema: validateReviewSchema,
//     });

//     if (Object.keys(validationErrors).length > 0) {
//       setValidates(validationErrors);
//       if (validates.rate && !validates.comment) {
//         message.warning(validates.rate);
//       }
//       return;
//     }
//     dispatch(createReview(review)).then((res) => {
//       if (res.payload.success) {
//         setReview((prev) => ({
//           ...prev,
//           rate: 0,
//           images: [],
//           comment: "",
//         }));
//         setFileList([]);
//         setRate(0);
//         setHoverValue(0);
//         openNotification();
//         if (!order) {
//           dispatch(
//             getReviewProduct({
//               productId: product?._id,
//               page: 1,
//               pageSize: 9,
//               rate: "",
//               hasImage: "",
//               hasComment: "",
//             })
//           );
//         }
//         refetch();
//         setOpen(false);
//       }
//     });
//   };

//   const handleCancelRate = async () => {
//     setReview({
//       order: "",
//       product: "",
//       rate: 0,
//       images: [],
//       comment: "",
//     });
//     setFileList([]);
//     setRate(0);
//     setHoverValue(0);
//     setValidates({});

//     if (review.images.length > 0) {
//       setUploading(true);
//       try {
//         const deletePromises = review.images.map((img) =>
//           deleteFile(img.publicId)
//         );
//         await Promise.all(deletePromises);
//       } catch (error) {
//         message.error("Có lỗi xảy ra khi xóa ảnh. Vui lòng thử lại.");
//       } finally {
//         setUploading(false);
//       }
//     }
//     setOpen(false);
//   };

//   return (
//     <Modal
//       open={open}
//       onOk={handleRate}
//       onCancel={handleCancelRate}
//       footer={null}
//       width={700}
//       className="cosmetic-modal"
//       closeIcon={<IoMdCloseCircle style={{ fontSize: "30px" }} />}
//     >
//       <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
//         <h2 className="text-2xl font-bold text-center pb-4">
//           Đánh giá sản phẩm
//         </h2>

//         <div className="flex items-center space-x-4 mb-8 bg-white p-4 rounded-lg shadow-md">
//           <img
//             className="rounded-lg w-24 h-24 object-cover shadow-lg"
//             src={order ? product?.image : product?.mainImage?.url}
//             alt="image-product"
//           />
//           <div className="text-sm lg:text-base font-medium">
//             {product?.name}
//           </div>
//         </div>

//         <div className="flex justify-center mb-8">
//           <Rate
//             value={rate}
//             character={({ index }) =>
//               createIcon({
//                 index: index + 1,
//                 rate: rate,
//                 hoverValue: hoverValue,
//                 width: "34px",
//                 height: "34px",
//                 activeColor: "#a43a62",
//               })
//             }
//             onChange={(value) => {
//               setRate(value);
//               setReview((prev) => ({ ...prev, rate: value }));
//             }}
//             onHoverChange={(value) => {
//               setHoverValue(value || 0);
//             }}
//           />
//         </div>

//         <div className="mb-6 flex items-center justify-center">
//           <Upload
//             accept="image/*"
//             listType="picture-card"
//             customRequest={handleImageUpload}
//             onRemove={handleImageDelete}
//             fileList={fileList}
//             beforeUpload={(file) => {
//               const isImage = file.type.startsWith("image/");
//               if (!isImage) {
//                 message.warning("Chỉ được phép tải lên file ảnh!");
//               }
//               const isLt2M = file.size / 1024 / 1024 < 2;
//               if (!isLt2M) {
//                 message.warning("Kích thước ảnh phải nhỏ hơn 2MB!");
//               }
//               return isImage && isLt2M;
//             }}
//             maxCount={4}
//           >
//             {fileList.length >= 4 ? null : (
//               <div className="upload-button">
//                 {uploading ? <LoadingOutlined /> : <UploadOutlined />}
//                 <div style={{ marginTop: 8 }}>
//                   {uploading ? "Đang tải..." : "Tải ảnh lên"}
//                 </div>
//               </div>
//             )}
//           </Upload>
//         </div>

//         <div className="mb-6">
//           <div className="font-medium mb-2 text-lg">Nội dung đánh giá:</div>
//           <textarea
//             className={`w-full p-4 ${
//               validates.comment ? "border-red-500" : "border-2 border-pink-200"
//             } rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent transition duration-300 ease-in-out`}
//             rows="4"
//             placeholder="Hãy chia sẻ trải nghiệm của bạn về sản phẩm này..."
//             value={review.comment}
//             onChange={(e) =>
//               setReview((prev) => ({ ...prev, comment: e.target.value }))
//             }
//           ></textarea>
//           {validates.comment && <ErrorValidate message={validates.comment} />}
//         </div>

//         <div className="flex justify-end space-x-4">
//           <button
//             onClick={handleCancelRate}
//             className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-300 ease-in-out"
//             disabled={uploading || isLoading}
//           >
//             Hủy
//           </button>
//           <button
//             onClick={handleRate}
//             className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition duration-300 ease-in-out"
//             disabled={uploading || isLoading}
//           >
//             {isLoading ? <Spin /> : "Gửi đánh giá"}
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ModalRate;

import React, { useState } from "react";
import { Drawer, Rate, Upload, message, notification, Form, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile, UPLOAD_SKINLELE_PRESET } from "@helpers/uploadCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "@redux/review/review.thunk";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";

const ModalRate = ({ product = {}, order = "", open, setOpen, refetch }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.review);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const openNotification = () => {
    notification.success({
      message: "Đánh giá sản phẩm thành công ✨",
      placement: "top",
      duration: 5,
    });
  };

  const handleRateSubmit = async (values) => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    setUploading(true);

    try {
      // Upload từng ảnh và lấy URL
      const uploadedImages = await Promise.all(
        fileList.map((file) =>
          uploadFile({
            file: file.originFileObj,
            type: UPLOAD_SKINLELE_PRESET,
          })
        )
      );

      // Chuẩn bị payload
      const updatedReview = {
        order: order,
        product: product._id,
        rate: values.rate,
        comment: values.comment,
        images: uploadedImages.map((img) => ({
          url: img.secure_url,
          publicId: img.public_id,
        })),
      };

      // Gửi đánh giá
      dispatch(createReview(updatedReview)).then((res) => {
        if (res.payload.success) {
          form.resetFields();
          setFileList([]);
          openNotification();
          refetch();
          setOpen(false);
        }
      });
    } catch (error) {
      console.log(error);
      message.error("Đã xảy ra lỗi khi gửi đánh giá.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancelRate = () => {
    form.resetFields();
    setFileList([]);
    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      onClose={handleCancelRate}
      title="Đánh giá sản phẩm"
      width={700}
    >
      <Form
        requiredMark={false}
        form={form}
        layout="vertical"
        onFinish={handleRateSubmit}
      >
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <img
              className="rounded-lg w-24 h-24 object-cover"
              src={order ? product?.image : product?.mainImage?.url}
              alt="image-product"
            />
            <div className="text-sm font-medium">{product?.name}</div>
          </div>
        </div>

        <Form.Item
          name="rate"
          rules={[
            { required: true, message: "Vui lòng chọn mức độ hài lòng!" },
          ]}
          className="flex items-center justify-center"
        >
          <Rate className="text-4xl text-[#a43a62]" />
        </Form.Item>

        <div className="mb-4">
          <Upload
            accept="image/*"
            listType="picture-card"
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.warning("Chỉ được phép tải lên file ảnh!");
              }
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                message.warning("Kích thước ảnh phải nhỏ hơn 2MB!");
              }
              return false; // Ngăn upload tự động
            }}
            maxCount={4}
          >
            {fileList.length >= 4 ? null : (
              <div className="upload-button">
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
              </div>
            )}
          </Upload>
        </div>

        <Form.Item
          name="comment"
          label="Nội dung đánh giá"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung đánh giá!" },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Hãy chia sẻ trải nghiệm của bạn về sản phẩm này..."
          />
        </Form.Item>

        <div className="flex justify-end space-x-4">
          <CustomButton className="!rounded-full" onClick={handleCancelRate}>
            Hủy
          </CustomButton>
          <CustomButton
            variant="primary"
            type="submit"
            loading={uploading || isLoading}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white !rounded-full hover:from-pink-600 hover:to-purple-600"
          >
            Gửi đánh giá
          </CustomButton>
        </div>
      </Form>
    </Drawer>
  );
};

export default ModalRate;
