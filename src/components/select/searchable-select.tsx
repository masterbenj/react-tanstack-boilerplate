import { useEffect, useRef, useState } from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { type BaseSelectProps, type Option } from "./index"

type SearchableSelectProps = BaseSelectProps & {
  value       ?:  Option
  onChange    ?:  (option: Option) => void
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  placeholder = "Select Items",
  options = [],
  onChange,
  value,
  disabled,
  readOnly,
  haveEffect,
  className,
  isOptional,
}) => {
  const [open, setOpen]                 = useState(false)
  const [contentWidth, setContentWidth] = useState(0)

  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (triggerRef.current) {
      setContentWidth(triggerRef.current.offsetWidth)
    }
  }, [open])

  const handleSelectChange = (val: string | null) => {
    const option = options.find((a) => a?.value === val) ?? null;
    if (onChange) onChange(option)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between border cursor-pointer",
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
          aria-disabled={readOnly}
          disabled={disabled}
          onClick={(e) => {
            if (readOnly) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          { value
            ? options.find((option) => option?.value === value.value)?.label ?? placeholder
            : placeholder}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className=" p-0" style={{ width: contentWidth > 0 ? contentWidth : 'auto' }}>
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <CommandItem
                key={option?.value}
                onSelect={() => {
                  handleSelectChange(option?.value ?? null)
                  setOpen(false)
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
        </Command>
      </PopoverContent>
    </Popover>
  )
}