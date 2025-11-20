export type Alergeno = {
  id: string;
  nombre: string;
  nivel_riesgo?: string;
  icono?: string | null;
  activo?: boolean;
};

export type ProductAlergeno = {
  id: string;
  nombre: string;
  nivel_presencia?: string;
};

export type MenuOption = {
  id: string;
  nombre: string;
  precio_adicional: string;
  activo: boolean;
  orden: number;
};

export type MenuOptionGroup = {
  id_tipo_opcion: string;
  nombre_tipo: string;
  descripcion_tipo: string;
  seleccion_minima: number;
  seleccion_maxima: number;
  orden_tipo: number;
  opciones: MenuOption[];
};

export type MenuItem = {
  id: string;
  nombre: string;
  descripcion: string;
  precio_base: string;
  imagen_path: string;
  imagen_alt_text: string;
  id_categoria: string;
  disponible: boolean;
  destacado: boolean;
  alergenos: ProductAlergeno[];
  fecha_creacion: string;
  fecha_modificacion: string;
  tipos_opciones: MenuOptionGroup[];
};

export interface ProductCardMinimal {
  id: string;
  nombre: string;
  imagen_path: string | null;
}

export interface CategoryWithProductsCard {
  id: string;
  nombre: string;
  imagen_path: string | null;
  productos: ProductCardMinimal[];
}

export interface CategoryListResponse {
  items: CategoryWithProductsCard[];
  total: number;
}

export type LoginResponse = {
  access_token: string;
  token_type: string;
  admin_id: string;
  usuario: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type DecodedToken = {
  sub: string;
  usuario: string;
  type: string;
  exp: number;
};

export interface AuthUser {
  id: string;
  usuario: string;
  role: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export type AlergenoListResponse = {
  items: Alergeno[];
  total: number;
};
