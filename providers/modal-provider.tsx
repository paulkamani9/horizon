"use client";

import { SearchModal } from "@/components/modals/search-modal";
import { ChangeProfilePicture } from "@/components/modals/change-profilePicture";
import { ChangeNameModal } from "@/components/modals/changeName-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { MessageModal } from "@/components/modals/message-modal";
import { RenameModal } from "@/components/modals/rename-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <RenameModal />
      <InviteModal />
      <MessageModal />
      <ChangeProfilePicture />
      <ChangeNameModal />
      <SearchModal />
    </>
  );
};
