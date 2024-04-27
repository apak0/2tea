import React, { useState, useEffect } from "react";
import addNotification from "react-push-notification";
import { fetchProductList, postOrder, fetchOrders } from "../../api";
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
import { useBasket } from "../../contexts/BasketContext";
import Card from "../../components/Card";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "react-query";
import "./styles.css";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BASE_ENDPOINT);

function Basket() {
  const { user, loggedIn } = useAuth();
  const { refetch: refetchOrders, data: orderData } = useQuery("admin:orders", fetchOrders);
  const { data: productListData, status: productListStatus } = useInfiniteQuery(
    "products",
    fetchProductList
  );
  const [fullName, setFullName] = useState(user ? user.fullname : "");
  const [phoneNumber, setPhoneNumber] = useState(123);
  const [address, setAddress] = useState("test3");
  const { items, setItems } = useBasket();
  const [lastOrderFullName, setLastOrderFullName] = useState(null);

  useEffect(() => {
    if (orderData && orderData.length > 0) {
      const lastOrder = orderData[orderData.length - 1];
      setLastOrderFullName(lastOrder.fullName);
    }
  }, [orderData]);

  useEffect(() => {
    if (productListStatus === "success") {
      const allItems = productListData.pages.reduce((acc, page) => [...acc, ...page], []);
      setItems(allItems);
    }
  }, [productListData, productListStatus, setItems]);

  const toast = useToast();

  const sendNotification = (fullName) => {
    console.log("notification Action");
    user.role === "admin"
      ? addNotification({
          title: "New Order",
          message: `${fullName} bir sipariş gönderdi`,
          duration: 4000,
          native: true,
          onClick: () => "https://twotea.onrender.com/admin/orders",
        })
      : console.log("admin değil");
  };

  const handleOrderSubmit = async () => {
    const selectedItems = items.filter((item) => item.quantity > 0);
    const itemIds = selectedItems.map((item) => item._id);

    const orderInput = {
      fullName,
      phoneNumber,
      address,
      items: JSON.stringify(itemIds),
    };

    await postOrder(orderInput);

    const updatedItems = items.map((item) => ({ ...item, quantity: 0 }));
    setItems(updatedItems);

    toast({
      title: "Order Submitted",
      description: "Siparişiniz alındı...",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    refetchOrders();
    sendNotification(lastOrderFullName);
  };

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/signintoorder");
  };



  return (
    <Box className="basketTopDiv">
      <Box py={5} backgroundPosition="center" className="totalDiv block">
        <Box className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Box key={index} className="flex justify-center">
              <Card item={item} inBasket={true} />
            </Box>
          ))}
        </Box>

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
          <Box py={5} className="flex items-center justify-center sm:mx-0">
            {items.length > 0 ? (
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
                    {items
                      .filter((item) => item.quantity > 0)
                      .map((item, index) => (
                        <Tr key={index} border={"2px"} borderColor={"lightcoral"}>
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
                      loggedIn ? handleOrderSubmit() : handleNavigation();
                    }}
                  >
                    Siparişi Gönder
                  </Button>
                </Box>
              </Box>
            ) : (
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
                    {items.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.title}</Td>
                        <Td>{item.quantity}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <Box mt="3">
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
        </Box>
      </Box>
    </Box>
  );
}

export default Basket;
