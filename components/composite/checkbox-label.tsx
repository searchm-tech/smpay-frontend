import { Checkbox } from "@/components/ui/checkbox";
// import { useId } from "react";

type CheckboxLabelProps = {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

const CheckboxLabel = ({ isChecked, onChange, label }: CheckboxLabelProps) => {
  //   const id = useId();

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        //   id={id}
        checked={isChecked}
        onCheckedChange={onChange}
      />
      <label
        // htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxLabel;
