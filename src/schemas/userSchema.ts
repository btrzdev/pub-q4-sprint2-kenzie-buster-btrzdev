import * as yup from "yup";

const loginUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const createUserSchema = yup.object().shape({
  email: yup.string().email().lowercase().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().default(false).optional(),
});

const serializedCreateUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().required(),
});

export { loginUserSchema, createUserSchema, serializedCreateUserSchema };
