"use client";

import { useEffect, useState } from "react";

import {
  Table as AntdTable,
  Skeleton,
  type TableProps as AntdTableProps,
} from "antd";
import { cn } from "@/lib/utils";

interface TableProps<T> extends AntdTableProps<T> {
  total?: number;
  loading?: boolean;
  defaultPageSize?: number;
}

const PAGE_SIZE_OPTIONS = ["10", "20", "50", "100"];

// antd 테이블 기반의 테이블 컴포넌트
function Table<T extends { id: string | number }>({
  columns,
  dataSource,
  total = 50,
  loading = false,
  defaultPageSize = 10,
  ...rest
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [renderLoading, setRenderLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderLoading(false);
    }, 1000); // 1초 후 데이터 세팅

    return () => clearTimeout(timer);
  }, []);

  if (renderLoading) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col">
      <AntdTable<T>
        loading={loading}
        className={classNames}
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.id}
        showSorterTooltip={false}
        pagination={{
          pageSize,
          current: currentPage,
          total,
          position: ["bottomCenter"],
          onChange: (page, newPageSize) => {
            setCurrentPage(page);
            setPageSize(newPageSize);
          },
          showSizeChanger: true,
          pageSizeOptions: PAGE_SIZE_OPTIONS,
          itemRender: (page, type) => {
            if (type === "prev") {
              return <button className="custom-arrow">&larr;</button>;
            }
            if (type === "next") {
              return <button className="custom-arrow">&rarr;</button>;
            }
            return (
              <button
                className={cn(
                  "custom-page",
                  page === currentPage && "custom-page-active"
                )}
              >
                {page}
              </button>
            );
          },
        }}
        {...rest}
      />
    </div>
  );
}

export default Table;

// [&_.ant-pagination-options]:!right-10  -> 페이지 크기 위치 맨 외른쪽
const classNames =
  "[&_.ant-pagination-options]:!absolute [&_.ant-pagination-options]:!right-10 [&_.ant-table-pagination]:!flex [&_.ant-table-pagination]:!items-center [&_.ant-table-pagination]:!justify-center [&_.ant-table-pagination]:!relative";
