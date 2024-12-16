import React, { useState } from "react";
import { Form, Upload, Button, message, Card } from "antd";
import { IoCloudUpload } from "react-icons/io5";
import { MdSave } from "react-icons/md";
import {
  deleteFile,
  UPLOAD_SKINLELE_CLINIC_PRESET,
  uploadFile,
} from "@helpers/uploadCloudinary";
import { useDispatch } from "react-redux";
import { updateClinicByOwner } from "@/redux/clinic/clinic.thunk";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useScroll } from "@/components/context/ScrollProvider";
import CustomButton from "@/components/CustomButton";

const EditBanner = ({ banners = [], handleChangeEdit, refetch }) => {
  const { scrollToTop } = useScroll();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [bannersUpload, setBannersUpload] = useState(
    banners.map((banner) => ({
      uid: banner.publicId,
      name: "banner-image",
      status: "done",
      url: banner.url,
      publicId: banner.publicId,
    }))
  );
  const [loading, setLoading] = useState(false);

  const handleUploadChange = ({ fileList }) => {
    setBannersUpload(fileList);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const uploadedBanners = await Promise.all(
        bannersUpload.map(async (file) => {
          if (file.originFileObj) {
            const result = await uploadFile({
              file: file.originFileObj,
              type: UPLOAD_SKINLELE_CLINIC_PRESET,
            });
            return {
              url: result.secure_url,
              publicId: result.public_id,
            };
          }
          return {
            url: file.url,
            publicId: file.publicId,
          };
        })
      );

      const res = await dispatch(
        updateClinicByOwner({ banners: uploadedBanners })
      ).unwrap();

      if (res.success) {
        await Promise.all(
          banners?.map(async (item) => {
            if (
              item.publicId &&
              !res.data.banners.find((u) => u.publicId === item.publicId)
            ) {
              await deleteFile(item.publicId);
            }
          })
        );
        message.success(res.message);
        setBannersUpload([]);
        handleChangeEdit("banners", false);
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
    <Card title="Cập nhật ảnh nền phòng khám" className="shadow-lg rounded-xl">
      <Form
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="space-y-6"
      >
        <Form.Item
          name="banners"
          label="Banner"
          rules={[
            {
              required: true,
              message: "Vui lòng tải lên ít nhất 1 ảnh",
            },
          ]}
        >
          <Upload
            accept="image/*"
            listType="picture-card"
            fileList={bannersUpload}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            multiple
            maxCount={4}
            className="upload-list-inline"
          >
            {bannersUpload.length < 4 && (
              <div className="flex flex-col items-center p-4 hover:text-blue-600 transition-colors">
                <IoCloudUpload className="text-2xl mb-2" />
                <div className="text-sm font-medium">Tải ảnh</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <div className="flex gap-3 justify-end pt-4 border-t">
          <CustomButton icon={<IoMdArrowRoundBack className="text-lg" />}
            onClick={() => {
              setBannersUpload([]);
              handleChangeEdit("banners", false);
            }}>Đóng</CustomButton>
          <CustomButton
            icon={<MdSave className="text-lg" />}
            type="submit"
            variant="primary"
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </CustomButton>
        </div>
      </Form>
    </Card>
  );
};

export default EditBanner;
