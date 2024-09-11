import React, { useState } from "react";
import { Layout, Button, Avatar, Dropdown, Badge, Input } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BellOutlined,
  SearchOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const { Header } = Layout;

const HeaderAdmin = ({ collapsed, setCollapsed }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-rose-700 font-extrabold text-sm text-center uppercase">
              Admin
            </span>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderAdmin;
