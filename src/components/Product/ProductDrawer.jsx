import React, { useState } from "react";
import {
  Rate,
  Tag,
  InputNumber,
  Button,
  Drawer,
  Tooltip,
  Divider,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@helpers/formatPrice";
import { createAverageRate } from "@utils/createIcon";
import ImageCarousel from "@components/ImageCarousel";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { IoNotifications } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@redux/cart/cart.slice";
import confetti from "canvas-confetti";
import CustomButton from "../CustomButton";

const ProductDrawer = ({ open, onClose, product = null }) => {
  if (!product) return null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.[0]?.color || {}
  );
  const [quantity, setQuantity] = useState(1);

  const discountPercentage = product.promotion?.discountPercentage || 0;
  const discountedPrice = product.promotion
    ? product.finalPrice
    : product.price;

  const openNotification = (productInfo) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FCD25A", "#FF8C42"],
    });

    notification.success({
      message: (
        <div className="text-base md:text-lg mb-2 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-rose-700 font-extrabold">
          Thông báo thêm giỏ hàng thành công
        </div>
      ),
      description: (
        <>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative flex-shrink-0">
              <img
                src={productInfo.image}
                alt={productInfo.name}
                className="w-24 h-24 object-cover rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
              />
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce shadow-lg">
                <FaCheckCircle className="inline-block mr-1" /> Đã thêm
              </div>
            </div>
            <div className="flex-1">
              <h4 className="truncate-2-lines text-sm font-semibold mb-2 text-gray-800 line-clamp-2 hover:line-clamp-none transition-all duration-300">
                {productInfo.name}
              </h4>
              {productInfo.color &&
                Object.keys(productInfo.color).length > 0 && (
                  <div className="flex items-center mb-2">
                    <p className="text-xs text-gray-600 mr-2">Màu:</p>
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300 shadow-inner"
                      style={{ backgroundColor: productInfo.color.code }}
                      title={productInfo.color.name}
                    ></div>
                    <span className="ml-1 text-xs text-gray-700 font-bold">
                      {productInfo.color.name}
                    </span>
                  </div>
                )}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {formatPrice(productInfo.price)} đ
                </span>
                <span className="text-sm text-gray-500">
                  Số lượng: {productInfo.quantity}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/cart");
            }}
            className="mt-4 w-full bg-gradient-to-r from-yellow-300 via-orange-600 to-purple-800 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <LiaShoppingBasketSolid className="mr-2 text-xl" /> Xem giỏ hàng
          </button>
        </>
      ),
      icon: <IoNotifications className="animate-pulse text-[#f59c23]" />,
      placement: "top",
      duration: 5,
      className: "custom-notification",
      style: {
        width: "600px",
      },
    });
  };
  const handleAddToCart = () => {
    const cartItem = {
      productId: product._id,
      name: product.name,
      image: selectedColor?.image?.url || product.mainImage.url,
      price: discountedPrice,
      brand: product.brand.name,
      color: selectedColor,
      quantity: quantity,
    };

    dispatch(addToCart(cartItem));
    openNotification(cartItem);
  };

  return (
    <Drawer open={open} onClose={onClose} width={600} title="Chi tiết sản phẩm">
      <div className="space-y-6">
        <ImageCarousel
          images={[product.mainImage, ...(product.images || [])].filter(
            (img) => img && img.url
          )}
          name={product.name}
        />

        <div className="space-y-4">
          <h2 className="text-xl font-bold cursor-pointer hover:text-sky-800">
            {product.name}
          </h2>
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Rate
                disabled
                value={parseFloat(product.averageRating)}
                character={({ index }) =>
                  createAverageRate({
                    index: index + 1,
                    rate: parseFloat(product.averageRating),
                    width: "16px",
                    height: "16px",
                  })
                }
              />
              <span className="text-sm text-gray-500">
                ({product.totalReviews} đánh giá)
              </span>
            </div>
            <Button type="link" href={`/detail/${product.slug}`}>
              Xem thêm
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-red-500">
              {formatPrice(discountedPrice)}đ
            </span>
            {discountPercentage > 0 && (
              <>
                <span className="text-gray-500 line-through">
                  {formatPrice(product.price)}đ
                </span>
                <Tag color="red">-{discountPercentage}%</Tag>
              </>
            )}
          </div>

          {product.variants?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">
                Màu sắc: {selectedColor.name}
              </h3>
              <div className="flex gap-2">
                {product.variants.map((variant, index) => (
                  <Tooltip
                    key={index}
                    title={`${variant.color.name} - Còn ${variant.quantity} sản phẩm`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                        selectedColor.name === variant.color.name
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: variant.color.code }}
                      onClick={() => setSelectedColor(variant.color)}
                    />
                  </Tooltip>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-medium mb-2">Số lượng</h3>
            <div className="flex items-center gap-4">
              <InputNumber
                min={1}
                max={product.totalQuantity}
                value={quantity}
                onChange={setQuantity}
                className="w-32"
              />
              <span className="text-sm text-gray-500">
                Còn lại: {product.totalQuantity} sản phẩm
              </span>
            </div>
          </div>

          <Divider />

          <CustomButton
            className="w-full py-4 bg-gradient-to-r from-yellow-300 via-orange-600 to-purple-800 text-white hover:opacity-90"
            onClick={handleAddToCart}
            icon={<LiaShoppingBasketSolid className="text-xl" />}
          >
            Thêm vào giỏ hàng
          </CustomButton>
        </div>
      </div>
    </Drawer>
  );
};

export default ProductDrawer;
