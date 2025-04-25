import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdvertiserData } from "@/types/adveriser";

interface AdvertiserState {
  advertiserList: AdvertiserData[];
  setAdvertiserList: (advertiserList: AdvertiserData[]) => void;
}

export const useAdvertiserStore = create<AdvertiserState>()(
  persist(
    (set) => ({
      advertiserList: [],
      setAdvertiserList: (advertiserList) => set({ advertiserList }),
    }),
    {
      name: "advertiser-list",
    }
  )
);
