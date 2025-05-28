export type TResponseMenu = {
  menuId: number;
  parentId: number;
  name: string;
  displayOrder: number;
  registerDt: string;
  children: TResponseMenu[];
};
