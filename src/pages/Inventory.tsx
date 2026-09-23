import { useState } from "react";

import { Box, Heading, Input, Table, Text, Flex } from "@chakra-ui/react";

import { Search, PackageCheck, AlertTriangle } from "lucide-react";

import { useStore } from "../context/StoreContext";

function Inventory() {
  const [search, setSearch] = useState("");

  const { medicines } = useStore();

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box p={6} maxW="1100px" mx="auto" minW="0">
      <Heading size="lg" mb={2} color="black">
        Medicine Inventory
      </Heading>

      <Text color="black" mb={8}>
        View and search all medicines in your pharmacy.
      </Text>

      {/* Search */}
      <Box
        borderWidth="1px"
        borderColor="blackAlpha.500"
        borderRadius="15px"
        p={6}
        mb={6}
      >
        <Flex align="center" gap={2} mb={3}>
          <Search size={20} color="black" />

          <Text fontWeight="normal" color="black">
            Search Medicine
          </Text>
        </Flex>

        <Input
          placeholder="Search medicine..."
          width="100%"
          maxW="500px"
          color="black"
          borderColor="blackAlpha.500"
          borderRadius="15px"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </Box>

      {/* Inventory Table */}
      <Box
        borderWidth="1px"
        borderColor="blackAlpha.500"
        borderRadius="15px"
        overflowX="auto"
        width="100%"
      >
        <Table.Root variant="outline" minW="700px">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader color="black">Medicine</Table.ColumnHeader>

              <Table.ColumnHeader color="black">Category</Table.ColumnHeader>

              <Table.ColumnHeader color="black">Price</Table.ColumnHeader>

              <Table.ColumnHeader color="black">
                Available Stock
              </Table.ColumnHeader>

              <Table.ColumnHeader color="black">Status</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredMedicines.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={5}>
                  <Box py={6} textAlign="center">
                    <Text color="black">No medicine found.</Text>
                  </Box>
                </Table.Cell>
              </Table.Row>
            ) : (
              filteredMedicines.map((medicine) => {
                const isLowStock = medicine.stock <= 10;

                return (
                  <Table.Row
                    key={medicine.id}
                    _hover={{
                      bg: "gray.50",
                    }}
                  >
                    <Table.Cell color="black" fontWeight="medium">
                      {medicine.name}
                    </Table.Cell>

                    <Table.Cell color="black">{medicine.category}</Table.Cell>

                    <Table.Cell color="black">Rs. {medicine.price}</Table.Cell>

                    <Table.Cell color="black">{medicine.stock}</Table.Cell>

                    <Table.Cell>
                      <Flex align="center" gap={2}>
                        {isLowStock ? (
                          <AlertTriangle size={17} color="black" />
                        ) : (
                          <PackageCheck size={17} color="black" />
                        )}

                        <Text color="black" fontWeight="bold">
                          {isLowStock ? "Low Stock" : "In Stock"}
                        </Text>
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}

export default Inventory;
