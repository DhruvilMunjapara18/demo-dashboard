import { ApiResponse } from "@/types/customer";

export const fetchCustomers = async (): Promise<ApiResponse> => {
  const response = await fetch("https://dummy-json.mock.beeceptor.com/users");

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
};
