import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export type RadioOption = {
  label: string;
  value: string;
};

type RadioLabelProps = {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  vertical?: boolean;
};

const RadioLabel = ({
  vertical = false,
  options,
  value,
  onChange,
  className = "",
}: RadioLabelProps) => {
  const groupId = useId();

  return (
    <RadioGroup
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
            <RadioGroupItem value={option.value} id={id} />
            <Label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
            >
              {option.label}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default RadioLabel;
