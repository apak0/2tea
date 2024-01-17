import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Badge,
  Box,
  Image,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

import { BiLogOut } from "react-icons/bi";

import { SlBasket, SlBasketLoaded } from "react-icons/sl";

import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useBasket();
  const navigate = useNavigate();

  // loggedIn changed because login transaction bind to access token

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
      <Box display={"flex"} mr={"auto"} alignItems={"center"} className="">
        <Box className="">
          <NavLink to="/">
            <Image
              borderRadius="full"
              height={"40px"}
              minW={"50px"}
              src="https://www.mksmarmara.com/images/uploads/F218/ade7cc3f-2533-4a85-bb30-de67904bc530_logo.png"
              alt="mks-logo"
            />
          </NavLink>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          ml={[0, 4, 6, 8]}
        >
          <NavLink to="/">
            <Text
              ml={5}
              bgGradient="linear(to-l, #e65c00, #F9D423)"
              bgClip="text"
              fontWeight={"bold"}
              fontSize={{ base: "15px", md: "40px", lg: "xx-large" }}
            >
              ÇAY OCAĞI
            </Text>
          </NavLink>
        </Box>
      </Box>
      <Box display={"flex"} mr={10}>
        {!localStorage.getItem("access-token") && (
          <>
            <UnorderedList display={"flex"} gap={5} styleType="none">
              <ListItem>
                <NavLink
                  style={({ isActive, isPending }) => {
                    return {
                      color: isActive ? "#525CEB" : "white",
                      borderBottom: isActive ? "solid" : "",
                    };
                  }}
                  to="/signin"
                >
                  Giriş
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  style={({ isActive, isPending }) => {
                    return {
                      color: isActive ? "#FE7A36" : "white",
                      borderBottom: isActive ? "solid" : "",
                    };
                  }}
                  to="/signup"
                >
                  Register
                </NavLink>
              </ListItem>
            </UnorderedList>
          </>
        )}

        {localStorage.getItem("access-token") && (
          <Box >
            <Box display={"flex"} alignItems={"center"}>
              <UnorderedList display={"flex"} gap={5} styleType="none">

                <ListItem>
                  {user?.role === "admin" && (
                    <NavLink
                      style={({ isActive, isPending }) => {
                        return {
                          color: isActive ? "#FE7A36" : "white",
                          borderBottom: isActive ? "solid" : "",
                        };
                      }}
                      to="/admin/home"
                    >
                      Admin
                    </NavLink>
                  )}
                </ListItem>

                <ListItem >
                  <NavLink
                    style={({ isActive, isPending }) => {
                      return {
                        color: isActive ? "#FE7A36" : "white",
                        borderBottom: isActive ? "solid" : "",
                      };
                    }}
                    to="/history"
                  >
                    Geçmiş
                  </NavLink>
                </ListItem>

                <ListItem >
                  <NavLink
                    style={({ isActive, isPending }) => {
                      return {
                        color: isActive ? "#FE7A36" : "white",
                        borderBottom: isActive ? "solid" : "",
                      };
                    }}
                    to="/profile"
                  >
                    Profil
                  </NavLink>
                </ListItem>

                {/* Button item length */}
              </UnorderedList>
            </Box>
          </Box>
        )}

        <Box ml={3} display={"flex"}>
          <Box>
            <NavLink
              style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "#FE7A36" : "white",
                  borderBottom: isActive ? "solid" : "",
                };
              }}
              to="/basket"
            >
              Sepetim{" "}
            </NavLink>
          </Box>

          <Box display={""} as={Link} to="/basket">
            <Box
              _hover={{
                color: "blue",
              }}
              display={"flex"}
              alignItems={"center"}
            >
              {items.length < 1 ? (
                <Box>
                  <SlBasket
                    style={{
                      color: "white",
                      height: 20,
                      width: 20,
                    }}
                  />{" "}
                </Box>
              ) : (
                <Box display={"flex"}>
                  {" "}
                  <SlBasketLoaded
                    style={{
                      color: "#FFC23C",
                      height: 20,
                      width: 20,
                    }}
                    to={"/basket"}
                  />
                  {/* <Box mr={"auto"} >
                    <Badge
                      position={"absolute"}
                      height={"1rem"}
                      rounded={"full"}
                      bg={"red"}
                      color={"white"}
                    >
                      {!items.length < 1 && `${items.length }`}
                    </Badge>
                  </Box> */}
                </Box>
              )}
              
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
