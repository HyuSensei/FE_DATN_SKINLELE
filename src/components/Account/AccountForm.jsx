import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message, Spin, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile, deleteFile } from "../../helpers/uploadCloudinary";
import ErrorMessage from "../Error/ErrorMessage";
import { getAccountUser, updateAccount } from "../../redux/auth/auth.thunk";
import { setUserInfo } from "../../redux/auth/auth.slice";

const AccountForm = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    password: "",
    rePassword: "",
  });
  const [avatar, setAvatar] = useState({
    file: null,
    preview: userInfo?.avatar?.url || null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleAvatarChange = ({ fileList }) => {
    if (fileList.length > 0) {
      setAvatar({
        file: fileList[0].originFileObj,
        preview: URL.createObjectURL(fileList[0].originFileObj),
      });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!input.name.trim()) formErrors.name = "Vui lòng nhập họ tên!";
    if (!input.password && input.rePassword)
      formErrors.password = "Vui lòng nhập mật khẩu!";
    if (input.password && !input.rePassword)
      formErrors.password = "Vui lòng nhập lại mật khẩu!";
    if (input.password !== input.rePassword)
      formErrors.rePassword = "Mật khẩu nhập lại không khớp!";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) return;
      setLoading(true);
      let avatarData;
      if (avatar.file) {
        const result = await uploadFile(avatar.file);
        avatarData = {
          url: result.secure_url,
          publicId: result.public_id,
        };
      }
      dispatch(updateAccount({ ...input, avatar: avatarData })).then(
        async (res) => {
          if (res.payload.success) {
            if (userInfo?.avatar?.publicId) {
              await deleteFile(userInfo.avatar.publicId);
            }
            dispatch(
              setUserInfo({
                ...userInfo,
                name: input.name,
                avatar: avatarData || userInfo?.avatar,
              })
            );
            message.success(res.payload.message);
            return;
          } else {
            if (avatarData.publicId) {
              await deleteFile(avatarData.publicId);
              return;
            }
          }
        }
      );
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Thông tin người dùng
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <Upload
            accept="image/*"
            maxCount={1}
            beforeUpload={() => false}
            listType="picture-circle"
            onChange={handleAvatarChange}
          >
            <div>
              <UploadOutlined />
              <div className="mt-2">Tải ảnh lên</div>
            </div>
          </Upload>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Họ tên
        </label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <ErrorMessage message={errors.name} />}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={input.email}
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mật khẩu mới
        </label>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <ErrorMessage message={errors.password} />}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nhập lại mật khẩu
        </label>
        <input
          type="password"
          name="rePassword"
          value={input.rePassword}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.rePassword && <ErrorMessage message={errors.rePassword} />}
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-xl"
      >
        {loading ? <Spin /> : "Lưu thay đổi"}
      </button>
    </form>
  );
};

export default AccountForm;
