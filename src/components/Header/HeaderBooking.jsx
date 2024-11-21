import { Button, Drawer, Input, Layout } from "antd";
import React, { useState } from "react";
import { FaBars, FaHandshake, FaSearch } from "react-icons/fa";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { motion } from "framer-motion";

const { Header: AntHeader } = Layout;

const HeaderBooking = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <AntHeader className="sticky top-0 z-50 p-0">
        <div className="relative bg-gradient-to-r from-[#ecfffb] to-[#ecfffb]">
          {/* Main header */}
          <div className="container mx-auto flex h-20 items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              <motion.div
                className="flex items-center space-x-2 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <MdOutlineHealthAndSafety size={50} color="#58b8d8" />
                <div className="text-white text-center py-2 text-base font-medium">
                  <div
                    onClick={() => navigate("/home-booking")}
                    className="logo-text-booking text-2xl"
                  >
                    Skin<span>LeLe</span> - Clinic
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="hidden flex-1 items-center justify-center px-8 lg:flex">
              <div className="relative w-full max-w-xl">
                <Input
                  prefix={<FaSearch className="text-slate-400" />}
                  placeholder="Tìm kiếm dịch vụ, bác sĩ..."
                  className="h-10 rounded-lg text-base"
                  size="middle"
                />
              </div>
            </div>

            <div className="hidden items-center space-x-6 md:flex">
              <div className="group flex items-center space-x-2 rounded-lg px-3 py-2 transition-all bg-[#6c9bbf] hover:bg-[#4f637e] cursor-pointer">
                <FaHandshake className="h-5 w-5 text-white" />
                <span className="text-sm font-medium text-white">Hợp tác</span>
              </div>
              <div className="cursor-pointer group flex items-center space-x-2 rounded-lg px-4 py-2 transition-all hover:bg-white">
                <IoCalendarNumberSharp className="h-5 w-5 text-[#4b4b4b]" />
                <span className="text-sm font-medium text-[#4b4b4b]">
                  Lịch khám
                </span>
              </div>
            </div>

            <Button
              type="text"
              className="flex items-center md:hidden"
              onClick={() => setIsDrawerOpen(true)}
            >
              <FaBars className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </AntHeader>

      {/* Mobile drawer */}
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
          <div className="flex items-center space-x-2 py-2 cursor-pointer">
            <FaHandshake className="h-5 w-5 text-[#6c9bbf]" />
            <span>Hợp tác</span>
          </div>
          <div className="flex items-center space-x-2 py-2">
            <IoCalendarNumberSharp className="h-5 w-5 text-[#6c9bbf] cursor-pointer" />
            <span>Lịch khám</span>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default HeaderBooking;
