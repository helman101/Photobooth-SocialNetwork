import * as yup from "yup";

export const SignupValidation = yup.object({
  name: yup.string().min(3, 'Name must be at least 3 characters long').required(),
  username: yup.string().min(3, 'Username must be at least 3 characters long').required(),
  email: yup.string().email().required(),
  password: yup.string().min(8, 'Password must be at least 8 characters long').required()
}).required();

export type SignupValidationType = yup.InferType<typeof SignupValidation>;