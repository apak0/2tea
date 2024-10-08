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
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
  const MotionBox = motion.div;
  const MotionButton = motion(Button);

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
        navigate("/basket");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  console.log("formik errors:", formik.errors);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
       <Flex
        width="full"
        justifyContent="center"
        height="100vh" // Burada height özelliğini ekledik
      >
        <Box pt={10} width={"300px"}>
          <Box textAlign="center">
            <Heading
              fontFamily={"lora"}
              fontSize={"xxx-large"}
              textColor={"#FE7A36"}
            >
              Kayıt Ol
            </Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert
                status="error"
                mt={5}
                variant="left-accent"
                borderRadius="md"
                boxShadow="lg"
              >
                <AlertIcon />
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  flex="1"
                >
                  <AlertTitle>Hata</AlertTitle>
                  <AlertDescription>{formik.errors.general}</AlertDescription>
                </MotionBox>
              </Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                isInvalid={formik.touched.fullname && formik.errors.fullname}
              >
                <FormLabel fontWeight={"bold"}>İsim</FormLabel>
                <Input
                  name="fullname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                />
                {formik.errors.fullname && formik.touched.fullname && (
                  <Alert
                    status="error"
                    mt={5}
                    variant="left-accent"
                    borderRadius="md"
                    boxShadow="lg"
                  >
                    <AlertIcon />
                    <MotionBox
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      flex="1"
                    >
                      <AlertTitle>Hata</AlertTitle>
                      <AlertDescription>
                        {formik.errors.fullname}
                      </AlertDescription>
                    </MotionBox>
                  </Alert>
                )}
              </FormControl>
              <FormControl
                mt={4}
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <FormLabel fontWeight={"bold"} >E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email && (
                  <Alert
                    status="error"
                    mt={5}
                    variant="left-accent"
                    borderRadius="md"
                    boxShadow="lg"
                  >
                    <AlertIcon />
                    <MotionBox
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      flex="1"
                    >
                      <AlertTitle>Hata</AlertTitle>
                      <AlertDescription>{formik.errors.email}</AlertDescription>
                    </MotionBox>
                  </Alert>
                )}
              </FormControl>
              <FormControl
                mt={4}
                isInvalid={formik.touched.password && formik.errors.password}
              >
                <FormLabel fontWeight={"bold"}>Şifre</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password && (
                  <Alert
                    status="error"
                    mt={5}
                    variant="left-accent"
                    borderRadius="md"
                    boxShadow="lg"
                  >
                    <AlertIcon />
                    <MotionBox
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      flex="1"
                    >
                      <AlertTitle>Hata</AlertTitle>
                      <AlertDescription>
                        {formik.errors.password}
                      </AlertDescription>
                    </MotionBox>
                  </Alert>
                )}
              </FormControl>
              <FormControl
                mt={4}
                isInvalid={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                }
              >
                <FormLabel fontWeight={"bold"}>Şifreyi Tekrar Girin</FormLabel>
                <Input
                  type="password"
                  name="passwordConfirm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                />
                {formik.errors.passwordConfirm &&
                  formik.touched.passwordConfirm && (
                    <Alert
                      status="error"
                      mt={5}
                      variant="left-accent"
                      borderRadius="md"
                      boxShadow="lg"
                    >
                      <AlertIcon />
                      <MotionBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        flex="1"
                      >
                        <AlertTitle>Hata</AlertTitle>
                        <AlertDescription>
                          {formik.errors.passwordConfirm}
                        </AlertDescription>
                      </MotionBox>
                    </Alert>
                  )}
              </FormControl>
              <Button
                borderRadius={"50"}
                fontFamily={"rocher"}
                style={{ background: "#F59E0B" }}
                fontSize={"xxx-large"}
                mt={4}
                height={"80px"}
                width="full"
                type="submit"
                _hover={{
                  transform: "scale(1.1)",
                  transition: "transform 0.2s ease-in-out",
                }}
              >
                Kayıt Ol
              </Button>
              ;
            </form>
          </Box>
        </Box>
      </Flex>
    </motion.div>
  );
}

export default Signup;
