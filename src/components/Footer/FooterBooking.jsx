import { Layout } from "antd";
import React from "react";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { ImMail4 } from "react-icons/im";

const { Footer: AntFooter } = Layout;

const FooterBooking = () => {
  return (
    <>
      <AntFooter className="bg-slate-50 p-0">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Về chúng tôi</h3>
              <p className="text-sm text-gray-600">
                Phòng khám chuyên nghiệp với đội ngũ y bác sĩ giàu kinh nghiệm,
                trang thiết bị hiện đại, phục vụ tận tâm.
              </p>
              <img
                className="mt-2"
                src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg"
                alt=""
              />
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Liên hệ</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p className="flex items-center">
                  <FaPhone size={20} className="mr-2 text-[#6e9abd]" />
                  (+84) 86 538 387
                </p>
                <p className="flex items-center">
                  <ImMail4 size={20} className="mr-2 text-[#6e9abd]" />
                  skinlele-clinic@gmail.com
                </p>
                <p className="flex items-center">
                  <FaMapMarkerAlt size={20} className="mr-2 text-[#6e9abd]" />
                  Số 11 Hoàng Cầu - Q.Đống Đa - Hà Nội
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">SkinLeLeClinic</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Liên hệ hợp tác</p>
                <p>Chính sách bảo mật</p>
                <p>Điều khoản sử dụng</p>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Bản đồ</h3>
              <div className="h-48 w-full rounded-lg bg-gray-200">
                {/* Add map component here */}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} SkinLeLeClinic. All rights reserved.
            </p>
          </div>
        </div>
      </AntFooter>
    </>
  );
};

export default FooterBooking;
