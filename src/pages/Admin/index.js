import React from "react";
import "./styles.css";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";

import { useAuth } from "../../contexts/AuthContext";

import { BiLogOut } from "react-icons/bi";

function Admin() {
  const { user } = useAuth();
  return (
    <Box initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="topBox">
      {user?.role !== "admin" && <Navigate to={"/"} replace={true} />}
      <Box mx={[0, 10, 10, 10]}>
        <Box width={"90vw"} className="">
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
          ></NavLink>
          <UnorderedList
            mt={5}
            mb={2}
            styleType="none"
            display={"flex"}
            justifyContent={"center"}
            gap={[8, 12, 12, 12]}
          >
            <ListItem pr={10}>
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
                SİPARİŞLER
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
                ÜRÜNLER
              </NavLink>
            </ListItem>
          </UnorderedList>
        </Box>
        <Box className="h-screen">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Admin;
