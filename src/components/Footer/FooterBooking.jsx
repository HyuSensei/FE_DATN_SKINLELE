import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { ImMail4 } from "react-icons/im";
import { motion } from "framer-motion";

const FooterBooking = () => {
  const SocialButton = ({ icon: Icon, href }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
    >
      <Icon size={18} />
    </motion.a>
  );

  const ContactItem = ({ icon: Icon, text, href }) => (
    <motion.a
      href={href}
      whileHover={{ x: 5 }}
      className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon size={20} />
      </div>
      <span className="text-sm">{text}</span>
    </motion.a>
  );

  const FooterLink = ({ children }) => (
    <motion.a
      href="#"
      whileHover={{ x: 5 }}
      className="block text-gray-500 hover:text-blue-600 transition-colors py-2"
    >
      {children}
    </motion.a>
  );

  return (
    <footer className="bg-gradient-to-b from-gray-50/50 to-white shadow-lg">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 md:grid-cols-2">
          {/* About Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Về chúng tôi
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Phòng khám chuyên nghiệp với đội ngũ y bác sĩ giàu kinh nghiệm,
                trang thiết bị hiện đại, phục vụ tận tâm.
              </p>
            </div>
            <div className="flex gap-4">
              <SocialButton icon={FaFacebookF} href="#" />
              <SocialButton icon={FaTwitter} href="#" />
              <SocialButton icon={FaInstagram} href="#" />
            </div>
            <div className="flex items-center gap-4">
              <img
                className="h-12"
                src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg"
                alt="Bộ Công Thương"
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Liên hệ</h3>
            <div className="space-y-4">
              <ContactItem
                icon={FaPhone}
                text="(+84) 86 538 387"
                href="tel:+84086538387"
              />
              <ContactItem
                icon={ImMail4}
                text="skinlele-clinic@gmail.com"
                href="mailto:skinlele-clinic@gmail.com"
              />
              <ContactItem
                icon={FaMapMarkerAlt}
                text="Số 11 Hoàng Cầu - Q.Đống Đa - Hà Nội"
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">SkinLeLeClinic</h3>
            <div className="space-y-1">
              <FooterLink>Giới thiệu</FooterLink>
              <FooterLink>Liên hệ hợp tác</FooterLink>
              <FooterLink>Chính sách bảo mật</FooterLink>
              <FooterLink>Điều khoản sử dụng</FooterLink>
              <FooterLink>Quy trình khám bệnh</FooterLink>
              <FooterLink>Câu hỏi thường gặp</FooterLink>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} SkinLeLeClinic. All rights reserved.
            </p>
            <div className="flex items-center gap-8 text-sm text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBooking;
