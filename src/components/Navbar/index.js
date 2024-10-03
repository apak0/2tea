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

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("basket");
    logout(() => {
      navigate("/signin"); // Redirect to login page
    });
  };

  return (
    <Box className={styles.nav}>
      <Box
        display={"flex"}
        width={"100%"}
        alignItems={"center"}
        px={4}
        justifyContent={{ base: "space-around", md: "initial" }}
      >
        <Box className="logo md:flex-1 md:ml-16 cursor-pointer select-none">
          <NavLink to="/">
            <Image
              borderRadius="full"
              height={"72px"}
              minW={"50px"}
              src="logo.png"
              alt="two tea"
            />
          </NavLink>
        </Box>

        <Box
          className={`flex justify-center items-center ml-0 cursor-pointer select-none`}
        >
          <NavLink to="/">
            <Text fontSize={{ base: "25px", md: "40px", lg: "xxx-large" }}>
              TWO TEA
            </Text>
          </NavLink>
        </Box>

        <Box
          className="md:flex-1 md:justify-end md:mr-16"
          display={{ base: "none", md: "block" }}
        >
          <UnorderedList
            display={"flex"}
            justifyContent={"flex-end"}
            mr={"10rem"}
            gap={5}
            styleType="none"
          >
            {!localStorage.getItem("access-token") && (
              <>
                <ListItem
                  className="cursor-pointer select-none text-2xl"
                  color={"#5e3812"}
                >
                  <NavLink
                    style={({ isActive, isPending }) => ({
                      color: isActive ? "#5e3812" : "white",
                      borderBottom: isActive ? "solid" : "",
                    })}
                    to="/signin"
                  >
                    GİRİŞ YAP
                  </NavLink>
                </ListItem>
                <ListItem
                  className="cursor-pointer select-none"
                  borderLeft={"1px solid gray"}
                  paddingLeft={"1rem"}
                  fontSize={"2xl"}
                  color={"#5e3812"}
                >
                  <NavLink
                    style={({ isActive, isPending }) => ({
                      color: isActive ? "#5e3812" : "white",
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
                <ListItem
                  className="flex justify-center items-center cursor-pointer select-none text-2xl"
                  color={"#5e3812"}
                >
                  {user?.role === "admin" && (
                    <NavLink
                      style={({ isActive, isPending }) => ({
                        color: isActive ? "#5e3812" : "white",
                        borderBottom: isActive ? "solid" : "",
                      })}
                      to="/admin/orders"
                    >
                      ADMİN
                    </NavLink>
                  )}
                </ListItem>

                <ListItem
                  className="flex justify-center items-center cursor-pointer select-none text-2xl"
                  color={"#5e3812"}
                >
                  <NavLink
                    style={({ isActive, isPending }) => ({
                      color: isActive ? "#5e3812" : "white",
                      borderBottom: isActive ? "solid" : "",
                    })}
                    to="/profile"
                  >
                    PROFİL
                  </NavLink>
                </ListItem>

                <ListItem
                  className="flex justify-center items-center cursor-pointer select-none "
                  borderLeft={"1px solid gray"}
                  paddingLeft={"1rem"}
                  fontSize={"2xl"}
                  color={"#5e3812"}
                >
                  <NavLink
                    className={"cursor-pointer select-none"}
                    style={({ isActive, isPending }) => ({
                      color: isActive ? "#5e3812" : "white",
                      borderBottom: isActive ? "solid" : "",
                    })}
                    to="/orderhistory"
                  >
                    GEÇMİŞ SİPARİŞLER
                  </NavLink>
                </ListItem>

                <ListItem
                  className="flex justify-center items-center cursor-pointer select-none"
                  fontSize={"2xl"}
                  color={"#5e3812"}
                >
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
          <Menu className="">
            <MenuButton
              as={Box}
              p={2}
              _hover={{ bg: "gray.100" }}
              _expanded={{ bg: "gray.100" }}
            >
              <Icon as={HiOutlineMenu} fontSize="1.5rem" />
            </MenuButton>
            <MenuList
              className="bg-red-600 cursor-pointer select-none "
              style={{ backgroundColor: "#EEEEEE" }}
              fontSize={"2xl"}
              color={"#5e3812"}
            >
              {!localStorage.getItem("access-token") ? (
                <>
                  <NavLink to="/signin">
                    <MenuItem
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      style={{ backgroundColor: "#EEEEEE" }}
                      color={"#5e3812"}
                      fontSize={"2xl"}
                    >
                      GİRİŞ YAP
                    </MenuItem>
                  </NavLink>

                  <NavLink
                    to="/signup"
                    borderLeft={"1px solid gray"}
                    paddingLeft={"1rem"}
                    className={"cursor-pointer select-none"}
                  >
                    <MenuItem
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color={"#5e3812"}
                      style={{ backgroundColor: "#EEEEEE" }}
                      fontSize={"2xl"}
                    >
                      Kayıt Ol
                    </MenuItem>
                  </NavLink>
                </>
              ) : (
                <>
                  {user?.role === "admin" && (
                    <NavLink
                      className={"cursor-pointer select-none"}
                      to="/admin/home"
                    >
                      <MenuItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor={"#EEEEEE"}
                        color={"#5e3812"}
                        fontSize={"2xl"}
                      >
                        Admin
                      </MenuItem>
                    </NavLink>
                  )}

                  <NavLink
                    className={"cursor-pointer select-none"}
                    to="/profile"
                    borderLeft={"1px solid gray"}
                    paddingLeft={"1rem"}
                  >
                    <MenuItem
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      backgroundColor={"#EEEEEE"}
                      color={"#5e3812"}
                      fontSize={"2xl"}
                    >
                      PROFİL
                    </MenuItem>
                  </NavLink>

                  <NavLink
                    className={"cursor-pointer select-none"}
                    to="/orderhistory"
                  >
                    <MenuItem
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      backgroundColor={"#EEEEEE"}
                      color={"#5e3812"}
                      fontSize={"2xl"}
                    >
                      GEÇMİŞ SİPARİŞLER
                    </MenuItem>
                  </NavLink>
                  <MenuItem
                    display="flex"
                    justifyContent="center"
                    backgroundColor={"#EEEEEE"}
                  >
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
