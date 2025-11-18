export type MenuItem = {
  id: string;
  title: string;
  image: string | null;
  description: string;
  price: string;
  allergens?: string[];
};

export type MenuCategory = {
  title: string;
  items: MenuItem[];
};

export const ALLERGENS = [
  "Crustáceos",
  "Huevos",
  "Pescado",
  "Lácteos",
  "Frutos con cáscara",
  "Moluscos",
  "Apio",
  "Sésamo",
  "Gluten",
  "Cacahuates",
  "Salsa de soja",
  "Mostaza",
];

export const menuData: MenuCategory[] = [
  {
    title: "Entradas",
    items: [
      {
        id: "langostinos-en-panko",
        title: "Langostinos en Panko",
        image: null,
        description:
          "Crujientes langostinos arrebozados en panko japonés, servidos con salsa de maracuyá.",
        price: "S/42.00",
        allergens: ["Crustáceos", "Gluten"],
      },
      {
        id: "ceviche-de-pescado",
        title: "Ceviche de pescado",
        image: null,
        description:
          "Trozos de pescado con jugo de limón, cebolla, ají limo y sal, acompañados de choclo, camote y yuyo.",
        price: "S/39.90",
        allergens: ["Pescado"],
      },
      {
        id: "causa-de-pollo",
        title: "Causa de Pollo",
        image: null,
        description:
          "Clásica causa limeña rellena de pollo deshilachado y mayonesa.",
        price: "S/32.00",
        allergens: ["Huevos"],
      },
    ],
  },
  {
    title: "Arroces",
    items: [
      {
        id: "arroz-con-mariscos",
        title: "Arroz con Mariscos",
        image: null,
        description:
          "Jugoso arroz con una selección de mariscos frescos en salsa de coral.",
        price: "S/45.00",
        allergens: ["Crustáceos", "Moluscos"],
      },
    ],
  },
  {
    title: "Ceviches",
    items: [],
  },
  {
    title: "Sopas",
    items: [],
  },
  {
    title: "Fondos",
    items: [],
  },
  {
    title: "Combos Marinos",
    items: [],
  },
  {
    title: "Bebidas sin Alcohol",
    items: [],
  },
  {
    title: "Bebidas con Alcohol",
    items: [],
  },
  {
    title: "Adicionales",
    items: [],
  },
];

export const findProductById = (id: string): MenuItem | undefined => {
  for (const category of menuData) {
    const product = category.items.find((item) => item.id === id);
    if (product) {
      return product;
    }
  }
  return undefined;
};
