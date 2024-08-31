import { create } from "zustand";

interface useFileFilterStore {
  type:
    | "all"
    | "web"
    | "font"
    | "form"
    | "image"
    | "video"
    | "audio"
    | "email"
    | "binary"
    | "archive"
    | "document"
    | undefined;
  setType: (type: any) => void;
}

export const useFileFilterStore = create<useFileFilterStore>((set) => ({
  type: "all",
  setType: (type) => set({ type }),
}));
