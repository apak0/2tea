import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";

function Footer() {
  return (
    <Box
      bg="gray.900"
      display={{ base: "block", md: "flex" }}
      justifyContent={"space-between"}
      color="white"
      py={4}
      mt={"auto"}
      px={10}
      textAlign={{ base: "center" }}
    >
      <Text
        fontSize="sm"
        mb={2}
        bgClip={"text"}
        bgGradient={"linear(to right, #005aa7, #fffde4)"}
      >
        Development by Muhammed Apak
      </Text>
      <Text
        fontSize="md"
        mb={2}
        bgClip="text"
        bgGradient={"linear(to right, #12c2e9, #c471ed, #f64f59)"}
      >
        &copy; {new Date().getFullYear()} Bizim Shop All rights reserved
      </Text>

      <Text
        fontSize="sm"
        bgClip={"text"}
        bgGradient={"linear(to right,  #7303c0, #ec38bc, #fdeff9);"}
      >
        Source code available on{" "}
        <Link
          href="https://github.com/apak0/Bizim-Shop"
          color="blue.300"
          isExternal
        >
          GitHub
        </Link>
      </Text>
    </Box>
  );
}

export default Footer;
