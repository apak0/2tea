import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";

function Error404() {
  return (
    <Flex
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      justifyContent="center"
      alignItems="center"
    >
      <Box boxShadow="dark-lg" p="6" rounded="md" bg="white" boxSize="sm">
        <Image
          src="https://img.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg?w=2000"
          alt="Dan Abramov"
        />
      </Box>
    </Flex>
  );
}

export default Error404;
