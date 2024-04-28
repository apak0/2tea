import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Badge,
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

import { SlBasket, SlBasketLoaded } from "react-icons/sl";
import { HiOutlineMenu } from "react-icons/hi";

import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useBasket();
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
              height={"40px"}
              minW={"50px"}
              src="https://i.hizliresim.com/47cwcdu.ico"
              alt="mks-logo"
            />
          </NavLink>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          ml={[2, 4, 6, 8]}
        >
          <NavLink to="/">
            <Text
              fontSize={{ base: "15px", md: "40px", lg: "xx-large" }}
            >
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
                      color: isActive ? "#525CEB" : "white",
                      borderBottom: isActive ? "solid" : "",
                    })}
                    to="/signin"
                  >
                    Giriş
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
                    Register
                  </NavLink>
                </ListItem>
              </>
            )}

            {localStorage.getItem("access-token") && (
              <>
                <ListItem>
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

                <ListItem>
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

                <ListItem>
                  <NavLink
                    style={({ isActive, isPending }) => ({
                      color: isActive ? "#FE7A36" : "white",
                      borderBottom: isActive ? "solid" : "",
                    })}
                    to="/history"
                  >
                    Geçmiş Siparişler
                  </NavLink>
                </ListItem>

                <ListItem className="flex justify-center items-center bg-red-400">
                  <NavLink
                   
                    onClick={handleLogout}
                  >
                    <IoMdLogOut style={{ color: "red", fontSize: "20px" }} />
                  </NavLink>
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
                  <MenuItem>
                      Giriş
                  </MenuItem>
                      </NavLink>

                    <NavLink to="/signup">
                  <MenuItem>
                      Register
                  </MenuItem>
                      </NavLink>
                </>
              ) : (
                <>
                  {user?.role === "admin" && (

                    <NavLink to="/admin/home">
                        <MenuItem>
                        Admin
                    </MenuItem>
                        </NavLink>
                  )}


                    <NavLink to="/profile">
                  <MenuItem>
                      Profil
                  </MenuItem>
                    </NavLink>


                    <NavLink to="/history">
                  <MenuItem>
                      Geçmiş Siparişler
                  </MenuItem>
                    </NavLink>
                  <MenuItem onClick={handleLogout} display={"flex"} justifyContent={"center"} >
                    <IoMdLogOut style={{ color: "red", fontSize: "40px" }} />
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
