import apiClient from "../services/api";
import type { CategoryListResponse, MenuItem } from "../types/types";

export const getMenuCards = async (): Promise<CategoryListResponse> => {
  try {
    const response = await apiClient.get<CategoryListResponse>(
      "/categorias/productos/cards",
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching menu cards:", error);
    throw error;
  }
};

export const getProductDetails = async (id: string): Promise<MenuItem> => {
  try {
    const response = await apiClient.get(`/productos/${id}/opciones`);
    const data = response.data;

    return {
      ...data,
      alergenos: data.alergenos.map((a: string) =>
        typeof a === "string" ? a : a,
      ),
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
