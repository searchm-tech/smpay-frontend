import { Fragment } from "react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItemType {
  title: string;
  url: string;
}

export function BreadcrumbContainer({
  items = [],
}: {
  items: BreadcrumbItemType[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.length > 0 && (
          <Fragment>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center gap-2">
                  <HomeIcon className="w-4 h-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {items.map((item, index) => (
              <div
                key={`${item.url}-${index}`}
                className="flex items-center gap-2"
              >
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index === items.length - 1 ? (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </Fragment>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
