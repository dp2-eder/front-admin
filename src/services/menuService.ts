import apiClient from "../services/api";
import type {
  CategoryListResponse,
  MenuItem,
  AlergenoListResponse,
} from "../types/types";

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
    const response = await apiClient.get<MenuItem>(`/productos/${id}/opciones`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

export const getAllAllergens = async (): Promise<AlergenoListResponse> => {
  try {
    const response = await apiClient.get<AlergenoListResponse>("/alergenos");
    return response.data;
  } catch (error) {
    console.error("Error fetching allergens list:", error);
    throw error;
  }
};
