import { useEffect, useState } from "react";
import { Box, Image, Button, Text, Select } from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import "./styles.css";

function Card({ item }) {
  const { increment, decrement } = useBasket();
  const [sugarOption, setSugarOption] = useState("");

  const handleSugarChange = (value) => {
    setSugarOption(value);
  };

  useEffect(() => {
    setSugarOption("");
  }, []);

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
      bg={"#B4D4FF"}
      h="100%"
    >
      <Box className="flex justify-around items-center cards">
        <Image
          src={item.photos}
          alt="product"
          loading="lazy"
          objectFit={"cover"}
          w={"100%"}
          h={"200px"}
          className="cards"
        />
      </Box>

      <Box
        fontSize={"2xl"}
        fontWeight="bold"
        as="samp"
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
            onClick={() => decrement(item._id)}
            bg={"#ed8203"}
            color={"#fff"}
            _hover={{ bg: "teal.400", color: "black" }}
            _active={{ bg: "teal.300", color: "#fff" }}
          >
            -
          </Button>
        </Box>

        <Box className="min-w-10" >
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
