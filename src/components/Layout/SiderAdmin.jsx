import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import { motion } from "framer-motion";
import useScreen from "@hook/useScreen";
import {
  DashboardOutlined,
  ShoppingOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  AppstoreOutlined,
  TagOutlined,
  ShopOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { BiClinic } from "react-icons/bi";
import { GrUserAdd, GrUserAdmin } from "react-icons/gr";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const LOGO_ANIMATION = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const LOGO_TRANSITION = {
  duration: 0.5,
};

const MENU_ITEMS = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: "Thống kê",
    className: "mt-2",
    path: "/admin/dashboard",
  },
  {
    key: "sub1",
    icon: <ShoppingOutlined />,
    label: "Sản phẩm",
    children: [
      {
        key: "2",
        icon: <AppstoreOutlined />,
        label: "Tất cả sản phẩm",
        path: "/admin/products",
      },
      {
        key: "3",
        icon: <ShopOutlined />,
        label: "Danh mục",
        path: "/admin/categories",
      },
      {
        key: "4",
        icon: <TagOutlined />,
        label: "Thương hiệu",
        path: "/admin/brands",
      },
      {
        key: "5",
        icon: <GiftOutlined />,
        label: "Khuyến mãi",
        path: "/admin/promotions",
      },
      {
        key: "6",
        icon: <StarOutlined />,
        label: "Đánh giá",
        path: "/admin/reviews",
      },
    ],
  },
  {
    key: "7",
    icon: <UsergroupAddOutlined />,
    label: "Khách hàng",
    path: "/admin/users",
  },
  {
    key: "8",
    icon: <ShoppingCartOutlined />,
    label: "Đơn hàng",
    path: "/admin/orders",
  },
  {
    key: "9",
    icon: <GrUserAdmin />,
    label: "Quản trị",
    path: "/admin/accounts",
  },
  {
    key: "10",
    icon: <BiClinic />,
    label: "Phòng khám",
    path: "/admin/clinics",
  },
  {
    key: "11",
    icon: <SettingOutlined />,
    label: "Cài đặt",
    path: "/admin/settings",
  },
];

const MENU_CLINIC_ITEMS = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: "Thống kê",
    className: "mt-2",
    path: "/admin/dashboard-clinic",
  },
  {
    key: "2",
    icon: <BiClinic />,
    label: "Phòng khám",
    path: "/admin/clinics-info",
  },
  {
    key: "3",
    icon: <GrUserAdd />,
    label: "Bác sĩ",
    path: "/admin/doctors",
  },
  {
    key: "4",
    icon: <IoCalendarClearOutline />,
    label: "Lịch khám",
    path: "/admin/bookings",
  },
  {
    key: "5",
    icon: <StarOutlined />,
    label: "Đánh giá",
    path: "/admin/clinics/reviews",
  },
  {
    key: "6",
    icon: <SettingOutlined />,
    label: "Cài đặt",
    path: "/admin/settings",
  },
];

const { Sider } = Layout;

const Logo = ({ collapsed, adminInfo }) => (
  <div className="bg-white px-4 py-2 border-r">
    <motion.div
      className="cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-extrabold text-2xl m-0 text-center py-4"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={LOGO_ANIMATION.initial}
      animate={LOGO_ANIMATION.animate}
      transition={LOGO_TRANSITION}
    >
      {collapsed
        ? "SLC"
        : adminInfo?.role === "ADMIN"
        ? "SkinLeLe"
        : "SkinLeLeClinic"}
    </motion.div>
  </div>
);

const SiderAdmin = ({ collapsed, setCollapsed }) => {
  const { isMobile } = useScreen();
  const { adminInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile, setCollapsed]);

  const handleLogoClick = () => {
    if (adminInfo?.role === "ADMIN") {
      window.location.href = "/admin/dashboard";
    } else {
      window.location.href = "/admin/dashboard-clinic";
    }
  };

  const handleMenuClick = ({ key }) => {
    const selectedItem = findMenuItemByKey(
      adminInfo.role === "ADMIN" ? MENU_ITEMS : MENU_CLINIC_ITEMS,
      key
    );
    if (selectedItem?.path) {
      window.location.href = selectedItem.path;
    }
  };

  const findMenuItemByKey = (items, targetKey) => {
    for (const item of items) {
      if (item.key === targetKey) return item;
      if (item.children) {
        const found = findMenuItemByKey(item.children, targetKey);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div onClick={handleLogoClick}>
        <Logo collapsed={collapsed} adminInfo={adminInfo} />
      </div>
      <Menu
        onClick={handleMenuClick}
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        className="h-screen bg-white"
        items={adminInfo.role === "ADMIN" ? MENU_ITEMS : MENU_CLINIC_ITEMS}
      />
    </Sider>
  );
};

export default SiderAdmin;
