import { useEffect, useState } from "react";
import { Box, Image, Button, Badge, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";

import { useBasket } from "../../contexts/BasketContext";
import LinesEllipsis from "react-lines-ellipsis";
import "./styles.css";

function Card({ item, inBasket }) {
  const { addToBasket, items, setItems } = useBasket();

  const foundBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );
  const handleReflow = (rleState) => {
    const { clamped, text } = rleState;
    // do sth...
  };

  //Decrement item quantity in basket
  const decrement = (item_id) => {
    const newCount = items.find((item) => item._id === item_id);
    if (newCount.quantity !== 1) {
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

  const removeFromBasket = (item_id) => {
    const filtered = items.filter((item) => item._id !== item_id);
    setItems(filtered);

    console.log("items before update:", items);
    console.log("items after update:", items);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="5"
    >
      <Box flex={1}>
        <Link to={`/product/${item._id}`}>
          <Box borderBottom={"1px"} borderColor="gray.600">
            <Image
              src={item.photos[0]}
              alt="product"
              loading="lazy"
              w={"100%"}
              h={"200px"}
              objectFit={"cover"}
            />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box
                fontSize={"2xl"}
                fontWeight="bold"
                as="samp"
                lineHeight="tight"
              >
                {item.title}
              </Box>

              <Box fontSize={"m"}>
                {moment(item.createdAt).format("DD/MM/YYYY")}
              </Box>
            </Box>
          </Box>

          <LinesEllipsis
            text={item.description}
            onReflow={handleReflow}
            maxLine={4}
          />
        </Link>
      </Box>
      <Box display={"flex"} as="b" fontSize={"2xl"} color={"yellow.400"} mt={5}>
        {item.price} TL{" "}
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {inBasket ? ( // if item in basket change the button
          <Button
            colorScheme={"red"}
            variant="solid"
            px={1}
            _hover={{ bg: "white", color: "red", border: "1px solid gray" }}
            onClick={() => removeFromBasket(item._id)}
          >
            Remove
          </Button>
        ) : null}

        {!inBasket ? (
          <>
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
          </>
        ) : null}

        {inBasket ? (
          <Box
            className="counterContainer"
            display="flex"
            flexDirection="row"
            border="solid 1px #2c3e50"
            borderRadius="8px"
            width="50"
            ml={2}
          >
            <Button
              className="minusBtn"
              size={"xs"}
              m={1}
              onClick={() => decrement(item._id, foundBasketItem)}
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

            <Button size={"xs"} m={1} onClick={() => increment(item._id)}>
              +
            </Button>
          </Box>
        ) : (
          ""
        )}

        <Box>
          <Badge ml="1" fontSize="0.8em" colorScheme="green">
            New
          </Badge>
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
