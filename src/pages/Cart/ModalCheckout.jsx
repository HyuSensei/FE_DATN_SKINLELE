// import React, { useEffect, useState } from "react";
// import { Collapse, Modal } from "antd";
// import { formatPrice } from "@helpers/formatPrice";
// import { useDispatch, useSelector } from "react-redux";
// import { getDistrict, getProvince, getWard } from "@redux/ship/ship.thunk";
// import { orderCod, orderStripe, orderVnpay } from "@redux/order/order.thunk";
// import { useNavigate } from "react-router-dom";
// import { setOrderReturn } from "@redux/order/order.slice";
// import { loadStripe } from "@stripe/stripe-js";
// import { removeProductAfterOrderSuccess } from "@redux/cart/cart.slice";
// import { validateForm, validateOrderSchema } from "@validate/validate";
// import ErrorMessage from "@components/Error/ErrorMessage";
// import { setDistrict, setWard } from "@redux/ship/ship.slice";
// import { IoMdCloseCircle } from "react-icons/io";
// import isEmpty from "lodash/isEmpty";
// import { MdVerifiedUser } from "react-icons/md";
// import { FaCcStripe } from "react-icons/fa6";
// import { IoCard } from "react-icons/io5";

// const STRIPE_PUBLIC_KEY = import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY;

// const ModalCheckout = ({ open, setOpen, products = [], totalAmount = 0 }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const { provinces, districts, wards } = useSelector((state) => state.ship);
//   const { socketCustomer: socket } = useSelector((state) => state.socket);

//   const [order, setOrder] = useState({
//     name: "",
//     products: [],
//     phone: "",
//     address: "",
//     province: { id: "", name: "" },
//     district: { id: "", name: "" },
//     ward: { id: "", name: "" },
//     note: "",
//     paymentMethod: "COD",
//     totalAmount,
//   });
//   const [validates, setValidates] = useState({});

//   useEffect(() => {
//     if (products.length > 0 && totalAmount > 0) {
//       setOrder((prev) => ({
//         ...prev,
//         products,
//         totalAmount,
//       }));
//     }
//   }, [products, totalAmount]);

//   useEffect(() => {
//     dispatch(getProvince());
//   }, []);

//   useEffect(() => {
//     if (order.province.id) {
//       dispatch(getDistrict(order.province.id));
//     }
//   }, [order.province.id]);

//   useEffect(() => {
//     if (order.district.id) {
//       dispatch(getWard(order.district.id));
//     }
//   }, [order.district.id]);

//   const handleChangeOrder = (key, value) => {
//     setOrder((prev) => ({ ...prev, [key]: value }));
//   };

//   const clearOrder = () => {
//     setOrder((prev) => ({
//       ...prev,
//       name: "",
//       products: products.length > 0 ? products : [],
//       phone: "",
//       address: "",
//       province: { id: "", name: "" },
//       district: { id: "", name: "" },
//       ward: { id: "", name: "" },
//       note: "",
//       paymentMethod: "COD",
//       totalAmount,
//     }));
//     setValidates({});
//     dispatch(setDistrict([]));
//     dispatch(setWard([]));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isAuthenticated) {
//       navigate("/auth");
//       return;
//     }

//     const validationErrors = await validateForm({
//       input: order,
//       validateSchema: validateOrderSchema,
//     });

//     if (Object.keys(validationErrors).length > 0) {
//       setValidates(validationErrors);
//       return;
//     }

//     switch (order.paymentMethod) {
//       case "COD":
//         dispatch(orderCod(order)).then((res) => {
//           if (res.payload.success) {
//             products.forEach((item) => {
//               dispatch(
//                 removeProductAfterOrderSuccess({
//                   productId: item.productId,
//                   color: item.color,
//                 })
//               );
//             });
//             socket?.emit(
//               "createOrder",
//               JSON.stringify({
//                 order: res.payload.data,
//                 model: "User",
//                 recipient: res.payload.data.user,
//               })
//             );
//             dispatch(setOrderReturn(res.payload.data));
//             navigate(`/order-return`);
//           }
//         });
//         break;

//       case "VNPAY":
//         dispatch(orderVnpay(order)).then((res) => {
//           if (res.payload.success) {
//             window.location.href = res.payload.data;
//           }
//         });
//         break;

