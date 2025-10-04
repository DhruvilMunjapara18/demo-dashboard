export interface Customer {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: "Active" | "Inactive";
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
