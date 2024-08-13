import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchOrders } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

function OrderHistory() {
  const { user } = useAuth();
  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    fetchOrders
  );

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} gün`;
    } else if (hours > 0) {
      return `${hours} sa.`;
    } else if (minutes > 0) {
      return `${minutes} dk.`;
    } else {
      return `${seconds} sn.`;
    }
  };

  const isAdmin = user && user.role === "admin";

  const OrderStatusButtons = ({ orderId, initialStatus, isAdmin }) => {
    const [status, setStatus] = useState(initialStatus);

    const updateStatus = async (newStatus) => {
      try {
        const token = localStorage.getItem("access-token"); // Retrieve the token from localStorage
        if (!token) {
          throw new Error("No access token found");
        }

        await axios.post(
          `${process.env.REACT_APP_BASE_ENDPOINT}/order/update-status`,
          {
            orderId,
            status: newStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStatus(newStatus);
      } catch (error) {
        console.error("Failed to update status:", error);
        if (error.response) {
          console.error("Error Response:", error.response.data);
        }
      }
    };

    if (!isAdmin) {
      return (
        <Box
          color={
            status === "Beklemede"
              ? "blue"
              : status === "Hazırlanıyor"
              ? "yellow.500"
              : status === "Tamamlandı"
              ? "green"
              : "gray.500" //
          }
        >
          {status}
        </Box>
      );
    }

    return (
      <Box className="  md:flex justify-center items-center">
        <Button
          colorScheme={status === "Beklemede" ? "blue" : "gray"}
          border={status === "Beklemede" ? "1px" : "1px"}
          opacity={status === "Beklemede" ? "1" : "0.6"}
          size="sm"
          margin={1}
          onClick={() => updateStatus("Beklemede")}
        >
          Beklemede
        </Button>
        <Button
          colorScheme={status === "Hazırlanıyor" ? "yellow" : "gray"}
          border={status === "Hazırlanıyor" ? "1px" : "1px"}
          opacity={status === "Hazırlanıyor" ? "1" : "0.6"}
          size="sm"
          margin={1}
          onClick={() => updateStatus("Hazırlanıyor")}
        >
          Hazırlanıyor
        </Button>
        <Button
          colorScheme={status === "Tamamlandı" ? "green" : "gray"}
          border={status === "Tamamlandı" ? "1px" : "1px"}
          opacity={status === "Tamamlandı" ? "1" : "0.6"}
          size="sm"
          margin={1}
          onClick={() => updateStatus("Tamamlandı")}
        >
          Tamamlandı
        </Button>
      </Box>
    );
  };

  const isMobile = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <div
      style={{
        width: isMobile ? "100%" : "70%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        p={2}
        bg={"#8d8d8d"}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"3xl"}
          as="b"
          color={"orange.300"}
          width={"full"}
        >
          <Text>SİPARİŞLER</Text>
        </Box>
      </Flex>

      <Table variant="simple" size={isMobile ? "sm" : "md"} as={"b"}>
        <Thead bg="blue.200">
          <Tr>
            {isAdmin ? (
              <Th fontSize="14px" color="black" textAlign="center">
                GÖNDEREN
              </Th>
            ) : (
              ""
            )}

            <Th fontSize="14px" color="black" textAlign="center">
              SİPARİŞ
            </Th>
            <Th fontSize="14px" color="black" textAlign="center">
              TARİH
            </Th>
            <Th fontSize="14px" color="black" textAlign="center" p={0}>
              NOT
            </Th>
            {!isAdmin ? (
              <Th fontSize="14px" p={1} color="black" textAlign="center">
                SİPARİŞ DURUMU
              </Th>
            ) : (
              ""
            )}
          </Tr>
        </Thead>
        <Tbody bg={"gray.200"}>
          {data && data.length > 0 ? (
            data
              .slice()
              .reverse()
              .map((item) => {
                if (
                  localStorage.getItem("access-token") &&
                  (isAdmin || item.user._id === user._id)
                ) {
                  return (
                    <Tr
                      key={item._id}
                      className="hover:bg-gray-400 transition duration-300 ease-in-out"
                      borderBottom={"2px"}
                    >
                      {isAdmin ? (
                        <Td
                          style={{ fontSize: isMobile ? "16px" : "30px" }}
                          textAlign={isMobile ? "left" : "center"}
                        >
                          {item.user.fullname}
                        </Td>
                      ) : (
                        ""
                      )}

                      <Td
                        style={{
                          fontSize: isMobile ? "16px" : "30px",
                          textAlign: "center",
                          paddingTop: 5,
                          paddingLeft: 0,
                          paddingRight: 0,
                        }}
                        isNumeric
                      >
                        <Menu>
                          <MenuButton
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                            bg={isDark ? "blue.300" : "blue.500"}
                            color={isDark ? "gray.900" : "white"}
                            _hover={{ bg: isDark ? "blue.400" : "blue.600" }}
                            _active={{ bg: isDark ? "blue.500" : "blue.700" }}
                            className="transition duration-300 ease-in-out transform hover:-translate-x-0.5 hover:text-amber-300"
                          >
                            {item.items.length}
                          </MenuButton>
                          <MenuList
                            bg={isDark ? "gray.800" : "gray.300"}
                            borderColor={isDark ? "gray.700" : "gray.200"}
                            className="shadow-lg rounded-lg hover:text-amber-600  "
                          >
                            {item.items.map((orderItem, index) => (
                              <MenuItem key={index} bg={"gray.300"} as={"b"}>
                                {orderItem.title} - {orderItem.quantity}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                        {isAdmin ? (
                          <OrderStatusButtons
                            orderId={item._id}
                            initialStatus={item.status}
                            isAdmin={isAdmin}
                          />
                        ) : (
                          ""
                        )}
                      </Td>
                      <Td
                        style={{
                          fontSize: isMobile ? "16px" : "30px",
                          textAlign: "center",
                          padding: 0,
                        }}
                        isNumeric
                      >
                        {formatTimeAgo(item.createdAt)}
                      </Td>
                      <Td
                        width={"300px"}
                        textAlign={"start"}
                        verticalAlign={"baseline"}
                        padding={0}
                        textColor={"orange.300"}
                      >
                        <Tooltip
                          bg={"yellow.300"}
                          textColor={"black"}
                          label={item.orderNote}
                          fontSize="md"
                        >
                          <Text noOfLines={isMobile ? 5 : 2}>
                            {item.orderNote}
                          </Text>
                        </Tooltip>
                      </Td>
                      {!isAdmin ? (
                        <Td
                          style={{
                            fontSize: isMobile ? "16px" : "30px",
                            textAlign: "center",
                          }}
                        >
                          <OrderStatusButtons
                            orderId={item._id}
                            initialStatus={item.status}
                            isAdmin={isAdmin}
                          />
                        </Td>
                      ) : (
                        ""
                      )}
                    </Tr>
                  );
                } else {
                  return null;
                }
              })
          ) : (
            <Box textAlign="center" w="full">
              <Text fontSize={isMobile ? "lg" : "30px"} textColor="tomato">
                Daha önce sipariş verilmedi
              </Text>
            </Box>
          )}
        </Tbody>
      </Table>
    </div>
  );
}

export default OrderHistory;
