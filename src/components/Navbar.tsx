import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { Pill } from "lucide-react";

function Navbar() {
  return (
    <Box
      bg="blue.600"
      color="white"
      px={{ base: 4, md: 6 }}
      py={4}
      borderBottomWidth="1px"
      borderColor="blue.700"
    >
      <Flex align="center" justify="center" gap={3}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="white"
          borderRadius="12px"
          width="42px"
          height="42px"
        >
          <Pill size={23} color="black" />
        </Box>

        <Box>
          <Heading size="md">Abdullah Pharmacy</Heading>

          <Text fontSize="sm" mt={1}>
            Medical Store Management System
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbar;
