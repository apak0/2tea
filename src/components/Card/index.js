import { Box, Image, Button, Text, Select  } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useBasket } from "../../contexts/BasketContext";
import { fetchProductList, postOrder } from "../../api";
import { useInfiniteQuery } from "react-query";

import "./styles.css";
import { useState } from "react";

function Card({ item, inBasket,}) {
  const { addToBasket, items, setItems } = useBasket();
  const [sugarOption, setSugarOption] = useState(""); // Şeker seçeneğini tutacak state
  // Şeker miktarını güncellemek için fonksiyon
 // Şeker seçeneğini güncellemek için fonksiyon
 const handleSugarChange = (value) => {
  setSugarOption(value);
};

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
    a
    justifyContent={"space-evenly"}
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    minW={"200px"}
    maxW={"200px"}
    p="2"
    bg={"#B4D4FF"}
    h="100%" // Kartların eşit yüksekliği için
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
      {/* Şeker seçeneğini gösteren dropdown */}
      {item.title === "Türk Kahvesi" && (
        <Box display="flex"   justifyContent="center" >
          <Select
            placeholder="Şeker Seçiniz"
            value={sugarOption}
            onChange={(e) => handleSugarChange(e.target.value)}
          >
            <option value="sade">Sade</option>
            <option value="orta">Orta</option>
            <option value="şekerli">Şekerli</option>
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
          className="minusBtn "
          size={"md"}
          fontSize={"3xl"}
          m={2}
          onClick={() => decrement(item._id, foundBasketItem)}
          bg={"#ed8203"}
          color={"#fff"}
          _hover={{ bg: "teal.400", color: "black" }}
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
  );
}

export default Card;
