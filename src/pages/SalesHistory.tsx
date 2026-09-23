import { useState } from "react";

import { Box, Button, Flex, Heading, Table, Text } from "@chakra-ui/react";

import { ReceiptText, User, ShoppingCart, Percent, Eye, X } from "lucide-react";

import { useStore, type Sale } from "../context/StoreContext";

function SalesHistory() {
  const { sales } = useStore();

  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  return (
    <Box p={6} maxW="1200px" mx="auto" minW="0">
      {/* Page Heading */}
      <Flex align="center" justify="center" gap={3} mb={2}>
        <ReceiptText size={28} color="black" />

        <Heading size="lg" color="black">
          Sales History
        </Heading>
      </Flex>

      <Text color="black" mb={8} textAlign="center">
        View all completed bills and their details.
      </Text>

      {/* Empty State */}
      {sales.length === 0 ? (
        <Box
          borderWidth="1px"
          borderColor="blackAlpha.500"
          borderRadius="15px"
          p={8}
          maxW="400px"
          width="100%"
          mx="auto"
          textAlign="center"
        >
          <ReceiptText
            size={32}
            color="black"
            style={{
              margin: "0 auto 12px",
            }}
          />

          <Text color="black">No sales recorded yet.</Text>
        </Box>
      ) : (
        /* Sales Table */
        <Box
          borderWidth="1px"
          borderColor="blackAlpha.500"
          borderRadius="15px"
          overflowX="auto"
          width="100%"
          minW="0"
        >
          <Table.Root variant="outline" minW="750px">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader color="black">Customer</Table.ColumnHeader>

                <Table.ColumnHeader color="black">Items</Table.ColumnHeader>

                <Table.ColumnHeader color="black">Discount</Table.ColumnHeader>

                <Table.ColumnHeader color="black">Total</Table.ColumnHeader>

                <Table.ColumnHeader color="black">Action</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {sales.map((sale) => (
                <Table.Row
                  key={sale.id}
                  _hover={{
                    bg: "gray.50",
                  }}
                >
                  <Table.Cell
                    color="black"
                    fontWeight="medium"
                    maxW="200px"
                    wordBreak="break-word"
                  >
                    {sale.customerName}
                  </Table.Cell>

                  <Table.Cell color="black">{sale.cart.length}</Table.Cell>

                  <Table.Cell color="black">{sale.discount}%</Table.Cell>

                  <Table.Cell color="black" fontWeight="medium">
                    Rs. {sale.finalTotal}
                  </Table.Cell>

                  <Table.Cell>
                    <Button
                      size="sm"
                      borderRadius="10px"
                      onClick={() => setSelectedSale(sale)}
                    >
                      <Eye size={15} />
                      View
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      )}

      {/* Bill Details */}
      {selectedSale && (
        <Box
          mt={8}
          borderWidth="1px"
          borderColor="blackAlpha.500"
          borderRadius="15px"
          p={6}
          minW="0"
          width="100%"
        >
          {/* Bill Details Header */}
          <Flex
            justify="space-between"
            align="center"
            gap={4}
            flexWrap="wrap"
            mb={6}
          >
            <Flex align="center" gap={2}>
              <ReceiptText size={21} color="black" />

              <Heading size="md" color="black">
                Bill Details
              </Heading>
            </Flex>

            <Button
              size="sm"
              borderRadius="10px"
              onClick={() => setSelectedSale(null)}
            >
              <X size={15} />
              Close
            </Button>
          </Flex>

          {/* Customer Information */}
          <Box
            borderWidth="1px"
            borderColor="blackAlpha.500"
            borderRadius="15px"
            p={5}
            mb={6}
            minW="0"
          >
            <Flex align="center" gap={2} mb={2}>
              <User size={18} color="black" />

              <Text fontWeight="normal" color="black">
                Customer
              </Text>
            </Flex>

            <Text
              fontSize="lg"
              fontWeight="bold"
              color="black"
              wordBreak="break-word"
              overflowWrap="anywhere"
            >
              {selectedSale.customerName}
            </Text>

            <Text fontSize="sm" color="black" mt={2} wordBreak="break-word">
              <strong>Bill No:</strong> #{selectedSale.id}
            </Text>
          </Box>

          {/* Medicine Table */}
          <Box
            borderWidth="1px"
            borderColor="blackAlpha.500"
            borderRadius="15px"
            overflowX="auto"
            width="100%"
            minW="0"
          >
            <Table.Root variant="outline" minW="650px">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader color="black">
                    Medicine
                  </Table.ColumnHeader>

                  <Table.ColumnHeader color="black">Price</Table.ColumnHeader>

                  <Table.ColumnHeader color="black">
                    Quantity
                  </Table.ColumnHeader>

                  <Table.ColumnHeader color="black">Total</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {selectedSale.cart.map((medicine) => (
                  <Table.Row
                    key={medicine.id}
                    _hover={{
                      bg: "gray.50",
                    }}
                  >
                    <Table.Cell
                      color="black"
                      fontWeight="medium"
                      maxW="250px"
                      wordBreak="break-word"
                      overflowWrap="anywhere"
                    >
                      {medicine.name}
                    </Table.Cell>

                    <Table.Cell color="black">Rs. {medicine.price}</Table.Cell>

                    <Table.Cell color="black">{medicine.quantity}</Table.Cell>

                    <Table.Cell color="black">
                      Rs. {medicine.price * medicine.quantity}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>

          {/* Bill Summary */}
          <Box
            mt={6}
            ml={{
              base: 0,
              md: "auto",
            }}
            maxW="400px"
            width="100%"
            minW="0"
            borderWidth="1px"
            borderColor="blackAlpha.500"
            borderRadius="15px"
            p={5}
          >
            <Flex align="center" gap={2} mb={5}>
              <ShoppingCart size={19} color="black" />

              <Text fontWeight="bold" color="black">
                Bill Summary
              </Text>
            </Flex>

            {/* Subtotal */}
            <Flex
              justify="space-between"
              align="center"
              gap={4}
              flexWrap="wrap"
              mb={3}
            >
              <Text color="black">Subtotal:</Text>

              <Text color="black">Rs. {selectedSale.subtotal}</Text>
            </Flex>

            {/* Discount */}
            <Flex
              justify="space-between"
              align="center"
              gap={4}
              flexWrap="wrap"
              mb={3}
            >
              <Flex align="center" gap={2} minW="0">
                <Percent size={16} color="black" />

                <Text color="black" wordBreak="break-word">
                  Discount ({selectedSale.discount}
                  %):
                </Text>
              </Flex>

              <Text color="black">- Rs. {selectedSale.discountAmount}</Text>
            </Flex>

            {/* Final Total */}
            <Box
              borderTopWidth="1px"
              borderColor="blackAlpha.500"
              pt={4}
              mt={4}
            >
              <Flex
                justify="space-between"
                align="center"
                gap={4}
                flexWrap="wrap"
              >
                <Text fontSize="lg" fontWeight="bold" color="black">
                  Final Total:
                </Text>

                <Text fontSize="xl" fontWeight="bold" color="black">
                  Rs. {selectedSale.finalTotal}
                </Text>
              </Flex>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default SalesHistory;
