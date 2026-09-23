import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import {
  Pill,
  Package,
  Receipt,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";

import { useStore } from "../context/StoreContext";

function Dashboard() {
  const { medicines, sales } = useStore();

  const totalMedicines = medicines.length;

  const totalStock = medicines.reduce(
    (total, medicine) => total + medicine.stock,
    0,
  );

  const totalSales = sales.reduce((total, sale) => total + sale.finalTotal, 0);

  const totalBills = sales.length;

  const lowStockMedicines = medicines.filter(
    (medicine) => medicine.stock <= 10,
  ).length;

  return (
    <Box p={6} maxW="1200px" mx="auto">
      <Heading size="lg" mb={2} color="black">
        Dashboard
      </Heading>

      <Text color="black" mb={8}>
        Overview of your pharmacy
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
        {/* Total Medicines */}
        <Box
          borderWidth="1px"
          borderColor="blackAlpha.500"
          borderRadius="15px"
          p={7}
          transition="all 0.2s"
          _hover={{
            transform: "translateY(-3px)",
            shadow: "md",
          }}
        >
          <Box mb={4}>
            <Pill size={28} color="black" />
          </Box>

          <Text fontSize="sm" color="black" mb={3}>
            Total Medicines
          </Text>

          <Heading size="xl" color="black">
            {totalMedicines}
          </Heading>
        </Box>

        {/* Available Stock */}
        <Box
          borderWidth="1px"
          borderColor="blackAlpha.500"
          borderRadius="15px"
          p={7}
          transition="all 0.2s"
          _hover={{
            transform: "translateY(-3px)",
            shadow: "md",
          }}
        >
          <Box mb={4}>
            <Package size={28} color="black" />
          </Box>

          <Text fontSize="sm" color="black" mb={3}>
            Available Stock
          </Text>

          <Heading size="xl" color="black">
            {totalStock}
          </Heading>
        </Box>

        {/* Total Sales */}
        <Box
          borderWidth="1px"
          borderColor="blackAlpha.500"
          borderRadius="15px"
          p={7}
          transition="all 0.2s"
          _hover={{
            transform: "translateY(-3px)",
            shadow: "md",
          }}
        >
          <Box mb={4}>
            <ShoppingCart size={28} color="black" />
          </Box>

          <Text fontSize="sm" color="black" mb={3}>
            Total Sales
          </Text>

          <Heading size="xl" color="black">
            Rs. {totalSales}
          </Heading>
        </Box>

        {/* Total Bills */}
        <Box
          borderWidth="1px"
          borderColor="blackAlpha.500"
          borderRadius="15px"
          p={7}
          transition="all 0.2s"
          _hover={{
            transform: "translateY(-3px)",
            shadow: "md",
          }}
        >
          <Box mb={4}>
            <Receipt size={28} color="black" />
          </Box>

          <Text fontSize="sm" color="black" mb={3}>
            Total Bills
          </Text>

          <Heading size="xl" color="black">
            {totalBills}
          </Heading>
        </Box>

        {/* Low Stock */}
        <Box
          borderWidth="1px"
          borderColor="blackAlpha.500"
          borderRadius="15px"
          p={7}
          transition="all 0.2s"
          _hover={{
            transform: "translateY(-3px)",
            shadow: "md",
          }}
        >
          <Box mb={4}>
            <AlertTriangle size={28} color="black" />
          </Box>

          <Text fontSize="sm" color="black" mb={3}>
            Low Stock Medicines
          </Text>

          <Heading size="xl" color="black">
            {lowStockMedicines}
          </Heading>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
