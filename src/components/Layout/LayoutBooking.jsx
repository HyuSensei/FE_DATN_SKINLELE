import React from "react";
import { Layout } from "antd";
import HeaderBooking from "../Header/HeaderBooking";
import FooterBooking from "../Footer/FooterBooking";

const { Content } = Layout;

const LayoutBooking = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <HeaderBooking />
      <Content className="bg-white h-screen">{children}</Content>
      <FooterBooking />
    </Layout>
  );
};

export default LayoutBooking;
