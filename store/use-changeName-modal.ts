import { create } from "zustand";

const defaultValues = { name: "" };

interface ChangeNameModalProps {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (name: string) => void;
  onClose: () => void;
}

export const useChangeNameModal = create<ChangeNameModalProps>((action) => ({
  isOpen: false,
  onOpen: (name: string) =>
    action({
      isOpen: true,
      initialValues: { name },
    }),
  onClose: () =>
    action({
      isOpen: false,
      initialValues: defaultValues,
    }),
  initialValues: defaultValues,
}));