//       case "STRIPE":
//         const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
//         dispatch(orderStripe(order)).then(async (res) => {
//           if (res.payload.success) {
//             await stripe.redirectToCheckout({
//               sessionId: res.payload.id,
//             });
//           }
//         });
//         break;

//       default:
//         break;
//     }
//   };

//   const CartOrder = () => (
//     <div className="w-full my-4 max-h-[60vh] overflow-y-auto pr-2 space-y-4">
//       {products.map((item, index) => (
//         <div
//           key={`cart-item-modal-${index}`}
//           className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4"
//         >
//           <div className="flex items-center space-x-4">
//             <div className="relative flex-shrink-0">
//               <img
//                 className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md"
//                 src={item?.image}
//                 alt={item.name}
//               />
//               <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                 x{item.quantity}
//               </span>
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="text-sm font-medium text-gray-800 truncate-2-lines">
//                 {item.name}
//               </h3>
//               {!isEmpty(item.color) && (
//                 <div className="mt-1 flex items-center text-xs md:text-sm text-gray-600">
//                   <span className="bg-purple-50 text-purple-800 px-2 py-1 rounded-full flex items-center">
//                     <div
//                       className="w-6 h-6 rounded-full mr-1"
//                       style={{ backgroundColor: item.color.code }}
//                     ></div>
//                     {item.color.name}
//                   </span>
//                 </div>
//               )}
//               <div className="mt-2 flex justify-between items-center">
//                 <span className="text-xs md:text-sm text-gray-500">
//                   Đơn giá: {formatPrice(item.price)}đ
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <Modal
//       open={open}
//       onCancel={() => {
//         setOpen(false);
//         clearOrder();
//       }}
//       footer={null}
//       width={900}
//       className="p-0"
//       closeIcon={<IoMdCloseCircle style={{ fontSize: "30px" }} />}
//     >
//       <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg">
//         <h2 className="pb-4 text-2xl font-bold text-center">
//           Thông tin đặt hàng
//         </h2>

