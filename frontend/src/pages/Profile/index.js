import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Button,
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Image,
  Box,
  Flex,
  FormLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";

function Profile() {
  const { user, logout } = useAuth();
  const [selectedImage, setSelectedImage] = useState();
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedImage) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const handleLogout = () => {
    logout()
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={5}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="profileTopDiv"
      >
        <Card bg={"rgb(154, 198, 199, 0.4)"}>
          <CardBody>
            <Flex
              width={"150px"}
              height={"150px"}
              rounded={"full"}
              justifyContent={"center"}
              alignItems={"center"}
              mb={2}
              mx={20}
              bg={"gray.100"}
              color={"white"}
              fontSize={"6xl"}
              typeof="button"
              flexDirection={"column"}
              cursor={"pointer"}
            >
              {preview ? (
                <Image
                  alt="not found"
                  width={"200px"}
                  height={"200px"}
                  mx={20}
                  rounded={"full"}
                  src={preview}
                  objectFit={"cover"}
                  id="profile-image"
                />
              ) : (
                <label htmlFor="files">N</label>
              )}
            </Flex>
            <Flex h={50} mx={"auto"} justifyContent={"center"}>
              {!selectedImage ? (
                <Box>
                  <input
                    id="files"
                    type="file"
                    hidden
                    name="myImage"
                    onChange={(event) => {
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                  <Button
                    _hover={{ bg: "gray.100", color: "blue.300" }}
                    color={"white"}
                    bg={"blue.500"}
                  >
                    <FormLabel m={0} htmlFor="files">
                      Select Photo{" "}
                    </FormLabel>
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    _hover={{ bg: "gray.100", color: "orange.300" }}
                    bg={"orange.300"}
                    color={"white"}
                    onClick={() => setSelectedImage(null)}
                  >
                    Delete Photo
                  </Button>
                </Box>
              )}
            </Flex>

            <Stack mt="6" spacing="3">
              <Heading
                border={"1px"}
                padding={"7px"}
                borderColor={"rgba(50, 150, 80, 0.6)"}
                size="sm"
              >
                Fullname : {user.fullname}{" "}
              </Heading>
              <Heading
                border={"1px"}
                padding={"7px"}
                borderColor={"rgba(50, 150, 80, 0.6)"}
                size="sm"
              >
                e-mail : {user.email}{" "}
              </Heading>
              <Heading
                border={"1px"}
                padding={"7px"}
                borderColor={"rgba(50, 150, 80, 0.6)"}
                size="sm"
              >
                Role : {user.role}{" "}
              </Heading>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter p={2}>
            <ButtonGroup spacing="2">
              <Button
                _hover={{ bg: "red.200", color: "red.500" }}
                variant="solid"
                color={"white"}
                bg={"red.500"}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </motion.div>
    </Box>
  );
}

export default Profile;
