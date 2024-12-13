import React, { useState } from "react";
import { Form, Input, Tag, Card, Row, Col, Button, message, Upload } from "antd";
import { IoAdd, IoCloudUpload } from "react-icons/io5";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/image.min.js";
import { MdSave } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateClinicByOwner } from "@/redux/clinic/clinic.thunk";
import { useScroll } from "@/components/context/ScrollProvider";
import { deleteFile, UPLOAD_SKINLELE_CLINIC_PRESET, uploadFile } from "@/helpers/uploadCloudinary";

const config = {
  imageUpload: false,
  imageUploadToBase64: false,
  imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
  height: 200,
  charCounterCount: false,
  toolbarSticky: true,
  toolbarStickyOffset: 50,
  attribution: false,
  language: "vi",
};

const EditInfo = ({ clinic, handleChangeEdit, refetch }) => {
  const { scrollToTop } = useScroll();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [specialties, setSpecialties] = useState(clinic.specialties || []);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState([
    {
      url: clinic.logo.url,
      publicId: clinic.logo.publicId
    },
  ]);

  const handleSpecialtyClose = (removedTag) => {
    const newSpecialties = specialties.filter((tag) => tag !== removedTag);
    setSpecialties(newSpecialties);
    form.setFieldsValue({ specialties: newSpecialties });
  };

  const showSpecialtyInput = () => {
    setInputVisible(true);
  };

  const handleSpecialtyInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSpecialtyInputConfirm = () => {
    if (inputValue.trim() && !specialties.includes(inputValue.trim())) {
      const newSpecialties = [...specialties, inputValue.trim()];
      setSpecialties(newSpecialties);
      form.setFieldsValue({ specialties: newSpecialties });
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let payload = {};

      if (logo[0]?.originFileObj) {
        const result = await uploadFile({
          file: logo[0].originFileObj,
          type: UPLOAD_SKINLELE_CLINIC_PRESET,
        });
        await deleteFile(clinic.logo.publicId);
        payload = {
          ...values,
          logo: { url: result.secure_url, publicId: result.public_id },
        };
      } else {
        payload = { ...values };
      }

      const res = await dispatch(updateClinicByOwner(payload)).unwrap();
      if (res.success) {
        message.success(res.message);
        form.resetFields();
        handleChangeEdit("info", false);
        refetch();
        scrollToTop();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      requiredMark={false}
      form={form}
      layout="vertical"
      initialValues={{
        name: clinic.name,
        phone: clinic.phone,
        email: clinic.email,
        address: clinic.address,
        description: clinic.description,
        specialties: clinic.specialties,
      }}
      onFinish={handleSubmit}
    >
      <Card title="Thông tin cơ bản" className="mb-6 shadow-md">
        <Form.Item
          name="logo"
          label="Logo phòng khám"
          rules={[{ required: true, message: "Vui lòng tải lên ảnh lên" }]}
        >
          <Upload
            accept="image/*"
            onChange={({ fileList }) => setLogo(fileList)}
            fileList={logo}
            listType="picture-circle"
            beforeUpload={() => false}
            maxCount={1}
          >
            {logo.length === 0 && (
              <div className="flex flex-col items-center">
                <IoCloudUpload className="w-6 h-6" />
                <div className="mt-2">Tải ảnh</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              name="name"
              label="Tên phòng khám"
              rules={[
                { required: true, message: "Vui lòng nhập tên phòng khám" },
              ]}
            >
              <Input placeholder="VD: Phòng khám Da liễu" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input placeholder="0123456789" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="email@example.com" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue, setFieldsValue }) => (
              <FroalaEditor
                tag="textarea"
                config={{
                  ...config,
                  placeholderText: "Số nhà, đường, phường/xã...",
                }}
                model={getFieldValue("address") || ""}
                onModelChange={(value) => setFieldsValue({ address: value })}
              />
            )}
          </Form.Item>
        </Form.Item>
      </Card>

      <Card title="Thông tin chuyên môn" className="mb-6 shadow-md">
        <Form.Item
          name="description"
          label="Mô tả phòng khám"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue, setFieldsValue }) => (
              <FroalaEditor
                tag="textarea"
                config={{
                  ...config,
                  placeholderText: "Mô tả phòng khám...",
                }}
                model={getFieldValue("description") || ""}
                onModelChange={(value) =>
                  setFieldsValue({ description: value })
                }
              />
            )}
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="specialties"
          label="Chuyên khoa"
          rules={[
            { required: true, message: "Vui lòng thêm ít nhất 1 chuyên khoa" },
          ]}
        >
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <Tag
                  key={specialty}
                  closable
                  onClose={() => handleSpecialtyClose(specialty)}
                  className="py-1 px-3 rounded-full bg-blue-50 text-blue-600 border-blue-200"
                >
                  {specialty}
                </Tag>
              ))}
            </div>

            {inputVisible ? (
              <Input
                size="large"
                type="text"
                className="w-full rounded-full"
                value={inputValue}
                onChange={handleSpecialtyInputChange}
                onBlur={handleSpecialtyInputConfirm}
                onPressEnter={handleSpecialtyInputConfirm}
                placeholder="Nhập tên chuyên khoa..."
              />
            ) : (
              <Tag
                onClick={showSpecialtyInput}
                className="py-2 px-4 rounded-full border-2 border-dashed border-blue-300 text-blue-600 hover:border-blue-400 cursor-pointer"
              >
                <IoAdd className="inline w-4 h-4 mr-2" />
                Thêm chuyên khoa
              </Tag>
            )}
          </div>
        </Form.Item>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          icon={<IoMdArrowRoundBack className="text-lg" />}
          onClick={() => {
            handleChangeEdit("info", false);
            form.resetFields();
          }}
        >
          Đóng
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-200/50 active:shadow-inner disabled:opacity-70 disabled:cursor-not-allowed"
          icon={<MdSave className="text-lg" />}
        >
          Lưu thay đổi
        </Button>
      </div>
    </Form>
  );
};

export default EditInfo;
