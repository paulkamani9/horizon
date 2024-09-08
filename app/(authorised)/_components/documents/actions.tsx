"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Pencil, Smile, Trash2 } from "lucide-react";
import { AlertAction } from "../alert-action";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useRenameModal } from "@/store/use-rename-modal";
import { IconPicker } from "./emoji-picker";
import { Id } from "@/convex/_generated/dataModel";
import { PartialBlock } from "@blocknote/core";
import { extractFileUrls } from "@/lib/extract-file-urls";
import { useEdgeStore } from "@/utils/edgestore";

interface ActionsProps {
  children: React.ReactNode;
  title: string;
  documentId: Id<"documents">;
  content?: string;
}

export const Actions = ({
  children,
  title,
  documentId,
  content,
}: ActionsProps) => {
  const { edgestore } = useEdgeStore();
  const { onOpen } = useRenameModal();
  const { mutate: deleteMyDocumentMutation } = useApiMutation(
    api.documents.deleteMyDocument
  );

  const onDeleteMyDocument = () => {
    if (content) {
      const existingBlocks: PartialBlock[] = JSON.parse(content);
      const fileUrls = extractFileUrls(existingBlocks);
      fileUrls.map(async (url) => {
        await edgestore.publicFiles.delete({ url });
      });
    }
    deleteMyDocumentMutation({ documentId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem
          onClick={() => onOpen(documentId, title)}
          className="hover:bg-[--light-bg] hover:dark:bg-[--dark-bg]"
        >
          <div className="text-xs flex gap-4 px-1 py-2 items-center w-full justify-start cursor-pointer ">
            <Pencil size={16} /> Rename document
          </div>
        </DropdownMenuItem>

        <IconPicker documentId={documentId} isDropdown={true}>
          <Button
            variant={"ghost"}
            className="text-xs flex items-center w-full justify-start gap-4 px-3 py-4 rounded-sm"
          >
            <Smile size={16} />
            Change icon
          </Button>
        </IconPicker>

        <DropdownMenuSeparator />

        <AlertAction
          title="Delete Document"
          description="This document will be deleted forever. Are you sure?"
          color="red"
          onConfirm={onDeleteMyDocument}
        >
          <div className="text-xs flex gap-4 px-3  py-4 rounded-sm items-center justify-start text-[--dark-red] dark:text-[--light-red] hover:bg-[--light-bg] hover:dark:bg-[--dark-bg] cursor-pointer">
            <Trash2 size={16} /> Delete document
          </div>
        </AlertAction>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
