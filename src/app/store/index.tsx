/* eslint-disable no-unused-vars */
import { create } from "zustand";

interface CampaignsState {
  currency: "EUR" | "USD" | "BTC";
  updateCurrency: (currency: CampaignsState["currency"]) => void;
}

export const useStore = create<CampaignsState>()((set) => ({
  currency: "BTC",
  updateCurrency: (currency: CampaignsState["currency"]) =>
    set(() => ({ currency: currency })),
}));
