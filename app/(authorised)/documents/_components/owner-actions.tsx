"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { LogOut } from "lucide-react";
import { AlertAction } from "../../_components/alert-action";
import { toast } from "sonner";

interface OwnerActionsProps {
  children: React.ReactNode;
  authorId: string;
  documentId: Id<"documents">;
  name: string;
}

export const OwnerActions = ({
  authorId,
  documentId,
  children,
  name,
}: OwnerActionsProps) => {
  const removeCollaborator = useMutation(api.collaborations.removeCollaborator);

  const onRemoveCollaborator = () => {
    const promise = removeCollaborator({
      documentId,
      collaboratorId: authorId,
    });

    toast.promise(promise, {
      success: `Success, ${name} is has been removed.`,
      error: `Failed to remove, ${name}.`,
      loading: `Removing ${name}.`,
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <AlertAction
          title={`Remove ${name}?`}
          description={`This action will stop ${name} from writing in this document`}
          onConfirm={onRemoveCollaborator}
        >
          <Button
            variant="ghost"
            className="text-xs text-red-500 flex items-center gap-2"
          >
            <LogOut size={20} />
            Remove author
          </Button>
        </AlertAction>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
