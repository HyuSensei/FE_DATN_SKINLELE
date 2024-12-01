import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getAccountAdmin, loginAdmin } from "@redux/auth/auth.thunk";
import { set } from "@storage/storage";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleChangeInput = (key, value) => {
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginAdmin(input)).then((res) => {
      if (res.payload.success) {
        const resData = res.payload.data;
        set("ACCESS_TOKEN_ADMIN", res.payload.accessToken);
        if (resData.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/admin/dashboard-clinic");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl flex rounded-xl shadow-2xl overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 p-8 bg-gray-800"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            Admin SkinLele
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Tên đăng nhập..."
                value={input.username}
                onChange={(e) => handleChangeInput("username", e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Mật khẩu..."
                value={input.password}
                onChange={(e) => handleChangeInput("password", e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-purple-700 transition duration-300"
              type="submit"
            >
              <span>Đăng Nhập</span>
              <FiArrowRight />
            </motion.button>
          </form>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-8"
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Welcome Back!</h3>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-48 h-48 mx-auto text-white opacity-50"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm text-gray-200 text-center">
              <strong>SkinLeLe Admin</strong> ©{new Date().getFullYear()}{" "}
              Created with ❤️
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginAdmin;
