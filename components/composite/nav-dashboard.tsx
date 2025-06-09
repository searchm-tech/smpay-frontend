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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn, getIsAdmin } from "@/lib/utils";
import { useQueryMenu } from "@/hooks/queries/menu";
import { dashboardItems } from "@/constants/dasboard";
import {
  mapBackendMenuToFrontend,
  filterMenuByUserType,
} from "@/utils/menuMapper";

export function NavDashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, toggleSidebar } = useSidebar();

  const { data: session } = useSession();
  const { data: backendMenu } = useQueryMenu();

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
    if (getIsAdmin(session.user.type)) {
      return "admin";
    }
    return "agency";
  }, [session]);

  // 백엔드 메뉴가 있으면 사용, 없으면 기존 하드코딩된 메뉴 사용 - 나중에 이대로 테스트 해보고 적용
  const menuItems = useMemo(() => {
    if (!session?.user) return dashboardItems["common"];
    if (backendMenu && session?.user) {
      const mappedMenus = mapBackendMenuToFrontend(backendMenu);
      const filteredMenus = filterMenuByUserType(
        mappedMenus,
        session.user.type
      );
      return filteredMenus;
    }

    // 백엔드 메뉴가 없으면 기존 방식 사용
    return dashboardItems[menuType];
  }, [backendMenu, session?.user, menuType]);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {menuItems.map((item) =>
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
                    isSelected={item.items?.some(
                      (subItem) => subItem.url === pathname
                    )}
                    onClick={() =>
                      handleClick(item.url, (item.items?.length || 0) > 0)
                    }
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
