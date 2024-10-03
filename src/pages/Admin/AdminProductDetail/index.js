import React from "react";

import { Navigate, useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
import { useQuery } from "react-query";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FieldArray, Formik } from "formik";

import validationSchema from "./validations";
import { motion } from "framer-motion";

import { message } from "antd";

function AdminProductDetail() {
  const { product_id } = useParams();
  const navigate = useNavigate();

  const MotionBox = motion.div;

  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    <div>Error {error.message}</div>;
  }

  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Loading...", key: "product_update" });

    try {
      await updateProduct(values, product_id);

      message.success({
        content: "The product successfuly updated",
        key: "product_update",
        duration: 2,
      });

      setTimeout(() => {
        navigate("/admin/products");
      }, 3000);
    } catch (e) {
      message.error("The product does not updated");
    }
  };

  return (
    <MotionBox px={5}  initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Text
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={"3xl"}
        as="b"
        color={"orange.300"}
        width={"full"}
        bg={"#8d8d8d"}
        p={2}
      >
        Düzenle
      </Text>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <Box>
            <Box mx={15}>
              <Box m="5" textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Ürün Adı</FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />

                    {touched.title && errors.title && (
                      <Text color="red.500">{errors.title}</Text>
                    )}
                  </FormControl>

                  <FormControl mt="4">
                    <FormLabel>Ürün Açıklaması</FormLabel>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid={touched.description && errors.description}
                    />
                    {touched.description && errors.description && (
                      <Text color="red.500">{errors.description}</Text>
                    )}
                  </FormControl>

                  <FormControl mt="4">
                    <FormLabel>Fiyat</FormLabel>
                    <Input
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                      isInvalid={touched.price && errors.price}
                    />
                    {touched.price && errors.price && (
                      <Text color="red.500">{errors.price}</Text>
                    )}
                  </FormControl>

                  <FormControl my={4}>
                    <FormLabel>Fotoğraf</FormLabel>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <Box>
                          {values.photos &&
                            values.photos.map((photo, index) => (
                              <div key={index}>
                                <Input
                                  name={`photos.${index}`}
                                  value={photo}
                                  disabled={isSubmitting}
                                  onChange={handleChange}
                                  width="3xl"
                                  mb={3}
                                />

                                <Button
                                  ml="4"
                                  type="button"
                                  colorScheme="red"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Sil
                                </Button>
                              </div>
                            ))}

                          <Button
                            mt="5"
                            bg="teal.500"
                            color="white"
                            _hover={{ bg: "teal.600" }}
                            _active={{ bg: "teal.700" }}
                            onClick={() => arrayHelpers.push("")}
                          >
                            Daha Fazla Fotoğraf Ekle
                          </Button>
                        </Box>
                      )}
                    />
                  </FormControl>

                  <Button
                    mt={4}
                    width="full"
                    type="submit"
                    _hover={{ bg: "teal.300", color: "white" }}
                    isLoading={isSubmitting}
                    bg={"Chartreuse"}
                    mb={5}
                  >
                    Ürünü Güncelle
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>
        )}
      </Formik>
    </MotionBox>
  );
}

export default AdminProductDetail;
