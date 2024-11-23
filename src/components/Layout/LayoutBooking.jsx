import React from "react";
import HeaderBooking from "../Header/HeaderBooking";
import FooterBooking from "../Footer/FooterBooking";

const LayoutBooking = ({ children }) => {
  return (
    <div className="site-layout flex flex-col overflow-x-hidden">
      <HeaderBooking />
      <div className="bg-white min-h-screen">{children}</div>
      <FooterBooking />
    </div>
  );
};

export default LayoutBooking;
