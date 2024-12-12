import { Input, Layout, Dropdown, Avatar } from "antd";
import { FaBars, FaHandshake, FaSearch, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { PiCalendarCheckFill } from "react-icons/pi";
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

  const authItems = [
    {
      label: "Quay lại SkinLeLe",
      key: "doctor",
      onClick: () => {
        navigate("/");
      },
    },
    {
      label: "Đăng nhập",
      key: "login",
      onClick: () => {
        setOpenAuth(true);
      },
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

  const CustomButton = ({ icon, children, variant = "default", onClick }) => {
    const variants = {
      default: "bg-gray-50",
      primary: "bg-amber-400/20 text-[#fccc11]",
      secondary: "text-[#1677ff] bg-[#1677ff]/10",
    };

    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full
          font-medium transition-all duration-200 text-sm
          ${variants[variant]}
        `}
      >
        {icon}
        <span>{children}</span>
      </motion.button>
    );
  };

  return (
    <AntHeader className="fixed top-0 left-0 right-0 z-50 p-0">
      <ModalAuth {...{ open: openAuth, onClose: () => setOpenAuth(false) }} />
      <div className="bg-white shadow-sm py-3">
        <div className="max-w-[1536px] mx-auto">
          <div className="flex h-16 items-center justify-between px-4 gap-4">
            {/* Logo Section */}
            <motion.div
              onClick={() => navigate("/home-booking")}
              className="flex items-center gap-2 min-w-[180px] cursor-pointer"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden">
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

            {/* Search Section */}
            <div className="hidden lg:flex flex-1 max-w-xl">
              <Input
                size="large"
                prefix={<FaSearch className="text-gray-400" />}
                placeholder="Tìm kiếm phòng khám, bác sĩ..."
                className="rounded-lg"
              />
            </div>

            {/* Actions Section */}
            <div className="hidden md:flex items-center gap-3">
              <CustomButton
                icon={<PiCalendarCheckFill className="w-5 h-5" />}
                variant="secondary"
                onClick={() => {
                  if (!isAuthenticated) {
                    dispatch(setOpenModelAuth(true));
                    return;
                  }
                  navigate("/booking-history");
                }}
              >
                Lịch khám
              </CustomButton>

              <CustomButton
                icon={<FaHandshake className="w-5 h-5" />}
                variant="primary"
              >
                Hợp tác
              </CustomButton>

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
                    className="cursor-pointer border-2 border-cyan-300"
                  />
                ) : (
                  <div className="p-1.5 bg-gray-50 rounded-lg cursor-pointer">
                    <FaUserCircle className="w-6 h-6 text-[#1677ff]" />
                  </div>
                )}
              </Dropdown>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-50 rounded-lg"
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
            className="fixed inset-0 z-50 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20"
              onClick={() => setIsDrawerOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Menu</h2>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <IoLogOut className="w-5 h-5" />
                  </button>
                </div>

                <Input
                  prefix={<FaSearch className="text-gray-400" />}
                  placeholder="Tìm kiếm..."
                  className="mb-4"
                />

                <div className="space-y-1">
                  {isAuthenticated
                    ? [authItems[0], authItems[2]].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                          onClick={item.onClick}
                        >
                          {item.icon}
                          <span className="font-medium text-sm">
                            {item.label}
                          </span>
                        </div>
                      ))
                    : [authItems[0], authItems[1]].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                          onClick={item.onClick}
                        >
                          {item.icon}
                          <span className="font-medium text-sm">
                            {item.label}
                          </span>
                        </div>
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
