import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
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
import { useControllableState } from "@/utils/hooks/useControllableState";

interface ComboboxContextValue {
  isSelected: (value: unknown) => boolean;
  onSelect: (value: unknown) => void;
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null);

const useComboboxContext = () => {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error("Combobox compound components cannot be rendered outside");
  }
  return context;
};

const ComboboxProvider = ComboboxContext.Provider;

interface ComboboxCommonProps<TValue> {
  children: React.ReactNode;
  displayValue?: (item: TValue) => string;
  placeholder?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  inputPlaceholder?: string;
  search?: string;
  onSearchChange?: (search: string) => void;
  emptyState?: React.ReactNode;
}

type ComboboxFilterProps =
  | {
      shouldFilter?: true;
      filterFn?: React.ComponentProps<typeof Command>["filter"];
    }
  | {
      shouldFilter: false;
      filterFn?: never;
    };

type ComboboxValueProps<TValue> =
  | {
      multiple?: false;
      value?: TValue | null;
      defaultValue?: TValue | null;
      onValueChange?(value: TValue | null): void;
    }
  | {
      multiple: true;
      value?: TValue[] | null;
      defaultValue?: TValue[] | null;
      onValueChange?(value: TValue[] | null): void;
    };

export type ComboboxProps<TValue> = ComboboxCommonProps<TValue> &
  ComboboxValueProps<TValue> &
  ComboboxFilterProps;

export const Combobox = <TValue,>({
  children,
  displayValue,
  placeholder = "Select an option",
  value: valueProp,
  defaultValue,
  onValueChange,
  multiple = false,
  shouldFilter = true,
  filterFn,
  open: openProp,
  defaultOpen,
  onOpenChange,
  inputPlaceholder = "Search...",
  search,
  onSearchChange,
  emptyState = "Nothing found.",
}: ComboboxProps<TValue>) => {
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: (state) => {
      onValueChange?.(state as unknown as TValue & TValue[]);
    },
  });

  const isSelected = (selectedValue: unknown) => {
    if (Array.isArray(value)) {
      return value.includes(selectedValue as TValue);
    }
    return value === selectedValue;
  };

  const handleSelect = (selectedValue: unknown) => {
    let newValue: TValue | TValue[] | null = selectedValue as TValue;

    if (multiple) {
      if (Array.isArray(value)) {
        if (value.includes(newValue)) {
          const newArr = value.filter((val) => val !== selectedValue);
          newValue = newArr.length ? newArr : null;
        } else {
          newValue = [...value, newValue];
        }
      } else {
        newValue = [newValue];
      }
    } else if (value === selectedValue) {
      newValue = null;
    }

    setValue(newValue);
    setOpen(false);
  };

  const renderValue = (): string => {
    if (value) {
      if (Array.isArray(value)) {
        return `${value.length} selected`;
      }
      if (displayValue !== undefined) {
        return displayValue(value as unknown as TValue);
      }
      return placeholder;
    }
    return placeholder;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-full justify-between text-start font-normal"
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          <Icons.caretUpDown className="-me-1.5 h-5 w-5 text-tertiary-400" />
          {renderValue()}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full min-w-[var(--radix-popover-trigger-width)]"
        align="start"
      >
        <Command filter={filterFn} shouldFilter={shouldFilter}>
          <CommandInput
            placeholder={inputPlaceholder}
            autoFocus
            value={search}
            onValueChange={onSearchChange}
          />
          <CommandList className="max-h-60">
            <CommandEmpty>{emptyState}</CommandEmpty>
            <ComboboxProvider value={{ isSelected, onSelect: handleSelect }}>
              {children}
            </ComboboxProvider>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface ComboboxItemOptions<TValue> {
  value: TValue;
}

export interface ComboboxItemProps<TValue>
  extends ComboboxItemOptions<TValue>,
    Omit<
      React.ComponentProps<typeof CommandItem>,
      keyof ComboboxItemOptions<TValue> | "onSelect" | "role"
    > {
  onSelect?(value: TValue): void;
}

export const ComboboxItem = <
  TValue = Parameters<typeof Combobox>[0]["value"],
>({
  children,
  className,
  value,
  onSelect,
}: ComboboxItemProps<TValue>) => {
  const context = useComboboxContext();

  return (
    <CommandItem
      className={cn("ps-8", className)}
      role="option"
      onSelect={() => {
        context.onSelect(value);
        onSelect?.(value);
      }}
    >
      {context.isSelected(value) && (
        <Icons.check className="absolute start-2 h-4 w-4" />
      )}
      {children}
    </CommandItem>
  );
};
