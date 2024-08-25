import { create } from "zustand";

interface ChangeProfilePicture {
  isOpen: boolean;
  onOpen: (url?: string) => void;
  onClose: () => void;
  url?: string;
}

export const useChangeProfilePicture = create<ChangeProfilePicture>((set) => ({
  isOpen: false,
  onOpen: (url?: string) => set({ isOpen: true, url: url }),
  onClose: () => set({ isOpen: false, url: undefined }),
}));
