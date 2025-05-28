import type { TResponseMenu } from "@/types/api/menu";

// 백엔드 메뉴에서 사용자가 접근 가능한 메뉴 이름들을 추출
export function getAccessibleMenuNames(
  backendMenu: TResponseMenu | TResponseMenu[]
): string[] {
  if (!backendMenu) return [];

  const menuArray = Array.isArray(backendMenu) ? backendMenu : [backendMenu];
  const accessibleMenus: string[] = [];

  function extractMenuNames(menus: TResponseMenu[]) {
    for (const menu of menus) {
      accessibleMenus.push(menu.name);
      if (menu.children && menu.children.length > 0) {
        extractMenuNames(menu.children);
      }
    }
  }

  extractMenuNames(menuArray);
  return accessibleMenus;
}

// 프론트 메뉴에서 백엔드 권한에 따라 필터링
export function filterFrontendMenuByBackendPermission(
  frontendMenus: any[],
  backendMenu: TResponseMenu | TResponseMenu[]
): any[] {
  const accessibleMenuNames = getAccessibleMenuNames(backendMenu);

  return frontendMenus
    .filter((menu) => accessibleMenuNames.includes(menu.title))
    .map((menu) => ({
      ...menu,
      items: menu.items?.filter((item: any) =>
        accessibleMenuNames.includes(item.title)
      ),
    }));
}
