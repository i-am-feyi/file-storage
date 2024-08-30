import { create } from "zustand";

interface useFileFilterStore {
  type: "all" | "image" | "csv" | "pdf" | undefined;
  setType: (type: any) => void;
}

export const useFileFilterStore = create<useFileFilterStore>((set) => ({
  type: "all",
  setType: (type) => set({ type }),
}));
