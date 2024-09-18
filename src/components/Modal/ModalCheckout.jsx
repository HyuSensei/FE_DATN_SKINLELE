import React, { useEffect, useState } from "react";
import { Collapse, Modal } from "antd";
import { formatPrice } from "../../helpers/formatPrice";
import useScreen from "../../hook/useScreen";
import { useDispatch, useSelector } from "react-redux";
import { getDistrict, getProvince, getWard } from "../../redux/ship/ship.thunk";
import {
  orderCod,
  orderStripe,
  orderVnpay,
} from "../../redux/order/order.thunk";
import { FaCreditCard } from "react-icons/fa";
import { SiStripe } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { setOrderReturn } from "../../redux/order/order.slice";
import { loadStripe } from "@stripe/stripe-js";
import { clearCart } from "../../redux/cart/cart.slice";
import { validateForm, validateOrderSchema } from "../../validate/validate";
import ErrorMessage from "../../components/Error/ErrorMessage";
import { setDistrict, setWard } from "../../redux/ship/ship.slice";
import { IoMdCloseCircle } from "react-icons/io";

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY;

const ModalCheckout = ({ open, setOpen, products = [], totalAmount = 0 }) => {
  const navigate = useNavigate();
  const { isMobile } = useScreen();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { provinces, districts, wards } = useSelector((state) => state.ship);
  const [order, setOrder] = useState({
    name: "",
    products:
      products?.map((item) => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        size: item.size,
        color: item.color,
        price: item.price,
        quantity: item.quantity,
      })) || [],
    phone: "",
    address: "",
    province: { id: "", name: "" },
    district: { id: "", name: "" },
    ward: { id: "", name: "" },
    note: "",
    paymentMethod: "COD",
    totalAmount,
  });
  const [validates, setValidates] = useState({});

  useEffect(() => {
    dispatch(getProvince());
  }, []);

  useEffect(() => {
    if (order.province.id) {
      dispatch(getDistrict(order.province.id));
    }
  }, [order.province.id]);

  useEffect(() => {
    if (order.district.id) {
      dispatch(getWard(order.district.id));
    }
  }, [order.district.id]);

  const handleChangeOrder = (key, value) => {
    setOrder((prev) => ({ ...prev, [key]: value }));
  };

  const clearOrder = () => {
    setOrder((prev) => ({
      ...prev,
      name: "",
      products:
        products?.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          size: item.size,
          color: item.color,
          price: item.price,
          quantity: item.quantity,
        })) || [],
      phone: "",
      address: "",
      province: { id: "", name: "" },
      district: { id: "", name: "" },
      ward: { id: "", name: "" },
      note: "",
      paymentMethod: "COD",
      totalAmount,
    }));
    setValidates({});
    dispatch(setDistrict([]));
    dispatch(setWard([]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    const validationErrors = await validateForm({
      input: order,
      validateSchema: validateOrderSchema,
    });
    if (Object.keys(validationErrors).length > 0) {
      setValidates(validationErrors);
      return;
    }
    switch (order.paymentMethod) {
      case "COD":
        return dispatch(orderCod(order)).then((res) => {
          if (res.payload.success) {
            dispatch(clearCart());
            navigate(`/order-return`);
            dispatch(setOrderReturn(res.payload.data));
          }
        });
      case "VNPAY":
        return dispatch(orderVnpay(order)).then((res) => {
          if (res.payload.success) {
            window.location.href = res.payload.data;
          }
        });
      case "STRIPE":
        const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
        dispatch(orderStripe(order)).then(async (res) => {
          if (res.payload.success) {
            await stripe.redirectToCheckout({
              sessionId: res.payload.id,
            });
          }
        });
        break;
      default:
        break;
    }
  };

  const CartOrder = () => (
    <div className="w-full my-4 max-h-[60vh] overflow-y-auto pr-2 space-y-4">
      {products.map((item, index) => (
        <div
          key={`cart-item-modal-${index}`}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4"
        >
          <div className="flex items-center space-x-4">
            <div className="relative flex-shrink-0">
              <img
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md"
                src={item?.image}
                alt={item.name}
              />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                x{item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-semibold text-gray-800 truncate">
                {item.name}
              </h3>
              <div className="mt-1 flex items-center text-xs md:text-sm text-gray-600">
                <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full mr-2">
                  {item.size}
                </span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  {item.color}
                </span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs md:text-sm text-gray-500">
                  Đơn giá: {formatPrice(item.price)}đ
                </span>
                <span className="text-sm md:text-base font-bold text-pink-600">
                  {formatPrice(item.quantity * item.price)}đ
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
        clearOrder();
      }}
      footer={null}
      width={900}
      className="p-0"
      closeIcon={<IoMdCloseCircle style={{ fontSize: "30px" }} />}
    >
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg">
        <h2 className="pb-4 text-2xl font-bold text-center">
          Thông tin đặt hàng
        </h2>

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
              children: <CartOrder />,
            },
          ]}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ tên:
              </label>
              <input
                type="text"
                className={`w-full p-3 border-2 ${
                  validates.name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
                value={order.name}
                onChange={(e) => handleChangeOrder("name", e.target.value)}
                onFocus={() => setValidates((prev) => ({ ...prev, name: "" }))}
              />
              {validates.name && <ErrorMessage message={validates.name} />}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại:
              </label>
              <input
                type="tel"
                className={`w-full p-3 border-2 ${
                  validates.phone ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
                value={order.phone}
                onChange={(e) => handleChangeOrder("phone", e.target.value)}
                onFocus={() => setValidates((prev) => ({ ...prev, phone: "" }))}
              />
              {validates.phone && <ErrorMessage message={validates.phone} />}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tỉnh thành:
            </label>
            <select
              value={order.province.id}
              onChange={(e) => {
                const selected = provinces?.find(
                  (p) => p.ProvinceID === parseInt(e.target.value)
                );
                if (selected) {
                  handleChangeOrder("province", {
                    id: selected.ProvinceID,
                    name: selected.ProvinceName,
                  });
                  handleChangeOrder("district", { id: "", name: "" });
                  handleChangeOrder("ward", { id: "", name: "" });
                }
              }}
              onFocus={() =>
                setValidates((prev) => ({ ...prev, ["province.id"]: "" }))
              }
              className={`w-full p-3 border-2 ${
                validates["province.id"] ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
            >
              <option value="">---</option>
              {provinces?.map((item) => (
                <option key={item.ProvinceID} value={item.ProvinceID}>
                  {item.ProvinceName}
                </option>
              ))}
            </select>
            {validates["province.id"] && (
              <ErrorMessage message={validates["province.id"]} />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quận huyện:
              </label>
              <select
                disabled={districts?.length === 0}
                value={order.district.id}
                onChange={(e) => {
                  const selected = districts?.find(
                    (d) => d.DistrictID === parseInt(e.target.value)
                  );
                  if (selected) {
                    handleChangeOrder("district", {
                      id: selected.DistrictID,
                      name: selected.DistrictName,
                    });
                    handleChangeOrder("ward", { id: "", name: "" });
                  }
                }}
                onFocus={() =>
                  setValidates((prev) => ({ ...prev, ["district.id"]: "" }))
                }
                className={`w-full p-3 border-2 ${
                  validates["district.id"]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
              >
                <option value="" disabled>
                  ---
                </option>
                {districts?.map((item) => (
                  <option key={item.DistrictID} value={item.DistrictID}>
                    {item.DistrictName}
                  </option>
                ))}
              </select>
              {validates["district.id"] && (
                <ErrorMessage message={validates["district.id"]} />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phường xã:
              </label>
              <select
                disabled={wards?.length === 0}
                value={order.ward.id}
                onChange={(e) => {
                  const selected = wards?.find(
                    (w) => w.WardCode === e.target.value
                  );
                  if (selected) {
                    handleChangeOrder("ward", {
                      id: selected.WardCode,
                      name: selected.WardName,
                    });
                  }
                }}
                onFocus={() =>
                  setValidates((prev) => ({ ...prev, ["ward.id"]: "" }))
                }
                className={`w-full p-3 border-2 ${
                  validates["ward.id"] ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
              >
                <option value="" disabled>
                  ---
                </option>
                {wards?.map((item) => (
                  <option key={item.WardCode} value={item.WardCode}>
                    {item.WardName}
                  </option>
                ))}
              </select>
              {validates["ward.id"] && (
                <ErrorMessage message={validates["ward.id"]} />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ:
            </label>
            <input
              type="text"
              className={`w-full p-3 border-2 ${
                validates.address ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
              value={order.address}
              onChange={(e) => handleChangeOrder("address", e.target.value)}
              onFocus={() => setValidates((prev) => ({ ...prev, address: "" }))}
            />
            {validates.address && <ErrorMessage message={validates.address} />}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú (nếu có):
            </label>
            <textarea
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
              rows="3"
              value={order.note}
              onChange={(e) => handleChangeOrder("note", e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Phương thức thanh toán:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  method: "COD",
                  icon: GiTakeMyMoney,
                  color: "text-green-500",
                  label: "Thanh toán COD",
                },
                {
                  method: "VNPAY",
                  icon: FaCreditCard,
                  color: "text-blue-500",
                  label: "Thanh toán qua VNPay",
                },
                {
                  method: "STRIPE",
                  icon: SiStripe,
                  color: "text-purple-500",
                  label: "Thanh toán qua Stripe",
                },
              ].map((item) => (
                <div
                  key={item.method}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    order.paymentMethod === item.method
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-300 hover:border-pink-300"
                  }`}
                  onClick={() =>
                    handleChangeOrder("paymentMethod", item.method)
                  }
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={order.paymentMethod === item.method}
                      onChange={() =>
                        handleChangeOrder("paymentMethod", item.method)
                      }
                      className="h-5 w-5 text-pink-600 border-gray-300 focus:ring-pink-500"
                    />
                    <label className="ml-3 flex items-center cursor-pointer">
                      <item.icon className={`text-2xl mr-2 ${item.color}`} />
                      <span className="font-medium text-gray-900">
                        {item.label}
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">
                Tổng tiền:
              </span>
              <span className="text-2xl font-bold">
                {formatPrice(totalAmount)}đ
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                clearOrder();
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              Đặt hàng
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCheckout;
