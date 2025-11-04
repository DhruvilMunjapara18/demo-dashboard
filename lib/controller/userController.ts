import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export const getUsers = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}) => {
  const { page = 1, limit = 10, search = "", sortBy = "newest" } = params;

  await connectDB();

  const searchQuery: Record<string, any> = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { company: { $regex: search, $options: "i" } },
          { country: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const sort: Record<string, 1 | -1> =
    sortBy === "name"
      ? { name: 1 }
      : sortBy === "oldest"
      ? { createdAt: 1 }
      : { createdAt: -1 };

  const total = await User.countDocuments(searchQuery);

  const usersDocs = await User.find(searchQuery)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const users = usersDocs.map((u: any) => ({
    id: String(u._id),
    name: u.name,
    company: u.company,
    phone: u.phone,
    email: u.email,
    country: u.country,
    status: u.status,
  }));

  return { total, page, limit, users };
};

export const getUser = async (id: string) => {
  await connectDB();
  const u = await User.findById(id).lean();
  if (!u) throw new Error('User not found');
  return {
    id: String(u._id),
    name: u.name,
    company: u.company,
    phone: u.phone,
    email: u.email,
    country: u.country,
    status: u.status,
  };
};

export const createUser = async (payload: {
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status?: "Active" | "Inactive";
}) => {
  await connectDB();
  const created = await User.create(payload);
  return {
    id: String(created._id),
    name: created.name,
    company: created.company,
    phone: created.phone,
    email: created.email,
    country: created.country,
    status: created.status,
  };
};

export const updateUser = async (
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
  await connectDB();
  const updated = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();
  if (!updated) throw new Error("User not found");
  return {
    id: String(updated._id),
    name: updated.name,
    company: updated.company,
    phone: updated.phone,
    email: updated.email,
    country: updated.country,
    status: updated.status,
  };
};

export const deleteUser = async (id: string) => {
  await connectDB();
  const res = await User.findByIdAndDelete(id).lean();
  if (!res) throw new Error("User not found");
  return { id: String(res._id) };
};
