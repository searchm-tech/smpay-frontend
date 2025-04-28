"use client";

import { Search } from "lucide-react";
import { Dispatch, ChangeEvent, useState, SetStateAction } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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

function InputForm<T extends FieldValues>({
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

// 검색 input
interface SearchInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  value,
  onChange,
  placeholder,
  className,
  onKeyDown,
}: SearchInputProps) => {
  return (
    <div className={cn("relative w-full bg-white rounded-md", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder || "검색어를 입력해주세요."}
        className="pl-8"
      />
    </div>
  );
};

// phone input
interface PhoneInputProps {
  value?: string; // 전체 전화번호 "01012345678"
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const PhoneInput = ({ value = "", onChange, className }: PhoneInputProps) => {
  const [part1, setPart1] = useState(value.slice(0, 3));
  const [part2, setPart2] = useState(value.slice(3, 7));
  const [part3, setPart3] = useState(value.slice(7, 11));

  const handleChange =
    (setter: Dispatch<SetStateAction<string>>, nextIndex?: number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const onlyNumber = e.target.value.replace(/\D/g, "");
      setter(onlyNumber);

      // 최종 value를 합쳐서 외부 onChange로 전달
      const newValue = [
        nextIndex === 0 ? onlyNumber : part1,
        nextIndex === 1 ? onlyNumber : part2,
        nextIndex === 2 ? onlyNumber : part3,
      ].join("");

      if (onChange) {
        onChange({
          ...e,
          target: { ...e.target, value: newValue },
        });
      }
    };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Input
        maxLength={3}
        value={part1}
        onChange={handleChange(setPart1, 0)}
        className="w-[80px] text-center"
        placeholder="010"
        inputMode="numeric"
      />
      <span>-</span>
      <Input
        maxLength={4}
        value={part2}
        onChange={handleChange(setPart2, 1)}
        className="w-[80px] text-center"
        placeholder="1234"
        inputMode="numeric"
      />
      <span>-</span>
      <Input
        maxLength={4}
        value={part3}
        onChange={handleChange(setPart3, 2)}
        className="w-[80px] text-center"
        placeholder="5678"
        inputMode="numeric"
      />
    </div>
  );
};

interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value?: string | number;
  onChange: (value: string) => void;
}

function NumberInput({ value, onChange, ...rest }: NumberInputProps) {
  return (
    <Input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
      {...rest}
    />
  );
}

export { InputForm, SearchInput, PhoneInput, NumberInput };
