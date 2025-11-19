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
