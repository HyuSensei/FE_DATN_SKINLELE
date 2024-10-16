import { Modal } from "antd";
import React from "react";

const ModalSaveProductPromotion = ({ open, setOpen }) => {
  const handleSubmit = () => {};
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      title={
        <div className="text-2xl font-bold text-center">Cập nhật dịch vụ</div>
      }
      onOk={handleSubmit}
      onCancel={handleClose}
      footer={[
        <button
          key="cancel"
          onClick={handleClose}
          className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 border px-6 py-2 rounded-md transition duration-300 ease-in-out"
        >
          Hủy
        </button>,
        <button
          key="submit"
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cập nhật
        </button>,
      ]}
      width={800}
    ></Modal>
  );
};

export default ModalSaveProductPromotion;
