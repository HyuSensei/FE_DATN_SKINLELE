import React from "react";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import CustomButton from "../CustomButton";

const QuickViewOverlay = ({ onClick }) => {
  return (
    <div className="absolute rounded-t-lg inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <CustomButton
        onClick={onClick}
        icon={<EyeOutlined />}
        className="text-white bg-gradient-to-r from-yellow-300 via-orange-400 to-purple-600 hover:opacity-95 !rounded-full"
      >
        Xem nhanh
      </CustomButton>
    </div>
  );
};

export default QuickViewOverlay;
