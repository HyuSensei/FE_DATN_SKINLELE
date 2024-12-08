import React, { useEffect } from "react";
import HeaderBooking from "@components/Header/HeaderBooking";
import FooterBooking from "@components/Footer/FooterBooking";
import { useLocation } from "react-router-dom";

const LayoutBooking = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className="site-layout flex flex-col overflow-x-hidden">
      <HeaderBooking />
      <div className="min-h-screen bg-gray-50 pb-10">{children}</div>
      <FooterBooking />
    </div>
  );
};

export default LayoutBooking;
