import { ApiError, get } from "@/lib/api";
import type { TResponseMenu } from "@/types/api/menu";

// 메뉴 조회 API (MU001)
export const getUsersMailVerifyApi = async (): Promise<TResponseMenu> => {
  try {
    const response = await get<TResponseMenu>("/api/v1/menus");
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw error;
  }
};
