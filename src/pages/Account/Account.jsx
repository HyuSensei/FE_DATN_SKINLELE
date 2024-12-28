import React, { useState } from "react";
import { Breadcrumb, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import AccountForm from "@components/Account/AccountForm";
import OrderTabs from "@components/Account/OrderTabs";
import UserInfo from "@components/Account/UserInfo";
import AccountMenu from "@components/Account/AccountMenu";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@redux/auth/auth.slice";
import { clearCart } from "@redux/cart/cart.slice";

const CONTENT_TYPES = {
  ACCOUNT: "account",
  ORDER: "order",
};

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contentType, setContentType] = useState(CONTENT_TYPES.ACCOUNT);
  const { userInfo } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.cart.cart);

  const logout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    navigate("/");
  };

  const renderContent = () => {
    switch (contentType) {
      case CONTENT_TYPES.ACCOUNT:
        return <AccountForm />;
      case CONTENT_TYPES.ORDER:
        return <OrderTabs />;
      default:
        return <></>;
    }
  };

  return (
    <div className="container mx-auto mt-6 px-4 max-w-7xl">
      <Breadcrumb
        items={[{ title: "Trang chủ" }, { title: "Tài khoản" }]}
        className="text-sm mb-6"
      />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: User Info and Menu */}
        <div className="w-full md:w-1/4">
          <UserInfo user={userInfo} />
          <AccountMenu
            cartItemCount={products.length}
            setContentType={setContentType}
            navigate={navigate}
            logout={logout}
          />
        </div>

        {/* Right Column: Dynamic Content */}
        <div className="w-full md:w-3/4 min-h-screen">
          <Card className="shadow-md rounded-lg">{renderContent()}</Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
