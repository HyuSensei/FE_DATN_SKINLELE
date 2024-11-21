import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const FooterUser = () => {
  return (
    <footer className="py-8 mt-auto">
      <div className="container mx-auto px-8 py-8">
        <div className="text-white bg-gradient-to-r from-yellow-400 to-purple-600 rounded-xl px-4 sm:px-8 py-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold">
                NHẬN BẢN TIN LÀM ĐẸP
              </h2>
              <p className="text-sm mt-2">
                Đừng bỏ lỡ hàng ngàn sản phẩm và chương trình siêu hấp dẫn
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="flex-grow px-4 py-2 rounded-full focus:outline-none text-gray-700 w-full sm:w-auto"
                />
                <button
                  type="submit"
                  className="bg-purple-700 opacity-80 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition duration-300 w-full sm:w-auto"
                >
                  Follow
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="py-4 cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-extrabold text-3xl m-0">
              <div className="logo-text">
                Skin<span>LeLe</span>
              </div>
            </div>
            <div className="flex space-x-4 mb-4">
              <FaFacebookF className="text-2xl" />
              <FaInstagram className="text-2xl" />
              <FaTiktok className="text-2xl" />
            </div>
            <img
              src={verifyImage}
              alt="Certification"
              className="w-24 h-auto"
            />
          </div>

          <div>
            <h3 className="font-bold mb-4">VỀ SKINLELE</h3>
            <ul className="space-y-2 text-sm">
              <li>Câu chuyện thương hiệu</li>
              <li>Về chúng tôi</li>
              <li>Liên hệ</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">CHÍNH SÁCH</h3>
            <ul className="space-y-2 text-sm">
              <li>Chính sách và quy định chung</li>
              <li>Chính sách và giao nhận thanh toán</li>
              <li>Chính sách đổi trả sản phẩm</li>
              <li>Chính sách bảo mật thông tin cá nhân</li>
              <li>Điều khoản sử dụng</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">MY SKINLELE</h3>
            <ul className="space-y-2 text-sm">
              <li>Quyền lợi thành viên</li>
              <li>Thông tin thành viên</li>
              <li>Theo dõi đơn hàng</li>
              <li>Hướng dẫn mua hàng online</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">ĐỐI TÁC - LIÊN KẾT</h3>
            <ul className="space-y-2 text-sm">
              <li>THE FACE SHOP Vietnam</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterUser;
