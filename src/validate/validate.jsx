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

  expiry: Yup.string().required("Vui lòng chọn hạn sử dụng cho sản phẩm"),

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

export const validateLoginSchema = Yup.object({
  email: Yup.string()
    .required("Vui lòng nhập email")
    .email("Vui lòng nhập đúng email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

export const validateRegisterSchema = Yup.object({
  name: Yup.string().required("Vui lòng nhập họ tên"),
  email: Yup.string()
    .required("Vui lòng nhập email")
    .email("Vui lòng nhập đúng email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
  rePassword: Yup.string().required("Vui lòng nhập lại mật khẩu"),
});

export const validateSendOtpSchema = Yup.object({
  email: Yup.string()
    .required("Vui lòng nhập email")
    .email("Vui lòng nhập đúng email"),
});

export const validateResetPasswordSchema = Yup.object({
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
  rePassword: Yup.string().required("Vui lòng nhập lại mật khẩu"),
});


export const validateReviewSchema = Yup.object({
  rate: Yup.number()
    .required("Vui lòng chọn mức độ hài lòng của bạn")
    .min(1, "Vui lòng chọn mức độ hài lòng của bạn")
    .max(5, "Mức độ hài lòng không hợp lệ")
    .integer("Mức độ hài lòng phải là số nguyên"),
  comment: Yup.string().required("Vui lòng nhập nội dung đánh giá"),
});

export const validateOrderSchema = Yup.object({
  name: Yup.string().required("Vui lòng nhập họ tên người nhận hàng"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  address: Yup.string().required("Vui lòng nhập địa chỉ cụ thể"),
  paymentMethod: Yup.string().required("Vui lòng chọn phương thức thanh toán"),
  province: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn tỉnh/thành phố"),
    name: Yup.string().required("Tên tỉnh/thành phố không được để trống"),
  }),
  district: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn quận/huyện"),
    name: Yup.string().required("Tên quận/huyện không được để trống"),
  }),
  ward: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn phường/xã"),
    name: Yup.string().required("Tên phường/xã không được để trống"),
  }),
});

export const validateCategoryActionSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Vui lòng nhập tên danh mục")
    .min(2, "Tên danh mục phải có ít nhất 2 ký tự")
    .max(100, "Tên danh mục không được vượt quá 100 ký tự"),

  level: Yup.number()
    .required("Vui lòng chọn cấp danh mục"),
});

export const validateBrandActionSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Vui lòng nhập tên thương hiệu")
});


export const validateEditShipSchema = Yup.object({
  name: Yup.string().required("Vui lòng nhập họ tên người nhận hàng"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  address: Yup.string().required("Vui lòng nhập địa chỉ cụ thể"),
  province: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn tỉnh/thành phố"),
    name: Yup.string().required("Tên tỉnh/thành phố không được để trống"),
  }),
  district: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn quận/huyện"),
    name: Yup.string().required("Tên quận/huyện không được để trống"),
  }),
  ward: Yup.object().shape({
    id: Yup.string().required("Vui lòng chọn phường/xã"),
    name: Yup.string().required("Tên phường/xã không được để trống"),
  }),
});