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
  Textarea,
  Image,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "react-query";
import "./styles.css";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import io from "socket.io-client";
import RadioCard from "../../components/RadioCard";

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

  const [showTextarea, setShowTextarea] = useState(true);
  const [orderNote, setOrderNote] = useState("");
  const [coffeeVariants, setCoffeeVariants] = useState({});

  const orderedItems = items.filter((item) => item.quantity > 0);

  const sendNotification = () => {
    socket.emit("notification", { customer: fullName });
  };

  useEffect(() => {
    socket.on("notification", (data) => {
      notificationAction(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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

    const input = {
      fullName,
      phoneNumber,
      address,
      items: selectedItems.map((item) => ({
        ...item,
        variant: coffeeVariants[item._id] || null,
      })),
      orderNote
    };

    await postOrder(input);
    const updatedItems = items.map((item) => ({ ...item, quantity: 0 }));
    setItems(updatedItems);
    toastForOrder();

    sendNotification();
    refetch();

    setOrderNote("");
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/signintoorder");
  };

  const buttonText = items.some((item) => item.quantity > 0)
    ? "SİPARİŞİ GÖNDER"
    : "ÜRÜN SEÇİN";

  const handleVariantSelect = (itemId, variant) => {
    setCoffeeVariants((prevVariants) => ({
      ...prevVariants,
      [itemId]: variant,
    }));
  };

  return (
    <Box className="basketTopDiv w-full ">
      <Box
        py={5}
        className="totalDiv flex flex-col sm:flex-row justify-around "
      >
        <Box className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8 ">
          {items.map((item, i) => (
            <Box
              key={i}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-evenly"}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              minW={"180px"}
              maxW={"200px"}
              p="2"
              bg={"#B4D4FF"}
              h="100%"
            >
              <Box className="relative flex cards">
                <Image
                  src={item.photos}
                  alt="product"
                  loading="lazy"
                  objectFit={"cover"}
                  w={"100%"}
                  h={"200px"}
                  className="cards"
                />
                {item.title === "Türk Kahvesi" && (
                  <Box className="absolute bottom-0 text-xs left-1/2 transform -translate-x-1/2 text-blue-700 ">
                    <RadioCard
                      onSelect={(variant) =>
                        handleVariantSelect(item._id, variant)
                      }
                    />
                  </Box>
                )}
              </Box>

              <Box
                fontSize={"2xl"}
                fontWeight="bold"
                as="samp"
                lineHeight="tight"
                noOfLines={1}
                color={"#FE7A36"}
                display={"flex"}
                justifyContent={"center"}
              >
                {item.title}
              </Box>

              <Box
                minW={"100px"}
                display="flex"
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDirection="row"
                borderRadius="8px"
              >
                <Box>
                  <Button
                    className="minusBtn"
                    size={"md"}
                    fontSize={"3xl"}
                    m={2}
                    onClick={() => decrement(item._id)}
                    bg={"#ed8203"}
                    color={"#fff"}
                    _hover={{ bg: "teal.400", color: "black" }}
                    _active={{ bg: "teal.300", color: "#fff" }}
                  >
                    -
                  </Button>
                </Box>

                <Box className="min-w-10">
                  <Text
                    display="flex"
                    justifyContent={"center"}
                    alignItems="center"
                    fontSize={"xl"}
                  >
                    {item.quantity}
                  </Text>
                </Box>

                <Box>
                  <Button
                    className="plusBtn"
                    bg={"#ed8203"}
                    color={"#fff"}
                    _hover={{ bg: "teal.400", color: "black" }}
                    _active={{ bg: "teal.300", color: "#fff" }}
                    justifySelf={"flex-end"}
                    size={"md"}
                    fontSize={"3xl"}
                    m={2}
                    onClick={() => increment(item._id)}
                  >
                    +
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          className=" flex justify-center sm:mx-0 mt-10 sm:mt-0 mb-40 sm:mb-0 mx-auto "
          width={"380px"}
          border={"2px"}
          borderColor={"gray.400"}
        >
          {orderedItems.length > 0 ? (
            <Box className="w-96 mx-4">
              <Text fontSize="xl">SİPARİŞ LİSTESİ</Text>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th color={"orange.400"} fontSize={"lg"}>
                      ÜRÜN ADI
                    </Th>
                    <Th
                      color={"orange.400"}
                      fontSize={"lg"}
                      className="flex justify-center items-center"
                    >
                      MİKTARI
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orderedItems
                    .slice()
                    .reverse()
                    .map((item, index) => (
                      <Tr
                        key={index}
                        minW={"400px"}
                        mx={10}
                        verticalAlign={"middle"}
                      >
                        <Td
                          fontSize={"x-large"}
                          width="100px"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          bg={"gray.100"}
                          p={2}
                        >
                          {item.title}
                          {coffeeVariants[item._id] && (
                            <Text fontSize="sm" color="gray.500">
                              Çeşit: {coffeeVariants[item._id]}
                            </Text>
                          )}
                        </Td>
                        <Td
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          bg={"gray.100"}
                          minWidth="150px"
                          paddingX={0}
                          gap={3}
                          px={2}
                        >
                          <div>
                            <button
                              className=" text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-3xl px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                              onClick={() => decrement(item._id)}
                            >
                              -
                            </button>
                          </div>
                          <div className="">
                            <Text
                              width={"40px"}
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              fontSize={"x-large"}
                            >
                              {item.quantity}
                            </Text>
                          </div>
                          <div>
                            <button
                              className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-3xl px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                              onClick={() => increment(item._id)}
                            >
                              +
                            </button>
                          </div>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
              <Box mt={3} mb={3}>
                <Text fontSize="lg" mb={2}>
                  Sipariş Notu:
                </Text>
                <Textarea
                  placeholder="Siparişinizle ilgili eklemek istediğiniz bir not var mı?"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  size="sm"
                />
              </Box>
              <Box mt="3">
                <Button
                  minW={"100px"}
                  fontSize={"large"}
                  p={5}
                  mb={5}
                  size="sm"
                  bg={"#ed8203"}
                  color={"#fff"}
                  _hover={{ bg: "teal.400", color: "black" }}
                  _active={{ bg: "teal.300", color: "#fff" }}
                  onClick={() => {
                    loggedIn ? handleSubmitForm() : handleNavigate();
                  }}
                >
                  {buttonText}
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Text fontSize="xl">SİPARİŞ LİSTESİ</Text>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th color={"orange.400"} fontSize={"lg"}>
                      ÜRÜN ADI
                    </Th>
                    <Th color={"orange.400"} fontSize={"lg"}>
                      MİKTARI
                    </Th>
                  </Tr>
                </Thead>
                <Tbody width={"100px"}>
                  {orderedItems &&
                    orderedItems.map((item, index) => (
                      <Tr key={index}>
                        <Td
                          maxWidth="150px"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {item.title}
                        </Td>
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
                  mb={5}
                  size="sm"
                  bg={"gray.400"}
                  color={"#fff"}
                  _hover={{ bg: "teal.400", color: "black" }}
                  _active={{ bg: "teal.300", color: "#fff" }}
                >
                  ÜRÜN YOK
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Basket;
