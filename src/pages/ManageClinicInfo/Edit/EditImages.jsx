import React, { useState } from "react";
import { Form, Upload, message, Card } from "antd";
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

const EditImages = ({ images = [], handleChangeEdit, refetch }) => {
  const { scrollToTop } = useScroll();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [imagesUpload, setImagesUpload] = useState(
    images.map((image) => ({
      uid: image.publicId,
      name: "clinic-image",
      status: "done",
      url: image.url,
      publicId: image.publicId,
    }))
  );
  const [loading, setLoading] = useState(false);

  const handleUploadChange = ({ fileList }) => {
    setImagesUpload(fileList);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const uploadedImages = await Promise.all(
        imagesUpload.map(async (file) => {
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
        updateClinicByOwner({ images: uploadedImages })
      ).unwrap();

      if (res.success) {
        await Promise.all(
          images?.map(async (item) => {
            if (
              item.publicId &&
              !res.data.images.find((img) => img.publicId === item.publicId)
            ) {
              await deleteFile(item.publicId);
            }
          })
        );
        message.success(res.message);
        handleChangeEdit("images", false);
        refetch();
        scrollToTop();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Cập nhật hình ảnh phòng khám" className="shadow-lg rounded-xl">
      <Form
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="space-y-6"
      >
        <Form.Item
          name="images"
          label="Hình ảnh"
          rules={[
            {
              required: true,
              message: "Vui lòng tải lên ít nhất 4 ảnh",
            },
            {
              validator: (_, fileList) => {
                if (imagesUpload.length < 4) {
                  return Promise.reject("Vui lòng tải lên đủ 4 ảnh");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Upload
            accept="image/*"
            listType="picture-card"
            fileList={imagesUpload}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            multiple
            className="upload-list-inline"
          >
            {imagesUpload.length < 4 && (
              <div className="flex flex-col items-center p-4 hover:text-blue-600 transition-colors">
                <IoCloudUpload className="text-2xl mb-2" />
                <div className="text-sm font-medium">Tải ảnh</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <div className="flex gap-3 justify-end pt-4 border-t">
          <CustomButton
            icon={<IoMdArrowRoundBack className="text-lg" />}
            onClick={() => {
              setImagesUpload([]);
              handleChangeEdit("images", false);
            }}
          >
            Đóng
          </CustomButton>
          <CustomButton
            isLoaind={loading}
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

export default EditImages;
