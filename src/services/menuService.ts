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

export const uploadProductImage = async (productId: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post(
      `/productos/${productId}/imagen`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const getProductImageUrl = (imagePath: string | null) => {
  if (!imagePath) return null;

  if (imagePath.includes("drive.google.com")) {
    if (imagePath.includes("export=view")) return imagePath;

    const idMatch = imagePath.match(/\/d\/(.+?)\//);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
    }
    return imagePath;
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api/v1", "");
  return `${baseUrl}/static/images/${imagePath}`;
};
