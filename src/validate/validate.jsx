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
