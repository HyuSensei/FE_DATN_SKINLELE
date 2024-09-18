import React, { useState } from "react";
import {
  Breadcrumb,
  Carousel,
  Image,
  Rate,
  InputNumber,
  Tag,
  Tooltip,
  Card,
} from "antd";
import {
  HeartOutlined,
  ShareAltOutlined,
  TrophyOutlined,
  FireOutlined,
} from "@ant-design/icons";
import useScreen from "../../hook/useScreen";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { createIcon } from "../../ultis/createIcon";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import { IoShieldCheckmark, IoPricetagOutline } from "react-icons/io5";
import RateList from "../../components/RateList";

const Detail = () => {
  const { isMobile } = useScreen();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = [
    { name: "Đỏ", code: "#FF0000" },
    { name: "Xanh", code: "#0000FF" },
    { name: "Vàng", code: "#FFFF00" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
          <Carousel autoplay className="mb-4">
            <Image
              src="https://image.hsv-tech.io/600x600/bbx/common/a89bbd9c-5951-424c-9cae-06149945a6fc.webp"
              alt="Product 1"
            />
            <Image
              src="https://image.hsv-tech.io/600x600/bbx/common/a89bbd9c-5951-424c-9cae-06149945a6fc.webp"
              alt="Product 2"
            />
            <Image
              src="https://image.hsv-tech.io/600x600/bbx/common/a89bbd9c-5951-424c-9cae-06149945a6fc.webp"
              alt="Product 3"
            />
          </Carousel>
          <div className="flex justify-center space-x-2">
            <Image.PreviewGroup>
              <Image
                width={80}
                src="https://image.hsv-tech.io/600x600/bbx/common/a89bbd9c-5951-424c-9cae-06149945a6fc.webp"
                alt="Thumbnail 1"
              />
              <Image
                width={80}
                src="https://image.hsv-tech.io/600x600/bbx/common/a89bbd9c-5951-424c-9cae-06149945a6fc.webp"
                alt="Thumbnail 2"
              />
              <Image
                width={80}
                src="https://image.hsv-tech.io/600x600/bbx/common/a89bbd9c-5951-424c-9cae-06149945a6fc.webp"
                alt="Thumbnail 3"
              />
            </Image.PreviewGroup>
          </div>
        </div>

        <div className="product-info">
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-base">
            <h1 className="text-xl font-bold mb-4">
              Tinh Chất Chống Lão Hóa Làm Sáng Da Su:m37 Micro-Active
              Brightening Ampoule 15ml
            </h1>
            <div className="flex items-center mb-4">
              <Rate
                disabled
                character={({ index }) =>
                  createIcon({
                    index: index + 1,
                    rate: 5,
                    width: "24px",
                    height: "24px",
                  })
                }
              />
              <span className="ml-2 text-gray-500">(150 đánh giá)</span>
            </div>
            <div className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-1 rounded-lg shadow-lg mb-6">
              <div className="bg-white p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrophyOutlined className="text-2xl text-yellow-500" />
                    <div className="mt-2 text-xl text-[#2e352d] font-bold">
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
                <div className="mt-2 text-sm text-gray-600">
                  Sản phẩm đã trở thành xu hướng làm đẹp
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 via-red-400 to-pink-400"></div>
            </div>
            <p className="text-2xl font-bold mb-4">1.100.000 đ</p>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Màu sắc:</h3>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <Tooltip key={color.name} title={color.name}>
                    <div
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                        selectedColor === color.name
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.code }}
                      onClick={() => setSelectedColor(color.name)}
                    />
                  </Tooltip>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Số lượng:</h3>
              <InputNumber
                min={1}
                max={10}
                value={quantity}
                onChange={setQuantity}
                className="w-40 h-10"
              />
            </div>
          </Card>
          <div className="flex space-x-4 mb-6 items-center">
            <button className="flex-1 bg-gradient-to-r from-yellow-300 via-orange-600 to-purple-800 text-white py-3 rounded-md text-lg font-bold flex items-center justify-center gap-2">
              <LiaShoppingBasketSolid className="text-3xl cursor-pointer" />
              Thêm vào giỏ hàng
            </button>
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
        <h2 className="text-2xl font-bold mb-4">Mô tả sản phẩm</h2>
        <p className="text-gray-700">
          Su:m37 Micro-Active Brightening Ampoule là tinh chất chống lão hóa cao
          cấp được nghiên cứu và phát triển bởi các chuyên gia hàng đầu. Với
          công nghệ độc quyền, sản phẩm giúp cải thiện đáng kể các dấu hiệu lão
          hóa, làm sáng da và mang lại vẻ tươi trẻ cho làn da của bạn.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Đánh giá sản phẩm</h2>
        <RateList />
      </div>
    </div>
  );
};

export default Detail;
