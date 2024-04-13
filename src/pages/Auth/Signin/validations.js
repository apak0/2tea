import * as yup from "yup"

const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().min(5, "Password must be longer than 5 character.").required("Required"),
   

})

export default validationSchema;