//         <Collapse
//           className="mb-6"
//           items={[
//             {
//               key: "1",
//               label: (
//                 <span className="text-base font-semibold text-gray-700">
//                   Đơn hàng ({products.length} sản phẩm)
//                 </span>
//               ),
//               children: <CartOrder />,
//             },
//           ]}
//         />

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Họ tên:
//               </label>
//               <input
//                 type="text"
//                 className={`w-full p-3 border-2 ${
//                   validates.name ? "border-red-500" : "border-gray-300"
//                 } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
//                 value={order.name}
//                 onChange={(e) => handleChangeOrder("name", e.target.value)}
//                 onFocus={() => setValidates((prev) => ({ ...prev, name: "" }))}
//               />
//               {validates.name && <ErrorMessage message={validates.name} />}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Số điện thoại:
//               </label>
//               <input
//                 type="tel"
//                 className={`w-full p-3 border-2 ${
//                   validates.phone ? "border-red-500" : "border-gray-300"
//                 } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
//                 value={order.phone}
//                 onChange={(e) => handleChangeOrder("phone", e.target.value)}
//                 onFocus={() => setValidates((prev) => ({ ...prev, phone: "" }))}
//               />
//               {validates.phone && <ErrorMessage message={validates.phone} />}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Tỉnh thành:
//             </label>
//             <select
//               value={order.province.id}
//               onChange={(e) => {
//                 const selected = provinces?.find(
//                   (p) => p.ProvinceID === parseInt(e.target.value)
//                 );
//                 if (selected) {
//                   handleChangeOrder("province", {
//                     id: selected.ProvinceID,
//                     name: selected.ProvinceName,
//                   });
//                   handleChangeOrder("district", { id: "", name: "" });
//                   handleChangeOrder("ward", { id: "", name: "" });
//                 }
//               }}
//               onFocus={() =>
//                 setValidates((prev) => ({ ...prev, ["province.id"]: "" }))
//               }
//               className={`w-full p-3 border-2 ${
//                 validates["province.id"] ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
//             >
//               <option value="">---</option>
//               {provinces?.map((item) => (
//                 <option key={item.ProvinceID} value={item.ProvinceID}>
//                   {item.ProvinceName}
//                 </option>
//               ))}
//             </select>
//             {validates["province.id"] && (
//               <ErrorMessage message={validates["province.id"]} />
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Quận huyện:
//               </label>
//               <select
//                 disabled={districts?.length === 0}
//                 value={order.district.id}
//                 onChange={(e) => {
//                   const selected = districts?.find(
//                     (d) => d.DistrictID === parseInt(e.target.value)
//                   );
//                   if (selected) {
//                     handleChangeOrder("district", {
//                       id: selected.DistrictID,
//                       name: selected.DistrictName,
//                     });
//                     handleChangeOrder("ward", { id: "", name: "" });
//                   }
//                 }}
//                 onFocus={() =>
//                   setValidates((prev) => ({ ...prev, ["district.id"]: "" }))
//                 }
//                 className={`w-full p-3 border-2 ${
//                   validates["district.id"]
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
//               >
//                 <option value="" disabled>
//                   ---
//                 </option>
//                 {districts?.map((item) => (
//                   <option key={item.DistrictID} value={item.DistrictID}>
//                     {item.DistrictName}
//                   </option>
//                 ))}
//               </select>
//               {validates["district.id"] && (
//                 <ErrorMessage message={validates["district.id"]} />
//               )}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phường xã:
//               </label>
//               <select
//                 disabled={wards?.length === 0}
//                 value={order.ward.id}
//                 onChange={(e) => {
//                   const selected = wards?.find(
//                     (w) => w.WardCode === e.target.value
//                   );
//                   if (selected) {
//                     handleChangeOrder("ward", {
//                       id: selected.WardCode,
//                       name: selected.WardName,
//                     });
//                   }
//                 }}
//                 onFocus={() =>
//                   setValidates((prev) => ({ ...prev, ["ward.id"]: "" }))
//                 }
//                 className={`w-full p-3 border-2 ${
//                   validates["ward.id"] ? "border-red-500" : "border-gray-300"
//                 } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
//               >
//                 <option value="" disabled>
//                   ---
//                 </option>
//                 {wards?.map((item) => (
//                   <option key={item.WardCode} value={item.WardCode}>
//                     {item.WardName}
//                   </option>
//                 ))}
//               </select>
//               {validates["ward.id"] && (
//                 <ErrorMessage message={validates["ward.id"]} />
//               )}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Địa chỉ:
//             </label>
//             <input
//               type="text"
//               className={`w-full p-3 border-2 ${
//                 validates.address ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
//               value={order.address}
//               onChange={(e) => handleChangeOrder("address", e.target.value)}
//               onFocus={() => setValidates((prev) => ({ ...prev, address: "" }))}
//             />
//             {validates.address && <ErrorMessage message={validates.address} />}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Ghi chú (nếu có):
//             </label>
//             <textarea
//               className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
//               rows="3"
//               value={order.note}
//               onChange={(e) => handleChangeOrder("note", e.target.value)}
//             ></textarea>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               Phương thức thanh toán:
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {[
//                 {
//                   method: "COD",
//                   icon: MdVerifiedUser,
//                   color: "text-green-500",
//                   label: "Thanh toán COD",
//                 },
//                 {
//                   method: "VNPAY",
//                   icon: IoCard,
//                   color: "text-blue-500",
//                   label: "Thanh toán qua VNPay",
//                 },
//                 {
//                   method: "STRIPE",
//                   icon: FaCcStripe,
//                   color: "text-purple-500",
//                   label: "Thanh toán qua Stripe",
//                 },
//               ].map((item) => (
//                 <div
//                   key={item.method}
//                   className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
//                     order.paymentMethod === item.method
//                       ? "border-pink-500 bg-pink-50"
//                       : "border-gray-300 hover:border-pink-300"
//                   }`}
//                   onClick={() =>
//                     handleChangeOrder("paymentMethod", item.method)
//                   }
//                 >
//                   <div className="flex items-center">
//                     <input
//                       type="radio"
//                       checked={order.paymentMethod === item.method}
//                       onChange={() =>
//                         handleChangeOrder("paymentMethod", item.method)
//                       }
//                       className="h-5 w-5 text-pink-600 border-gray-300 focus:ring-pink-500"
//                     />
//                     <label className="ml-3 flex items-center cursor-pointer">
//                       <item.icon className={`text-2xl mr-2 ${item.color}`} />
//                       <span className="font-medium text-gray-900">
//                         {item.label}
//                       </span>
//                     </label>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="mt-8 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg shadow-md">
//             <div className="flex justify-between items-center">
//               <span className="text-base font-semibold text-gray-800">
//                 Tổng tiền:
//               </span>
//               <span className="text-base font-bold">
//                 {formatPrice(totalAmount)}đ
//               </span>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={() => {
//                 setOpen(false);
//                 clearOrder();
//               }}
//               className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400"
//             >
//               Hủy
//             </button>
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500"
//             >
//               Đặt hàng
//             </button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default ModalCheckout;

import React, { useState } from "react";
import { Collapse, Drawer, Form, Input, Select, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { orderCod, orderStripe, orderVnpay } from "@redux/order/order.thunk";
import { useNavigate } from "react-router-dom";
import { setOrderReturn } from "@redux/order/order.slice";
import { loadStripe } from "@stripe/stripe-js";
import { removeProductAfterOrderSuccess } from "@redux/cart/cart.slice";
import { MdVerifiedUser } from "react-icons/md";
import { FaCcStripe } from "react-icons/fa6";
import { IoCard } from "react-icons/io5";
import CartOrder from "./CartOrder";
import { formatPrice } from "@helpers/formatPrice";
import CustomButton from "@/components/CustomButton";
import { useGetDistrictQuery, useGetProvinceQuery, useGetWardQuery } from "@/redux/ship/ship.query";
const { Option } = Select;

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY;

const ModalCheckout = ({ open, setOpen, products = [], totalAmount = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [location, setLoacation] = useState({
    province: {
      id: "",
      name: ""
    },
    district: {
      id: "",
      name: "",
    },
    ward: {
      id: "",
      name: "",
    },
  })
  const { socketCustomer: socket } = useSelector((state) => state.socket);
  const { data: provinces = [], isLoading: isLoadingProvinces } = useGetProvinceQuery();
  const { data: districts = [], isLoading: isLoadingDistricts } = useGetDistrictQuery({ payload: location.province.id }, { skip: !location.province.id });
  const { data: wards = [], isLoading: isLoadingWards } = useGetWardQuery({ payload: location.district.id }, { skip: !location.district.id });
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleChangeLocation = (key, value) => {
    setLoacation((prev) => (
      {
        ...prev,
        [key]: value
      }
    ))
  }

  const handleProvinceChange = (value) => {
    const selected = provinces.find((p) => p.ProvinceID === value);
    if (selected) {
      handleChangeLocation("province", { id: selected.ProvinceID, name: selected.ProvinceName })
      form.setFieldsValue({ district: undefined, ward: undefined });
    }
  };

  const handleDistrictChange = (value) => {
    const selected = districts.find((d) => d.DistrictID === value);
    if (selected) {
      handleChangeLocation("district", { id: selected.DistrictID, name: selected.DistrictName })
      form.setFieldsValue({ ward: undefined });
    }
  };

  const handleWardChange = (value) => {
    const selected = wards.find((w) => w.WardCode === value);
    if (selected) {
      handleChangeLocation("ward", { id: selected.WardCode, name: selected.WardName })
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (!isAuthenticated || !products.length) {
        navigate("/auth");
        return;
      }
      setIsLoading(true)
      const order = {
        ...values,
        ...location,
        products,
        totalAmount,
      };

      switch (order.paymentMethod) {
        case "COD":
          dispatch(orderCod(order)).then((res) => {
            if (res.payload.success) {
              products.forEach((item) =>
                dispatch(
                  removeProductAfterOrderSuccess({
                    productId: item.productId,
                    color: item.color,
                  })
                )
              );
              socket?.emit(
                "createOrder",
                JSON.stringify({
                  order: res.payload.data,
                  model: "User",
                  recipient: res.payload.data.user,
                })
              );
              setLoacation((prev) => ({
                ...prev,
                province: {
                  id: "",
                  name: ""
                },
                district: {
                  id: "",
                  name: "",
                },
                ward: {
                  id: "",
                  name: "",
                },
              }))
              form.resetFields();
              dispatch(setOrderReturn(res.payload.data));
              navigate(`/order-return`);
            }
          });
          break;

        case "VNPAY":
          dispatch(orderVnpay(order)).then((res) => {
            if (res.payload.success) {
              window.location.href = res.payload.data;
            }
          });
          break;

        case "STRIPE":
          const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
          dispatch(orderStripe(order)).then(async (res) => {
            if (res.payload.success) {
              await stripe.redirectToCheckout({ sessionId: res.payload.id });
            }
          });
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      width={900}
      placement="right"
      closable={true}
      title="Thông tin đặt hàng"
    >
      <Collapse
        className="mb-6"
        items={[
          {
            key: "1",
            label: (
              <span className="text-base font-semibold text-gray-700">
                Đơn hàng ({products.length} sản phẩm)
              </span>
            ),
            children: <CartOrder products={products} />,
          },
        ]}
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ paymentMethod: "COD" }}
        requiredMark={false}
      >
        <div className="flex items-center gap-4">
          <Form.Item
            name="name"
            label="Họ tên người nhận"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            className="flex-1"
          >
            <Input size="large" placeholder="Nhập họ tên" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" },
            ]}
            className="flex-1"
          >
            <Input size="large" placeholder="Nhập số điện thoại" />
          </Form.Item>
        </div>

        <Form.Item
          name="province"
          label="Tỉnh thành"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh thành" }]}
        >
          <Select loading={isLoadingProvinces} onChange={handleProvinceChange} size="large" placeholder="Chọn tỉnh thành">
            {provinces.map((p) => (
              <Option key={p.ProvinceID} value={p.ProvinceID}>
                {p.ProvinceName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="district"
          label="Quận huyện"
          rules={[{ required: true, message: "Vui lòng chọn quận huyện" }]}
        >
          <Select loading={isLoadingDistricts} onChange={handleDistrictChange} size="large" placeholder="Chọn quận huyện">
            {districts.map((d) => (
              <Option key={d.DistrictID} value={d.DistrictID}>
                {d.DistrictName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="ward"
          label="Phường xã"
          rules={[{ required: true, message: "Vui lòng chọn phường xã" }]}
        >
          <Select onChange={handleWardChange} loading={isLoadingWards} size="large" placeholder="Chọn phường xã">
            {wards.map((w) => (
              <Option key={w.WardCode} value={w.WardCode}>
                {w.WardName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
          <Input size="large" placeholder="Nhập địa chỉ" />
        </Form.Item>

        <Form.Item name="note" label="Ghi chú (nếu có)">
          <Input.TextArea rows={4} placeholder="Nhập ghi chú" />
        </Form.Item>

        <Form.Item name="paymentMethod" label="Phương thức thanh toán">
          <Radio.Group className="flex">
            <Radio value="COD" className="flex-1 bg-green-100 p-3 rounded-md">
              <div className="flex items-center">
                <MdVerifiedUser className="text-green-500 mr-2 text-3xl" />
                Thanh toán COD
              </div>
            </Radio>
            <Radio value="VNPAY" className="flex-1 bg-sky-100 p-3 rounded-md">
              <div className="flex items-center">
                <IoCard className="text-sky-500 mr-2 text-3xl" />
                Thanh toán qua VNPay
              </div>
            </Radio>
            <Radio value="STRIPE" className="flex-1 bg-purple-100 p-3 rounded-md">
              <div className="flex items-center">
                <FaCcStripe className="text-purple-500 mr-2 text-3xl" />
                Thanh toán qua Stripe
              </div>
            </Radio>
          </Radio.Group>
        </Form.Item>

        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-800">
            Tổng tiền:
          </span>
          <span className="text-base font-bold">
            {formatPrice(totalAmount)}đ
          </span>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <CustomButton onClick={() => setOpen(false)} className="!rounded-full">Hủy</CustomButton>
          <CustomButton loading={isLoading} type="submit" variant="primary" className="hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 bg-gradient-to-r from-pink-500 to-purple-500 text-white !rounded-full">Đặt hàng ngay</CustomButton>
        </div>
      </Form>
    </Drawer>
  );
};

export default ModalCheckout;

