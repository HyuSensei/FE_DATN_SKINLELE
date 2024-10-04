import React from "react";
import { Card, Badge } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { LiaShoppingBasketSolid } from "react-icons/lia";

const AccountMenu = ({ cartItemCount, setContentType, navigate, logout }) => (
  <Card className="shadow-md rounded-lg">
    <ul className="space-y-6">
      <MenuItem
        icon={<UserOutlined className="text-xl mr-3" />}
        text="Tài khoản"
        onClick={() => setContentType("account")}
      />
      <MenuItem
        icon={<UnorderedListOutlined className="text-xl mr-3" />}
        text="Đơn hàng"
        onClick={() => setContentType("order")}
      />
      <MenuItem
        icon={
          <Badge color="#e38282" count={cartItemCount} className="mr-3">
            <LiaShoppingBasketSolid className="text-2xl" />
          </Badge>
        }
        onClick={() => navigate("/cart")}
        text="Giỏ hàng"
      />
      <MenuItem
        icon={<LogoutOutlined className="text-xl mr-3" />}
        text="Đăng xuất"
        onClick={logout}
      />
    </ul>
  </Card>
);

const MenuItem = ({ icon, text, onClick }) => (
  <li>
    <div
      className="cursor-pointer flex items-center text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
      onClick={onClick}
    >
      {icon}
      {text}
    </div>
  </li>
);

export default AccountMenu;
