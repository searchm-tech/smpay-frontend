import {
  Select as ShadcnSelect,
  SelectContent as ShadcnSelectContent,
  SelectItem as ShadcnSelectItem,
  SelectTrigger as ShadcnSelectTrigger,
  SelectValue as ShadcnSelectValue,
} from "@/components/ui/select";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const Select = ({
  options,
  value = "",
  onChange,
  placeholder = "선택해주세요",
  className = "",
}: SelectProps) => {
  return (
    <ShadcnSelect value={value} onValueChange={onChange}>
      <ShadcnSelectTrigger className={className}>
        <ShadcnSelectValue placeholder={placeholder} />
      </ShadcnSelectTrigger>
      <ShadcnSelectContent>
        {options.map((option: SelectOption) => (
          <ShadcnSelectItem key={option.value} value={option.value}>
            {option.label}
          </ShadcnSelectItem>
        ))}
      </ShadcnSelectContent>
    </ShadcnSelect>
  );
};

export default Select;
