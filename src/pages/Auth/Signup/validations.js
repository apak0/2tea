import * as yup from "yup"

const validationSchema = yup.object().shape({
    fullname: yup.string().required("Required"),
    email: yup.string().email("Geçersiz email").required("Required"),
    password: yup.string().min(5, "Şifre en az 5 karakterden oluşmalıdır ").required("Required"),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], "Şifreler uyuşmuyor").required("Required")

})

export default validationSchema;