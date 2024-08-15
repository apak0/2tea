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
              src="https://i.hizliresim.com/47cwcdu.ico"
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
              ÇAY OCAĞI
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
                      color: isActive ? "#FE7A36" : "white",
                      borderBottom: isActive ? "solid" : "",
                    })}
                    to="/signin"
                  >
                    Giriş Yap
                  </NavLink>
                </ListItem>
                <ListItem>
                  <NavLink
                    style={({ isActive, isPending }) => ({
                      color: isActive ? "#FE7A36" : "white",
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
                        color: isActive ? "#FE7A36" : "white",
                        borderBottom: isActive ? "solid" : "",
                      })}
                      to="/admin/home"
                    >
                      Admin
                    </NavLink>
                  )}
                </ListItem>

                <ListItem className="flex justify-center items-center">
                  <NavLink
                    style={({ isActive, isPending }) => ({
                      color: isActive ? "#FE7A36" : "white",
                      borderBottom: isActive ? "solid" : "",
                    })}
                    to="/profile"
                  >
                    Profil
                  </NavLink>
                </ListItem>

                <ListItem className="flex justify-center items-center">
                  <NavLink
                    style={({ isActive, isPending }) => ({
                      color: isActive ? "#FE7A36" : "white",
                      borderBottom: isActive ? "solid" : "",
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

                  <NavLink to="/signup">
                    <MenuItem
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
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

                  <NavLink to="/profile">
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
