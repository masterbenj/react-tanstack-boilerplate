import { useEffect, useRef, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, X, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { type BaseSelectProps, type Option } from './index';

type MultiSelectProps = BaseSelectProps & {
  value       :   Option[]
  onChange    ?:  (selected: Option[]) => void
  persistOpen ?:  boolean
}

export function SearchableMultiSelect({ 
  options, 
  placeholder = "Select items", 
  className,
  onChange,
  value,
  readOnly,
  haveEffect,
  isOptional,
  persistOpen,
}: MultiSelectProps) {
  const [open, setOpen]                 = useState(false)
  const [contentWidth, setContentWidth] = useState(0)
  
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLDivElement>(null);

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
            aria-disabled={readOnly}
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
              `h-[${value.length * 10}px]`,
              className,
            )}
            onClick={(e) => {
              if (readOnly) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            <div className="flex flex-wrap gap-1 items-center">
              {value.length === 0 ? (
                <span>{placeholder}</span>
              ) : (
                value.map((option) => (
                  <Badge 
                    key={option?.value} 
                    variant="secondary"
                    className="flex items-center gap-1 pr-2 group-hover:bg-gray-700"
                  >
                    <span className="pr-1">{option?.label}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent hover:text-red-600"
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
        <PopoverContent className={cn("w-full p-0")} side="bottom" align="start" style={{ width: contentWidth > 0 ? contentWidth : 'auto' }}>
          <Command>
            <CommandList>
            <CommandInput
              placeholder="Search..."
              className="h-9"
              onValueChange={() => {
                listRef.current?.scrollTo({ top: 0, behavior: "auto" })
              }}
            />
            <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup className="max-h-60 overflow-y-auto" ref={listRef}>
                {options.map((option) => (
                  <>
                  <CommandItem
                    key={option?.value}
                    value={option?.label}
                    onSelect={() => {
                      toggleOption(option);
                    }}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      {value.some(
                        (selectedOption) => selectedOption?.value === option?.value
                      ) && <Check className="h-4 w-4 text-green-400" />}
                    </div>
                    {option?.label}
                  </CommandItem>
                  </>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    
  )
}