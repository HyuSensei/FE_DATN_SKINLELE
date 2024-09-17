import React, { useState, useEffect } from "react";
import {
  Checkbox,
  InputNumber,
  Button,
  Typography,
  Divider,
  message,
  Breadcrumb,
  Card,
} from "antd";
import { MdOutlineDeleteOutline } from "react-icons/md";

const { Text } = Typography;

// Sample data
const sampleCartItems = [
  {
    productId: "1",
    name: "Luxury Face Cream",
    brand: "GlamGlow",
    price: 450000,
    variants: [
      { id: "1a", color: { name: "Classic", code: "#F5E6D3" }, quantity: 1 },
      { id: "1b", color: { name: "Sensitive", code: "#E6F5D3" }, quantity: 2 },
    ],
    mainImage: {
      url: "https://image.hsv-tech.io/600x600/bbx/common/7886f677-3e78-47d9-a484-1bd84079e384.webp",
    },
  },
  {
    productId: "2",
    name: "Hydrating Serum",
    brand: "The Ordinary",
    price: 280000,
    variants: [
      { id: "2a", color: { name: "Original", code: "#D3E6F5" }, quantity: 1 },
    ],
    mainImage: {
      url: "https://image.hsv-tech.io/600x600/bbx/common/7886f677-3e78-47d9-a484-1bd84079e384.webp",
    },
  },
];

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

const Cart = () => {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = selectedItems.reduce((total, itemId) => {
      const item = cartItems
        .flatMap((product) => product.variants)
        .find((variant) => variant.id === itemId);
      const product = cartItems.find((product) =>
        product.variants.some((variant) => variant.id === itemId)
      );
      return total + (item && product ? product.price * item.quantity : 0);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedItems, cartItems]);

  const handleQuantityChange = (productId, variantId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            variants: item.variants.map((variant) =>
              variant.id === variantId ? { ...variant, quantity } : variant
            ),
          };
        }
        return item;
      })
    );
  };

  const handleRemoveVariant = (productId, variantId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.productId === productId) {
            return {
              ...item,
              variants: item.variants.filter(
                (variant) => variant.id !== variantId
              ),
            };
          }
          return item;
        })
        .filter((item) => item.variants.length > 0)
    );
    setSelectedItems(selectedItems.filter((id) => id !== variantId));
  };

  const handleSelectItem = (variantId, checked) => {
    setSelectedItems((prev) =>
      checked ? [...prev, variantId] : prev.filter((id) => id !== variantId)
    );
  };

  const handleSelectAllForProduct = (productId, checked) => {
    const productVariantIds =
      cartItems
        .find((item) => item.productId === productId)
        ?.variants.map((variant) => variant.id) || [];

    setSelectedItems((prev) => {
      if (checked) {
        return [...new Set([...prev, ...productVariantIds])];
      } else {
        return prev.filter((id) => !productVariantIds.includes(id));
      }
    });
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      message.warning("Vui lòng chọn sản phẩm để thanh toán");
      return;
    }
    message.success("Đang chuyển đến trang thanh toán");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Breadcrumb
        className="pb-4"
        items={[
          {
            title: "Trang chủ",
          },
          {
            title: "Giỏ hàng",
          },
        ]}
      />

      {cartItems.map((product) => (
        <Card
          key={product.productId}
          className="mb-6 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <Checkbox
              checked={product.variants.every((variant) =>
                selectedItems.includes(variant.id)
              )}
              indeterminate={
                product.variants.some((variant) =>
                  selectedItems.includes(variant.id)
                ) &&
                !product.variants.every((variant) =>
                  selectedItems.includes(variant.id)
                )
              }
              onChange={(e) =>
                handleSelectAllForProduct(product.productId, e.target.checked)
              }
            >
              <Text strong>{product.name}</Text>
            </Checkbox>
            <Text type="secondary">{product.brand}</Text>
          </div>

          {product.variants.map((variant) => (
            <div
              key={variant.id}
              className="flex items-center justify-between py-4 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedItems.includes(variant.id)}
                  onChange={(e) =>
                    handleSelectItem(variant.id, e.target.checked)
                  }
                />
                <img
                  src={product.mainImage.url}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="space-y-1">
                  <Text>{product.name}</Text>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    Phân loại:
                    <div
                      className="ml-2 inline-block w-6 h-6 rounded-full bg-${variant.color.code}"
                      style={{ backgroundColor: variant.color.code }}
                    ></div>
                    <div>{variant.color.name}</div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    Số lượng: x2
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Text strong className="font-bold">
                  {formatPrice(product.price)} đ
                </Text>
                <InputNumber
                  min={1}
                  max={99}
                  value={variant.quantity}
                  onChange={(value) =>
                    handleQuantityChange(product.productId, variant.id, value)
                  }
                />
                <Button
                  type="text"
                  icon={<MdOutlineDeleteOutline className="text-3xl" />}
                  onClick={() =>
                    handleRemoveVariant(product.productId, variant.id)
                  }
                />
              </div>
            </div>
          ))}
        </Card>
      ))}
      <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between items-center mb-4">
          <Text strong>
            Đã chọn: {selectedItems.length} /{" "}
            {cartItems.reduce((total, item) => total + item.variants.length, 0)}
          </Text>
          <Text strong className="text-lg">
            {formatPrice(totalPrice)} đ
          </Text>
        </div>
        <button className="w-full bg-[#313438] text-white py-3 rounded-md text-lg font-bold flex items-center justify-center gap-2">
          Tiến hành thanh toán
        </button>
      </Card>
    </div>
  );
};

export default Cart;
