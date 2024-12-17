import { Input, Layout, Dropdown, Avatar } from "antd";
import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ModalAuth from "../Modal/ModalAuth";
import { logoutUser, setOpenModelAuth } from "@/redux/auth/auth.slice";

const { Header: AntHeader } = Layout;

const HeaderBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [openAuth, setOpenAuth] = useState(false);

  const menuItems = [
    { label: "Phòng khám", path: "/clinics" },
    { label: "Bác sĩ", path: "/doctors" },
    { label: "Lịch khám", path: "/booking-history" },
    { label: "Hợp tác", path: "/partnership" },
    { label: "Giới thiệu", path: "/about-skinlele-clinic" },
  ];

  const authItems = [
    {
      label: "Quay lại SkinLeLe",
      key: "doctor",
      onClick: () => navigate("/"),
    },
    {
      label: "Đăng nhập",
      key: "login",
      onClick: () => setOpenAuth(true),
    },
    {
      label: "Đăng xuất",
      key: "logout",
      onClick: () => {
        dispatch(logoutUser());
        navigate("/home-booking");
      },
    },
  ];

  return (
    <AntHeader className="fixed top-0 left-0 right-0 z-50 p-0 bg-white">
      <ModalAuth open={openAuth} onClose={() => setOpenAuth(false)} />
      <div className="shadow-lg">
        <div className="max-w-[1536px] mx-auto">
          <div className="flex items-center justify-between gap-8 px-6">
            {/* Logo */}
            <motion.div
              onClick={() => navigate("/home-booking")}
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dt8cdxgji/image/upload/v1733565402/upload-static-skinlele/kkbdfw5bzr6tlvfl5v3z.png"
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-extrabold text-xl text-[#2464ec] font-[Bungee]">
                SkinLeLe <span className="text-gray-500">Clinic</span>
              </div>
            </motion.div>

            {/* Navigation Menu */}
            <nav className="hidden lg:flex flex-1 items-center justify-center">
              <ul className="flex items-center gap-8">
                {menuItems.map((item, index) => (
                  <motion.li key={index}>
                    <button
                      onClick={() => {
                        if (
                          !isAuthenticated &&
                          item.path === "/booking-history"
                        ) {
                          dispatch(setOpenModelAuth(true));
                          return;
                        }
                        navigate(item.path);
                      }}
                      className="relative px-2 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors group"
                    >
                      {item.label}
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative w-64">
                <Input
                  size="middle"
                  prefix={<FaSearch className="text-gray-400" />}
                  placeholder="Tìm kiếm phòng khám, bác sĩ..."
                  className="rounded-full bg-slate-50"
                />
              </div>

              <Dropdown
                menu={{
                  items: isAuthenticated
                    ? [authItems[0], authItems[2]]
                    : [authItems[0], authItems[1]],
                }}
                placement="bottomRight"
                trigger={["click"]}
              >
                {isAuthenticated ? (
                  <Avatar
                    src={userInfo.avatar.url}
                    size={40}
                    className="cursor-pointer border-2 border-blue-200 hover:border-blue-300 transition-colors"
                  />
                ) : (
                  <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
                    <FaUserCircle className="w-6 h-6 text-[#1677ff]" />
                  </div>
                )}
              </Dropdown>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsDrawerOpen(true)}
            >
              <FaBars className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsDrawerOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl">
              <div className="p-5 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <IoLogOut className="w-5 h-5" />
                  </button>
                </div>

                <Input
                  prefix={<FaSearch className="text-gray-400" />}
                  placeholder="Tìm kiếm..."
                  className="rounded-full"
                />

                <nav className="space-y-1">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        navigate(item.path);
                        setIsDrawerOpen(false);
                      }}
                      className="w-full p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                <div className="pt-4 border-t">
                  {isAuthenticated
                    ? [authItems[0], authItems[2]].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => {
                            item.onClick();
                            setIsDrawerOpen(false);
                          }}
                          className="w-full p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {item.label}
                        </button>
                      ))
                    : [authItems[0], authItems[1]].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => {
                            item.onClick();
                            setIsDrawerOpen(false);
                          }}
                          className="w-full p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AntHeader>
  );
};

export default HeaderBooking;
