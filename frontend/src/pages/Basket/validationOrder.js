import * as yup from "yup";

const validationOrderSchema = yup.object().shape({
  fullName: yup.string().required("Zorunlu alan."),
  phoneNumber: yup.number().min(11).required("Zorunlu alan."),
  address: yup.string().required("Zorunlu alan."),
});

export default validationOrderSchema;
