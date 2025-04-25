import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SmPayData } from "@/types/sm-pay";

interface SmPayDataState {
  smpayList: SmPayData[];
  setSmpayList: (data: SmPayData[]) => void;
}

export const useSmpayDataStore = create<SmPayDataState>()(
  persist(
    (set) => ({
      smpayList: [],
      setSmpayList: (data) => set({ smpayList: data }),
    }),
    {
      name: "smpay-data",
    }
  )
);
