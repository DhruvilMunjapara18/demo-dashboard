"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomers } from "@/hooks/useCustomers";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { StatCard } from "@/components/card/CustomerCard";
import { SearchBar } from "@/components/search/SearchBar";
import { CustomerTable } from "@/components/table/Table";
import { Images } from "@/public/assets";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { deleteCustomer } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { CustomerDialog } from "./CustomerDialog";
import { DeleteDialog } from "./DeleteDialog";
import { toast } from "react-toastify";
import { log } from "console";

// React Query provider is centralized in app/layout.tsx (QueryProvider).

function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");
  const [customerDialog, setCustomerDialog] = useState<{ isOpen: boolean; customerId?: string; mode: "add" | "edit" }>({
    isOpen: false,
    mode: "add"
  });
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; customerId?: string }>({
    isOpen: false
  });

  const { data, isLoading, error } = useCustomers({
    page: currentPage,
    limit: 10,
    search: searchTerm,
    sortBy,
  });
  
  const customers = data?.users || [];
  const total = data?.total || 0;

const queryClient = useQueryClient();
  const handleOpenAddDialog = () => {
    setCustomerDialog({ isOpen: true, mode: "add" });
  };

  const handleOpenEditDialog = (id: string) => {
    setCustomerDialog({ isOpen: true, mode: "edit", customerId: id });
  };

  const handleOpenDeleteDialog = (id: string) => {
    setDeleteDialog({ isOpen: true, customerId: id });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomer(id);
      await queryClient.invalidateQueries({ queryKey: ["customers"], exact: false });
      toast.success("Customer deleted successfully");
      setDeleteDialog({ isOpen: false });
    } catch (err: any) {
      toast.error(err.message || "Failed to delete customer");
    }
  };

  const handleCloseCustomerDialog = () => {
    setCustomerDialog({ isOpen: false, mode: "add" });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({ isOpen: false });
  };  

  const activeUser = customers.filter(customer => customer.status === "Active").length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 bg-gray-50">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[24px] font-medium text-[#000000]">
              Hello Evano 👋
            </h1>
            <div className="relative">
              <Image
                src={Images.search}
                width={24}
                height={24}
                alt="search_icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              />
              <Input
                type="text"
                placeholder="Search"
                className="pl-10 w-64 bg-white border-gray-200"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 rounded-4xl mb-8 bg-white shadow-sm divide-x divide-gray-200">
            <StatCard
              icon={Images.cusomers_logo}
              label="Total Customers"
              value={data?.total.toString() || "0"}
              trend={{ value: "16%", isPositive: true }}
            />
            <StatCard
              icon={Images.members_logo}
              label="Members"
              value={data?.total.toString() || "0" }
              trend={{ value: "1%", isPositive: false }}
            />
             <StatCard
              icon={Images.active_logo}
              label="Active Now"
              value={activeUser.toString()}
              avatars={[
                Images.elipse_1,
                Images.elipse_2,
                Images.elipse_3,
                Images.elipse_4,
                Images.elipse_5,
              ]}
            />
          </div>

          {/* Customer Table Card */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div className="mb-6">
                  <h2 className="text-[22px] text-[#000000] font-semibold mb-1">
                    All Customers
                  </h2>
                  <p className="text-sm font-regular text-[#16C098]">
                    Active Members
                  </p>
                </div>

                <div className="flex items-center gap-3 justify-between mb-6">
                  <Button
                    type="button"
                    variant={"secondary"}
                    onClick={handleOpenAddDialog}
                    className="h-9 px-3 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 mr-1 " /> Add
                  </Button>

                  <div className="flex-1 max-w-xs">
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <Select
                      value={sortBy}
                      onValueChange={(value) =>
                        setSortBy(value as "newest" | "oldest" | "name")
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-8 text-gray-500">
                  Loading customers...
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  Error loading customers
                </div>
              ) : (
                <CustomerTable
                  customers={customers}
                  total={total}
                  onDelete={handleOpenDeleteDialog}
                  onEdit={handleOpenEditDialog}
                  currentPage={currentPage}
                  itemsPerPage={10}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Customer Dialog */}
      <CustomerDialog 
        isOpen={customerDialog.isOpen}
        onClose={handleCloseCustomerDialog}
        mode={customerDialog.mode}
        customerId={customerDialog.customerId}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={() => deleteDialog.customerId && handleDelete(deleteDialog.customerId)}
      />
    </div>
  );
}

export default function CustomerLIst() {
  return <DashboardPage />;
}
