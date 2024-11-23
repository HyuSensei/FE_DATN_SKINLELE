import React from "react";
import Auth from "../../pages/Auth/Auth";
import { Modal } from "antd";

const ModalAuth = ({ open, onClose }) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} width={600}>
      <Auth isModel={true} />
    </Modal>
  );
};

export default ModalAuth;
