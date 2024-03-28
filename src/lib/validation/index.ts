import * as yup from "yup";

export const SignupValidation = yup.object({
  name: yup.string().min(3, 'Name must be at least 3 characters long').required(),
  username: yup.string().min(3, 'Username must be at least 3 characters long'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters long').required()
}).required();

export const SigninValidation = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required')
}).required();

export type SignupValidationType = yup.InferType<typeof SignupValidation>;
export type SigninValidationType = yup.InferType<typeof SigninValidation>;