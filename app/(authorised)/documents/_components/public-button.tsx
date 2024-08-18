"use client";

import { cn } from "@/lib/utils";
import { EyeOff, GraduationCap } from "lucide-react";
import { AlertAction } from "../../_components/alert-action";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface PublicButtonProps {
  role: string;
  isPublic: boolean;
  documentId: Id<"documents">;
}

export const PublicButton = ({
  role,
  isPublic,
  documentId,
}: PublicButtonProps) => {
  const toggleDocumentPublicity = useMutation(
    api.documents.toggleMyDocumentsPublicity
  );
 const onToggleDocumentPublicity = () => {
    const promise = toggleDocumentPublicity({ documentId });
    const messages = {
      loading: "loading",
      error: "Failed to change documents publicity",
    };

    if (!isPublic) {
      toast.promise(promise, {
        success: "Success, your document is now public",
        ...messages,
      });
    } else {
      toast.promise(promise, {
        success: "Success, your document is now private",
        ...messages,
      });
    }
  };


  return (
    <div
      className={cn("w-full flex justify-center", role !== "owner" && "hidden")}
    >
      <AlertAction
        title={
          isPublic
            ? "Make this document Private?"
            : "Make this document Public?"
        }
        description={
          isPublic
            ? "This action will make this this document only available to you and other collaborators."
            : "This action will make this document available for everyone."
        }
        onConfirm={onToggleDocumentPublicity}
      >
        <button
          className={cn(
            "bg-blue-800 text-white px-4 py-2 text-sm flex items-center gap-2 rounded",
            isPublic && "bg-[#404040]"
          )}
        >
          <GraduationCap size={20} className={cn(isPublic && "hidden")} />
          <EyeOff size={20} className={cn(!isPublic && "hidden")} />
          {isPublic ? "Make Private" : "Make Public"}
        </button>
      </AlertAction>
    </div>
  );
};
