import React, { useEffect } from "react";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  GridItem,
  Grid,
  Input,
  useToast,
  defineStyleConfig,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import { useBasket } from "../../contexts/BasketContext";
import { postOrder } from "../../api";

import Card from "../../components/Card";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { motion } from "framer-motion";
import "./styles.css";

function Basket() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const { items, emptyBasket } = useBasket();

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
        "Thank you for your purchase! You just made our business grow, and for that, we are forever indebted.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);

    const input = {
      fullName,
      phoneNumber,
      address,
      items: JSON.stringify(itemIds),
    };
    console.log(input);
    await postOrder(input);
    emptyBasket();
    toastForOrder();
    onClose();
  };

  const handleNavigate = () => {
    navigate("/signintoorder");
  };

  return (
    <motion.Box
    initial={{opacity:0}}
    animate={{opacity:1}}
     className="basketTopDiv">
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        {items.length < 1 && (
          <Box mt={20} >
            <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            
            >
              <SlBasket
                style={{
                  height: 200,
                  width: 200,
                }}
              />
            </Box>
            <Box >
              <Text textAlign={"center"} fontSize={{ base: "3xl", md: "6xl" }}>Your Basket is Empty</Text>
              <ChakraLink fontSize={"xl"} color="teal.500" href={"/"}>
                Click to product page{" "}
              </ChakraLink>
            </Box>
          </Box>
        )}
      </Box>

      {items.length > 0 && (
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
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text mr={5} color={"orange.400"} fontSize="m">
                  Total Product:
                </Text>
                <Text ml={1} color={"Pink 900"} fontSize as={"b"}>
                  {total}
                </Text>
              </Box>

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={2}
                borderBottom="2px"
                borderColor="gray.200"
              >
                <Text color={"orange.400"} fontSize="m">
                  Delivery Fee:
                </Text>
                <Text color={"Pink 900"} fontSize="m" ml={1} as={"b"}>
                  0
                </Text>
              </Box>

              <Box display={"flex"} justifyContent={"flex-end"}>
                <Text as={"b"} color={"orange.400"} fontSize="lg">
                  {total} TL
                </Text>
              </Box>
            </Box>

            <Button
              fontSize={"2xl"}
              p={5}
              mt="5"
              size="sm"
              bg={"orange.400"}
              color={"gray.100"}
              mx={"auto"}
              onClick={() => {
                loggedIn ? onOpen() : handleNavigate();
              }}
            >
              {" "}
              Order Now
            </Button>
          </Box>
        </Box>
      )}

      {/* Order Information Form */}

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader color={"crimson"}>Order Information</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Fullname</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea
                ref={initialRef}
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmitForm} colorScheme="blue" mr={3}>
              Send
            </Button>

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </motion.Box>
  );
}

export default Basket;
