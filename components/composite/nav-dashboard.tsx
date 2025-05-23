"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { dashboardItems } from "@/constants/dasboard";

export function NavDashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, toggleSidebar } = useSidebar();

  const { data: session } = useSession();

  const handleClick = (url: string, isHasSubMenu: boolean) => {
    if (state === "collapsed") {
      toggleSidebar();
      return;
    }

    if (isHasSubMenu) {
      return;
    }

    router.push(url);
  };

  const menuType = useMemo(() => {
    if (!session) return "agency";
    if (!session.user) return "agency";
    if (
      ["SYSTEM_ADMINISTRATOR", "OPERATIONS_MANAGER"].includes(session.user.type)
    ) {
      return "admin";
    }
    return "agency";
  }, [session]);

  console.log("dashboardItems[menuType]", dashboardItems[menuType]);
  console.log("pathname", pathname);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {dashboardItems[menuType].map((item) =>
          item.items && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="cursor-pointer"
                    isSelected={item.items.some(
                      (subItem) => subItem.url === pathname
                    )}
                    onClick={() => handleClick(item.url, item.items.length > 0)}
                  >
                    {item.icon && <item.icon />}
                    <span className="font-medium">{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const isSubActive = pathname === subItem.url;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isSubActive}
                            className={cn(
                              "cursor-pointer h-9 px-4 rounded-md text-sm",
                              // TODO : 피그마 디자인과 일치해볼지는 고민 좀
                              isSubActive &&
                                "bg-[#C9C0C0] text-black font-medium rounded-[12px] h-[36px]" // active 시
                            )}
                          >
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={item.isActive}
              >
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleClick(item.url, false)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
