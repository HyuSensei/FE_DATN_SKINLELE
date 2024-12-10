import { Form, Input, message, Modal } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustumButton from "../CustumButton";
import { updateDoctorByAdmin } from "@/redux/doctor/doctor.thunk";

const ModelEditDoctor = ({
  open,
  onClose,
  doctor = null,
  setStateByAction,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (doctor) {
      form.setFieldsValue({ id: doctor._id });
    }
  }, [doctor]);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const payload = {
        id: values.id,
        data: {
          password: values.password,
        },
      };
      const res = await dispatch(updateDoctorByAdmin(payload)).unwrap();
      if (res.success) {
        message.success(res.message);
        setStateByAction({ action: "update", id: values.id, data: res.data });
        form.resetFields();
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Cập nhật thông tin bác sĩ"
      open={open}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      footer={null}
      width={600}
    >
      <Form
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <div className="flex gap-4 items-center">
          <Form.Item className="hidden" name="id">
            <Input />
          </Form.Item>
          <Form.Item
            className="flex-1"
            label="Mật khẩu mới"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới!",
              },
              {
                min: 6,
                message: "Mật khẩu mới phải có ít nhất 6 ký tự.",
              },
            ]}
          >
            <Input.Password size="large" placeholder="Mật khẩu mới..." />
          </Form.Item>
          <Form.Item
            className="flex-1"
            label="Nhập lại mật khẩu"
            name="rePassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu !",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu nhập lại không khớp")
                  );
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Nhập lại mật khẩu..." />
          </Form.Item>
        </div>
        <div className="flex items-center justify-end gap-2">
          <CustumButton
            onClick={() => {
              onClose();
              form.resetFields();
            }}
            variant="default"
          >
            Đóng
          </CustumButton>
          <CustumButton loading={isLoading} variant="primary" type="submit">
            Cập nhật
          </CustumButton>
        </div>
      </Form>
    </Modal>
  );
};

export default ModelEditDoctor;
