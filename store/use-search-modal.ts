import { create } from "zustand";

const defaultValue = {
  search: "",
};

interface SearchStore {
  initialValue: typeof defaultValue;
  isOpen: boolean;
  onOpen: (search: string) => void;
  onClose: () => void;
}

export const useSearchModal = create<SearchStore>((set) => ({
  isOpen: false,
  onOpen: (search: string) => set({ isOpen: true, initialValue: { search } }),
  onClose: () => set({ isOpen: false, initialValue: defaultValue}),
  initialValue: defaultValue,
}));
