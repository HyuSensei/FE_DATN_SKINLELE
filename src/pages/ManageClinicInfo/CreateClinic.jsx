import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  TimePicker,
  Row,
  Col,
  Card,
  Checkbox,
  Tag,
  message,
} from "antd";
import { IoAdd, IoCloudUpload } from "react-icons/io5";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import {
  UPLOAD_SKINLELE_CLINIC_PRESET,
  uploadFile,
} from "@helpers/uploadCloudinary";
import { useDispatch } from "react-redux";
import { createClinicByAdmin } from "@redux/clinic/clinic.thunk";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/image.min.js";
import ScheduleSection from "./ScheduleSection";

const WEEKDAYS = [
  { label: "Thứ 2", value: "Thứ 2" },
  { label: "Thứ 3", value: "Thứ 3" },
  { label: "Thứ 4", value: "Thứ 4" },
  { label: "Thứ 5", value: "Thứ 5" },
  { label: "Thứ 6", value: "Thứ 6" },
  { label: "Thứ 7", value: "Thứ 7" },
  { label: "Chủ nhật", value: "Chủ nhật" },
];

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

const CreateClinic = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [specialties, setSpecialties] = useState([]);
  const [logoImage, setLogoImage] = useState([]);
  const [images, setImages] = useState([]);
  const [banners, setBanners] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const initialWorkingHours = WEEKDAYS.reduce((acc, day) => {
      acc[day.value] = {
        startTime: dayjs("08:00", "HH:mm"),
        endTime: dayjs("17:00", "HH:mm"),
        isClosed: false,
      };
      return acc;
    }, {});

    form.setFieldsValue({
      workingHours: initialWorkingHours,
    });
  }, []);

  const handleSpecialtyClose = useCallback(
    (removedTag) => {
      const newSpecialties = specialties.filter((tag) => tag !== removedTag);
      setSpecialties(newSpecialties);
      form.setFieldsValue({ specialties: newSpecialties });
    },
    [specialties, form]
  );

  const showSpecialtyInput = useCallback(() => {
    setInputVisible(true);
  }, []);

  const handleSpecialtyInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleSpecialtyInputConfirm = useCallback(() => {
    if (inputValue.trim() && !specialties.includes(inputValue.trim())) {
      const newSpecialties = [...specialties, inputValue.trim()];
      setSpecialties(newSpecialties);
      form.setFieldsValue({ specialties: newSpecialties });
    }
    setInputVisible(false);
    setInputValue("");
  }, [inputValue, specialties, form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const uploadLogoImage =
        logoImage && logoImage[0].originFileObj
          ? await uploadFile({
              file: logoImage[0].originFileObj,
              type: UPLOAD_SKINLELE_CLINIC_PRESET,
            })
          : null;
      const uploadedImages = await Promise.all(
        images.map(async (file) => {
          if (file.originFileObj) {
            const result = await uploadFile({
              file: file.originFileObj,
              type: UPLOAD_SKINLELE_CLINIC_PRESET,
            });
            if (result && result.secure_url && result.public_id) {
              return { url: result.secure_url, publicId: result.public_id };
            }
          }
          return null;
        })
      );
      const uploadedBanners = await Promise.all(
        banners.map(async (file) => {
          if (file.originFileObj) {
            const result = await uploadFile({
              file: file.originFileObj,
              type: UPLOAD_SKINLELE_CLINIC_PRESET,
            });
            if (result && result.secure_url && result.public_id) {
              return { url: result.secure_url, publicId: result.public_id };
            }
          }
          return null;
        })
      );

      const workingHours = WEEKDAYS.map((day) => {
        const dayData = values.workingHours?.[day.value] || {};
        return {
          dayOfWeek: day.value,
          isOpen: !dayData.isClosed,
          startTime: dayData.startTime
            ? dayjs(dayData.startTime).format("HH:mm")
            : "08:00",
          endTime: dayData.endTime
            ? dayjs(dayData.endTime).format("HH:mm")
            : "17:00",
          breakTime: {
            start: dayjs(dayData.breakTimeStart).format("HH:mm"),
            end: dayjs(dayData.breakTimeEnd).format("HH:mm"),
          },
        };
      });

      const payload = {
        ...values,
        workingHours,
        logo: {
          url: uploadLogoImage.secure_url,
          publicId: uploadLogoImage.public_id,
        },
        banners: uploadedBanners.map((img) => ({
          url: img.url,
          publicId: img.publicId,
        })),
        images: uploadedImages.map((img) => ({
          url: img.url,
          publicId: img.publicId,
        })),
      };
      const res = await dispatch(createClinicByAdmin(payload)).unwrap();
      if (res.success) {
        message.success(res.message);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderTags = useMemo(
    () => (
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
    ),
    [specialties, handleSpecialtyClose]
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
    >
      <div className="font-bold text-2xl mb-4">Tạo thông tin phòng khám</div>
      {/* Basic Info Card - Same as before */}
      <Card title="Thông tin cơ bản" className="mb-6 shadow-md">
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              name="name"
              label="Tên phòng khám"
              rules={[
                { required: true, message: "Vui lòng nhập tên phòng khám" },
              ]}
            >
              <Input
                placeholder="Nhập tên phòng khám"
                className="rounded-lg"
                size="middle"
              />
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
              <Input
                placeholder="Nhập số điện thoại"
                className="rounded-lg"
                size="middle"
              />
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
              <Input
                placeholder="Nhập email"
                className="rounded-lg"
                size="middle"
              />
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
                onModelChange={(value) =>
                  setFieldsValue({
                    address: value,
                  })
                }
              />
            )}
          </Form.Item>
        </Form.Item>
      </Card>

      {/* Working Hours Card - Updated with validation */}
      <Card title="Lịch làm việc" className="mb-6 shadow-md">
        <ScheduleSection />
      </Card>

      {/* Images Card - Same as before */}
      <Card title="Hình ảnh" className="mb-6 shadow-md">
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              name="logo"
              label="Logo phòng khám"
              rules={[{ required: true, message: "Vui lòng tải lên logo" }]}
            >
              <Upload
                accept="image/*"
                onChange={({ fileList }) => setLogoImage(fileList)}
                fileList={logoImage}
                listType="picture-card"
                beforeUpload={() => false}
                maxCount={1}
              >
                {logoImage.length === 0 && (
                  <div className="flex flex-col items-center">
                    <IoCloudUpload className="w-6 h-6" />
                    <div className="mt-2">Tải logo</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="images"
              label="Ảnh phòng khám"
              rules={[
                {
                  required: true,
                  message: "Vui lòng tải lên ảnh lên",
                },
                {
                  validator: (_, fileList) => {
                    if (fileList?.length < 4) {
                      return Promise.reject(
                        new Error("Vui lòng tải lên đủ 4 ảnh")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Upload
                accept="image/*"
                onChange={({ fileList }) => setImages(fileList)}
                fileList={images}
                listType="picture-card"
                beforeUpload={() => false}
                maxCount={4}
                multiple
              >
                {images.length < 4 && (
                  <div className="flex flex-col items-center">
                    <IoCloudUpload className="w-6 h-6" />
                    <div className="mt-2">Tải ảnh</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="banners"
              label="Banner"
              rules={[
                {
                  required: true,
                  message: "Vui lòng tải lên ảnh banner",
                },
              ]}
            >
              <Upload
                accept="image/*"
                onChange={({ fileList }) => setBanners(fileList)}
                fileList={banners}
                listType="picture-card"
                beforeUpload={() => false}
                maxCount={4}
                multiple
              >
                {banners.length < 4 && (
                  <div className="flex flex-col items-center">
                    <IoCloudUpload className="w-6 h-6" />
                    <div className="mt-2">Tải ảnh</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Professional Info Card - Same as before */}
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
                  setFieldsValue({
                    description: value,
                  })
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
          className="w-full"
        >
          <div className="space-y-4">
            {renderTags}

            {inputVisible ? (
              <Input
                size="large"
                ref={inputRef}
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

      <div className="w-full">
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none rounded-full"
        >
          Tạo phòng khám
        </Button>
      </div>
    </Form>
  );
};

export default CreateClinic;
