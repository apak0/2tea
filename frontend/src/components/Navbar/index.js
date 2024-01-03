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
              height={"50px"}
              minW={"88px"}
              src="https://www.freepnglogos.com/uploads/logo-corinthians-png/shield-corinthians-paulista-png-logo-25.png"
              alt="Dan Abramov"
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
              
              bgGradient='linear(to-l, #2E8A99, #AFD3E2)'
              bgClip='text'
              fontWeight={"bold"}
              fontSize={{ base: "15px", md: "40px", lg: "xx-large" }}
            >
              Bizim Shop
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
                      color: isActive ? "MediumAquamarine" : "white",
                      borderBottom: isActive ? "solid" : "",
                    };
                  }}
                  to="/signin"
                >
                  Login
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  style={({ isActive, isPending }) => {
                    return {
                      color: isActive ? "MediumAquamarine" : "white",
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
          <Box ml={{ base: "15%", md: 0 }}>
            <Box display={"flex"} alignItems={"center"}>
              <UnorderedList display={"flex"} gap={5} styleType="none">
                <ListItem>
                  {user?.role === "admin" && (
                    <NavLink
                      style={({ isActive, isPending }) => {
                        return {
                          color: isActive ? "MediumAquamarine" : "white",
                          borderBottom: isActive ? "solid" : "",
                        };
                      }}
                      to="/admin/home"
                    >
                      Admin
                    </NavLink>
                  )}
                </ListItem>
                <ListItem className="">
                  <NavLink
                    style={({ isActive, isPending }) => {
                      return {
                        color: isActive ? "MediumAquamarine" : "white",
                        borderBottom: isActive ? "solid" : "",
                      };
                    }}
                    to="/profile"
                  >
                    Profile
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
                  color: isActive ? "MediumAquamarine" : "white",
                  borderBottom: isActive ? "solid" : "",
                };
              }}
              to="/basket"
            >
              Basket{" "}
            </NavLink>
          </Box>

          <Box display={""} as={Link} to="/basket"  >
            <Box
              _hover={{
                color: "blue",
              }}
              display={"flex"}
              alignItems={"center"}
            >
              {items.length < 1 ? (
                <Box  >
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
                  <Box>
                    <Badge
                      position={"absolute"}
                      height={"1rem"}
                      rounded={"full"}
                      bg={"red"}
                      color={"white"}
                    >
                      {!items.length < 1 && `${items.length}`}
                    </Badge>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      {user && (
        <Box className="hidden md:block">
          <Box id={styles.profilePhotoBoxOutside}>
            <Menu>
              <MenuButton>
                <Image
                  alt="not found"
                  width={"40px"}
                  height={"40px"}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3c17auGFTgUHE9FM8j99aPo-VSVD9q5HOA&usqp=CAU"
                  objectFit={"cover"}
                  className={styles.profilePhotoBoxInside}
                />
              </MenuButton>

              {/* <Box className={styles.downButton}>
                <BsChevronDown />
              </Box> */}

              <MenuList minW={0}>
                <MenuItem as={"b"} color={"black"} mr={10}>
                  <NavLink to={"/profile"}>
                    <span>Profile</span>
                  </NavLink>
                </MenuItem>
                <MenuItem as={"b"} color={"black"}>
                  <NavLink to={"/basket"}>
                    <span>Basket</span>
                  </NavLink>
                </MenuItem>
                <MenuItem minH="40px">
                  <Box color={"red"}>
                    <NavLink onClick={handleLogout} to="/">
                      <Box display={"flex"} alignItems={"center"} gap={3}>
                        <Text>Logout</Text>
                        <BiLogOut />
                      </Box>
                    </NavLink>
                  </Box>
                </MenuItem>
              </MenuList>
            </Menu>

            <NavLink to={"/profile"} className="nav-profile-name"></NavLink>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Navbar;
