"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { LogOut } from "lucide-react";
import { AlertAction } from "../../_components/alert-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AdminActionsProps {
  children: React.ReactNode;
  documentId: Id<"documents">;
}

export const AdminActions = ({ children, documentId }: AdminActionsProps) => {
  const router = useRouter();
  const leaveCollaboration = useMutation(api.collaborations.leaveCollaboration);
  const onLeaveCollaboration = () => {
    router.back();
    const promise = leaveCollaboration({ documentId });
    toast.promise(promise, {
      success: "Success, you left collaboration.",
      loading: "Leaving document",
      error: "Failed to leave collaboration.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <AlertAction
          title="Leave Collaboration?"
          description="You would loose access to this document."
          onConfirm={onLeaveCollaboration}
          color="red"
        >
          <Button
            variant="ghost"
            className="text-xs flex items-center gap-2 text-red-500"
          >
            <LogOut size={20} /> Leave collaboration
          </Button>
        </AlertAction>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
