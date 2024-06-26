import * as yup from "yup"

const validationSchema = yup.object().shape({
    fullname: yup.string().required("Geçersiz İsim"),
    email: yup.string().email("Geçersiz email").required("Geçerli bir e-mail girin"),
    password: yup.string().min(5, "Şifre en az 5 karakterden oluşmalıdır ").required("Şifre Geçersiz"),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], "Şifreler uyuşmuyor").required("")

})

export default validationSchema;