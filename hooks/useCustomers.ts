import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchCustomers } from "@/lib/api";
import { ApiResponse, CustomerTableProps } from "@/types/customer";

interface UseCustomersParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "newest" | "oldest" | "name";
}

export const useCustomers = (params: UseCustomersParams) => {
  return useQuery<ApiResponse,Error>({
    queryKey: ["customers",JSON.stringify (params)],
    queryFn: () => fetchCustomers(params),   
  });
};
