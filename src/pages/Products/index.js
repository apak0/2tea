import React, { useEffect, useState } from "react";
import { Box, Text, Flex, VStack, Link, Spinner } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

import { useBasket } from "../../contexts/BasketContext";
import "../../tailwind.css";
import "./style.css";

function Products() {
  const { items, setItems } = useBasket();
  const { user } = useAuth();

  const { data, error, status } = useInfiniteQuery(
    "products",
    fetchProductList,
    {}
  );

  if (status === "loading")
    return (
      <Box className="flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="3xl"
          color="cyan.400"
          margin="200px"
        >
          <Spinner
            thickness="4px"
            speed="0.50s"
            emptyColor="gray.200"
            color="orange.300"
            size="xl"
          />
        </motion.div>
      </Box>
    );

  if (status === "error")
    return (
      <Box className="flex justify-center items-center text-2xl text-red-600 ">
        Bir hata oluştu: {error.message}
      </Box>
    );

  // console.log("data:", data.pages[0]);
  // console.log("item:", items);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Flex
        direction="column"
        align="center"
        p={4}
        className="mt-2 sm:mt-36"
        width="full"
        height="90vh"
      >
        {user && (
          <VStack
            spacing={4}
            align="center"
            textAlign="center"
            className="flex items-center justify-center "
          >
            <Text
              fontSize="4xl"
              color="black.500"
              className="text-4xl font-bold font-mono "
            >
              Hoşgeldin,{" "}
              <Text as="span" className="animate-rgb font-extralight">
                {user.fullname.charAt(0).toUpperCase() +
                  user.fullname.slice(1).toLowerCase()}
              </Text>
            </Text>
            <Text fontSize="lg" color="gray.500"></Text>
          </VStack>
        )}

        <Link
          _hover={{ textDecoration: "none" }}
          className="linkToMenu"
          href="/basket"
        >
          <Box className="mt-5" cursor="pointer">
            <div className="square blob">
              <Box className="menüBtn">
                <h1 className="menu-text text-6xl font-bold text-yellow-300">
                  Menü
                </h1>
              </Box>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Box>
        </Link>
      </Flex>
    </motion.div>
  );
}

export default Products;
