import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Required Fiel",
  },
});

const editScheme = yup.object().shape({
  title: yup.string().min(5).max(30).required(),
  description: yup.string().min(5).max(250).required(),
  price: yup.number().typeError("Price must be a number !!!").required(),
});

export default editScheme;
