import React from "react";

import { useParams } from "react-router-dom";
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

import { FieldArray, Formik } from "formik";

import validationSchema from "./validations";

import { message } from "antd";

function AdminProductDetail() {
  const { product_id } = useParams();

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
    } catch (e) {
      message.error("The product does not updated");
    }
  };

  return (
    <Box px={5} > 
      <Text fontSize="2xl">Edit</Text>
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
          <Box >
            <Box  mx={15}>
              <Box m="5" textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
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
                    <FormLabel>Description</FormLabel>
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
                    <FormLabel>Price</FormLabel>
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
                    <FormLabel >Photos</FormLabel>
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
                                  Remove
                                </Button>
                              </div>
                            ))}

                          <Button mt="5" onClick={() => arrayHelpers.push("")}>
                            Add More Photo
                          </Button>
                        </Box>
                      )}
                    />
                  </FormControl>

                  <Button
                    mt={4}
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                    bg={"Chartreuse"}
                    mb={5}
                  >
                    Update
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
}

export default AdminProductDetail;
