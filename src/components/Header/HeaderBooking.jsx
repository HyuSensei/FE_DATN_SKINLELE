import { Button, Drawer, Input, Layout, Dropdown } from "antd";
import { FaBars, FaHandshake, FaSearch, FaUserCircle } from "react-icons/fa";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo-booking.png";
import React, { useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { IoCaretBackCircle, IoLogOut } from "react-icons/io5";

const { Header: AntHeader } = Layout;

const HeaderBooking = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const authItems = [
    {
      label: "Quay lại SkinLeLe",
      key: "doctor",
      icon: <IoCaretBackCircle size={20} color="#4f637e" />,
      onClick: () => setModalAuthDoctorOpen(true),
    },
    {
      label: "Đăng nhập",
      key: "login",
      icon: <RiLoginCircleFill size={20} color="#4f637e" />,
      onClick: () => setModalAuthDoctorOpen(true),
    },
    {
      label: "Đăng xuất",
      key: "logout",
      icon: <IoLogOut size={20} color="#4f637e" />,
      onClick: () => setModalAuthDoctorOpen(true),
    },
  ];

  return (
    <AntHeader className="sticky top-0 z-50 p-0">
      <div className="relative shadow-md bg-gradient-to-r from-slate-50 via-white to-slate-100">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <img src={logo} alt="logo" className="w-16" />
            <div className="logo-text-booking text-2xl">
              Skin<span>LeLe</span> - Clinic
            </div>
          </motion.div>

          <div className="hidden flex-1 items-center justify-center px-8 lg:flex">
            <Input
              size="middle"
              prefix={<FaSearch className="text-slate-400" />}
              placeholder="Tìm kiếm dịch vụ, bác sĩ..."
              className="h-10 rounded-lg text-base max-w-xl"
            />
          </div>

          <div className="hidden items-center space-x-6 md:flex">
            <motion.div
              className="group flex items-center space-x-2 rounded-lg px-3 py-2 transition-all hover:bg-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <IoCalendarNumberSharp className="h-5 w-5 text-[#4b4b4b]" />
              <span className="text-sm font-medium">Lịch khám</span>
            </motion.div>

            <motion.div
              className="group flex items-center space-x-2 rounded-lg px-3 py-2 bg-[#6c9bbf] hover:bg-[#4f637e] cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <FaHandshake className="h-5 w-5 text-white" />
              <span className="text-sm font-medium text-white">Hợp tác</span>
            </motion.div>
            <Dropdown menu={{ items: authItems }} placement="bottomRight">
              <FaUserCircle size={30} color="#93b2f3" />
            </Dropdown>
          </div>

          <Button
            type="text"
            className="flex md:hidden"
            onClick={() => setIsDrawerOpen(true)}
          >
            <FaBars className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        <div className="flex flex-col space-y-4">
          <Input
            prefix={<FaSearch className="text-gray-400" />}
            placeholder="Tìm kiếm..."
            className="mb-4"
          />
          <Dropdown menu={{ items: authItems }} trigger={["click"]}>
            <div className="flex items-center gap-2 py-2 cursor-pointer">
              <FaUserCircle className="h-5 w-5 text-[#facc16]" />
              Tài khoản
            </div>
          </Dropdown>
          <div className="flex items-center space-x-2 py-2">
            <IoCalendarNumberSharp className="h-5 w-5 text-[#6c9bbf]" />
            <span>Lịch khám</span>
          </div>
          <div className="flex items-center space-x-2 py-2">
            <FaHandshake className="h-5 w-5 text-[#6c9bbf]" />
            <span>Hợp tác</span>
          </div>
        </div>
      </Drawer>
    </AntHeader>
  );
};

export default HeaderBooking;
