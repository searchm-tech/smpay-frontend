"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface InputFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  suffix?: string;
  error?: string;
  showError?: boolean;
}

export function InputForm<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  suffix,
  error,
  showError = true,
}: InputFormProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input
                type={type}
                className={`h-12 text-base ${
                  fieldState.error
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                } ${suffix ? "pr-32" : ""}`}
                placeholder={placeholder}
                {...field}
              />
              {suffix && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {suffix}
                </div>
              )}
            </div>
          </FormControl>
          {showError && (
            <>
              {error && field.value.length === 0 && (
                <div className="text-sm text-red-500 mt-1">{error}</div>
              )}
              <FormMessage className="text-sm text-red-500" />
            </>
          )}
        </FormItem>
      )}
    />
  );
}
