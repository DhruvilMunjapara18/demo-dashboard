import axios from "axios";

interface FetchCustomersParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "newest" | "oldest" | "name";
}

export const fetchCustomers = async (params: FetchCustomersParams = {}) => {
  const { page = 1, limit = 10, search = "", sortBy = "newest" } = params;

  try {
    const res = await axios.get("/api/users", {
      params: { page, limit, search, sortBy },
    });

    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to fetch customers");
    }
    return res.data;
  } catch (error: any) {
    console.error("Error fetching customers:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch customers"
    );
  }
};

export const createCustomer = async (payload: {
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status?: "Active" | "Inactive";
}) => {
  try {
    const res = await axios.post("/api/users", payload);
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to create customer");
    }
    return res.data.user;
  } catch (error: any) {

    if (error.response) {
      throw error;
    }
    throw new Error(error.message || "Failed to create customer");
  }
};

export const updateCustomer = async (
  id: string,
  payload: Partial<{
    name: string;
    company: string;
    phone: string;
    email: string;
    country: string;
    status: "Active" | "Inactive";
  }>
) => {
  try {
    const res = await axios.patch(`/api/users/${id}`, payload);
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to update customer");
    }
    return res.data.user;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to update customer"
    );
  }
};

export const fetchCustomer = async (id: string) => {
  try {
    const res = await axios.get(`/api/users/${id}`);
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to fetch customer");
    }
    return res.data.user;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch customer"
    );
  }
};

export const deleteCustomer = async (id: string) => {
  try {
    const res = await axios.delete(`/api/users/${id}`);
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to delete customer");
    }
    return res.data.id as string;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to delete customer"
    );
  }
};