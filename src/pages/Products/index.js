import React, { useEffect, useState } from "react";
import { Box, Button, Text, useToast, Flex, VStack } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList, postOrder } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";
import "../../tailwind.css"; // Tailwind CSS'i import edin

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
      <Flex direction="column" align="center" justify="center" p={4}>
        {user && (
          <VStack
            spacing={4}
            align="center"
            textAlign="center"
            className="flex items-center justify-center "
          >
            <Text
              fontSize="2xl"
              color="gray.700"
              className="text-4xl font-bold animate-rgb"
            >
              Hoşgeldin,{" "}
              <Text as="span" color="orange.500">
                {user.fullname}
              </Text>
            </Text>
            <Text fontSize="lg" color="gray.500"></Text>
          </VStack>
        )}
        <Box mt={6}>
          <a
            href="/basket"
            class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
          >
            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
            Menüye Git
            </span>
            <span class="relative invisible">Menüye Git</span>
          </a>
        </Box>
      </Flex>
    </Box>
  );
}

export default Products;
