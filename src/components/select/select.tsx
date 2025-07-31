import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { SelectValue } from "@radix-ui/react-select"
import { BaseSelectProps, Option } from "./index";

type SelectProps = BaseSelectProps & {
  value       :   Option
  onChange    ?:  (option: Option) => void
}

export const SelectComponent: React.FC<SelectProps> = ({
  placeholder = "Select Items",
  options = [],
  onChange,
  value,
  className,
  haveEffect,
  disabled,
  readOnly,
  isOptional,
}) => {
  
  const handleSelectChange = (val: string) => {
    const option = options.find((a) => a?.value === val) ?? null;
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <Select
      value={value ? value.value : ""}
      onValueChange={handleSelectChange}
      disabled={disabled}
    >
      <SelectTrigger
        className={cn(
          "w-full border cursor-pointer",
          readOnly && "pointer-events-none",
          haveEffect
            ? readOnly
              ? "border-gray-300"
              : isOptional
                ? "border-green-600"
                : value
                  ? "border-green-600"
                  : "border-red-500"
            : "",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent autoFocus={false}>
        { options.map((option) => {
          if (!option) return null
          const { value, label, isDisabled } = option
          return (
            <SelectItem key={value} value={value} disabled={isDisabled} className="cursor-pointer">
              { label }
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  );
};