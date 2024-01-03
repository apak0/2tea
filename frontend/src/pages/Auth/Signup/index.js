import React from "react";
import {
  Flex,
  Box,
  Heading,
  FormLabel,
  FormControl,
  Input,
  Button,
  Alert,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetchRegister } from "../../../api";

import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion"

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        console.log("values:", values)
        const registerResponse = await fetchRegister({
          fullname: values.fullname,
          email: values.email,
          password: values.password,
        });
        login(registerResponse);
        navigate("/profile");
      console.log("registerResponse:", registerResponse)
      

      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });
console.log("formik errors:", formik.errors.general)
  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}>
      <Flex aling="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign up</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            
            <form onSubmit={formik.handleSubmit}>
              
              <FormControl>
                <FormLabel>Fullname</FormLabel>
                <Input
                  name="fullname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                  isInvalid={formik.touched.fullname && formik.errors.fullname}
                />
                
              </FormControl>

              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                  value={formik.values.password}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  type="password"
                  name="passwordConfirm"
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                  value={formik.values.passwordConfirm}
                />
              </FormControl>

              <Button mt={4} width="full" type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </motion.div>
  );
}

export default Signup;
