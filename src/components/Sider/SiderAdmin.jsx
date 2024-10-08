import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
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
import { motion } from "framer-motion";
import useScreen from "../../hook/useScreen";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const SiderAdmin = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const { isMobile } = useScreen();

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  const changePage = (path) => {
    navigate(path);
  };

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "1":
        navigate("/admin/dashboard");
        break;
      case "2":
        navigate("/admin/products");
        break;
      case "3":
        navigate("/admin/categories");
        break;
      case "4":
        navigate("/admin/brands");
        break;
      case "5":
        navigate("/admin/users");
        break;
      case "6":
        navigate("/admin/orders");
        break;
      case "7":
        navigate("/admin/reviews");
        break;
      case "8":
        navigate("/admin/promotions");
        break;
      case "9":
        navigate("/admin/settings");
        break;
      default:
        break;
    }
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        className="bg-white px-4 py-2 border-r"
        onClick={() => changePage("/admin/dashboard")}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-extrabold text-2xl m-0 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {collapsed ? "SL" : "SkinLeLe"}
        </motion.div>
      </div>
      <Menu
        onClick={handleMenuClick}
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        className="h-screen bg-white"
        items={[
          {
            key: "1",
            icon: <DashboardOutlined />,
            label: "Thống kê",
            className: "mt-2",
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
              },
              {
                key: "3",
                icon: <ShopOutlined />,
                label: "Danh mục",
                onClick: () => changePage("/admin/categories"),
              },
              {
                key: "4",
                icon: <TagOutlined />,
                label: "Thương hiệu",
              },
            ],
          },
          {
            key: "5",
            icon: <UsergroupAddOutlined />,
            label: "Người dùng",
          },
          {
            key: "6",
            icon: <ShoppingCartOutlined />,
            label: "Đơn hàng",
          },
          {
            key: "7",
            icon: <StarOutlined />,
            label: "Đánh giá",
          },
          {
            key: "8",
            icon: <GiftOutlined />,
            label: "Khuyến mãi",
          },
          {
            key: "9",
            icon: <SettingOutlined />,
            label: "Cài đặt",
          },
        ]}
      />
    </Sider>
  );
};

export default SiderAdmin;
