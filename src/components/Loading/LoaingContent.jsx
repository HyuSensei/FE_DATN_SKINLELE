import { Spin } from "antd";
import React from "react";

const LoadingContent = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="py-6 px-8 bg-white rounded-md shadow-lg">
        <div className="flex items-center justify-center">
          <Spin size="large" />
        </div>
        <div className="mt-4">Đang tải...</div>
      </div>
    </div>
  );
};

export default LoadingContent;
