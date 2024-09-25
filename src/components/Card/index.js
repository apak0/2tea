import { Box, Image, Button, Text } from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import "./styles.css";

function Card({ item }) {
  const { increment, decrement } = useBasket();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-evenly"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      minW={"180px"}
      maxW={"200px"}
      p="2"
      bg={"#FFEEAD"}
      h="100%"
    >
      <Box className="flex justify-around items-center cards">
        <Image
          className="cards"
          src={item.photos}
          alt="product"
          loading="lazy"
          objectFit={"cover"}
          w={"100%"}
          h={"200px"}
        />
      </Box>

      <Box
        as="samp"
        fontSize={"2xl"}
        fontWeight="bold"
        lineHeight="tight"
        noOfLines={1}
        color={"#FE7A36"}
        display={"flex"}
        justifyContent={"center"}
      >
        {item.title}
      </Box>

      <Box
        minW={"100px"}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection="row"
        borderRadius="8px"
      >
        <Box>
          <Button
            className="minusBtn"
            size={"md"}
            fontSize={"3xl"}
            m={2}
            bg={"#ed8203"}
            color={"#fff"}
            onClick={() => decrement(item._id)}
            _hover={{ bg: "teal.400", color: "black" }}
            _active={{ bg: "teal.300", color: "#fff" }}
          >
            -
          </Button>
        </Box>

        <Box className="min-w-10">
          <Text
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            fontSize={"xl"}
          >
            {item.quantity}
          </Text>
        </Box>

        <Box>
          <Button
            className="plusBtn"
            bg={"#ed8203"}
            color={"#fff"}
            _hover={{ bg: "teal.400", color: "black" }}
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
      </Box>
    </Box>
  );
}

export default Card;
