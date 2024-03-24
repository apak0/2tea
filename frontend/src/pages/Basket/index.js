import React, { useEffect } from "react";

import addNotification from "react-push-notification";
import { fetchOrders } from "../../api";

import {
  Box,
  Button,
  Text,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useState } from "react";
import { useBasket } from "../../contexts/BasketContext";
import { fetchProductList, postOrder } from "../../api";
import Card from "../../components/Card";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { useInfiniteQuery, useQuery } from "react-query";

function Basket() {
  const { user } = useAuth();
  const { isLoading, isError, data:datas, error:errors } = useQuery(
    "admin:orders",
    fetchOrders
  );
  const [fullName, setFullName] = useState(user ? user.fullname : "");
  const [phoneNumber, setPhoneNumber] = useState(123);
  const [address, setAddress] = useState("test3");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { items, setItems } = useBasket();

  const { data, error, status } = useInfiniteQuery(
    "products",
    fetchProductList,
    {}
  );

  const orderedItems = items.filter((item) => item.quantity > 0);
  // useEffect(() => {
  //   const updatedItems = items.map((item) => ({ ...item, quantity: 0 }));
  //   setItems(updatedItems);
  // },[]);

  useEffect(() => {
    // items'dan herhangi birinin quantity'si 0'dan büyükse butonu enable yap
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
      title: "Order sended ",
      description: "Siparişiniz alındı...",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    // Admin chrome notification function
    const buttonClick = () => {
      user.role === "admin"
        ? addNotification({
            title: "Yeni sipariş",
            message: `${user.fullname} bir sipariş gönderdi`,
            duration: 4000,
  
            native: true,
            onClick: () => "https:/localhost:3000/admin/orders",
          })
        : console.log("admin değil");
  
      console.log(user.role);
    };
  

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
    buttonClick()
    
  };

  const handleNavigate = () => {
    navigate("/signintoorder");
  };
  // console.log("items:" ,items)
  // console.log("data:", data.pages[0])
  console.log(items[0].quantity);


  return (
    <Box className="basketTopDiv">
      <Button  className="button">
        Hello world.
      </Button>
      <Box py={5} backgroundPosition="center" className=" totalDiv block    ">
        <Box className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <Box key={i} className="flex justify-center">
              <Card item={item} inBasket={true} />
            </Box>
          ))}
        </Box>

        {/* Order Price Information */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          alignSelf={"baseline"}
          mx={"auto"}
          bg={"gray.300"}
          p={3}
          mt={10}
          ml={10}
          mb={48}
        >
          <Box py={5} className=" flex items-center justify-center sm:mx-0 ">
            {/* Sipariş verilen ürünleri göster */}
            {orderedItems.length > 0 ? (
              <Box>
                <Text fontSize="xl" mb="4">
                  Sipariş Listesi:
                </Text>
                <Table variant="striped" colorScheme="gray">
                  <Thead>
                    <Tr>
                      <Th color={"orange.400"} fontSize={"lg"}>
                        Ürün Adı
                      </Th>
                      <Th color={"orange.400"} fontSize={"lg"}>
                        Miktar
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orderedItems
                      .slice()
                      .reverse()
                      .map((item, index) => (
                        <Tr
                          border={"2px"}
                          borderColor={"lightcoral"}
                          key={index}
                        >
                          <Td bg={"red.100"}>{item.title}</Td>
                          <Td className="flex justify-center" bg={"red.100"}>
                            {item.quantity}
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
                <Box mt="3">
                  <Button
                    minW={"200px"}
                    fontSize={"2xl"}
                    p={5}
                    size="sm"
                    bg={"#ed8203"}
                    color={"#fff"}
                    _hover={{ bg: "teal.400", color: "black" }}
                    _active={{ bg: "teal.300", color: "#fff" }}
                    onClick={() => {
                      loggedIn ? handleSubmitForm() : handleNavigate();
                    }}
                  >
                    Siparişi Gönder
                  </Button>
                </Box>
              </Box>
            ) : (
              // Sipariş verilmemişse gösterilecek içerik
              <Box>
                <Text fontSize="xl" mb="4">
                  Sipariş Listesi:
                </Text>
                <Table variant="striped" colorScheme="gray">
                  <Thead>
                    <Tr>
                      <Th color={"orange.400"} fontSize={"lg"}>
                        Ürün Adı
                      </Th>
                      <Th color={"orange.400"} fontSize={"lg"}>
                        Miktar
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orderedItems &&
                      orderedItems.map((item, index) => (
                        <Tr key={index}>
                          <Td>{item.title}</Td>
                          <Td>{item.quantity}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
                <Box mt="3">
                  {/* Sipariş bilgisi ve Sipariş Gönder butonu burada olabilir */}
                  <Button
                    cursor={"revert"}
                    isActive={true}
                    minW={"200px"}
                    fontSize={"2xl"}
                    p={5}
                    size="sm"
                    bg={"gray.400"}
                    color={"#fff"}
                    _hover={{ bg: "teal.400", color: "black" }}
                    _active={{ bg: "teal.300", color: "#fff" }}
                  >
                    Ürün yok
                  </Button>
                </Box>
              </Box>
            )}
          </Box>

          {/* <Box
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
            isDisabled={isButtonDisabled}
            fontSize={"2xl"}
            p={5}
            mt="5"
            size="sm"
            bg={"orange.400"}
            color={"gray.100"}
            mx={"auto"}
            onClick={() => {
              loggedIn ? handleSubmitForm() : handleNavigate();
            }}
          >
            {" "}
            Siparişi Gönder
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
}

export default Basket;
