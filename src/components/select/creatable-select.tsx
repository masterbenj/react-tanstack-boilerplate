import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { BaseSelectProps, Option } from "./index";

type CreatableSelectProps = BaseSelectProps & {
  value       :   Option
  onChange    ?:  (option: Option) => void
  onCreate    ?:  (options: Option[]) => void
}

export const CreatableSelect: React.FC<CreatableSelectProps> = ({
  placeholder = "Select Items",
  options = [],
  onChange,
  value,
  className,
  haveEffect,
  disabled,
  readOnly,
  isOptional,
  onCreate,
}) => {
  const [open, setOpen]                   = React.useState(false);
  const [query, setQuery]                 = React.useState("");
  const [contentWidth, setContentWidth]   = React.useState(0)
  
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (triggerRef.current) {
      setContentWidth(triggerRef.current.offsetWidth)
    }
  }, [open])

  const handleSelectChange = (val: string | null) => {
    const option = options.find((a) => a?.value === val) ?? null;
    if (onChange) onChange(option)
  }

  const handleCreate = (newOption: string) => {
    // const sanitizedValue = newOption.toLowerCase().replace(/\s+/g, "-");
    const newOptionObject = { value: newOption, label: newOption }

    if (!options.find((option) => option?.value === newOption)) {
      value = newOptionObject
      options = [...options, newOptionObject]
      if (onCreate) onCreate(options)
    } else {
      value = newOptionObject
    }

    if (onChange) onChange(newOptionObject)

    setOpen(false);
    setQuery("");
  };

  const filteredOptions = options.filter(option =>
    option?.label.toLowerCase().includes(query.toLowerCase())
  );

  const showCreateOption = query && !options.some(option =>
    option?.label.toLowerCase() === query.toLowerCase()
  ) || (query !== "")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-disabled={readOnly}
          className={cn(
            "w-full border cursor-pointer justify-between",
            readOnly && "pointer-events-none",
            haveEffect
              ? readOnly
                ? "!border-gray-300"
                : isOptional
                  ? "!border-green-600"
                  : value
                    ? "!border-green-600"
                    : "!border-red-500"
              : "",
            className,
          )}
          onClick={(e) => {
            if (readOnly) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          disabled={disabled}
        >
          {/* { value?.label ?? placeholder } */}
          {value
            ? options.find((option) => option?.value === value?.value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" style={{ width: contentWidth > 0 ? contentWidth : 'auto' }}>
        <Command>
          <CommandInput
            placeholder="Search or create a framework..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {showCreateOption && (
              <CommandItem
                onSelect={() => handleCreate(query)}
                className="flex items-center !text-blue-500"
              >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Create "{query}"</span>
              </CommandItem>
            )}
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
            <CommandItem
              key={option?.value}
              value={option?.label}
              onSelect={() => {
                handleSelectChange(option?.value ?? null)
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value?.value === option?.value ? "opacity-100" : "opacity-0"
                )}
              />
              {option?.label}
            </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
