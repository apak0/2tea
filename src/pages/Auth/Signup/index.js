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
import { motion } from "framer-motion";

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
        const registerResponse = await fetchRegister({
          fullname: values.fullname,
          email: values.email,
          password: values.password,
        });
        login(registerResponse);
        navigate("/profile");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  console.log("formik errors:", formik.errors);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Kayıt Ol</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl isInvalid={formik.touched.fullname && formik.errors.fullname}>
                <FormLabel>İsim</FormLabel>
                <Input
                  name="fullname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                />
                {formik.errors.fullname && formik.touched.fullname && (
                  <Alert status="error">{formik.errors.fullname}</Alert>
                )}
              </FormControl>

              <FormControl mt={4} isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email && (
                  <Alert status="error">{formik.errors.email}</Alert>
                )}
              </FormControl>

              <FormControl mt={4} isInvalid={formik.touched.password && formik.errors.password}>
                <FormLabel>Şifre</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password && (
                  <Alert status="error">{formik.errors.password}</Alert>
                )}
              </FormControl>

              <FormControl mt={4} isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}>
                <FormLabel>Şifreyi Tekrar Girin</FormLabel>
                <Input
                  type="password"
                  name="passwordConfirm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                />
                {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
                  <Alert status="error">{formik.errors.passwordConfirm}</Alert>
                )}
              </FormControl>

              <Button mt={4} width="full" type="submit">
                Kayıt Ol
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </motion.div>
  );
}

export default Signup;
