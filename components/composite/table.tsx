"use client";

// antd 테이블 기반의 테이블 컴포넌트
import { Table as AntdTable, type TableProps as AntdTableProps } from "antd";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TableProps<T> extends AntdTableProps<T> {
  total?: number;
}

function TableComponent<T extends { id: string | number }>({
  columns,
  dataSource,
  total = 50,
  ...rest
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <AntdTable<T>
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
