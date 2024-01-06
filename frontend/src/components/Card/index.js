import { Box, Image, Button,  Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useBasket } from "../../contexts/BasketContext";

import "./styles.css";

function Card({ item, inBasket }) {
  const { items, setItems } = useBasket();

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
      p="5"
      bg={"red"}
      h={"100%"}
    >
      <Box h={"full"} >
       
          <Box className="flex">
            <Image
              src={item.photos[0]}
              alt="product"
              loading="lazy"
              w={"100%"}
              h={"200px"}
              objectFit={"cover"}
            />
          </Box>
        
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={5}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box fontSize={"2xl"} fontWeight="bold" as="samp" lineHeight="tight" noOfLines={1}>
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
