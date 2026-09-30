import { Box, Text, Flex, Stack, Separator, Table } from "@chakra-ui/react";

export type CartItem = {
  id: string | number;
  name: string;
  batchNo?: string;
  expDate?: string;
  price: number;
  quantity: number;
};

export type Sale = {
  id: string | number;
  customerName?: string;
  customerPhone?: string;
  paymentMethod?: string;
  createdAt?: string | Date;
  cart: CartItem[];
  subtotal: number;
  discount: number;
  discountAmount: number;
  finalTotal: number;
};

type Props = {
  sale: Sale;
};

function PrintableBill({ sale }: Props) {
  const saleDate = sale.createdAt ? new Date(sale.createdAt) : new Date();
  const formattedDate = saleDate.toLocaleDateString();
  const formattedTime = saleDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box
      className="print-receipt"
      width={{ base: "100%", md: "80mm" }}
      mx="auto"
      p={4}
      bg="white"
      color="black"
      fontFamily="mono"
      fontSize="xs"
    >
      {/* 1. Header & Store Info */}
      <Stack gap={1} textAlign="center" mb={3}>
        <Text fontSize="md" fontWeight="bold" textTransform="uppercase">
          Abdullah Pharmacy
        </Text>
        <Text fontSize="2xs">
          Main Commercial Market, Sector G-9, Islamabad
        </Text>
        <Text fontSize="2xs">Phone: +92 307 8029162 | Reg #: PH-89421</Text>
        <Text fontSize="2xs" fontWeight="semibold" mt={1}>
          CASH RECEIPT / TAX INVOICE
        </Text>
      </Stack>

      <Separator variant="dashed" borderColor="black" my={2} />

      {/* 2. Transaction Meta Info */}
      <Stack gap={1} mb={2}>
        <Flex justify="space-between">
          <Text fontWeight="bold">Invoice #:</Text>
          <Text>{sale.id}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text>Date:</Text>
          <Text>
            {formattedDate} {formattedTime}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text>Customer:</Text>
          <Text fontWeight="medium">
            {sale.customerName?.trim() ? sale.customerName : "Walk-in Customer"}
          </Text>
        </Flex>
        {sale.customerPhone && (
          <Flex justify="space-between">
            <Text>Phone:</Text>
            <Text>{sale.customerPhone}</Text>
          </Flex>
        )}
        <Flex justify="space-between">
          <Text>Payment Mode:</Text>
          <Text>{sale.paymentMethod || "Cash"}</Text>
        </Flex>
      </Stack>

      <Separator variant="dashed" borderColor="black" my={2} />

      {/* 3. Itemized Products Table */}
      <Box mb={2}>
        <Table.Root size="sm" variant="line">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader
                color="black"
                fontSize="xs"
                p={1}
                textAlign="left"
              >
                Item
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="black"
                fontSize="xs"
                p={1}
                textAlign="center"
              >
                Qty
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="black"
                fontSize="xs"
                p={1}
                textAlign="right"
              >
                Price
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="black"
                fontSize="xs"
                p={1}
                textAlign="right"
              >
                Total
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {sale.cart.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell p={1} verticalAlign="top">
                  <Text fontWeight="medium" wordBreak="break-word">
                    {item.name}
                  </Text>
                  {(item.batchNo || item.expDate) && (
                    <Text fontSize="2xs" color="gray.700">
                      {item.batchNo ? `B: ${item.batchNo} ` : ""}
                      {item.expDate ? `Exp: ${item.expDate}` : ""}
                    </Text>
                  )}
                </Table.Cell>
                <Table.Cell
                  p={1}
                  textAlign="center"
                  verticalAlign="top"
                  fontWeight="medium"
                >
                  {item.quantity}
                </Table.Cell>
                <Table.Cell p={1} textAlign="right" verticalAlign="top">
                  {item.price.toFixed(2)}
                </Table.Cell>
                <Table.Cell
                  p={1}
                  textAlign="right"
                  verticalAlign="top"
                  fontWeight="semibold"
                >
                  {(item.price * item.quantity).toFixed(2)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      <Separator variant="dashed" borderColor="black" my={2} />

      {/* 4. Calculation Summary */}
      <Stack gap={1} mb={3}>
        <Flex justify="space-between">
          <Text>Subtotal:</Text>
          <Text>Rs. {sale.subtotal.toFixed(2)}</Text>
        </Flex>

        {sale.discount > 0 && (
          <Flex justify="space-between">
            <Text>Discount ({sale.discount}%):</Text>
            <Text>- Rs. {sale.discountAmount.toFixed(2)}</Text>
          </Flex>
        )}

        <Separator variant="solid" borderColor="black" my={1} />

        <Flex justify="space-between" fontWeight="bold" fontSize="sm">
          <Text>Net Amount:</Text>
          <Text>Rs. {sale.finalTotal.toFixed(2)}</Text>
        </Flex>
      </Stack>

      <Separator variant="dashed" borderColor="black" my={2} />

      {/* 5. Footer */}
      <Stack gap={1} textAlign="center" fontSize="2xs" mt={3}>
        <Text fontWeight="semibold">
          Thank you for trusting Abdullah Pharmacy!
        </Text>
        <Text>
          * Items returned/exchanged within 7 days with original invoice.
        </Text>
        <Text>* Refrigerated / Cold-chain items are non-returnable.</Text>
        <Text mt={2} fontStyle="italic">
          Get Well Soon!
        </Text>
      </Stack>
    </Box>
  );
}

export default PrintableBill;
