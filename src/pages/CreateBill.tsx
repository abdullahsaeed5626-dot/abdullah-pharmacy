import { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  User,
  Search,
  Pill,
  ShoppingCart,
  Trash2,
  ReceiptText,
  Percent,
  Plus,
} from "lucide-react";

import { useStore, type Medicine, type Sale } from "../context/StoreContext";

import PrintableBill from "../components/PrintableBill";

type CartItem = Medicine & {
  quantity: number;
};

function CreateBill() {
  const { medicines, updateStock, addSale } = useStore();

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [customerName, setCustomerName] = useState("");
  const [discount, setDiscount] = useState("");
  const [savedSale, setSavedSale] = useState<Sale | null>(null);

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase()),
  );

  const subtotal = cart.reduce(
    (total, medicine) => total + medicine.price * medicine.quantity,
    0,
  );

  const discountNumber = Number(discount || 0);

  const discountAmount = (subtotal * discountNumber) / 100;

  const finalTotal = subtotal - discountAmount;

  function handleAddMedicine(medicine: Medicine) {
    const quantity = quantities[medicine.id] ?? 0;

    const cartItem = cart.find((item) => item.id === medicine.id);

    const temporaryStock = medicine.stock - (cartItem?.quantity || 0);

    if (
      !Number.isFinite(quantity) ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      alert("Quantity must be a whole number greater than 0.");
      return;
    }

    if (quantity > temporaryStock) {
      alert(`Only ${temporaryStock} units of ${medicine.name} are available.`);
      return;
    }

    setCart((previousCart) => {
      const existingMedicine = previousCart.find(
        (item) => item.id === medicine.id,
      );

      if (existingMedicine) {
        return previousCart.map((item) =>
          item.id === medicine.id ? { ...item, quantity } : item,
        );
      }

      return [
        ...previousCart,
        {
          ...medicine,
          quantity,
        },
      ];
    });
  }

  function handleRemoveMedicine(medicineId: number) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== medicineId),
    );
  }

  function handleSaveBill() {
    if (!customerName.trim()) {
      alert("Please enter customer name.");
      return;
    }

    if (cart.length === 0) {
      alert("Please add at least one medicine.");
      return;
    }

    if (
      !Number.isFinite(discountNumber) ||
      discountNumber < 0 ||
      discountNumber > 100
    ) {
      alert("Discount must be between 0% and 100%.");
      return;
    }

    for (const cartItem of cart) {
      const medicine = medicines.find((item) => item.id === cartItem.id);

      if (
        medicine &&
        (!Number.isInteger(cartItem.quantity) ||
          cartItem.quantity <= 0 ||
          cartItem.quantity > medicine.stock)
      ) {
        alert(
          `Not enough stock for ${medicine.name}. Available stock: ${medicine.stock}`,
        );
        return;
      }
    }

    cart.forEach((medicine) => {
      updateStock(medicine.id, medicine.quantity);
    });

    const newSale = {
      customerName: customerName.trim(),
      cart,
      subtotal,
      discount: discountNumber,
      discountAmount,
      finalTotal,
    };

    addSale(newSale);

    setSavedSale({
      ...newSale,
      id: Date.now(),
    });

    setCart([]);
    setCustomerName("");
    setDiscount("");
    setQuantities({});
    setSearch("");

    alert("Bill saved successfully.");
  }

  function handlePrintReceipt() {
    const receipt = document.querySelector(".print-receipt");

    if (!receipt) {
      return;
    }

    const printWindow = window.open("", "_blank", "width=900,height=700");

    if (!printWindow) {
      alert("Please allow pop-ups to print the receipt.");
      return;
    }

    const styles = Array.from(
      document.querySelectorAll("link[rel='stylesheet'], style"),
    )
      .map((style) => style.outerHTML)
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>
            Abdullah Pharmacy - Receipt
          </title>

          ${styles}

          <style>
            @page {
              margin: 8mm;
            }

            html,
            body {
              margin: 0;
              padding: 0;
              background: white;
            }

            .print-receipt {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              padding: 22px;
              box-sizing: border-box;
              font-size: 14px;
            }

            .no-print {
              display: none !important;
            }
          </style>
        </head>

        <body>
          ${receipt.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  }

  return (
    <Box p={6} maxW="1100px" mx="auto" minW="0">
      {/* Page Heading */}
      <Flex align="center" justify="center" gap={3} mb={2}>
        <ReceiptText size={28} color="black" />

        <Heading size="lg" color="black">
          Create Bill
        </Heading>
      </Flex>

      <Text color="black" mb={8} textAlign="center">
        Create a customer bill and manage medicine quantities.
      </Text>

      {/* Customer Name */}
      <Box
        borderWidth="1px"
        borderColor="blackAlpha.500"
        borderRadius="15px"
        p={6}
        mb={6}
        minW="0"
      >
        <Flex align="center" gap={2} mb={3}>
          <User size={19} color="black" />

          <Text fontWeight="normal" color="black">
            Customer Name
          </Text>
        </Flex>

        <Input
          placeholder="Enter customer name"
          width="100%"
          maxW="500px"
          color="black"
          borderColor="blackAlpha.500"
          borderRadius="15px"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
        />
      </Box>

      {/* Search Medicine */}
      <Box
        borderWidth="1px"
        borderColor="blackAlpha.500"
        borderRadius="15px"
        p={6}
        mb={6}
        minW="0"
      >
        <Flex align="center" gap={2} mb={3}>
          <Search size={19} color="black" />

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

      {/* Available Medicines */}
      <Box
        borderWidth="1px"
        borderColor="blackAlpha.500"
        borderRadius="15px"
        p={6}
        mb={6}
        minW="0"
      >
        <Flex align="center" gap={2} mb={5}>
          <Pill size={21} color="black" />

          <Heading size="md" color="black">
            Available Medicines
          </Heading>
        </Flex>

        <VStack align="stretch" gap={4}>
          {filteredMedicines.length === 0 ? (
            <Box
              borderWidth="1px"
              borderColor="blackAlpha.500"
              borderRadius="15px"
              p={6}
              textAlign="center"
            >
              <Text color="black">No medicine found.</Text>
            </Box>
          ) : (
            filteredMedicines.map((medicine) => {
              const cartItem = cart.find((item) => item.id === medicine.id);

              const temporaryStock = medicine.stock - (cartItem?.quantity || 0);

              return (
                <Box
                  key={medicine.id}
                  borderWidth="1px"
                  borderColor="blackAlpha.500"
                  borderRadius="15px"
                  p={5}
                  minW="0"
                  transition="all 0.2s"
                  _hover={{
                    shadow: "md",
                    transform: "translateY(-2px)",
                  }}
                >
                  {/* Medicine Information */}
                  <Flex
                    direction={{
                      base: "column",
                      md: "row",
                    }}
                    justify="space-between"
                    align={{
                      base: "stretch",
                      md: "start",
                    }}
                    mb={5}
                    gap={4}
                    minW="0"
                  >
                    <Box minW="0" flex="1">
                      <Flex align="center" gap={2} flexWrap="wrap">
                        <Text fontSize="sm" color="black">
                          {medicine.category}
                        </Text>

                        <Text
                          fontWeight="bold"
                          fontSize="lg"
                          color="black"
                          wordBreak="break-word"
                          overflowWrap="anywhere"
                        >
                          {medicine.name}
                        </Text>
                      </Flex>
                    </Box>

                    <Box
                      textAlign={{
                        base: "left",
                        md: "right",
                      }}
                      minW="0"
                    >
                      <Text fontWeight="bold" fontSize="lg" color="black">
                        Rs. {medicine.price}
                      </Text>

                      <Text
                        fontSize="sm"
                        color="black"
                        mt={1}
                        wordBreak="break-word"
                      >
                        Available stock: {temporaryStock}
                      </Text>
                    </Box>
                  </Flex>

                  {/* Quantity + Add */}
                  <Flex
                    align="center"
                    gap={3}
                    flexWrap="wrap"
                    justify={{ base: "center", md: "flex-start" }}
                  >
                    <Input
                      type="number"
                      min={1}
                      max={temporaryStock}
                      step={1}
                      width="100px"
                      color="black"
                      borderColor="blackAlpha.500"
                      borderRadius="15px"
                      value={quantities[medicine.id] ?? ""}
                      placeholder="Qty"
                      onChange={(event) =>
                        setQuantities((previous) => ({
                          ...previous,
                          [medicine.id]: Number(event.target.value),
                        }))
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleAddMedicine(medicine);
                        }
                      }}
                    />

                    <Button
                      colorPalette="blue"
                      borderRadius="15px"
                      onClick={() => handleAddMedicine(medicine)}
                    >
                      <Plus size={17} />
                      Add
                    </Button>
                  </Flex>
                </Box>
              );
            })
          )}
        </VStack>
      </Box>

      {/* Selected Medicines */}
      <Box
        borderWidth="1px"
        borderColor="blackAlpha.500"
        borderRadius="15px"
        p={6}
        mb={6}
        minW="0"
      >
        <Flex align="center" gap={2} mb={5}>
          <ShoppingCart size={21} color="black" />

          <Heading size="md" color="black">
            Selected Medicines
          </Heading>
        </Flex>

        {cart.length === 0 ? (
          <Box
            borderWidth="1px"
            borderColor="blackAlpha.500"
            borderRadius="15px"
            p={6}
            textAlign="center"
          >
            <Text color="black">No medicines selected yet.</Text>
          </Box>
        ) : (
          <>
            {/* Selected Medicine Table */}
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
                    <Table.ColumnHeader color="black">
                      Medicine
                    </Table.ColumnHeader>

                    <Table.ColumnHeader color="black">Price</Table.ColumnHeader>

                    <Table.ColumnHeader color="black">
                      Quantity
                    </Table.ColumnHeader>

                    <Table.ColumnHeader color="black">Total</Table.ColumnHeader>

                    <Table.ColumnHeader color="black">
                      Action
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {cart.map((medicine) => (
                    <Table.Row
                      key={medicine.id}
                      _hover={{
                        bg: "gray.50",
                      }}
                    >
                      <Table.Cell color="black" fontWeight="medium">
                        {medicine.name}
                      </Table.Cell>

                      <Table.Cell color="black">
                        Rs. {medicine.price}
                      </Table.Cell>

                      <Table.Cell color="black">{medicine.quantity}</Table.Cell>

                      <Table.Cell color="black">
                        Rs. {medicine.price * medicine.quantity}
                      </Table.Cell>

                      <Table.Cell>
                        <Button
                          size="sm"
                          colorPalette="red"
                          borderRadius="10px"
                          onClick={() => handleRemoveMedicine(medicine.id)}
                        >
                          <Trash2 size={15} />
                          Remove
                        </Button>
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
                <Percent size={19} color="black" />

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

                <Text color="black">Rs. {subtotal}</Text>
              </Flex>

              {/* Discount */}
              <Flex
                justify="space-between"
                align="center"
                mb={3}
                gap={4}
                flexWrap="wrap"
              >
                <Text color="black">Discount (%):</Text>

                <Input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  width="100px"
                  color="black"
                  borderColor="blackAlpha.500"
                  borderRadius="15px"
                  value={discount}
                  placeholder="0"
                  onChange={(event) => setDiscount(event.target.value)}
                />
              </Flex>

              {/* Discount Amount */}
              <Flex
                justify="space-between"
                align="center"
                gap={4}
                flexWrap="wrap"
                mb={3}
              >
                <Text color="black">Discount Amount:</Text>

                <Text color="black">- Rs. {discountAmount}</Text>
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
                    Rs. {finalTotal}
                  </Text>
                </Flex>
              </Box>
            </Box>

            {/* Save Bill */}
            <Button
              colorPalette="blue"
              borderRadius="15px"
              width="100%"
              mt={6}
              onClick={handleSaveBill}
            >
              <ReceiptText size={18} />
              Save Bill
            </Button>
          </>
        )}
      </Box>

      {/* Saved Bill */}
      {savedSale && (
        <Box
          borderWidth="1px"
          borderColor="blackAlpha.500"
          borderRadius="15px"
          p={6}
          mb={6}
          minW="0"
        >
          <Flex align="center" gap={2} mb={5}>
            <ReceiptText size={21} color="black" />

            <Heading size="md" color="black">
              Saved Bill
            </Heading>
          </Flex>

          <Box minW="0" width="100%" overflow="hidden">
            <PrintableBill sale={savedSale} />
          </Box>

          <Button
            colorPalette="blue"
            borderRadius="15px"
            width={{ base: "100%", md: "auto" }}
            mt={6}
            onClick={handlePrintReceipt}
          >
            <ReceiptText size={18} />
            Print Receipt
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default CreateBill;
