import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-lg text-center">
        <div className="relative">
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="404 Not Found"
            className="w-full h-auto rounded-md"
          />
        </div>
        <h2 className="mt-8 text-3xl font-semibold text-gray-800">
          Oops! Trang này không tồn tại.
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không
          khả dụng.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 px-8 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};

export default NotFound;
