import { create } from "zustand";

const defaultValues = {
  receiverId: "",
  email: "",
  name: "",
  title: "" as string | undefined,
  parentMessageId: "" as string | undefined,
};

interface UseMessageModalProps {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (
    receiverId: string,
    email: string,
    name: string,
    title?: string,
    parentMessageId?: string
  ) => void;
  onClose: () => void;
}

export const useMessageModal = create<UseMessageModalProps>((action) => ({
  isOpen: false,
  onOpen: (receiverId, email, name, title, parentMessageId) =>
    action({
      isOpen: true,
      initialValues: { receiverId, email, name, title, parentMessageId },
    }),
  onClose: () =>
    action({
      isOpen: false,
      initialValues: defaultValues,
    }),
  initialValues: defaultValues,
}));
