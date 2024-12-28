import React, { useEffect, useState } from "react";
import { Input, Button, Badge, Menu, Drawer, Dropdown, Avatar } from "antd";
import {
  SearchOutlined,
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isArray, isEmpty } from "lodash";
import { getAllBrand } from "@redux/brand/brand.thunk";
import { getAllCategory } from "@redux/category/category.thunk";
import { logoutUser } from "@redux/auth/auth.slice";
import { FaRegUserCircle } from "react-icons/fa";
import SearchHeader from "@components/Search/SearchHeader";
import { clearCart } from "@redux/cart/cart.slice";

const HeaderUser = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { products } = useSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(getAllBrand());
    dispatch(getAllCategory());
  }, []);

  const createMenuCategoryItems = (items) => {
    const menu = items.map((item) => {
      const menuItem = {
        key: item._id,
        label: item.name,
        path: `/categories/${item.slug}`,
      };

      if (item.children && item.children.length > 0) {
        menuItem.children = item.children.map((child) => ({
          type: "group",
          label: child.name,
          children:
            child.children && child.children.length > 0
              ? child.children.map((grandChild) => ({
                  key: grandChild._id,
                  label: grandChild.name,
                  path: `/categories/${grandChild.slug}`,
                }))
              : null,
        }));
      }
      return menuItem;
    });
    return menu;
  };

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    navigate("/");
  };

  const handleClick = (e) => {
    if (e.key === "login") return navigate("/auth");
    if (e.key === "account") return navigate("/account");
    if (e.key === "logout") return handleLogout();
    setCurrent(e.key);
    const flattenMenu = (items) => {
      return items.flatMap((item) => {
        if (item.children) {
          return [item, ...flattenMenu(item.children)];
        }
        return item;
      });
    };
    const flattenedMenu = flattenMenu(menuItems);
    const selectedItem = flattenedMenu.find((item) => item.key === e.key);
    if (selectedItem && selectedItem.path) {
      navigate(selectedItem.path);
    }
  };

  const menuItems = [
    {
      key: "brands",
      label: "Thương hiệu",
      path: "/brands",
      children:
        isArray(brands) && brands.length > 0
          ? brands.map((item) => ({
              key: item._id,
              label: (
                <div className="mt-2.5 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-extrabold text-sm text-center uppercase">
                  {item.name}
                </div>
              ),
              path: `/brands/${item.slug}`,
            }))
          : [],
    },
    ...createMenuCategoryItems(categories),
    {
      key: "promotions",
      label: "🎁 Khuyến mãi hot",
      path: "/promotions",
    },
    {
      key: "clinic",
      label: "💥 Đặt lịch khám da liễu",
      path: "/home-booking",
    },
  ];

  const authMenu = () => {
    if (isAuthenticated) {
      return {
        label: userInfo.name,
        key: "user",
        children: [
          {
            label: "Tài khoản",
            key: "account",
            path: "/account",
          },
          {
            label: "Đăng xuất",
            key: "logout",
            path: "/logout",
          },
        ],
      };
    } else {
      return {
        label: "Đăng nhập",
        key: "login",
        path: "/auth",
      };
    }
  };

  useEffect(() => {
    const path = location.pathname;
    const currentItem = menuItems.find((item) => {
      const isParentMatch = item.path === path;
      const isChildMatch =
        item.children &&
        item.children.some((child) => {
          const isChildPathMatch = child.path === path;
          const isGrandChildMatch =
            child.children &&
            child.children.some((grandChild) => grandChild.path === path);
          return isChildPathMatch || isGrandChildMatch;
        });
      return isParentMatch || isChildMatch;
    });
    setCurrent(currentItem ? currentItem.key : "");
  }, [location.pathname, menuItems]);

  const accoutItems = [
    {
      key: "1",
      label: (
        <div
          className="flex items-center gap-4"
          onClick={() => navigate("/account")}
        >
          <UserOutlined /> <span>Tài khoản</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-4" onClick={handleLogout}>
          <LogoutOutlined /> <span>Đăng xuất</span>
        </div>
      ),
    },
  ];

  const handleSearch = (value) => {};

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="bg-gradient-to-r from-yellow-300 via-orange-600 to-purple-800 text-white text-center py-2 text-base font-medium">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="animate-bounce">
              Chào mừng bạn đến với SkinLeLe ❤️
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-12 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-extrabold text-2xl m-0 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              onClick={() => navigate("/")}
              className="logo-text zoom-in-zoom-out"
            >
              Skin<span>LeLe</span>
            </div>
          </motion.div>
          <div className="hidden md:block flex-grow max-w-xl mx-8">
            <SearchHeader />
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Dropdown
                className="hidden md:flex"
                menu={{ items: accoutItems }}
              >
                <div
                  className="ant-dropdown-link flex items-center"
                  onClick={(e) => e.preventDefault()}
                >
                  <Avatar
                    src={userInfo.avatar.url}
                    size={"large"}
                    className="mr-2"
                  />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-rose-700 font-extrabold text-sm text-center uppercase">
                    {!isEmpty(userInfo) ? userInfo.name : ""}
                  </span>
                </div>
              </Dropdown>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                type="text"
                icon={<FaRegUserCircle className="text-3xl" />}
                className="hidden md:flex text-base font-medium"
              >
                Đăng nhập
              </Button>
            )}
            <Badge
              onClick={() => navigate("/cart")}
              color="#e28585"
              count={products.length}
            >
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
            className="container mx-auto px-4 flex justify-between custom-menu custom-menu-item overflow-hidden hidden-scroll"
            selectedKeys={[current]}
            onClick={handleClick}
            items={menuItems}
          />
        </nav>
      </header>

      <Drawer
        title="Menu"
        placement="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        width={300}
      >
        <Menu
          mode="inline"
          items={[...menuItems, authMenu()]}
          onClick={handleClick}
          selectedKeys={[current]}
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
              onPressEnter={(e) => handleSearch(e.target.value)}
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
