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
  useBreakpointValue
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import React from "react";
import { useQuery } from "react-query";
import { fetchOrders } from "../../api";
import { useAuth } from "../../contexts/AuthContext";

function OrderHistory() {
  const { user } = useAuth();
  const { isLoading, isError, data, error } = useQuery("admin:orders", fetchOrders);

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

  console.log(data);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <div style={{ width: isMobile ? "100%" : "70%", marginLeft: "auto", marginRight: "auto" }}>
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

      <Table variant="simple" size={isMobile ? "sm" : "md"}>
        <Thead bg="blue.200">
          <Tr>
            <Th fontSize="14px" p={5} color="black" textAlign={isMobile ? "left" : "center"}>
              İSİM
            </Th>
            <Th fontSize="14px" color="black" textAlign="center" isNumeric>
              SİPARİŞ
            </Th>
            <Th fontSize="14px" p={5} color="black" textAlign={isMobile ? "left" : "center"}>
              TARİH
            </Th>
          </Tr>
        </Thead>
        <Tbody>
  {data && data.length > 0 ? (
    data.slice().reverse().map((item) => {
      if (
        localStorage.getItem('access-token') &&
        (user.role === 'admin' || item.user._id === user._id)
      ) {
        return (
          <Tr key={item._id}>
            <Td style={{ fontSize: isMobile ? '16px' : '30px' }} textAlign={isMobile ? "left" : "center"}>
              {item.user.fullname}
            </Td>
            <Td style={{ fontSize: isMobile ? '16px' : '30px', textAlign: 'center' }} isNumeric>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {item.items.length} Ürün
                </MenuButton>
                <MenuList>
                  {item.items.map((orderItem, index) => (
                    <MenuItem key={index}>
                      {orderItem.title} - {orderItem.quantity}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Td>
            <Td style={{ fontSize: isMobile ? '16px' : '30px', textAlign: 'center' }} isNumeric>
              {formatTimeAgo(item.createdAt)}
            </Td>
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
