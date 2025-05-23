import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { NavDashboard } from "@/components/composite/nav-dashboard";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="top-[74px] h-screen" {...props}>
      <SidebarContent>
        <NavDashboard />
      </SidebarContent>
    </Sidebar>
  );
}
