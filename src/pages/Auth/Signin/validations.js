import * as yup from "yup"

const validationSchema = yup.object({
    email: yup.string().email("Geçersiz email").required("Required"),
    password: yup.string().min(5, "Şifre en az 5 karakterden oluşmalıdır.").required("Required"),
   

})

export default validationSchema;