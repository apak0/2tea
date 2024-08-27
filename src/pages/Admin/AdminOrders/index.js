import React, { useEffect } from "react";

import OrderHistory from "../../OrderHistory";

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
  Spinner,
} from "@chakra-ui/react";

import "./styles.css";
import { useAuth } from "../../../contexts/AuthContext";

function AdminOrders() {
  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    fetchOrders
  );
  const { user } = useAuth();

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner
          thickness="4px"
          speed="0.50s"
          emptyColor="gray.200"
          color="orange.300"
          size="xl"
        />
      </Flex>
    );
  }

  if (isError) {
    <div>Error {error.message}</div>;
  }

  return <OrderHistory />;
}
export default AdminOrders;
