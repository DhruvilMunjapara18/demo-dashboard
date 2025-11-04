"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomerForm, { CustomerFormValues } from "./CustomerForm";
import { useState } from "react";
import { createCustomer, fetchCustomer, updateCustomer } from "@/lib/api";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  customerId?: string;
  mode: "add" | "edit";
};

export function CustomerDialog({ isOpen, onClose, customerId, mode }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const { data: initialData, isLoading: isLoadingCustomer } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => customerId ? fetchCustomer(customerId) : null,
    enabled: mode === "edit" && !!customerId,
  });

  const handleSubmit = async (values: CustomerFormValues) => {
    setIsSubmitting(true);
    try {
      if (mode === "edit" && customerId) {
        await updateCustomer(customerId, values);
        toast.success("Customer updated successfully");
      } else {
        await createCustomer(values);
        toast.success("Customer created successfully");
      }
      await queryClient.invalidateQueries({ queryKey: ["customers"] });
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || `Failed to ${mode} customer`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Customer" : "Edit Customer"}</DialogTitle>
          <DialogDescription>
            {mode === "add" 
              ? "Fill in the details to create a new customer."
              : "Update the customer's information."}
          </DialogDescription>
        </DialogHeader>
        
        {mode === "edit" && isLoadingCustomer ? (
          <div className="py-8 text-center text-gray-500">Loading customer data...</div>
        ) : (
          <CustomerForm
            key={customerId}
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}