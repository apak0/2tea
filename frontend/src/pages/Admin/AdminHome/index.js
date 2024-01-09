import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../../contexts/AuthContext";

function AdminHome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("basket");
    logout()
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
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
        <Text>
        <Box color={"red"}>
                    <NavLink onClick={handleLogout} to="/">
                      <Box display={"flex"} alignItems={"center"} gap={3}>
                        <Text>Çıkış Yap</Text>
                        <BiLogOut />
                      </Box>
                    </NavLink>
                  </Box>
        </Text>
      </Box>
    </Flex>
    </motion.div>
  );
}

export default AdminHome;
