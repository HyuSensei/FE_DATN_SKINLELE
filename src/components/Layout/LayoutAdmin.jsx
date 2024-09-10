import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Avatar, Dropdown, Badge, Input } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  AppstoreOutlined,
  TagOutlined,
  ShopOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import useScreen from "../../hook/useScreen";

const { Header, Sider, Content, Footer } = Layout;

const LayoutAdmin = ({ children, title }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isMobile } = useScreen();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-4">
          <UserOutlined /> <span>Hồ sơ</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-4">
          <SettingOutlined /> <span>Cài đặt</span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex items-center gap-4">
          <LogoutOutlined /> <span>Đăng xuất</span>
        </div>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="bg-white px-4 py-2 border-r">
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
              icon: <SettingOutlined />,
              label: "Cài đặt",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="bg-white p-0 flex justify-between items-center shadow-md px-8">
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggle}
              className="text-lg w-16 h-16"
            />
            <motion.div
              animate={{ width: isSearchFocused ? 300 : 200 }}
              transition={{ duration: 0.3 }}
              className="ml-4 hidden md:block"
            >
              <Input
                placeholder="Tìm kiếm..."
                prefix={<SearchOutlined className="text-gray-400" />}
                className="rounded-full"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </motion.div>
          </div>
          <div className="flex items-center">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Badge color={"#3b71ca"} count={5} className="mr-4">
                <Button icon={<BellOutlined />} shape="circle" />
              </Badge>
            </motion.div>
            <Dropdown menu={{ items }}>
              <a
                className="ant-dropdown-link flex items-center"
                onClick={(e) => e.preventDefault()}
              >
                <Avatar icon={<UserOutlined />} className="mr-2" />
                <span className="text-gray-700 hidden sm:inline uppercase font-bold">
                  Admin
                </span>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content className="m-2 p-2 md:m-4 md:p-4 bg-white rounded-lg shadow-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-clip-text bg-gradient-to-r from-slate-800 to-stone-800 font-bold text-xl">
              {title}
            </div>
            {children}
          </motion.div>
        </Content>
        <Footer className="text-center bg-gray-100">
          <strong>SkinLeLe Admin</strong> ©{new Date().getFullYear()} Created
          with ❤️
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
