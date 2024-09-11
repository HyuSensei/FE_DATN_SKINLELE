import * as Yup from "yup";

export const validateForm = async ({ input, validateSchema }) => {
  try {
    await validateSchema.validate(input, {
      abortEarly: false,
    });
    return {};
  } catch (validationErrors) {
    const errors = {};
    validationErrors.inner.forEach((error) => {
      errors[error.path] = error.message;
    });
    return errors;
  }
};

export const validateCreateProductSchema = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên sản phẩm"),

  categories: Yup.array()
    .of(Yup.string())
    .min(1, "Phải chọn ít nhất một danh mục")
    .required("Vui lòng chọn danh mục sản phẩm"),

  brand: Yup.string().required("Vui lòng chọn thương hiệu"),

  price: Yup.string().required("Vui lòng nhập giá sản phẩm"),

  description: Yup.string().required("Vui lòng nhập mô tả sản phẩm"),

  mainImage: Yup.object().required("Vui lòng chọn ảnh chính hiển thị sản phẩm"),

  images: Yup.array()
    .of(Yup.object().required("Vui lòng chọn ảnh phụ hiển thị sản phẩm"))
    .min(1, "Phải có ít nhất một hình ảnh phụ"),

  variants: Yup.array().test(
    "variants",
    "Variants không hợp lệ",
    function (value) {
      if (!value || value.length === 0) return true;
      let errors = {};
      value.forEach((variant, index) => {
        if (!variant.color || typeof variant.color !== "object") {
          errors[`variants[${index}].color`] = "Thông tin màu sắc không hợp lệ";
          return;
        }
        const { name, code, image } = variant.color;
        if (!name) {
          errors[`variants[${index}].color.name`] = "Tên màu là bắt buộc";
        }
        if (!code) {
          errors[`variants[${index}].color.code`] = "Mã màu là bắt buộc";
        }
        if (!image) {
          errors[`variants[${index}].color.image.url`] =
            "Vui lòng chọn ảnh hiển thị mã màu";
        }
      });
      if (Object.keys(errors).length > 0) {
        return this.createError({ path: "variants", message: errors });
      }
      return true;
    }
  ),
});