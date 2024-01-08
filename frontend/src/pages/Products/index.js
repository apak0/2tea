import React, { useEffect, useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Grid,
  Text,
  useToast,
} from "@chakra-ui/react";
import Card from "../../components/Card";
import { useInfiniteQuery } from "react-query";
import { fetchProductList, postOrder } from "../../api";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";

function Products() {
  const { items, setItems } = useBasket();
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user.fullname);
  const [phoneNumber, setPhoneNumber] = useState(123);
  const [address, setAddress] = useState("test3");
  const { data, error, status } = useInfiniteQuery(
    "products",
    fetchProductList,
    {}
  );

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    const anyItemHasQuantity = items.some((item) => item.quantity > 0);
    setIsButtonDisabled(!anyItemHasQuantity);
  }, [items]);

  const { loggedIn } = useAuth();

  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const toast = useToast();
  const navigate = useNavigate();

  const toastForOrder = () =>
    toast({
      title: "Order sended",
      description: "Siparişiniz alındı...",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

  useEffect(() => {
    if (status === "success") {
      // data'nın içindeki tüm ürünleri bir dizi içinde topluyoruz
      const allItems = data.pages.reduce((acc, page) => [...acc, ...page], []);

      // setItems fonksiyonu ile BasketContext'teki items state'ini güncelliyoruz
      setItems(allItems);
    }
  }, [data, status, setItems]);

  const handleSubmitForm = async () => {
    const selectedItems = items.filter((item) => item.quantity > 0);
    const itemIds = selectedItems.map((item) => item._id);
    const input = {
      fullName,
      phoneNumber,
      address,
      items: JSON.stringify(itemIds),
    };
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

  if (status === "loading")
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="3xl"
        color="cyan.400"
      >
        Loading...
      </Box>
    );

  const buttonText = items.some((item) => item.quantity > 0)
    ? "Siparişi Gönder"
    : "Ürün Seçin";

  if (status === "error")
    return <Box>An error has occurred: {error.message}</Box>;

  console.log("data:", data.pages[0]);
  console.log("item:", items);

  const mappedData = (
    <Grid
      
      templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      gap={8}
      m={10}
    >
      {items.map((item, j) => (
        <Box key={j}>
          <AspectRatio ratio={5 / 5} maxW="200px" mx="auto">
            <Box className="box" rounded="lg" overflow="hidden">
              <Card item={item} inBasket={true} />
            </Box>
          </AspectRatio>
        </Box>
      ))}
    </Grid>
  );

  return (
    <Box className=" sm:mx-0  " py={5}>
      <>{mappedData}</>

      {/* Price and send order section */}
      <Box display="flex" flexDirection="column" alignSelf="baseline">
        <Box
          minW="100px"
          border="2px"
          borderColor="gray.300"
          boxShadow="lg"
          rounded="md"
          bg="white"
          display="flex"
          flexDirection="column"
          mt={10}
          p={2}
          mx="auto"
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <Text textDecoration="underline" color="blue.500" fontSize="xl">
              Ücret:
            </Text>
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Text as="b" color="orange.400" fontSize="lg">
              {total} TL
            </Text>
          </Box>
        </Box>

        <Button
          isDisabled={isButtonDisabled}
          fontSize="2xl"
          p={5}
          mt="5"
          size="sm"
          bg="orange.400"
          color="gray.100"
          mx="auto"
          onClick={() => {
            loggedIn ? handleSubmitForm() : handleNavigate();
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}

export default Products;
