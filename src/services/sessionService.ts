import apiClient from "./api";
import type { TableSessionListResponse } from "../types/types";

export const getActiveSessions =
  async (): Promise<TableSessionListResponse> => {
    try {
      const response = await apiClient.get<TableSessionListResponse>(
        "/api/v1/sesiones-mesas/",
        {
          params: {
            skip: 0,
            limit: 100,
            estado: "activa",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching active sessions:", error);
      throw error;
    }
  };

export const closeSession = async (sessionId: string): Promise<void> => {
  try {
    const response = await apiClient.patch(
      `/api/v1/sesiones-mesas/${sessionId}/cerrar`,
    );
    return response.data;
  } catch (error) {
    console.error("Error closing session:", error);
    throw error;
  }
};
