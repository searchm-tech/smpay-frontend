"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import useDebounce from "@/hooks/use-debounce";

import { cn } from "@/lib/utils";
import { TableParams } from "@/services/types";

interface SelectSearchServerProps<T extends { value: string; label: string }> {
  fetchOptions: (
    params: TableParams
  ) => Promise<{ items: T[]; hasNextPage: boolean }>;
  value: string | undefined;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  debounceMs?: number;
}

export function SelectSearchServer<T extends { value: string; label: string }>({
  fetchOptions,
  value,
  onValueChange,
  placeholder = "선택해주세요",
  searchPlaceholder = "검색...",
  emptyMessage = "검색 결과가 없습니다.",
  className,
  debounceMs = 500,
}: SelectSearchServerProps<T>) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const debouncedSearch = useDebounce(searchValue, debounceMs);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    // isError,
  } = useInfiniteQuery({
    queryKey: ["search", debouncedSearch] as const,
    queryFn: async ({ pageParam }) => {
      console.log("pageParam", pageParam);
      return fetchOptions({
        pagination: {
          current: pageParam as number,
          pageSize: 10,
        },
        filters: {
          search: debouncedSearch ? [debouncedSearch] : [],
        },
      });
    },
    getNextPageParam: (
      lastPage: { hasNextPage: boolean; items: T[] },
      _allPages,
      lastPageParam
    ) => {
      return lastPage.hasNextPage ? lastPageParam + 1 : undefined;
    },
    enabled: open,
    initialPageParam: 1,
  });

  const options = useMemo(
    () => data?.pages?.flatMap((page) => page.items) || [],
    [data]
  );

  useEffect(() => {
    if (!listRef.current || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "min-w-[240px] w-full justify-between text-[#6F6F6F]",
            className
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("p-0", className)}
        style={{ width: "var(--radix-popper-anchor-width)" }}
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onValueChange={(value: string) => setSearchValue(value)}
          />

          {isLoading && (
            <div className="h-[100px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          )}

          {!isLoading && !options.length && (
            <CommandEmpty>{emptyMessage}</CommandEmpty>
          )}

          <CommandGroup className="max-h-[300px] overflow-auto" ref={listRef}>
            {options.map((option) => (
              <CommandItem
                className="cursor-pointer"
                key={option.value}
                value={String(option.value)}
                onSelect={(currentValue) => {
                  onValueChange(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
            {hasNextPage && !isFetchingNextPage && (
              <div ref={observerRef} className="py-2 text-center text-gray-500">
                Scroll to load more...
              </div>
            )}
            {isFetchingNextPage && (
              <div className="py-2 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
