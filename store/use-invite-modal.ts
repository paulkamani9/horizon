import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

interface IInviteModalProps {
  isOpen: boolean;
  documentId: string;
  onOpen: (documentId: Id<"documents">) => void;
  onClose: () => void;
}

export const useInviteModal = create<IInviteModalProps>((set) => ({
  isOpen: false,
  onOpen: (documentId: Id<"documents">) =>
    set({
      isOpen: true,
      documentId: documentId,
    }),
  onClose: () =>
    set({
      isOpen: false,
      documentId: "",
    }),
    documentId: ""
}));
