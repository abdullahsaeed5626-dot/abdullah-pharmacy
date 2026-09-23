import { Box, Button, VStack } from "@chakra-ui/react";

import {
  LayoutDashboard,
  Package,
  Pill,
  ReceiptText,
  History,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <Box
      width={{ base: "180px", md: "220px" }}
      height="100%"
      bg="gray.50"
      p={4}
      borderRightWidth="1px"
      borderColor="blackAlpha.500"
    >
      <VStack align="stretch" gap={3}>
        {/* Dashboard */}
        <NavLink to="/" style={{ width: "100%" }}>
          {({ isActive }) => (
            <Button
              width="100%"
              justifyContent="flex-start"
              gap={3}
              borderRadius="15px"
              colorPalette={isActive ? "blue" : undefined}
              variant={isActive ? "solid" : "outline"}
            >
              <LayoutDashboard size={17} />
              Dashboard
            </Button>
          )}
        </NavLink>

        {/* Inventory */}
        <NavLink to="/inventory" style={{ width: "100%" }}>
          {({ isActive }) => (
            <Button
              width="100%"
              justifyContent="flex-start"
              gap={3}
              borderRadius="15px"
              colorPalette={isActive ? "blue" : undefined}
              variant={isActive ? "solid" : "outline"}
            >
              <Package size={17} />
              Inventory
            </Button>
          )}
        </NavLink>

        {/* Add Medicine */}
        <NavLink to="/add-medicine" style={{ width: "100%" }}>
          {({ isActive }) => (
            <Button
              width="100%"
              justifyContent="flex-start"
              gap={3}
              borderRadius="15px"
              colorPalette={isActive ? "blue" : undefined}
              variant={isActive ? "solid" : "outline"}
            >
              <Pill size={17} />
              Add Medicine
            </Button>
          )}
        </NavLink>

        {/* Create Bill */}
        <NavLink to="/create-bill" style={{ width: "100%" }}>
          {({ isActive }) => (
            <Button
              width="100%"
              justifyContent="flex-start"
              gap={3}
              borderRadius="15px"
              colorPalette={isActive ? "blue" : undefined}
              variant={isActive ? "solid" : "outline"}
            >
              <ReceiptText size={17} />
              Create Bill
            </Button>
          )}
        </NavLink>

        {/* Sales History */}
        <NavLink to="/sales-history" style={{ width: "100%" }}>
          {({ isActive }) => (
            <Button
              width="100%"
              justifyContent="flex-start"
              gap={3}
              borderRadius="15px"
              colorPalette={isActive ? "blue" : undefined}
              variant={isActive ? "solid" : "outline"}
            >
              <History size={17} />
              Sales History
            </Button>
          )}
        </NavLink>
      </VStack>
    </Box>
  );
}

export default Sidebar;
