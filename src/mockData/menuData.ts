export type ProductOption = {
  id: string;
  name: string;
  price: string;
};

export type ProductSection = {
  id: string;
  title: string;
  type: "radio" | "checkbox";
  options: ProductOption[];
};

export type MenuItem = {
  id: string;
  title: string;
  image: string | null;
  description: string;
  price: string;
  allergens?: string[];
  sections: ProductSection[];
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
        id: "ceviche-de-pescado",
        title: "Ceviche de pescado",
        image: null,
        description:
          "Trozos de pescado con jugo de limón, cebolla, ají limo y sal, acompañados de choclo, camote y yuyo.",
        price: "S/39.90",
        allergens: ["Pescado"],
        sections: [
          {
            id: "s1",
            title: "Selecciona tu acompañamiento",
            type: "radio",
            options: [
              { id: "o1", name: "Chicano de pescado", price: "+S/5.00" },
              { id: "o2", name: "Arroz con mariscos", price: "+S/22.00" },
              { id: "o3", name: "Chicharron de pescado", price: "+S/19.00" },
            ],
          },
          {
            id: "s2",
            title: "Añade más bebidas",
            type: "checkbox",
            options: [
              {
                id: "o4",
                name: "Inca Kola Sabor Original 600ml",
                price: "+S/5.00",
              },
              { id: "o5", name: "San Mateo Sin Gas 600 ml", price: "+S/3.50" },
              { id: "o6", name: "Jarra chicha morada 1L", price: "+S/20.00" },
            ],
          },
          {
            id: "s3",
            title: "Selecciona tus salsas",
            type: "checkbox",
            options: [
              { id: "o7", name: "Ketchup", price: "Gratis" },
              { id: "o8", name: "Salsa tártara", price: "Gratis" },
              { id: "o9", name: "Mayonesa", price: "Gratis" },
            ],
          },
          {
            id: "s4",
            title: "¿Desea cubiertos?",
            type: "radio",
            options: [
              { id: "o10", name: "Si", price: "+S/1.00" },
              { id: "o11", name: "No", price: "Gratis" },
            ],
          },
        ],
      },
      {
        id: "causa-de-pollo",
        title: "Causa de Pollo",
        image: null,
        description:
          "Clásica causa limeña rellena de pollo deshilachado y mayonesa.",
        price: "S/32.00",
        allergens: ["Huevos"],
        sections: [
          {
            id: "s5",
            title: "Añade más bebidas",
            type: "checkbox",
            options: [
              {
                id: "o12",
                name: "Inca Kola Sabor Original 600ml",
                price: "+S/5.00",
              },
              { id: "o13", name: "Jarra chicha morada 1L", price: "+S/20.00" },
            ],
          },
        ],
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
        sections: [],
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
