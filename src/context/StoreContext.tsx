import { createContext, useContext, useState, type ReactNode } from "react";

import initialMedicines from "../data/medicines.json";

export type Medicine = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export type Sale = {
  id: number;
  customerName: string;
  cart: (Medicine & { quantity: number })[];
  subtotal: number;
  discount: number;
  discountAmount: number;
  finalTotal: number;
};

type StoreContextType = {
  medicines: Medicine[];
  sales: Sale[];
  addMedicine: (medicine: Omit<Medicine, "id">) => void;
  updateStock: (medicineId: number, quantitySold: number) => void;
  addSale: (sale: Omit<Sale, "id">) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [sales, setSales] = useState<Sale[]>([]);

  function addMedicine(newMedicine: Omit<Medicine, "id">) {
    setMedicines((previousMedicines) => [
      ...previousMedicines,
      {
        ...newMedicine,
        id: Date.now(),
      },
    ]);
  }

  function updateStock(medicineId: number, quantitySold: number) {
    setMedicines((previousMedicines) =>
      previousMedicines.map((medicine) =>
        medicine.id === medicineId
          ? {
              ...medicine,
              stock: medicine.stock - quantitySold,
            }
          : medicine,
      ),
    );
  }
  function addSale(newSale: Omit<Sale, "id">) {
    setSales((previousSales) => [
      ...previousSales,
      {
        ...newSale,
        id: Date.now(),
      },
    ]);
  }

  return (
    <StoreContext.Provider
      value={{ medicines, sales, addMedicine, updateStock, addSale }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }

  return context;
}
