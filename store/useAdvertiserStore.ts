import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdvertiserData } from "@/types/adveriser";
import { mockAdvertiserData } from "@/services/mock/advertiser";

interface AdvertiserState {
  advertiserList: AdvertiserData[];
  setAdvertiserList: (advertiserList: AdvertiserData[]) => void;
}

export const useAdvertiserStore = create<AdvertiserState>()(
  persist(
    (set) => ({
      advertiserList: mockAdvertiserData,
      setAdvertiserList: (advertiserList) => set({ advertiserList }),
    }),
    {
      name: "advertiser-list",
    }
  )
);
