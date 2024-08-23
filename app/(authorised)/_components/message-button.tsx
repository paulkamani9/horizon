"use client";

import { useMessageModal } from "@/store/use-message-modal";

interface MessageButtonProps {
  id: string;
  email: string;
  name: string;
}

export const MessageButton = ({ id, email,name }: MessageButtonProps) => {
  const { onOpen } = useMessageModal();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onOpen(id, email, name);
      }}
      className="text-sm border border-black dark:border-white px-4 py-2 rounded bg-transparent"
    >
      Message
    </button>
  );
};
