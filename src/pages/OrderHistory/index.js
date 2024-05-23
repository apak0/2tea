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
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { fetchOrders } from "../../api";
import { useAuth } from "../../contexts/AuthContext";

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
      return `${days} gün önce`;
    } else if (hours > 0) {
      return `${hours} saat önce`;
    } else if (minutes > 0) {
      return `${minutes} dakika önce`;
    } else {
      return `${seconds} saniye önce`;
    }
  };
  return (
    <div style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}>
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

      <Table variant="simple" >
        <Thead bg={"blue.200"}>
          <Tr>
            <Th
              className="flex justify-center"
              fontSize={"14px"}
              p={5}
              color={"black"}
            >
              İSİM
            </Th>

            <Th
              fontSize={"14px"}
              color={"black"}
              style={{ textAlign: "center" }}
              isNumeric
            >
              SİPARİŞ
            </Th>
            <Th
              className="flex justify-center"
              fontSize={"14px"}
              p={5}
              color={"black"}
            >
              TARİH
            </Th>
          </Tr>
        </Thead>
        <Tbody >
          {data && data.length > 0 ? (
            data.map((item) => {
              // Kullanıcı giriş yapmışsa ve siparişin kullanıcısı ile giriş yapmış kullanıcı aynıysa
              if (
                localStorage.getItem("access-token") &&
                item.user._id === user._id
              ) {
                return (
                  <Tr key={item._id}>
                    <Td
                      className="flex justify-center "
                      style={{ fontSize: "30px" }}
                    >
                      {item.user.fullname}
                    </Td>
                    <Td style={{ textAlign: "center", fontSize: "30px" }} isNumeric>
                      {item.items.length}
                    </Td>
                    <Td style={{ textAlign: 'center', fontSize: '30px' }} isNumeric>
                          {formatTimeAgo(item.createdAt)}
                        </Td>
                  </Tr>
                );
              } else {
                // Giriş yapmış kullanıcı yoksa veya siparişin kullanıcısı ile giriş yapmış kullanıcı aynı değilse
                return null;
              }
            })
          ) : (
            <Box textAlign="center">
              <Text fontSize={"30px"} textColor={"tomato"}>
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
