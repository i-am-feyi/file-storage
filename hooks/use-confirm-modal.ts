import { create } from "zustand";

interface useConfirmModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onConfirm?: () => void;
  setOnConfirm: (callback: () => void) => void;
}

export const useConfirmModal = create<useConfirmModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setOnConfirm: (callback) => set({ onConfirm: callback }),
}));
