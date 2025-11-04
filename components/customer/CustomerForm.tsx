"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CustomerFormValues = {
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: "Active" | "Inactive";
};

type Props = {
  initialData?: Partial<CustomerFormValues>;
  onSubmit: (values: CustomerFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export default function CustomerForm({ initialData, onSubmit, onCancel, isSubmitting }: Props) {
  const { register, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm<CustomerFormValues>({
    mode: "onChange",
    defaultValues: {
      name: initialData?.name || "",
      company: initialData?.company || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      country: initialData?.country || "",
      status: initialData?.status || "Active",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input placeholder="Name" {...register("name", { required: "Name is required" })} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <Input placeholder="Company" {...register("company", { required: "Company is required" })} />
          {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>}
        </div>

        <div>
          <Input placeholder="Phone" {...register("phone", { required: "Phone is required" })} />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <Input placeholder="Email" type="email" {...register("email", { required: "Email is required", pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: "Enter a valid email" } })} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <Input placeholder="Country" {...register("country", { required: "Country is required" })} />
          {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>}
        </div>

        <div>
          <Select 
            value={watch("status") || "Active"} 
            onValueChange={(v) => setValue("status", v as "Active" | "Inactive", { shouldValidate: true })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}