import * as yup from "yup";
export const loginFormValidationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid Email address")
    .required("Email is Required"),
  password: yup.string().required("Password is required"),
  rememberMe: yup.boolean(),
});
