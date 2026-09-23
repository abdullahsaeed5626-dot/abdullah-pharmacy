import { useState } from "react";

import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";

import {
  Pill,
  Tag,
  CircleDollarSign,
  Package,
  CheckCircle,
} from "lucide-react";

import { useStore } from "../context/StoreContext";

function AddMedicine() {
  const { addMedicine } = useStore();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit() {
    setError("");
    setSuccess(false);

    // Check empty fields
    if (!name.trim() || !category.trim() || !price || !stock) {
      setError("Please fill in all fields.");
      return;
    }

    const medicinePrice = Number(price);
    const medicineStock = Number(stock);

    // Check valid numbers
    if (!Number.isFinite(medicinePrice) || !Number.isFinite(medicineStock)) {
      setError("Price and stock must be valid numbers.");
      return;
    }

    // Check price
    if (medicinePrice <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    // Check stock
    if (medicineStock <= 0 || !Number.isInteger(medicineStock)) {
      setError("Stock must be a whole number greater than 0.");
      return;
    }

    addMedicine({
      name: name.trim(),
      category: category.trim(),
      price: medicinePrice,
      stock: medicineStock,
    });

    setName("");
    setCategory("");
    setPrice("");
    setStock("");

    setSuccess(true);
  }

  return (
    <Box p={6} maxW="900px" mx="auto">
      {/* Page Heading */}
      <Heading size="lg" mb={2} color="black">
        Add Medicine
      </Heading>

      <Text color="black" mb={8}>
        Add a new medicine to your pharmacy inventory.
      </Text>

      {/* Form */}
      <Box
        borderWidth="1px"
        borderColor="blackAlpha.500"
        borderRadius="15px"
        p={8}
      >
        <VStack align="stretch" gap={6}>
          {/* Medicine Name */}
          <Box>
            <Flex align="center" gap={2} mb={2}>
              <Pill size={18} color="black" />

              <Text fontWeight="normal" color="black">
                Medicine Name
              </Text>
            </Flex>

            <Input
              placeholder="Enter medicine name"
              color="black"
              borderColor="blackAlpha.500"
              borderRadius="15px"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
                setSuccess(false);
              }}
            />
          </Box>

          {/* Category */}
          <Box>
            <Flex align="center" gap={2} mb={2}>
              <Tag size={18} color="black" />

              <Text fontWeight="normal" color="black">
                Category
              </Text>
            </Flex>

            <Input
              placeholder="e.g. Tablet"
              color="black"
              borderColor="blackAlpha.500"
              borderRadius="15px"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setError("");
                setSuccess(false);
              }}
            />
          </Box>

          {/* Price */}
          <Box>
            <Flex align="center" gap={2} mb={2}>
              <CircleDollarSign size={18} color="black" />

              <Text fontWeight="normal" color="black">
                Price per unit
              </Text>
            </Flex>

            <Input
              placeholder="Enter price"
              type="number"
              min={0}
              color="black"
              borderColor="blackAlpha.500"
              borderRadius="15px"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
                setError("");
                setSuccess(false);
              }}
            />
          </Box>

          {/* Stock */}
          <Box>
            <Flex align="center" gap={2} mb={2}>
              <Package size={18} color="black" />

              <Text fontWeight="normal" color="black">
                Available Stock
              </Text>
            </Flex>

            <Input
              placeholder="Enter available stock"
              type="number"
              min={0}
              step={1}
              color="black"
              borderColor="blackAlpha.500"
              borderRadius="15px"
              value={stock}
              onChange={(event) => {
                setStock(event.target.value);
                setError("");
                setSuccess(false);
              }}
            />
          </Box>

          {/* Error */}
          {error && (
            <Box
              borderWidth="1px"
              borderColor="red.400"
              borderRadius="15px"
              p={4}
            >
              <Text color="red.600">{error}</Text>
            </Box>
          )}

          {/* Success */}
          {success && (
            <Flex
              align="center"
              gap={2}
              borderWidth="1px"
              borderColor="green.400"
              borderRadius="15px"
              p={4}
            >
              <CheckCircle size={18} color="black" />

              <Text color="black">Medicine added successfully.</Text>
            </Flex>
          )}

          {/* Submit */}
          <Button
            colorPalette="blue"
            borderRadius="15px"
            mt={2}
            onClick={handleSubmit}
          >
            Add Medicine
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default AddMedicine;
