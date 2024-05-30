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
import ScrollToTopButton from "../../components/ScrollToTopButton";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BASE_ENDPOINT);

function Basket() {
  const { user, loggedIn } = useAuth();

  const {
    refetch,
    isLoading,
    isError,
    data: datas,
    error: errors,
  } = useQuery("orders", fetchOrders);

  const { data, error, status } = useInfiniteQuery(
    "products",
    fetchProductList,
    {}
  );

  const [fullName, setFullName] = useState(user ? user.fullname : "");
  const [phoneNumber, setPhoneNumber] = useState(123);
  const [address, setAddress] = useState("test3");
  const { items, setItems, increment, decrement } = useBasket();

  const orderedItems = items.filter((item) => item.quantity > 0);

  const sendNotification = () => {
    // Send notification to other connected users
    socket.emit("notification", { customer: fullName });
  };

  // SOKET IO NOTIFICATION
  useEffect(() => {
    // Listen for incoming notifications
    socket.on("notification", (data) => {
      notificationAction(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Product'daki data'ya gelen verileri basket'e gönderen fonksiyon
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
    }
  }, [data, status, setItems]);

  const toast = useToast();

  const toastForOrder = () =>
    toast({
      title: "SİPARİŞ GÖNDERİLDİ ",
      description: "Siparişiniz alındı...Afiyet olsun...",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

  const notificationAction = (notificationInfo) => {
    user?.role === "admin"
      ? addNotification({
          title: "Yeni sipariş var",
          message: `${notificationInfo?.customer} bir sipariş gönderdi`,
          duration: 4000,
          native: window.innerWidth <= 768 ? false : true,

          onClick: () => {
            window.open("https://twotea.onrender.com/admin/orders", "_blank");
          },
        })
      : console.log("admin değil");

    console.log("notification Action");
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
    const updatedItems = items.map((item) => ({ ...item, quantity: 0 }));
    setItems(updatedItems);
    toastForOrder();

    sendNotification();
    refetch();
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/signintoorder");
  };

  return (
    <Box className="basketTopDiv ">
      <Box py={5} backgroundPosition="center" className=" totalDiv block    ">
        <Box className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <Box key={i} className="flex flex-wrap justify-center gap-4">
              <div className="flex-initial w-full sm:w-auto md:w-1/3 lg:w-1/3">
                <Card item={item} inBasket={true} />
              </div>
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
          bg={"gray.200"}
          p={3}
          mt={10}
          ml={10}
          mb={{ base: 48, md: 0 }}
        >
          <Box py={5} className=" flex items-center justify-center sm:mx-0 ">
            {/* Sipariş verilen ürünleri göster */}
            {orderedItems.length > 0 ? (
              <Box className="min-w-full">
                <Text fontSize="xl">Sipariş Listesi:</Text>
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
                        <Tr display={"flex"} justifyContent={"center"} alignItems={"center"}>
                          <Td
                           fontSize={"x-large"}
                          >
                            {item.title}
                          </Td>

                          <Td
                            className="flex justify-center items-center"
                            bg={"red.100"}
                          >
                            <Button marginRight={2} onClick={() => increment(item._id)}>
                              +
                            </Button>
                            {item.quantity}
                            <Button onClick={() => decrement(item._id)}>
                              -
                            </Button>
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
              <Box className="min-w-full">
                <Text fontSize="xl">Sipariş Listesi:</Text>
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
