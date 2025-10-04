"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Customer } from "@/types/customer";
import { Pagination } from "./Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface CustomerTableProps {
  customers: Customer[];
}

export const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = customers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="flex-1 overflow-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {["Name", "Company", "Phone", "Email", "Country", "Status"].map(
                (header) => (
                  <th
                    key={header}
                    className="py-3 px-4 text-left text-sm text-[#B5B7C0]"
                  >
                    {header}
                  </th>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.map((customer) => (
              <TableRow key={customer.id} className="border-b border-gray-100">
                <TableCell className="py-4 px-4 text-[#292D32] text-sm font-medium">
                  {customer.name}
                </TableCell>
                <TableCell className="py-4 px-4 text-[#292D32] text-sm font-medium">
                  {customer.company}
                </TableCell>
                <TableCell className="py-4 px-4 text-[#292D32] text-sm font-medium">
                  {customer.phone}
                </TableCell>
                <TableCell className="py-4 px-4 text-[#292D32] text-sm font-medium">
                  {customer.email}
                </TableCell>
                <TableCell className="py-4 px-4 text-[#292D32] text-sm font-medium">
                  {customer.country}
                </TableCell>
                <TableCell className="py-4 px-4">
                  <Badge
                    variant={
                      customer.status === "Active" ? "default" : "destructive"
                    }
                    className={`px-3 py-1 text-sm font-medium rounded-[4px] border
    ${
      customer.status === "Active"
        ? "bg-[#ade7d9] px-4 py-1 text-[#008767] border border-[#00B087]"
        : "bg-[#FFC5C5] px-3 py-1 text-[#DF0404] border border-[#DF0404]"
    }`}
                  >
                    {customer.status === "Active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        customers={customers}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
