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

// TODO : 나중에 처리
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

// 서버사이드 셀렉박스 예시
/* <SelectSearchServer
className="max-w-[500px]"
fetchOptions={fetchAdvertiserOptions}
value={agency}
onValueChange={setAgency}
placeholder="대행사를 선택하세요"
searchPlaceholder="대행사명, 대표자를 검색하세요."
/> 
}

async function fetchAdvertiserOptions(params: TableParams) {
  const response = await fetchAdvertisers(params);

  return {
    items: response.data.map((advertiser) => ({
      label: `${advertiser.advertiserName} | ${advertiser.name}`,
      value: advertiser.customerId,
    })),
    hasNextPage:
      response.total >
      (params.pagination?.current || 1) * (params.pagination?.pageSize || 10),
  };
}


export const fetchAdvertisers = async (
  params: TableParams
): Promise<AdvertiserListResponse & { total: number }> => {
  // 서버 응답을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { pagination, sort, filters } = params;
  let filteredData = [...mockAdvertiserData];

  // 필터링 적용
  if (filters) {
    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        if (key === "search") {
          const searchTerm = values[0].toLowerCase();
          filteredData = filteredData.filter(
            (item: AdvertiserData) =>
              item.name.toLowerCase().includes(searchTerm) ||
              item.customerId.toLowerCase().includes(searchTerm) ||
              item.loginId.toLowerCase().includes(searchTerm)
          );
        } else {
          filteredData = filteredData.filter((item: AdvertiserData) => {
            const itemValue = String((item as any)[key]);
            return values.includes(itemValue);
          });
        }
      }
    });
  }

  // 정렬 적용
  if (sort?.field && sort.order) {
    filteredData.sort((a: AdvertiserData, b: AdvertiserData) => {
      const aValue = (a as any)[sort.field!];
      const bValue = (b as any)[sort.field!];

      if (typeof aValue === "string") {
        return sort.order === "ascend"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number") {
        return sort.order === "ascend" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }

  // 페이지네이션 적용
  const { current, pageSize } = pagination;
  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    success: true,
    total: filteredData.length,
    hasNextPage: filteredData.length > pageSize,
  };
};

*/
