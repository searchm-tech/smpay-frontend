"use client";

import { useState, useEffect } from "react";
import { Descriptions as AntdDescriptions } from "antd";
import { Skeleton } from "@/components/ui/skeleton";

export type DescriptionProps = {
  columns?: number;
  bordered?: boolean;
  className?: string;
  children: React.ReactNode;
  styles?: {
    label?: {
      width?: number;
      fontWeight?: string;
    };
  };
};

export type DescriptionItemProps = {
  label: string | React.ReactNode;
  children: React.ReactNode;
  span?: number;
  className?: string;
  styles?: {
    content?: React.CSSProperties;
    label?: React.CSSProperties;
  };
};

export function DescriptionItem({
  label,
  children,
  span,
  className,
  styles,
}: DescriptionItemProps) {
  return (
    <AntdDescriptions.Item
      label={label}
      span={span}
      className={className}
      styles={styles}
    >
      {children}
    </AntdDescriptions.Item>
  );
}

export function Descriptions({
  columns = 2,
  bordered = true,
  className = "",
  children,
  styles = { label: { width: 200, fontWeight: "bold" } },
}: DescriptionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-2">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <AntdDescriptions
      column={columns}
      bordered={bordered}
      className={className}
      styles={styles}
    >
      {children}
    </AntdDescriptions>
  );
}

Descriptions.Item = DescriptionItem;

// 사용 예시:
/*
<Descriptions columns={3} bordered={true} className="my-4">
  <Descriptions.Item label="이름" className="text-gray-600">
    홍길동
  </Descriptions.Item>
  <Descriptions.Item label="나이">30세</Descriptions.Item>
  <Descriptions.Item label="주소">서울시 강남구</Descriptions.Item>
  <Descriptions.Item label="상세 설명" span={2}>
    긴 설명 텍스트
  </Descriptions.Item>
</Descriptions>

// label width 변경 예시:
<Descriptions styles={{ label: { width: 300 } }}>
  ...
</Descriptions>
*/
