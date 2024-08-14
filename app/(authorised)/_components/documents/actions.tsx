"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, Smile, Trash2 } from "lucide-react";
import { AlertAction } from "../alert-action";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useRenameModal } from "@/store/use-rename-modal";
import { IconPicker } from "./emoji-picker";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useEmojiPicker } from "@/store/use-emoji-picker";

interface ActionsProps {
  children: React.ReactNode;
  title: string;
  documentId: Id<"documents">;
}

export const Actions = ({ children, title, documentId }: ActionsProps) => {
  const { onOpen } = useRenameModal();
  const { mutate: deleteMyDocumentMutation } = useApiMutation(
    api.documents.deleteMyDocument
  );
  const changeIcon = useMutation(api.documents.changeMyDocumentIcon);
  const { toClose} = useEmojiPicker();

  const onChange = (icon: string) => {
    const promise = changeIcon({ icon, documentId });
    toClose();

    toast.promise(promise, {
      success: "Icon changed",
      loading: "Changing icon..",
      error: "Failed to change icon.",
    });
  };

  const onDeleteMyDocument = () => {
    deleteMyDocumentMutation({ documentId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            onOpen(documentId, title);
          }}
        >
          <Button
            variant="ghost"
            className="text-xs flex gap-2 items-center pl-2"
          >
            <Pencil size={16} /> Rename document
          </Button>
        </DropdownMenuItem>

        <IconPicker onChange={onChange}>
          <Button
            variant="ghost"
            className="text-xs w-full flex gap-2 items-center justify-start"
          >
            <Smile size={16} /> Change icon
          </Button>
        </IconPicker>

        <DropdownMenuSeparator />

        <AlertAction
          title="Delete Document"
          description="This document will be deleted forever. Are you sure?"
          color="red"
          onConfirm={onDeleteMyDocument}
        >
          <Button
            variant="ghost"
            className="text-xs flex gap-2 items-center text-[--dark-red] dark:text-[--light-red]"
          >
            <Trash2 size={16} /> Delete document
          </Button>
        </AlertAction>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
