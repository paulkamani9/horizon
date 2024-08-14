import { create } from "zustand";

interface EmojiStore {
  open: boolean;
  toOpen: () => void;
  toClose: () => void;
}

export const useEmojiPicker = create<EmojiStore>((set) => ({
  open: false,
  toOpen: () => set({ open: true }),
  toClose: () => set({ open: false }),
}));
