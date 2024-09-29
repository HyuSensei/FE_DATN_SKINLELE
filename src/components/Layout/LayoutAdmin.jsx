import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { motion } from "framer-motion";
import useScreen from "../../hook/useScreen";
import HeaderAdmin from "../Header/HeaderAdmin";
import SiderAdmin from "../Sider/SiderAdmin";

const { Content, Footer } = Layout;

const LayoutAdmin = ({ children, title }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isMobile } = useScreen();

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  return (
    <Layout className="min-h-screen">
      <SiderAdmin {...{ collapsed, setCollapsed }} />
      <Layout className="site-layout">
        <HeaderAdmin {...{ collapsed, setCollapsed }} />
        <Content className="m-2 p-2 md:m-4 md:p-4 bg-white rounded-lg shadow-md">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-bold text-xl">{title}</div>
            {children}
          </motion.div>
        </Content>
        <Footer className="text-center bg-gray-100">
          <strong>Admin</strong> ©{new Date().getFullYear()} Created with
          SkinLeLe ❤️
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
