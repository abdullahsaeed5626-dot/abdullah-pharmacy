import {
  Box,
  Button,
  Drawer,
  Flex,
  Heading,
  IconButton,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  Pill,
  Menu,
  LayoutDashboard,
  Package,
  ReceiptText,
  History,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      bg="blue.600"
      color="white"
      px={{ base: 4, md: 6 }}
      py={4}
      borderBottomWidth="1px"
      borderColor="blue.700"
    >
      <Flex align="center" position="relative" minH="50px">
        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          variant="outline"
          color="white"
          aria-label="Open menu"
          position="absolute"
          left="0"
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          onClick={() => setIsOpen(true)}
        >
          <Menu size={22} />
        </IconButton>

        {/* Pharmacy Logo + Name */}
        <Flex align="center" gap={3} width="100%" justify="center">
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
      </Flex>
      {/* Empty space on mobile to keep title centered */}
      <Box display={{ base: "block", md: "none" }} width="40px" />

      {/* Mobile Drawer */}
      <Drawer.Root
        open={isOpen}
        onOpenChange={(details) => setIsOpen(details.open)}
        placement="start"
      >
        <Portal>
          <Drawer.Backdrop />

          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title color="black">Abdullah Pharmacy</Drawer.Title>
              </Drawer.Header>

              <Drawer.Body>
                <VStack align="stretch" gap={3}>
                  {/* Dashboard */}
                  <NavLink to="/" onClick={() => setIsOpen(false)}>
                    <Button
                      width="100%"
                      justifyContent="flex-start"
                      gap={3}
                      variant="outline"
                      color="black"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Button>
                  </NavLink>

                  {/* Inventory */}
                  <NavLink to="/inventory" onClick={() => setIsOpen(false)}>
                    <Button
                      width="100%"
                      justifyContent="flex-start"
                      gap={3}
                      variant="outline"
                      color="black"
                    >
                      <Package size={18} />
                      Inventory
                    </Button>
                  </NavLink>

                  {/* Add Medicine */}
                  <NavLink to="/add-medicine" onClick={() => setIsOpen(false)}>
                    <Button
                      width="100%"
                      justifyContent="flex-start"
                      gap={3}
                      variant="outline"
                      color="black"
                    >
                      <Pill size={18} />
                      Add Medicine
                    </Button>
                  </NavLink>

                  {/* Create Bill */}
                  <NavLink to="/create-bill" onClick={() => setIsOpen(false)}>
                    <Button
                      width="100%"
                      justifyContent="flex-start"
                      gap={3}
                      variant="outline"
                      color="black"
                    >
                      <ReceiptText size={18} />
                      Create Bill
                    </Button>
                  </NavLink>

                  {/* Sales History */}
                  <NavLink to="/sales-history" onClick={() => setIsOpen(false)}>
                    <Button
                      width="100%"
                      justifyContent="flex-start"
                      gap={3}
                      variant="outline"
                      color="black"
                    >
                      <History size={18} />
                      Sales History
                    </Button>
                  </NavLink>
                </VStack>
              </Drawer.Body>

              <Drawer.CloseTrigger />
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
}

export default Navbar;
