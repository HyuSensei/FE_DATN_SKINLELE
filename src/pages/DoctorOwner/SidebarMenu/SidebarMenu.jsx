import React from "react";
import { motion } from "framer-motion";
import { FiChevronRight, FiGrid } from "react-icons/fi";
import { RiDashboard3Line } from "react-icons/ri";
import { FaRegCalendarCheck, FaRegUser } from "react-icons/fa6";
import { MdOutlineReviews } from "react-icons/md";
import { Avatar, Collapse, Divider } from "antd";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowRoundBack, IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logoutDoctor } from "@/redux/auth/auth.slice";
import { Link } from "react-router-dom";

const MenuItem = ({ icon: Icon, text, isActive, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3 cursor-pointer rounded-lg mx-2 transition-all duration-300 ease-in-out
            ${isActive
        ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
        : "hover:bg-gray-100 dark:hover:bg-slate-700"
      }`}
  >
    <Icon
      className={`text-xl ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
        }`}
    />
    <span
      className={`font-medium ${isActive ? "text-white" : "text-gray-600 dark:text-gray-300"
        }`}
    >
      {text}
    </span>
  </motion.div>
);

const MenuContent = ({ activeMenu, onMenuSelect }) => {
  const { doctorInfo } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutDoctor());
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2 py-3 h-full"
    >
      <MenuItem
        icon={RiDashboard3Line}
        text="Thống kê"
        isActive={activeMenu === "statistics"}
        onClick={() => onMenuSelect("statistics")}
      />
      <MenuItem
        icon={FaRegUser}
        text="Thông tin chung"
        isActive={activeMenu === "profile"}
        onClick={() => onMenuSelect("profile")}
      />
      <MenuItem
        icon={FaRegCalendarCheck}
        text="Lịch khám"
        isActive={activeMenu === "bookings"}
        onClick={() => onMenuSelect("bookings")}
      />
      <MenuItem
        icon={MdOutlineReviews}
        text="Đánh giá"
        isActive={activeMenu === "reviews"}
        onClick={() => onMenuSelect("reviews")}
      />
      <MenuItem
        icon={IoSettingsOutline}
        text="Lịch làm việc"
        isActive={activeMenu === "schedules"}
        onClick={() => onMenuSelect("schedules")}
      />
      <MenuItem icon={IoIosLogOut} text="Đăng xuất" onClick={handleLogout} />
      <div className="mt-auto py-8 mb-2 ">
        <Link
          href={"/home-booking"}
          className="flex items-center gap-4 hover:text-sky-600"
        >
          <IoIosArrowRoundBack className="rounded-full size-6" />
          <span className="font-medium">Quay lại trang chủ</span>
        </Link>
        <Divider />
        <div className="flex items-center gap-2 flex-wrap">
          <Avatar
            src={doctorInfo.avatar.url}
            size={60}
            className="border-2 border-sky-300"
          />
          <div className="text-base">
            <div className="font-medium">{doctorInfo.name}</div>
            <div>{doctorInfo.email}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SidebarMenu = ({ activeMenu, onMenuSelect }) => {
  const collapseItems = [
    {
      key: "1",
      label: (
        <span className="font-medium text-base text-gray-700 dark:text-gray-300 uppercase">
          Dashboard
        </span>
      ),
      children: (
        <MenuContent activeMenu={activeMenu} onMenuSelect={onMenuSelect} />
      ),
    },
  ];
  return (
    <>
      {/* Mobile Collapse */}
      <div className="lg:hidden w-full">
        <Collapse
          expandIcon={({ isActive }) => (
            <FiChevronRight
              className={`transform transition-transform duration-200 ${isActive ? "rotate-90" : ""
                }`}
            />
          )}
          className="bg-white rounded-xl shadow-md border-0"
          items={collapseItems}
        />
      </div>
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block w-80 rounded-xl bg-white shadow-md p-6 h-full"
      >
        <div className="border-b-2 border-gray-200 mb-2">
          <div className="text-gray-800 flex items-center gap-3 px-2 pb-4">
            <FiGrid className="text-blue-500 text-2xl" />
            <span className="uppercase font-bold text-2xl">Dashboard</span>
          </div>
        </div>
        <MenuContent activeMenu={activeMenu} onMenuSelect={onMenuSelect} />
      </motion.div>
    </>
  );
};


export default SidebarMenu;
