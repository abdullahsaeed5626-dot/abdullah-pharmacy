import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Box
      p={6}
      minH="70vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        textAlign="center"
        borderWidth="1px"
        borderColor="blackAlpha.500"
        borderRadius="15px"
        p={10}
        maxW="500px"
        width="100%"
      >
        <Heading size="2xl" color="black" mb={4}>
          404
        </Heading>

        <Heading size="md" color="black" mb={3}>
          Page Not Found
        </Heading>

        <Text color="black" mb={6}>
          The page you are looking for does not exist.
        </Text>

        <Link to="/">
          <Button colorPalette="blue" borderRadius="15px">
            Go to Dashboard
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default NotFound;
