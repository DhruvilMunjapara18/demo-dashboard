export interface Customer {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: "Active" | "Inactive";
}

export interface CustomerTableProps {
  customers: Customer[];
  total: number;
  currentPage: number;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface ApiResponse {
  users: Customer[];
  total: number;
}

export interface StatCardData {
  icon: string;
  label: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  avatars?: string[];
}

export interface FetchCustomersParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "newest" | "oldest" | "name";
}
