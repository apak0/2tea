import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Box,
  Icon,
  Image,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

import { IoMdLogOut } from "react-icons/io";

import { HiOutlineMenu } from "react-icons/hi";

import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const isLoggedIn = !!localStorage.getItem("access-token");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("basket");
    logout(() => {
      navigate("/signin"); // Redirect to login or home page
    });
  };

  return (
    <Box className={styles.nav}>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        width={"100%"}
        alignItems={"center"}
        px={4}
      >
        <Box className="logo">
          <NavLink to="/">
            <Image
              borderRadius="full"
              height={"60px"}
              minW={"50px"}
              src="logo.png"
              alt="mks-logo"
            />
          </NavLink>
        </Box>

        <Box
          className={`flex justify-center items-center ml-0 ${
            isLoggedIn ? "md:ml-52" : ""
          }`}
        >
          <NavLink to="/">
            <Text fontSize={{ base: "25px", md: "40px", lg: "xxx-large" }}>
              Two Tea
            </Text>
          </NavLink>
        </Box>

        <Box display={{ base: "none", md: "block" }}>
          <UnorderedList display={"flex"} gap={5} styleType="none">
            {!localStorage.getItem("access-token") && (
              <>
                <ListItem>
                  <NavLink
                    style={({ isActive, isPending }) => ({
                      color: isActive ? "#43bdb8" : "white",
                      borderBottom: isActive ? "solid" : "",
                    })}
                    to="/signin"
                  >
                    Giriş Yap
                  </NavLink>
                </ListItem>
                <ListItem borderLeft={"1px solid gray"} paddingLeft={"1rem"}>
                  <NavLink
                    style={({ isActive, isPending }) => ({
                      color: isActive ? "#43bdb8" : "white",
                      borderBottom: isActive ? "solid" : "",
                    })}
                    to="/signup"
                  >
                    Kayıt Ol
                  </NavLink>
                </ListItem>
              </>
            )}

            {localStorage.getItem("access-token") && (
              <>
                <ListItem className="flex justify-center items-center">
                  {user?.role === "admin" && (
                    <NavLink
                      style={({ isActive, isPending }) => ({
                        color: isActive ? "#43bdb8" : "white",
                        borderBottom: isActive ? "solid" : "",
                      })}
                      to="/admin/orders"
                    >
                      Admin
                    </NavLink>
                  )}
                </ListItem>

                <ListItem className="flex justify-center items-center">
                  <NavLink
                    style={({ isActive, isPending }) => ({
                      color: isActive ? "#43bdb8" : "white",
                      borderBottom: isActive ? "solid" : "",
                    })}
                    to="/profile"
                  >
                    Profil
                  </NavLink>
                </ListItem>

                <ListItem className="flex justify-center items-center ">
                  <NavLink
                    style={({ isActive, isPending }) => ({
                      color: isActive ? "#43bdb8" : "white",
                      borderBottom: isActive ? "solid" : "",
                      borderLeft: "1px solid gray",
                      paddingLeft: "1rem",
                    })}
                    to="/orderhistory"
                  >
                    Geçmiş Siparişler
                  </NavLink>
                </ListItem>

                <ListItem className="flex justify-center items-center">
                  <IoMdLogOut
                    cursor={"pointer"}
                    style={{ color: "red", fontSize: "40px" }}
                    onClick={handleLogout}
                  />
                </ListItem>
              </>
            )}
          </UnorderedList>
        </Box>

        <Box display={{ base: "block", md: "none" }}>
          <Menu>
            <MenuButton
              as={Box}
              p={2}
              _hover={{ bg: "gray.100" }}
              _expanded={{ bg: "gray.100" }}
            >
              <Icon as={HiOutlineMenu} fontSize="1.5rem" />
            </MenuButton>
            <MenuList>
              {!localStorage.getItem("access-token") ? (
                <>
                  <NavLink to="/signin">
                    <MenuItem
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      Giriş Yap
                    </MenuItem>
                  </NavLink>

                  <NavLink
                    to="/signup"
                    borderLeft={"1px solid gray"}
                    paddingLeft={"1rem"}
                  >
                    <MenuItem
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color={"red"}
                    >
                      Kayıt Ol
                    </MenuItem>
                  </NavLink>
                </>
              ) : (
                <>
                  {user?.role === "admin" && (
                    <NavLink to="/admin/home">
                      <MenuItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        Admin
                      </MenuItem>
                    </NavLink>
                  )}

                  <NavLink
                    to="/profile"
                    borderLeft={"1px solid gray"}
                    paddingLeft={"1rem"}
                  >
                    <MenuItem
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      Profil
                    </MenuItem>
                  </NavLink>

                  <NavLink to="/orderhistory">
                    <MenuItem
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      Geçmiş Siparişler
                    </MenuItem>
                  </NavLink>
                  <MenuItem display="flex" justifyContent="center">
                    <IoMdLogOut
                      style={{ color: "red", fontSize: "50px" }}
                      onClick={handleLogout}
                    />
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
