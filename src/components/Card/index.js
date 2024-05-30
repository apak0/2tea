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
      minW={"200px"}
      maxW={"200px"}
      p="2"
      bg={"#B4D4FF"}
      h="100%"
    >
      <Box className="flex justify-center items-center cards">
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
      {item.title === "Türk Kahvesi" && (
        <Box display="flex" justifyContent="center">
          <Select value={sugarOption} onChange={(e) => handleSugarChange(e.target.value)}>
            <option value="sade">Sade</option>
            <option value="orta">Orta</option>
            <option value="şekerli">Şekerli</option>
          </Select>
        </Box>
      )}
      {item.title === "Çay" && (
        <Box display="flex" justifyContent="center">
          <Select value={sugarOption} onChange={(e) => handleSugarChange(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="açık">Açık</option>
            <option value="demli">Demli</option>
          </Select>
        </Box>
      )}

      <Box
        className="counterContainer"
        minW={"100px"}
        display="flex"
        justifyContent={"space-between"}
        flexDirection="row"
        borderRadius="8px"
      >
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

        <Text display="flex" justifyContent={"center"} alignItems="center" fontSize={"3xl"}>
          {item.quantity}
        </Text>

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
  );
}

export default Card;
