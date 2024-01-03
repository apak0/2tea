import React from "react";

import { postProduct } from "../../../api";
import { useMutation, useQueryClient } from "react-query";
import { NavLink, Navigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FieldArray, Formik } from "formik";
import newProductScheme from "./validations";
import { message } from "antd";
import { BiLogOut } from "react-icons/bi";


function NewProduct() {
  const queryClient = useQueryClient();
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("admin:products");
    },
  });

  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Loading...", key: "product_update" });

    // values.photos = JSON.stringify(values.photos);

    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };

    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        message.success({
          content: "The product successfuly updated",
          key: "product_update",
          duration: 2,
        });
      },
    });
  };

  return (
    <div>
      

      
          <NavLink
            to="/admin/products"
            style={({ isActive, isPending }) => {
              return {
                color: isActive ? "MediumAquamarine" : "black",
                borderBottom: isActive ? "solid" : "",
                fontWeight: isActive ? "bold" : "bold",
                fontSize: isActive ? "small" : "small",
              };
            }}
          >
            <Box
              position={["static", "absolute", "absolute", "absolute"]}
              display={"flex"}
             alignItems={"center"}
              color={"cyan.400"}
            >
              <Box mr={1} >
                <BiLogOut  color="purple"/>
                
              </Box>
              <Text>Products</Text>
            </Box>
          </NavLink>
         
          <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        p={2}
        bg={"#8d8d8d"}
      >
        <Box>{/* this is empty box */}</Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"3xl"}
          as="b"
          color={"orange.300"}
        >
          <Text>Orders</Text>
        </Box>

        <Box>
          {/* this box using for design, can not be active */}

          <Button
            opacity={0}
            cursor={"context-menu"}
            bg={"orange.300"}
            shadow={"xl"}
            _hover={{
              color: "white",
            }}
          >
            {" "}
            New
          </Button>
        </Box>
      </Flex>
      <Formik
        initialValues={{
          title: "Test",
          description: " az kullanılmış shibinden",
          price: "100",
          photos: [],
          quantity: 1,
        }}
        newProductScheme={newProductScheme}
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
          <>
            <Box>
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

                  <FormControl mt="4">
                    <FormLabel>Photos</FormLabel>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <div>
                          {values.photos &&
                            values.photos.map((photo, index) => (
                              <div key={index}>
                                <Input
                                  name={`photos.${index}`}
                                  value={photo}
                                  disabled={isSubmitting}
                                  onChange={handleChange}
                                  width="3xl"
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
                            Add a photo
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>

                  <Button
                    mt={4}
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                    onClick={() => {
                      <Navigate to="products/new" />;
                    }}
                  >
                    Save
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default NewProduct;
