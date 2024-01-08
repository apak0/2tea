import { Box, Image, Button, Text, useSafeLayoutEffect } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useBasket } from "../../contexts/BasketContext";
import { fetchProductList, postOrder } from "../../api";
import { useInfiniteQuery } from "react-query";

import "./styles.css";
import { useState } from "react";



function Card({ item, inBasket }) {
  const { data, error, status } = useInfiniteQuery(
    "products",
    fetchProductList,
    {}
  );
  const { items, setItems } = useBasket();
  const {allData, setAllData} = useState(data.pages)



  const foundBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );

  //Decrement item quantity in basket
  const decrement = (item_id) => {
    const newCount = items.find((item) => item._id === item_id);
    if (newCount.quantity !== 0) {
      setItems(
        items.map((item) =>
          item._id === item_id
            ? { ...newCount, quantity: newCount.quantity - 1 }
            : item
        )
      );
    }
  };

  //Increment item quantity in basket
  const increment = (item_id) => {
    const newCount = items.find((item) => item._id === item_id);
    if (newCount) {
      setItems(
        items.map((item) =>
          item._id === item_id
            ? { ...newCount, quantity: newCount.quantity + 1 }
            : item
        )
      );
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      w={"200px"}
      p="2"
      bg={"red"}
      h={"100%"}
      
    >
      <Box >
        <Box className="flex justify-center items-center">
          <Image
            src={item.photos[0]}
            alt="product"
            loading="lazy"
            objectFit={"cover"}
            w={"100px"}
          />
        </Box>
      </Box>

      <Box display={"flex"} flexDirection={"column"} mt={5}>
        <Box display={"flex"} justifyContent={"center"}>
          <Box
            fontSize={"2xl"}
            fontWeight="bold"
            as="samp"
            lineHeight="tight"
            noOfLines={1}
          >
            {item.title}
          </Box>
        </Box>
        <Box
          className="counterContainer"
          minW={"100px"}
          display="flex"
          justifyContent={"space-between"}
          flexDirection="row"
          border="solid 1px #2c3e50"
          borderRadius="8px"
        >
          <Button
            className="minusBtn "
            size={"xs"}
            m={1}
            onClick={() => decrement(item._id, foundBasketItem)}
            bg={"#92C7CF"}
            _hover={{ bg: "teal.600" }}
          >
            -
          </Button>

          <Text
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            w={"20px"}
          >
            {item.quantity}
          </Text>

          <Button
            bg={"#92C7CF"}
            _hover={{ bg: "teal.600" }}
            justifySelf={"flex-end"}
            size={"xs"}
            m={1}
            onClick={() => increment(item._id)}
          >
            +
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
