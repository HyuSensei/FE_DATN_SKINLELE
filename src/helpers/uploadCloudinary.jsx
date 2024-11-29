import CryptoJS from "crypto-js";

const CLOUDINARY_NAME = import.meta.env.VITE_APP_CLOUDINARY_NAME;
const API_KEY = import.meta.env.VITE_APP_CLOUDINARY_API_KEY;
const SECRET_KEY = import.meta.env.VITE_APP_CLOUDINARY_SECRET_KEY;

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/auto/upload`;
const DESTROY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/destroy`;

export const UPLOAD_SKINLELE_PRESET = "store";
export const UPLOAD_SKINLELE_CLINIC_PRESET = "clinic";

const getPreset = (type) => {
  switch (type) {
    case UPLOAD_SKINLELE_PRESET:
      return "skinlele-upload";
    case UPLOAD_SKINLELE_CLINIC_PRESET:
      return "skinlele-clinic-upload";
    default:
      return "skinlele-upload";
  }
};

export const uploadFile = async ({ file, type = "store" }) => {
  const formData = new FormData();
  const preset = getPreset(type);
  formData.append("file", file);
  formData.append("upload_preset", preset);
  try {
    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw error;
  }
};

export const deleteFile = async (publicId) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = CryptoJS.SHA1(
    `public_id=${publicId}&timestamp=${timestamp}${SECRET_KEY}`
  ).toString();
  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("signature", signature);
  formData.append("api_key", API_KEY);
  formData.append("timestamp", timestamp);
  try {
    const response = await fetch(DESTROY_URL, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw error;
  }
};
