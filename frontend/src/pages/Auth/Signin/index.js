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
import { fetchLogin } from "../../../api";

import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion"

function Signin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });
        login(loginResponse);
        navigate("/profile");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  return (
    <motion.div
    
    initial={{opacity:0}}
    animate={{opacity:1}}>
      <Flex aling="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign in</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
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

              <Button mt={4} width="full" type="submit">
                Signin
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </motion.div>
  );
}

export default Signin;
