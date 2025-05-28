"use client";

import { Typography } from "@/components/ui/typography";
import { BreadcrumbContainer } from "@/components/composite/breadcrumb-separator";
import type { DashboardSubItem } from "@/types/menu";

interface Props {
  title: string;
  items: DashboardSubItem[];
}
const ContentHeader = ({ title, items }: Props) => {
  return (
    <header>
      <div className="pt-3 px-2 flex justify-between items-center">
        <Typography variant="h4">{title}</Typography>
        <BreadcrumbContainer items={items} />
      </div>
      <div className="my-1 border-b-2 border-black" />
    </header>
  );
};

export default ContentHeader;
