import React, { useState } from "react";
import { Input, Button, Badge, Menu, Drawer } from "antd";
import { SearchOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { PiUserCircleThin } from "react-icons/pi";

const HeaderUser = () => {
  const [current, setCurrent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const menuItems = [
    { key: "thuonghieu", label: "Thương hiệu" },
    { key: "khuyenmai", label: "Khuyến mãi hot" },
    { key: "caocap", label: "Sản phẩm cao cấp" },
    { key: "trangdiem", label: "Trang điểm" },
    { key: "chamsocda", label: "Chăm Sóc Da" },
    { key: "chamsoccanhan", label: "Chăm sóc cá nhân" },
    { key: "chamsoccothe", label: "Chăm sóc cơ thể" },
    { key: "magiam", label: "Mã giảm" },
    { key: "sanphammoi", label: "Sản phẩm mới" },
  ];
  return (
    <>
      <header className="bg-white shadow-md">
        <div className="bg-gradient-to-r from-yellow-300 via-orange-600 to-purple-800 text-white text-center py-2 text-base font-medium">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Chào mừng bạn đến với SkinLeLe ❤️
          </motion.div>
        </div>
        <div className="container mx-auto px-12 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-extrabold text-3xl m-0 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="logo-text">
              Skin<span>LeLe</span>
            </div>
          </motion.div>

          <div className="hidden md:block flex-grow max-w-xl mx-8">
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined />}
              size="large"
              className="rounded-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={<PiUserCircleThin className="text-3xl" />}
              className="hidden md:flex text-base font-medium"
            >
              Đăng nhập
            </Button>
            <Badge color="#e28585" count={2}>
              <LiaShoppingBasketSolid className="text-3xl cursor-pointer" />
            </Badge>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden"
            />
          </div>
        </div>
        <nav className="bg-white border-t border-b border-gray-200 hidden md:block">
          <Menu
            mode="horizontal"
            className="container mx-auto px-4 flex justify-between custom-menu"
            selectedKeys={[current]}
            onClick={handleClick}
            items={menuItems.map((item) => ({
              key: item.key,
              label: item.label,
              className: "custom-menu-item",
            }))}
          />
        </nav>
      </header>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setIsMenuOpen(false)}
        open={isMenuOpen}
        width={300}
      >
        <Menu
          mode="vertical"
          items={menuItems.map((item) => ({
            key: item.key,
            label: item.label,
          }))}
        />
      </Drawer>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 bg-white p-4 shadow-md z-50"
          >
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined />}
              size="large"
              className="rounded-full"
            />
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-4 top-4"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderUser;
