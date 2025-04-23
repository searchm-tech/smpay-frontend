import {
  RadioGroup as ShadcnRadioGroup,
  RadioGroupItem as ShadcnRadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * radio group
 */
export type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  vertical?: boolean;
};

const RadioGroup = ({
  vertical = false,
  options,
  value,
  onChange,
  className = "",
}: RadioGroupProps) => {
  const groupId = useId();

  return (
    <ShadcnRadioGroup
      value={value}
      onValueChange={onChange}
      className={`flex items-center gap-8 ${className} ${
        vertical ? "flex-col items-start gap-3" : ""
      }`}
    >
      {options.map((option: RadioOption) => {
        const id = `${groupId}-${option.value}`;
        return (
          <div key={option.value} className="flex items-center gap-2">
            <ShadcnRadioGroupItem value={option.value} id={id} />
            <Label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
            >
              {option.label}
            </Label>
          </div>
        );
      })}
    </ShadcnRadioGroup>
  );
};

/**
 * radio button
 */

type RadioProps = {
  checked: boolean;
  onClick: (checked: boolean) => void;
  label?: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Radio = ({
  checked,
  onClick,
  label,
  className = "",
  disabled = false,
}: RadioProps) => {
  const id = useId();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        disabled={disabled}
        onClick={() => onClick(!checked)}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          checked && "border-primary text-primary",
          className
        )}
        id={id}
      >
        <span
          className="flex items-center justify-center"
          data-state={checked ? "checked" : "unchecked"}
        >
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle h-3.5 w-3.5 fill-primary"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          )}
        </span>
      </button>
      {label && (
        <Label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
        >
          {label}
        </Label>
      )}
    </div>
  );
};

export { Radio, RadioGroup };
