"use client";

import React, { useEffect, useState } from "react";

import {
  Table as AntdTable,
  Skeleton,
  type TableProps as AntdTableProps,
} from "antd";
import { cn } from "@/lib/utils";

interface TableProps<T> extends AntdTableProps<T> {
  total?: number;
  loading?: boolean;
}

// antd 테이블 기반의 테이블 컴포넌트
function TableComponent<T extends { id: string | number }>({
  columns,
  dataSource,
  total = 50,
  loading = false,
  ...rest
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [renderLoading, setRenderLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderLoading(false);
    }, 1500); // 1.5초 후 데이터 세팅

    return () => clearTimeout(timer);
  }, []);

  if (renderLoading) {
    return <Skeleton />;
  }

  return (
    <AntdTable<T>
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      rowKey={(record) => record.id}
      pagination={{
        pageSize: 10,
        current: currentPage,
        total,
        onChange: (page) => setCurrentPage(page),
        itemRender: (page, type) => {
          // originalElement
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
  );
}

export default TableComponent;
