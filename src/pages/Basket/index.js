import React, { useState, useEffect, useRef } from "react";
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

const socket = io("http://localhost:4000");
function Basket() {
  const [forceUpdate, setForceUpdate] = useState(false);

  const handleClick = () => {
    // forceUpdate state'ini tersine çevirerek componentin yeniden yüklenmesini sağla
    setForceUpdate((prevForceUpdate) => !prevForceUpdate);
  };

  const { user, loggedIn } = useAuth();
  const {
    refetch,
    isLoading,
    isError,
    data: datas,
    error: errors,
  } = useQuery("admin:orders", fetchOrders);

  const [datasItem, setDatasItem] = useState(datas);

  const { data, error, status } = useInfiniteQuery(
    "products",
    fetchProductList,
    {}
  );

  const [fullName, setFullName] = useState(user ? user.fullname : "");
  const [phoneNumber, setPhoneNumber] = useState(123);
  const [address, setAddress] = useState("test3");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { items, setItems } = useBasket();

  const orderedItems = items.filter((item) => item.quantity > 0);

  useEffect(() => {
    // if any items quantitys more than zero then button enable
    const anyItemHasQuantity = items.some((item) => item.quantity > 0);
    setIsButtonDisabled(!anyItemHasQuantity);
  }, [items]);

  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

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
    }
  }, [data, status, setItems]);
  //_________________________________________________________________________

  // user order toast notification
  const toast = useToast();

  const toastForOrder = () =>
    toast({
      title: "Order sended ",
      description: "Siparişiniz alındı...",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

  // SOKET IO NOTIFICATION

  useEffect(() => {
    // Listen for incoming notifications
    socket.on("notification", (data) => {
      console.log("notification received and listening");
      notificationAction(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendNotification = () => {
    // Send notification to other connected usersc

    socket.emit("notification", "New notification!");
  };

  const notificationAction = () => {
    user.role === "admin"
      ? addNotification({
          title: "Yeni sipariş var",
          message: `${user.fullname} bir sipariş gönderdi`,
          duration: 4000,

          native: true,
          onClick: () => "https://twotea.onrender.com/admin/orders",
        })
      : console.log("admin değil");

    console.log("notification Action")
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
    refetch();
    handleClick();

    sendNotification();
  };

  useEffect(() => {
    console.log(
      "data updated: for handleclick",
      datasItem ? datasItem.length : ""
    );
  }, [datasItem]);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/signintoorder");
  };

  return (
    <Box className="basketTopDiv">
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
        </Box>
      </Box>
    </Box>
  );
}

export default Basket;
