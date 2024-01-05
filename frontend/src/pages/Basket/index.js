import React, { useEffect } from "react";

import {
  Box,
  Button,
  Text,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import { useBasket } from "../../contexts/BasketContext";

import { postOrder } from "../../api";

import Card from "../../components/Card";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { motion } from "framer-motion";
import "./styles.css";

function Basket() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user.fullname);
  const [phoneNumber, setPhoneNumber] = useState(123);
  const [address, setAddress] = useState("test3");
  const [disable, setDisable] = useState(true)
  

 
  const { items, setItems } = useBasket();
   const handleDısable = ()=> {
     if(items.length < 0) {setDisable(false)} 
  }
 
  const { loggedIn } = useAuth();

  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const toast = useToast();
  const navigate = useNavigate();

  const toastForOrder = () =>
    toast({
      title: "Order sended ",
      description:
        "Siparişiniz alındı...",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

  const handleSubmitForm = async () => {
    const selectedItems = items.filter((item) => item.quantity > 0);
    const itemIds = selectedItems.map((item) =>  item._id);

    const input = {
      fullName,
      phoneNumber,
      address,
      items:  JSON.stringify(itemIds) ,
    };
    console.log(input);
    await postOrder(input);
    setTimeout(() => {
      const updatedItems = items.map((item) => ({ ...item, quantity: 0 }));
      setItems(updatedItems);
    }, 400);
    toastForOrder();
  };

  const handleNavigate = () => {
    navigate("/signintoorder");
  };

  return (
    <motion.Box
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="basketTopDiv"
    >
     
        <Box
          mx={"10%"}
          py={5}
          backgroundPosition="center"
          className=" totalDiv block  items-center justify-center sm:mx-0"
        >
          <Box className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-sm  ">
            {items.map((item, i) => (
              <Box key={i}>
                <Box className="box m-55" rounded={"lg"} w="100%">
                  <Card item={item} inBasket={true} />
                </Box>
              </Box>
            ))}
          </Box>

          {/* Order Price Information */}
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignSelf={"baseline"}
            ml={"10%"}
            mr={"10%"}
          >
            <Box
              minW={"100px"}
              border="2px"
              borderColor="gray.300"
              boxShadow="lg"
              rounded="md"
              bg="white"
              display={"flex"}
              flexDirection={"column"}
              mt={10}
              p={2}
              mx={"auto"}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text
                  textDecoration={"underline"}
                  color={"blue.500"}
                  fontSize="xl"
                >
                  Ücret:
                </Text>
              </Box>

              <Box display={"flex"} justifyContent={"flex-end"}>
                <Text as={"b"} color={"orange.400"} fontSize="lg">
                  {total} TL
                </Text>
              </Box>
            </Box>

            <Button
              isDisabled={disable}
              fontSize={"2xl"}
              p={5}
              mt="5"
              size="sm"
              bg={"orange.400"}
              color={"gray.100"}
              mx={"auto"}
              onClick={() => {
                loggedIn  ? handleSubmitForm() : handleNavigate();
              }}
            >
              {" "}
              Siparişi Gönder
            </Button>
          </Box>
        </Box>
     
    </motion.Box>
  );
}

export default Basket;
