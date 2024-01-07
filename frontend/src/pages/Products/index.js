import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import Card from "../../components/Card";
import { useInfiniteQuery } from "react-query";

import { fetchProductList } from "../../api";

import { motion } from "framer-motion";

import "./style.css";

function Products() {
  const { data, error, status } = useInfiniteQuery(
    "products",
    fetchProductList,
    {}
  );

  if (status === "loading")
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={"3xl"}
        color={"cyan.400"}
      >
        {" "}
        Loading...
      </Box>
    );

  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <motion.Box
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" items-center justify-center min-h-screen container sm:mx-0  "
      py={5}
    >
      <Box
        className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        m={10}
      >
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => {
              return (
                <Box className="box" w={"100%"} rounded={"lg"} key={item._id}>
                  <Card item={item} inBasket={false} />
                </Box>
              );
            })}
          </React.Fragment>
        ))}
      </Box>

      <Flex mt="10" justifyContent="center">
        <Button m={5}>Sipariş ver</Button>
      </Flex>
    </motion.Box>
  );
}

export default Products;
