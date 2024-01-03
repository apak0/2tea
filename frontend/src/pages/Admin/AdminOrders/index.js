import React from "react";

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
import {motion} from "framer-motion"

import "./styles.css"

function AdminOrders() {
  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    fetchOrders
  );

  if (isLoading) {
    return <Box display={"flex"} justifyContent={"center"} alignItems={"center"} fontSize={"3xl"} color={"cyan.400"} > Loading...</Box>;
  }

  if (isError) {
    <div>Error {error.message}</div>;
  }
 

  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}>
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
          {/* this box using for design, can not be active */}

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
          <Tr >
            <Th fontSize={"14px"} p={5} color={"black"}>USERNAME</Th>
            <Th fontSize={"14px"} color={"black"}>E-MAIL</Th>
            <Th fontSize={"14px"} color={"black"}>ADDRESS</Th>
            <Th fontSize={"14px"} color={"black"} isNumeric>
              ITEMS
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr  key={item._id}>
              <Td>{item.user.fullname}</Td>
              <Td>{item.user.email}</Td>
              <Td>{item.address}</Td>
              <Td isNumeric>{item.items.length}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </motion.div>
  );
}
export default AdminOrders;
