"use client";

import { Badge } from "@/components/ui/badge";
import { CustomerTableProps } from "@/types/customer";
import { Pagination } from "./Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  total,
  currentPage,
  onDelete,
  onEdit,
  itemsPerPage,
  setCurrentPage,
}) => {

  return (
    <>
      <div className="flex h-full">
        <div className="flex-1 overflow-y-auto max-h-[500px] border rounded-lg">
          <Table className="w-full border-coll">
            <TableHeader>
              <TableRow className="sticky top-0 z-10">
                {[
                  "Name",
                  "Company",
                  "Phone",
                  "Email",
                  "Country",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-3 px-4 text-left text-sm text-[#B5B7C0]"
                  >
                    {header}
                  </th>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-12 text-center text-sm text-gray-500"
                  >
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                customers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className="border-b border-gray-100"
                  >
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
                          customer.status === "Active"
                            ? "default"
                            : "destructive"
                        }
                        className={` text-sm font-medium rounded-[4px] border ${
                          customer.status === "Active"
                            ? "bg-[#ade7d9] px-4 py-1 text-[#008767] border-[#00B087]"
                            : "bg-[#FFC5C5] px-3 py-1 text-[#DF0404] border-[#DF0404]"
                        }`}
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onEdit?.(customer.id)}
                          className="cursor-pointer"
                        >
                          <Edit className="w-4 h-4 " />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete?.(customer.id)}
                          className="cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 " />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        total={total}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
