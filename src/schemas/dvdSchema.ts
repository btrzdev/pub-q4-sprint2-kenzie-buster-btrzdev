import * as yup from "yup";

const createDvdSchema = yup.object().shape({
  dvds: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      duration: yup.string().required(),
      quantity: yup.number().integer().required(),
      price: yup.number().required(),
    })
  ),
});

export { createDvdSchema };
