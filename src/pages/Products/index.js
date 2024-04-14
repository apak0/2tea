import React, { useEffect, useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";

import { useInfiniteQuery } from "react-query";
import { fetchProductList, postOrder } from "../../api";

import { useAuth } from "../../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";

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

  // Ordered toast
  const toastForOrder = () =>
    toast({
      title: "Order sended",
      description: "Siparişiniz alındı...",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  //_________________________________________________________________________

  // Product'daki data'ya gelen verileri basket'e gönderen fonksiyon
  useEffect(() => {
    if (status === "success") {
      // data'nın içindeki tüm ürünleri bir dizi içinde topluyoruz
      const allItems = data.pages.reduce((acc, page) => [...acc, ...page], []);
      setItems(allItems);

      // Sayfa değişikliği olmadıysa ve daha önce bir değişiklik yapılmışsa,
      // setItems fonksiyonu ile BasketContext'teki items state'ini güncelliyoruz

      setItems((prevItems) =>
        prevItems.map((item) => {
          const newItem = allItems.find((newItem) => newItem._id === item._id);
          return newItem ? { ...item, quantity: newItem.quantity } : item;
        })
      );

      // Sayfa değişikliği olduğunu sıfırlıyoruz
      setIsPageChange(false);
    }
  }, [data, status, setItems, isPageChange]);
  //_________________________________________________________________________

  // Order submit function
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
  //_________________________________________________________________________

  // Loading screen
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
  //_________________________________________________________________________

  // Error messages
  if (status === "error")
    return <Box>An error has occurred: {error.message}</Box>;
  //_________________________________________________________________________

  console.log("data:", data.pages[0]);
  console.log("item:", items);

  // Order button texts
  const buttonText = items.some((item) => item.quantity > 0)
    ? "Siparişi Gönder"
    : "Ürün Seçin";
  //_________________________________________________________________________

  // If user not loggedin
  const handleNavigate = () => {
    navigate("/signintoorder");
  };
  //_________________________________________________________________________

  return (
    <Box className="">
    <Box></Box>

    <Box className="">
      <Button
        bg={"cyan.200"}
        _hover={{
          background: "gray.300",
          color: "teal.500",
        }}
        color={"gray.500"}
        height={"10rem"}
        fontSize={"lg"}
        fontWeight={"bold"}
        marginTop={10}
      >
        <NavLink to={"/basket"}>
          {user && (
            <Box className="">
              <Text textColor={"orange.500"}  >{user.fullname}</Text>
              <Text>Hoşgeldin</Text>
            </Box>
          )}
          Ürünleri Görüntülemek için Tıklayınız
        </NavLink>
      </Button>
    </Box>
  </Box>
  );
}

export default Products;
