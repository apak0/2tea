import * as yup from "yup"

const validationSchema = yup.object().shape({
    fullname: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().min(5, "Password must be greater than 5 characters ").required("Required"),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], "Passwords not same").required("Required")

})

export default validationSchema;