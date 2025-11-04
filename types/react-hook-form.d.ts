declare module "react-hook-form" {
  export type FieldErrors<T extends Record<string, any>> = {
    [K in keyof T]?: { message?: string } | undefined;
  };

  export interface UseFormReturn<T extends Record<string, any>> {
    register: (name: keyof T & string, options?: any) => any;
    handleSubmit: (fn: (values: T) => any) => (e?: any) => any;
    reset: (values?: Partial<T>) => void;
    setValue: (name: keyof T & string, value: any, options?: any) => void;
    watch: (name?: keyof T & string) => any;
    formState: { errors: FieldErrors<T>; isValid: boolean };
  }

  export function useForm<T extends Record<string, any>>(options?: {
    mode?: string;
    defaultValues?: Partial<T>;
  }): UseFormReturn<T>;
}


