import React, { useEffect } from "react";
import { useClearOrders } from "./useClearOrders ";

import { useQuery } from "react-query";
import { fetchOrders } from "../../../api";
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

import "./styles.css";
import { useAuth } from "../../../contexts/AuthContext";

function AdminOrders() {
  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    fetchOrders
  );
  const { user } = useAuth();
  
  const clearOrders = useClearOrders();

  const handleClearOrders = () => {
    clearOrders(); // Bu fonksiyon çağrıldığında fetchOrders'dan gelen veriler temizlenecek
  };

  if (isLoading) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={"3xl"}
        color={"cyan.400"}
      >
        {" "}
        Loading...
      </Box>
    );
  }

  if (isError) {
    <div>Error {error.message}</div>;
  }

 

  return (
    <div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        p={2}
        bg={"#8d8d8d"}
      >
        <Box>{/* this is empty box */}</Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"3xl"}
          as="b"
          color={"orange.300"}
        >
          <Text>Orders</Text>
        </Box>

        <Box>
          {/* this box using for design, its not active */}

          <Button
            opacity={0}
            cursor={"context-menu"}
            bg={"orange.300"}
            shadow={"xl"}
            _hover={{
              color: "white",
            }}
          >
            {" "}
            New
          </Button>
        </Box>
      </Flex>

      <Table variant="simple">
        <Thead bg={"blue.200"}>
          <Tr>
            <Th
              className="flex justify-center"
              fontSize={"14px"}
              p={5}
              color={"black"}
            >
              USERNAME
            </Th>
            <Th>
              <Button bg={"red"} onClick={handleClearOrders} maxH={"20px"}>
                Sil
              </Button>
            </Th>

            <Th fontSize={"14px"} color={"black"} isNumeric>
              ITEMS
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => {
            console.log(item.user._id)
            // Kullanıcı giriş yapmışsa ve siparişin kullanıcısı ile giriş yapmış kullanıcı aynıysa
            if (
              localStorage.getItem("access-token") &&
              item.user._id === user._id
            ) {
              return (
                <Tr key={item._id}>
                  <Td className="flex justify-center">{item.user.fullname}</Td>
                  <Td isNumeric>{item.items.length}</Td>
                </Tr>
              );
            } else {
              // Giriş yapmış kullanıcı yoksa veya siparişin kullanıcısı ile giriş yapmış kullanıcı aynı değilse
              return null;
            }
          })}
        </Tbody>
      </Table>
    </div>
  );
}
export default AdminOrders;
