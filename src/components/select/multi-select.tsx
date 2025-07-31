import { useEffect, useRef, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, X, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { BaseSelectProps, type Option } from './index';

type MultiSelectProps = BaseSelectProps & {
  value       :   Option[]
  onChange    ?:  (options: Option[]) => void
  /** Make the selection still open even after a value is selected */
  persistOpen ?:  boolean
}

export function MultiSelect({ 
  placeholder = "Select Items",
  options = [],
  onChange,
  value,
  className,
  haveEffect,
  disabled,
  readOnly,
  isOptional,
  persistOpen,
}: MultiSelectProps) {
  const [open, setOpen]                       = useState(false)
  const [contentWidth, setContentWidth]       = useState(0)
  
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (triggerRef.current) {
      setContentWidth(triggerRef.current.offsetWidth)
    }
  }, [open]);

  const toggleOption = (option: Option) => {
    const newSelected = value.some(item => item?.value === option?.value)
      ? value.filter(item => item?.value !== option?.value)
      : [...value, option]

    if (!persistOpen) setOpen(false)
    if (onChange) onChange(newSelected)
  }

  const removeOption = (option: Option) => {
    const newSelected = value.filter(item => item?.value !== option?.value)
    if (onChange) onChange(newSelected)
  }
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full border cursor-pointer",
            readOnly && "pointer-events-none",
            haveEffect
              ? readOnly
                ? "!border-gray-300"
                : isOptional
                  ? "!border-green-600"
                  : (value && value.length > 0)
                    ? "!border-green-600"
                    : "!border-red-500"
              : "",
            className,
          )}
        >
          <div className="flex flex-wrap gap-1 items-center">
            { value.length === 0 ? (
              <span>{ placeholder }</span>
            ) : (
              value.map((option) => (
                <Badge 
                  key={option?.value} 
                  variant="secondary"
                  className="flex items-center gap-1 pr-0 cursor-default"
                >
                  <span className="pr-1">{option?.label}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent hover:text-red-600 cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeOption(option);
                    }}
                  >
                    <X className="h-3 w-3 opacity-80" />
                  </Button>
                </Badge>
              ))
            )}
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="start" style={{ width: contentWidth > 0 ? contentWidth : 'auto' }}>
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  className="cursor-pointer"
                  key={option?.value}
                  value={option?.value}
                  onSelect={() => toggleOption(option)}
                >
                  <div className="flex h-4 w-4 items-center justify-center">
                    { value.some(
                      (selectedOption) => selectedOption?.value === option?.value
                    ) && <Check className="h-4 w-4 text-green-400" />}
                  </div>
                  { option?.label }
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}