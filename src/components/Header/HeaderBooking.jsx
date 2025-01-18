import { Layout, Dropdown, Avatar } from "antd";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ModalAuth from "../Modal/ModalAuth";
import { logoutUser, setOpenModelAuth } from "@/redux/auth/auth.slice";
import SearchHeaderBooking from "../Search/SearchHeaderBooking";
import ConversationDoctor from "../Chat/Conversation/ConversationDoctor";
import NotificationBookingDrop from "./NotificationBookingDrop";

const { Header: AntHeader } = Layout;

const HeaderBooking = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [openAuth, setOpenAuth] = useState(false);
  const isDoctorOwner = location.pathname === "/doctor-owner";

  const menuItems = [
    { label: "Phòng khám", path: "/clinics" },
    { label: "Bác sĩ", path: "/doctors" },
    { label: "Lịch khám", path: "/booking-history" },
    { label: "Tư vấn trực tuyến", path: "/online-consultation" },
    { label: "Hợp tác", path: "/partnership" },
    { label: "Giới thiệu", path: "/about-skinlele-clinic" },
  ].filter((item) => (isDoctorOwner ? item.path !== "/booking-history" : true));

  const authItems = [
    { label: "Quay lại SkinLeLe", key: "doctor", path: "/" },
    { label: "Đăng nhập", key: "login", action: () => setOpenAuth(true) },
    {
      label: "Đăng xuất",
      key: "logout",
      action: () => dispatch(logoutUser()),
    },
  ];

  const handleNavigation = (e, path) => {
    if (!isAuthenticated && path === "/booking-history") {
      e.preventDefault();
      dispatch(setOpenModelAuth(true));
    }
  };

  return (
    <AntHeader className="fixed top-0 left-0 right-0 z-50 p-0 bg-white">
      <ModalAuth open={openAuth} onClose={() => setOpenAuth(false)} />
      <div className="shadow-lg">
        <div className="mx-auto">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            {/* Logo - Responsive on all screens */}
            <motion.div
              className="flex items-center gap-2 lg:gap-3 flex-shrink-0"
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to="/home-booking"
                className="flex items-center gap-2 lg:gap-3"
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dt8cdxgji/image/upload/v1733565402/upload-static-skinlele/kkbdfw5bzr6tlvfl5v3z.png"
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-extrabold text-base lg:text-xl text-[#0c9584] font-[Bungee]">
                  SkinLeLe <span className="text-[#5b636a]">Clinic</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex flex-1 items-center justify-center max-w-3xl mx-auto px-4">
              <ul className="flex items-center justify-between w-full">
                {menuItems.map((item, index) => (
                  <motion.li key={index} className="flex-shrink-0">
                    <Link
                      to={item.path}
                      onClick={(e) => handleNavigation(e, item.path)}
                      className="relative px-2 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors group whitespace-nowrap"
                    >
                      {item.label}
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Actions Section */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Chat and Notifications - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-2 lg:gap-4">
                {!isDoctorOwner && <ConversationDoctor />}
                <NotificationBookingDrop />
              </div>

              {/* Search and User Profile */}
              <div className="hidden md:flex items-center gap-2 lg:gap-4">
                {location.pathname !== "/home-booking" && (
                  <div className="relative w-48 lg:w-64">
                    <SearchHeaderBooking />
                  </div>
                )}

                {!isDoctorOwner && (
                  <Dropdown
                    menu={{
                      items: isAuthenticated
                        ? [
                            {
                              label: (
                                <Link to={authItems[0].path}>
                                  {authItems[0].label}
                                </Link>
                              ),
                            },
                            {
                              label: (
                                <span onClick={authItems[2].action}>
                                  {authItems[2].label}
                                </span>
                              ),
                            },
                          ]
                        : [
                            {
                              label: (
                                <Link to={authItems[0].path}>
                                  {authItems[0].label}
                                </Link>
                              ),
                            },
                            {
                              label: (
                                <span onClick={authItems[1].action}>
                                  {authItems[1].label}
                                </span>
                              ),
                            },
                          ],
                    }}
                    placement="bottomRight"
                    trigger={["click"]}
                  >
                    {isAuthenticated ? (
                      <Avatar
                        src={userInfo.avatar.url}
                        size={36}
                        className="cursor-pointer border-2 border-blue-200 hover:border-blue-300 transition-colors"
                      />
                    ) : (
                      <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                        <FaUserCircle className="text-xl text-[#1677ff]" />
                      </div>
                    )}
                  </Dropdown>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsDrawerOpen(true)}
              >
                <FaBars className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
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
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Menu
                    </h2>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <IoLogOutOutline className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {/* Mobile Search */}
                    <div className="pb-4 border-b">
                      <SearchHeaderBooking />
                    </div>

                    {/* Mobile Chat and Notifications */}
                    <div className="flex items-center gap-4 pb-4 border-b sm:hidden">
                      {!isDoctorOwner && <ConversationDoctor />}
                      <NotificationBookingDrop />
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="space-y-1">
                      {menuItems.map((item, index) => (
                        <motion.div key={index} whileTap={{ scale: 0.98 }}>
                          <Link
                            to={item.path}
                            onClick={() => setIsDrawerOpen(false)}
                            className="w-full block p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Mobile Auth Actions */}
                <div className="p-4 border-t">
                  {isAuthenticated
                    ? [authItems[0], authItems[2]].map((item) => (
                        <motion.div key={item.key} whileTap={{ scale: 0.98 }}>
                          {item.key === "logout" ? (
                            <span
                              onClick={() => {
                                item.action();
                                setIsDrawerOpen(false);
                              }}
                              className="w-full block p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                              {item.label}
                            </span>
                          ) : (
                            <Link
                              to={item.path}
                              onClick={() => setIsDrawerOpen(false)}
                              className="w-full block p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              {item.label}
                            </Link>
                          )}
                        </motion.div>
                      ))
                    : [authItems[0], authItems[1]].map((item) => (
                        <motion.div key={item.key} whileTap={{ scale: 0.98 }}>
                          {item.key === "login" ? (
                            <span
                              onClick={() => {
                                item.action();
                                setIsDrawerOpen(false);
                              }}
                              className="w-full block p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                              {item.label}
                            </span>
                          ) : (
                            <Link
                              to={item.path}
                              onClick={() => setIsDrawerOpen(false)}
                              className="w-full block p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              {item.label}
                            </Link>
                          )}
                        </motion.div>
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
