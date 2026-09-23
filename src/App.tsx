import { Box, Flex } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import AddMedicine from "./pages/AddMedicine";
import CreateBill from "./pages/CreateBill";
import SalesHistory from "./pages/SalesHistory";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Box height="100vh" overflow="hidden">
      {/* Navbar */}
      <Box className="no-print">
        <Navbar />
      </Box>

      {/* Main Layout */}
      <Flex height="calc(100vh - 81px)">
        {/* Sidebar */}
        <Box
          className="no-print"
          display={{ base: "none", md: "block" }}
          flexShrink={0}
        >
          <Sidebar />
        </Box>

        {/* Page Content */}
        <Box flex="1" minW="0" overflowY="auto" overflowX="hidden" bg="white">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/inventory" element={<Inventory />} />

            <Route path="/add-medicine" element={<AddMedicine />} />

            <Route path="/create-bill" element={<CreateBill />} />

            <Route path="/sales-history" element={<SalesHistory />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
