import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

function AdminHome() {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}>
    <Flex justifyContent={"center"} alignItems={"center"} p={2} bg={"#8d8d8d"}>
      <Box
       
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={"3xl"}
        as="b"
        color={"orange.400"}
      >
        <Text>Admin Page</Text>
      </Box>
    </Flex>
    </motion.div>
  );
}

export default AdminHome;
