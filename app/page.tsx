"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const { data, isLoading, error } = useCustomers();

  const customers = Array.isArray(data) ? data : [];

  const filteredCustomers = customers
    .filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.country.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const customersWithStatus = filteredCustomers.map((customer) => ({
    ...customer,
    status: Math.random() > 0.5 ? "Active" : "Inactive",
  }));

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
              value="5,423"
              trend={{ value: "16%", isPositive: true }}
            />
            <StatCard
              icon={Images.members_logo}
              label="Members"
              value="1,893"
              trend={{ value: "1%", isPositive: false }}
            />
            <StatCard
              icon={Images.active_logo}
              label="Active Now"
              value="189"
              avatars={[
                Images.elipse_1,
                Images.elipse_2,
                Images.elipse_3,
                Images.elipse_4,
                Images.elipse_5,
              ]}
            />
          </div>

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
                  <div className="flex-1 max-w-xs">
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Short by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
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
                <CustomerTable customers={customersWithStatus} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardPage />
    </QueryClientProvider>
  );
}
