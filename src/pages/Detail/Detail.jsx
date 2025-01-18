import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Carousel,
  Image,
  Rate,
  InputNumber,
  Tooltip,
  Card,
  Empty,
  notification,
  Tag,
} from "antd";
import {
  HeartOutlined,
  ShareAltOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { createAverageRate } from "@utils/createIcon";
import { FaCheckCircle, FaShippingFast } from "react-icons/fa";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import {
  IoShieldCheckmark,
  IoPricetagOutline,
  IoNotifications,
} from "react-icons/io5";
import RateList from "@components/RateList";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "@helpers/formatPrice";
import { GiDiamondTrophy } from "react-icons/gi";
import { addToCart } from "@redux/cart/cart.slice";
import confetti from "canvas-confetti";
import { useGetProductDetailQuery } from "@/redux/product/product.query";
import { useGetDoctorRecommendQuery } from "@/redux/doctor/doctor.query";
import RecommendedDoctors from "./RecommendedDoctors";
import Loading from "@/components/Loading/Loading";
import CustomButton from "@/components/CustomButton";

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({
    productId: "",
    name: "",
    image: "",
    price: "",
    color: {
      name: "",
      code: "",
      image: "",
    },
    brand: "",
    quantity: 1,
  });
  const [queryDoctors, setQueryDoctors] = useState({
    page: 1,
    pageSize: 10,
  });

  const { slug } = useParams();

  const {
    data: dataProduct,
    isLoading: loadingProduct,
    error: errorProduct,
    refetch,
  } = useGetProductDetailQuery({ slug }, { skip: !slug });

  const categoryIds =
    dataProduct?.categories?.map((category) => category._id) || [];

  const {
    data: dataDoctors,
    isLoading: loadingDoctor,
    error: errorDoctor,
  } = useGetDoctorRecommendQuery(
    { ...queryDoctors, categories: categoryIds?.join(",") },
    { skip: !dataProduct }
  );

  useEffect(() => {
    if (dataProduct) {
      const defaultVariant = dataProduct.variants?.[0] || null;
      setSelectedVariant(defaultVariant);
      setProduct((prev) => ({
        ...prev,
        productId: dataProduct._id,
        name: dataProduct.name,
        image: dataProduct.mainImage.url,
        price: dataProduct.promotion
          ? dataProduct.finalPrice
          : dataProduct.price,
        brand: dataProduct.brand.name,
        color: defaultVariant
          ? {
              name: defaultVariant.color.name,
              code: defaultVariant.color.code,
              image: defaultVariant.color.image.url,
            }
          : {},
      }));
    }
  }, [dataProduct]);

  if (errorProduct) return <Empty className="mt-24" />;

  if (loadingProduct) return <Loading />;

  if (!dataProduct) return <Empty className="mt-24" />;

  const getAvailableQuantity = () => {
    if (!dataProduct) return 0;

    if (selectedVariant) {
      return selectedVariant.quantity;
    }

    return dataProduct.totalQuantity;
  };

  const handleQuantityChange = (value) => {
    const availableQty = getAvailableQuantity();
    const newQty = Math.min(value, availableQty);
    setQuantity(newQty);
    handleProduct("quantity", newQty);
  };

  const handleColorSelect = (variant) => {
    setSelectedVariant(variant);
    setQuantity(1);
    setProduct((prev) => ({
      ...prev,
      quantity: 1,
      color: {
        name: variant.color.name,
        code: variant.color.code,
        image: variant.color.image.url,
      },
    }));
  };

  const isOutOfStock = getAvailableQuantity() <= 0;

  const discountPercentage = dataProduct.promotion
    ? dataProduct.promotion.discountPercentage
    : 0;
  const discountedPrice = dataProduct.promotion
    ? dataProduct.finalPrice
    : dataProduct.price;

  const openNotification = () => {
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
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
              />
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce shadow-lg">
                <FaCheckCircle className="inline-block mr-1" /> Đã thêm
              </div>
            </div>
            <div className="flex-1">
              <h4 className="truncate-2-lines text-sm font-semibold mb-2 text-gray-800 line-clamp-2 hover:line-clamp-none transition-all duration-300">
                {product.name}
              </h4>
              {product.color && Object.keys(product.color).length > 0 && (
                <div className="flex items-center mb-2">
                  <p className="text-xs text-gray-600 mr-2">Màu:</p>
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300 shadow-inner"
                    style={{ backgroundColor: product.color.code }}
                    title={product.color.name}
                  ></div>
                  <span className="ml-1 text-xs text-gray-700 font-bold">
                    {product.color.name}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {formatPrice(product.price)} đ
                </span>
                <span className="text-sm text-gray-500">
                  Số lượng: {product.quantity}
                </span>
              </div>
            </div>
          </div>
          <CustomButton
            onClick={() => {
              navigate("/cart");
            }}
            icon={<LiaShoppingBasketSolid className="mr-2 text-xl" />}
            variant="primary"
            className="w-full mt-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white !rounded-full hover:from-pink-600 hover:to-purple-600"
          >
            Xem giỏ hàng
          </CustomButton>
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

  const handleProduct = (key, value) => {
    setProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddCart = () => {
    dispatch(addToCart(product));
    openNotification();
  };

  const carouselImages = [
    dataProduct.mainImage,
    ...dataProduct.images,
    ...(dataProduct.variants || []).map((variant) => variant.color.image),
  ].filter(Boolean);

  const renderQuantityStatus = () => {
    const availableQty = getAvailableQuantity();

    if (isOutOfStock) {
      return (
        <Tag color="red" className="mb-2 text-sm">
          Hết hàng
        </Tag>
      );
    }

    if (availableQty <= 5) {
      return (
        <Tag color="orange" className="mb-2 text-sm">
          Chỉ còn {availableQty} sản phẩm
        </Tag>
      );
    }

    return (
      <Tag color="success" className="mb-2 text-sm">
        Còn hàng
      </Tag>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Breadcrumb
        className="py-2"
        items={[
          {
            title: "Trang chủ",
          },
          {
            title: "Sản phẩm",
          },
          {
            title: "Chi tiết sản phẩm",
          },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="product-images">
          <Carousel autoplay className="mb-4" arrows>
            {carouselImages.map((item, index) => (
              <Image key={index} src={item.url} alt="Product-Carousel" />
            ))}
          </Carousel>
          <div className="flex justify-center space-x-2">
            <Image.PreviewGroup>
              {carouselImages.map((item, index) => (
                <Image
                  width={80}
                  key={index}
                  src={item.url}
                  alt="Product-Carousel"
                />
              ))}
            </Image.PreviewGroup>
          </div>
        </div>

        <div className="product-info">
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-base">
            <h1 className="text-base md:text-xl font-bold mb-4">
              {dataProduct.name}
            </h1>
            <div className="flex items-center mb-4 justify-between">
              <div className="flex items-center">
                <Rate
                  disabled
                  character={({ index }) =>
                    createAverageRate({
                      index: index + 1,
                      rate: parseFloat(dataProduct.averageRating),
                      width: "24px",
                      height: "24px",
                    })
                  }
                />
                <span className="ml-2 text-gray-500">
                  ({dataProduct.totalReviews} đánh giá)
                </span>
              </div>
              {renderQuantityStatus()}
            </div>
            <div className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-1 rounded-lg shadow-lg mb-6">
              <div className="bg-white p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <GiDiamondTrophy className="text-3xl text-yellow-500" />
                    <div className="text-sm md:text-xl text-[#2e352d] font-bold">
                      Top bán chạy
                    </div>
                  </div>
                  <Tooltip title="Sản phẩm này nằm trong top 10% sản phẩm bán chạy nhất">
                    <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <FireOutlined className="mr-1" />
                      Hot
                    </div>
                  </Tooltip>
                </div>
                <div className="mt-2 text-xs md:text-sm text-gray-600">
                  Sản phẩm đã trở thành xu hướng làm đẹp
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 via-red-400 to-pink-400"></div>
            </div>
            <div className="bg-gradient-to-r from-white to-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-2">
              <div className="flex items-end mb-2">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-500">
                  {formatPrice(discountedPrice)}đ
                </span>
                {discountPercentage > 0 && (
                  <Tag
                    color="red"
                    className="ml-2 mb-1 text-sm font-semibold animate-pulse"
                  >
                    -{discountPercentage}% OFF
                  </Tag>
                )}
              </div>
              {discountPercentage > 0 && (
                <div className="flex items-center">
                  <span className="text-lg text-gray-500 line-through mr-2">
                    {formatPrice(dataProduct.price)}đ
                  </span>
                  <Tooltip
                    title={`Bạn tiết kiệm: ${formatPrice(
                      dataProduct.price - discountedPrice
                    )}đ`}
                  >
                    <span className="text-sm text-green-600 font-medium cursor-help">
                      Tiết kiệm
                    </span>
                  </Tooltip>
                </div>
              )}
            </div>
            {dataProduct.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">
                  Màu sắc: {product.color.name}
                </h3>
                <div className="flex space-x-2">
                  {dataProduct.variants.map((variant, index) => (
                    <Tooltip
                      key={index}
                      title={`${variant.color.name}${
                        variant.quantity <= 0 ? " (Hết hàng)" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                          product.color.name === variant.color.name
                            ? "border-blue-500"
                            : "border-gray-300"
                        } ${variant.quantity <= 0 ? "opacity-50" : ""}`}
                        style={{ backgroundColor: variant.color.code }}
                        onClick={() =>
                          variant.quantity > 0 && handleColorSelect(variant)
                        }
                      />
                    </Tooltip>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="font-semibold mb-2">Số lượng: {quantity}</h3>
              <InputNumber
                min={1}
                max={getAvailableQuantity()}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-40 h-10 text-base"
                disabled={isOutOfStock}
              />
            </div>
            {/* <div>
              <h3 className="font-semibold mb-2">
                Số lượng: {product.quantity}
              </h3>
              <InputNumber
                min={1}
                max={100}
                value={product.quantity}
                onChange={(value) => handleProduct("quantity", value)}
                className="w-40 h-10 text-base"
              />
            </div> */}
          </Card>
          <div className="flex space-x-4 mb-6 items-center">
            <CustomButton
              icon={
                <LiaShoppingBasketSolid className="text-3xl cursor-pointer" />
              }
              disabled={isOutOfStock}
              onClick={handleAddCart}
              variant="primary"
              className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
            >
              {isOutOfStock ? "Hết hàng" : "Thêm vào giỏ hàng"}
            </CustomButton>
            <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md">
              <HeartOutlined className="text-xl text-gray-500" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md">
              <ShareAltOutlined className="text-xl text-gray-500" />
            </button>
          </div>

          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-base">
            <div className="font-semibold mb-2">Lợi ích khi mua hàng</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FaShippingFast /> Miễn phí giao hàng 24h
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineSwapHorizontalCircle /> Đổi trả hàng trong 7 ngày
              </div>
              <div className="flex items-center gap-2">
                <IoPricetagOutline />
                Giá cả hợp lí
              </div>
              <div className="flex items-center gap-2">
                <IoShieldCheckmark /> Cam kết hàng chính hãng
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold">Mô tả sản phẩm</h2>
        <div dangerouslySetInnerHTML={{ __html: dataProduct.description }} />
      </div>

      {dataProduct && (
        <RecommendedDoctors
          data={dataDoctors?.doctors || []}
          loading={loadingDoctor}
          error={errorDoctor}
        />
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Đánh giá sản phẩm</h2>
        <RateList {...{ product: dataProduct, refetchProduct: refetch }} />
      </div>
    </div>
  );
};

export default Detail;
