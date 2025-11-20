import apiClient from "./api";
import type { LoginCredentials, LoginResponse } from "../types/types";

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    "/api/v1/admins/login",
    credentials,
  );
  return response.data;
};
