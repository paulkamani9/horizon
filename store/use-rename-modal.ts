import { create } from "zustand";

const defaultValues = { id: "", title: "" };

interface IRenameModalProps {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameModal = create<IRenameModalProps>((action) => ({
  isOpen: false,
  onOpen: (id, title) =>
    action({
      isOpen: true,
      initialValues: { id, title },
    }),
  onClose: () =>
    action({
      isOpen: false,
      initialValues: defaultValues,
    }),
  initialValues: defaultValues,
}));
