import { Box, Text, Flex, Stack, Separator } from "@chakra-ui/react";

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
  const formattedDate = saleDate.toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedTime = saleDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box
      className="print-receipt"
      width="300px"
      mx="auto"
      my={4}
      p={4}
      bg="white"
      color="black"
      fontFamily="'Courier New', Courier, monospace"
      fontSize="12px"
      lineHeight="1.4"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="sm"
      boxShadow="sm"
    >
      {/* 1. Store Header */}
      <Stack gap={0.5} textAlign="center" mb={2}>
        <Text fontSize="15px" fontWeight="bold" textTransform="uppercase">
          Abdullah Pharmacy
        </Text>
        <Text fontSize="10px">
          Main Commercial Market, Sector G-9, Islamabad
        </Text>
        <Text fontSize="10px">Phone: +92 307 8029162 | Reg #: PH-89421</Text>
        <Text fontSize="10px" fontWeight="bold" mt={1}>
          CASH RECEIPT / TAX INVOICE
        </Text>
      </Stack>

      <Separator variant="dashed" borderColor="black" my={1.5} />

      {/* 2. Customer & Bill Meta */}
      <Stack gap={0.5} mb={2} fontSize="11px">
        <Flex justify="space-between">
          <Text fontWeight="bold">Invoice #:</Text>
          <Text fontWeight="bold">#{sale.id}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text>Date & Time:</Text>
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

      <Separator variant="dashed" borderColor="black" my={1.5} />

      {/* 3. Items Table */}
      <Box mb={2}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "11px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px dashed black" }}>
              <th style={{ textAlign: "left", paddingBottom: "4px" }}>Item</th>
              <th style={{ textAlign: "center", paddingBottom: "4px" }}>Qty</th>
              <th style={{ textAlign: "right", paddingBottom: "4px" }}>
                Price
              </th>
              <th style={{ textAlign: "right", paddingBottom: "4px" }}>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {sale.cart.map((item) => (
              <tr key={item.id}>
                <td style={{ paddingTop: "4px", paddingBottom: "4px" }}>
                  <div style={{ fontWeight: "600", wordBreak: "break-word" }}>
                    {item.name}
                  </div>
                  {(item.batchNo || item.expDate) && (
                    <div style={{ fontSize: "9px", color: "#444" }}>
                      {item.batchNo ? `B:${item.batchNo} ` : ""}
                      {item.expDate ? `Exp:${item.expDate}` : ""}
                    </div>
                  )}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    verticalAlign: "top",
                    paddingTop: "4px",
                  }}
                >
                  {item.quantity}
                </td>
                <td
                  style={{
                    textAlign: "right",
                    verticalAlign: "top",
                    paddingTop: "4px",
                  }}
                >
                  {item.price.toFixed(2)}
                </td>
                <td
                  style={{
                    textAlign: "right",
                    verticalAlign: "top",
                    paddingTop: "4px",
                    fontWeight: "bold",
                  }}
                >
                  {(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <Separator variant="dashed" borderColor="black" my={1.5} />

      {/* 4. Calculation Totals */}
      <Stack gap={1} mb={2} fontSize="11px">
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

        <Flex justify="space-between" fontWeight="bold" fontSize="13px">
          <Text>Net Amount:</Text>
          <Text>Rs. {sale.finalTotal.toFixed(2)}</Text>
        </Flex>
      </Stack>

      <Separator variant="dashed" borderColor="black" my={1.5} />

      {/* 5. Medical Disclaimers & Footer */}
      <Stack gap={0.5} textAlign="center" fontSize="9px" mt={2}>
        <Text fontWeight="bold">Thank you for visiting Abdullah Pharmacy!</Text>
        <Text>* Exchange/Return allowed within 7 days with bill.</Text>
        <Text>* Cold chain (refrigerated) medicines are non-returnable.</Text>
        <Text fontStyle="italic" mt={1}>
          Get Well Soon!
        </Text>
      </Stack>
    </Box>
  );
}

export default PrintableBill;
