import { Box, Image, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useBasket } from "../../contexts/BasketContext";
import { fetchProductList, postOrder } from "../../api";
import { useInfiniteQuery } from "react-query";

import "./styles.css";
import { useState } from "react";

function Card({ item, inBasket }) {
  const { addToBasket, items, setItems } = useBasket();

  const { data, error, status } = useInfiniteQuery(
    "products",
    fetchProductList,
    {}
  );

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
      justifyContent={"center"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      w={"200px"}
      p="2"
      bg={"#B4D4FF"}
      h={"100%"}
    >
      <Box>
        <Box className="flex justify-center items-center">
          <Image
            src={item.photos}
            alt="product"
            loading="lazy"
            objectFit={"cover"}
            w={"100%"}
            h={"200px"}
          />
        </Box>
      </Box>

      <Box display={"flex"} flexDirection={"column"}>
        <Box display={"flex"} justifyContent={"center"}>
          <Box
            fontSize={"2xl"}
            fontWeight="bold"
            as="samp"
            lineHeight="tight"
            noOfLines={1}
            mb={2}
            color={"#FE7A36"}
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
          
          borderRadius="8px"
          mb={5}
        >
          <Button
            className="minusBtn "
            size={"md"}
            fontSize={"3xl"}
            m={2}
            onClick={() => decrement(item._id, foundBasketItem)}
            bg={"#ed8203"}
            _hover={{ bg: "teal.400", color: "crimson" }}
            _active={{ bg: "teal.300", color: "#fff" }}
          >
            -
          </Button>

          <Text
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            // w={"20px"}
            fontSize={"3xl"}
          >
            {item.quantity}
          </Text>

          <Button
            bg={"#ed8203"}
            _hover={{ bg: "teal.400", color: "#crimson" }}
            _active={{ bg: "teal.300", color: "#fff" }}
            justifySelf={"flex-end"}
            size={"md"}
            fontSize={"3xl"}
            m={2}
            onClick={() => increment(item._id)}
          >
            +
          </Button>
        </Box>
        <Box>
          {/* add item to basket button */}

          {/* <>
            {!foundBasketItem ? (
              <Button
                colorScheme={"blue"}
                variant="solid"
                onClick={() => addToBasket(item, foundBasketItem)}
                _hover={{
                  bg: "white",
                  color: "blue.400",
                  border: "1px solid #4299E1",
                }}
              >
                Add to Basket
              </Button>
            ) : (
              <Button colorScheme={"blue"} variant="solid" isDisabled>
                Already in Basket
              </Button>
            )}
          </> */}
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
