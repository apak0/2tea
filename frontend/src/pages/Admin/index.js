import React from "react";
import "./styles.css";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { GrCaretPrevious } from "react-icons/gr";

import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { BiLogOut } from "react-icons/bi";

function Admin() {
  const { user } = useAuth();
  return (
    <motion.Box
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="topBox"
    >
      {user?.role !== "admin" && <Navigate to={"/"} replace={true} />}
      <Box mx={[0, 10, 10, 10]} >
        <Box borderBottom={"2px"} borderColor={"#8d8d8d"}>
          <NavLink
            to="/"
            style={({ isActive, isPending }) => {
              return {
                color: isActive ? "MediumAquamarine" : "black",
                borderBottom: isActive ? "solid" : "",
                fontWeight: isActive ? "bold" : "bold",
                fontSize: isActive ? "large" : "large",
              };
            }}
          >
            <Box
              position={["static", "absolute", "absolute", "absolute"]}
              display={"flex"}
             
              alignItems={"center"}
              color={"cyan.400"}
            >
              <Box color={"red"}>
                <BiLogOut  color="crimson"/>
                
              </Box>
              <Text>Back to Home</Text>
            </Box>
          </NavLink>
          <UnorderedList
            mt={5}
            mb={2}
            styleType="none"
            display={"flex"}
            justifyContent={"center"}
            gap={[8, 12, 12, 12]}
          >
            <ListItem>
              <NavLink
                isActive
                to="/admin/home"
                style={({ isActive, isPending }) => {
                  return {
                    color: isActive ? "MediumAquamarine" : "black",
                    borderBottom: isActive ? "solid" : "",
                    fontWeight: isActive ? "bold" : "bold",
                    fontSize: isActive ? "large" : "large",
                  };
                }}
              >
                Admin Page
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to="/admin/orders"
                style={({ isActive, isPending }) => {
                  return {
                    color: isActive ? "MediumAquamarine" : "black",
                    borderBottom: isActive ? "solid" : "",
                    fontWeight: isActive ? "bold" : "bold",
                    fontSize: isActive ? "large" : "large",
                  };
                }}
              >
                Orders
              </NavLink>
            </ListItem>

            <ListItem>
              <NavLink
                to="/admin/products"
                style={({ isActive, isPending }) => {
                  return {
                    color: isActive ? "MediumAquamarine" : "black",
                    borderBottom: isActive ? "solid" : "",
                    fontWeight: isActive ? "bold" : "bold",
                    fontSize: isActive ? "large" : "large",
                  };
                }}
              >
                Products
              </NavLink>
            </ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <Outlet />
        </Box>
      </Box>
    </motion.Box>
  );
}

export default Admin;
