import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  useToast,
  Flex,
  VStack,
  Link,
} from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList, postOrder } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";
import "../../tailwind.css";
import "./style.css";

function Products() {
  const { items, setItems } = useBasket();
  const { user, loggedIn } = useAuth();
  const [fullName, setFullName] = useState();
  const [phoneNumber, setPhoneNumber] = useState(123);
  const [address, setAddress] = useState("test3");
  const { data, error, status } = useInfiniteQuery(
    "products",
    fetchProductList,
    {}
  );

  const [isPageChange, setIsPageChange] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    const anyItemHasQuantity = items.some((item) => item.quantity > 0);
    setIsButtonDisabled(!anyItemHasQuantity);
  }, [items]);

  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const toast = useToast();
  const navigate = useNavigate();

  const toastForOrder = () =>
    toast({
      title: "Order sent",
      description: "Siparişiniz alındı...",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

  useEffect(() => {
    if (status === "success") {
      const allItems = data.pages.reduce((acc, page) => [...acc, ...page], []);
      setItems(allItems);
      setItems((prevItems) =>
        prevItems.map((item) => {
          const newItem = allItems.find((newItem) => newItem._id === item._id);
          return newItem ? { ...item, quantity: newItem.quantity } : item;
        })
      );
      setIsPageChange(false);
    }
  }, [data, status, setItems, isPageChange]);

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

  if (status === "error")
    return <Box>An error has occurred: {error.message}</Box>;

  console.log("data:", data.pages[0]);
  console.log("item:", items);

  const buttonText = items.some((item) => item.quantity > 0)
    ? "Siparişi Gönder"
    : "Ürün Seçin";

  const handleNavigate = () => {
    navigate("/signintoorder");
  };

  return (
    <Box>
      <Flex
        direction="column"
        align="center"
        justify="center"
        p={4}
        className="mt-2 sm:mt-36"
      >
        {user && (
          <VStack
            spacing={4}
            align="center"
            textAlign="center"
            className="flex items-center justify-center "
          >
            <Text
              fontSize="4xl"
              color="black.500"
              className="text-4xl font-bold font-mono "
            >
              Hoşgeldin,{" "}
              <Text as="span" className="animate-rgb font-extralight">
                {user.fullname}
              </Text>
            </Text>
            <Text fontSize="lg" color="gray.500"></Text>
          </VStack>
        )}

        <Link
          _hover={{ textDecoration: "none" }}
          className="linkToMenu"
          href="/basket"
        >
          <Box className="mt-5" cursor="pointer">
            <div className="square blob">
              <Box className="menüBtn ">
                <h1 className="  text-4xl font-bold font-serif opacity-80 text-orange-300  ">Menü</h1>
              </Box>

              <span></span>
              <span></span>
              <span></span>
            </div>
          </Box>
        </Link>
      </Flex>
    </Box>
  );
}

export default Products;
