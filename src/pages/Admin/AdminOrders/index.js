import React, { useEffect } from "react";
import { useClearOrders } from "./useClearOrders ";
import OrderHistory from "../../OrderHistory"

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
    <OrderHistory/>
  );
}
export default AdminOrders;
