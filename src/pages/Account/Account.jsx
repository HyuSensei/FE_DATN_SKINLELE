import React, { useEffect, useState } from "react";
import { Breadcrumb, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "@redux/auth/auth.slice";
import { clearCart } from "@redux/cart/cart.slice";
import AccountForm from "./components/AccountForm";
import OrderTabs from "./components/OrderTabs";
import UserInfo from "./components/UserInfo";
import AccountMenu from "./components/AccountMenu";
import Cart from "@pages/Cart";

const CONTENT_TYPES = {
  PROFILE: "profile",
  ORDERS: "orders",
  CARTS: "carts",
};

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [contentType, setContentType] = useState(CONTENT_TYPES.PROFILE);
  const { userInfo } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.cart.cart);
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get("tab") || CONTENT_TYPES.PROFILE;

  const handleSelectedMenu = (tab) => {
    setContentType(tab);
    navigate(`/account?tab=${tab}`);
  };

  useEffect(() => {
    setContentType(tab);
    if (!queryParams.get("tab")) {
      navigate("/account?tab=profile");
    }
  }, [navigate]);

  const logout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    navigate("/");
  };

  const renderContent = () => {
    switch (contentType) {
      case CONTENT_TYPES.PROFILE:
        return <AccountForm />;
      case CONTENT_TYPES.ORDERS:
        return <OrderTabs />;
      case CONTENT_TYPES.CARTS:
        return <Cart {...{ isHiden: true }} />;
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
        <div className="w-full md:w-1/4 top-4 lg:sticky">
          <UserInfo user={userInfo} />
          <AccountMenu
            handleSelectedMenu={handleSelectedMenu}
            cartItemCount={products.length}
            navigate={navigate}
            logout={logout}
          />
        </div>

        {/* Right Column: Dynamic Content */}
        <div className="w-full md:w-3/4 min-h-screen">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Account;
