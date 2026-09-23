import { Box, Heading, Table, Text, Flex } from "@chakra-ui/react";

import type { Sale } from "../context/StoreContext";

type Props = {
  sale: Sale;
};

function PrintableBill({ sale }: Props) {
  const now = new Date();

  const date = now.toLocaleDateString();

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box className="print-receipt" minW="0" width="100%" overflow="hidden">
      {/* Pharmacy Header */}
      <Box textAlign="center" mb={6}>
        <Heading size="lg" color="black">
          Abdullah Pharmacy
        </Heading>

        <Text fontSize="sm" color="black" mt={1}>
          Medical Store & Pharmacy
        </Text>

        <Text fontSize="sm" color="black">
          Your Health, Our Priority
        </Text>
      </Box>

      {/* Customer Information */}
      <Box borderBottomWidth="1px" borderColor="blackAlpha.500" pb={3} mb={5}>
        <Flex justify="space-between" align="start" gap={4} flexWrap="wrap">
          <Text color="black" wordBreak="break-word">
            <strong>Customer:</strong> {sale.customerName}
          </Text>

          <Text color="black" wordBreak="break-word">
            <strong>Bill No:</strong> #{sale.id}
          </Text>
        </Flex>

        <Flex
          justify="space-between"
          align="start"
          gap={4}
          flexWrap="wrap"
          mt={2}
        >
          <Text fontSize="sm" color="black">
            <strong>Date:</strong> {date}
          </Text>

          <Text fontSize="sm" color="black">
            <strong>Time:</strong> {time}
          </Text>
        </Flex>
      </Box>

      {/* Medicine Table */}
      <Box width="100%" overflowX="auto">
        <Table.Root variant="outline" minW="500px">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader color="black">Medicine</Table.ColumnHeader>

              <Table.ColumnHeader color="black">Price</Table.ColumnHeader>

              <Table.ColumnHeader color="black">Qty</Table.ColumnHeader>

              <Table.ColumnHeader color="black">Total</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {sale.cart.map((medicine) => (
              <Table.Row key={medicine.id}>
                <Table.Cell color="black" wordBreak="break-word">
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

      {/* Receipt Summary */}
      <Box mt={6} mx="auto" maxW="400px" width="100%" minW="0">
        {/* Subtotal */}
        <Flex
          justify="space-between"
          align="center"
          gap={4}
          flexWrap="wrap"
          mb={3}
        >
          <Text color="black">Subtotal:</Text>

          <Text color="black">Rs. {sale.subtotal}</Text>
        </Flex>

        {/* Discount */}
        <Flex
          justify="space-between"
          align="center"
          gap={4}
          flexWrap="wrap"
          mb={3}
        >
          <Text color="black" wordBreak="break-word">
            Discount ({sale.discount}%):
          </Text>

          <Text color="black">- Rs. {sale.discountAmount}</Text>
        </Flex>

        {/* Final Total */}
        <Box borderTopWidth="1px" borderColor="blackAlpha.500" mt={3} pt={4}>
          <Flex
            justify="space-between"
            align="center"
            gap={4}
            flexWrap="wrap"
            fontWeight="bold"
            fontSize="lg"
          >
            <Text color="black">Final Total:</Text>

            <Text color="black">Rs. {sale.finalTotal}</Text>
          </Flex>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        textAlign="center"
        mt={8}
        pt={4}
        borderTopWidth="1px"
        borderColor="blackAlpha.500"
      >
        <Text fontSize="sm" color="black">
          Thank you for visiting Abdullah Pharmacy
        </Text>

        <Text fontSize="xs" color="black" mt={1}>
          Please keep this bill for your records.
        </Text>
      </Box>
    </Box>
  );
}

export default PrintableBill;
