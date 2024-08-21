"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { Check, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

interface AcceptOrRejectProps {
  documentId: Id<"documents">;
}

export const AcceptOrReject = ({ documentId }: AcceptOrRejectProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate, pending } = useApiMutation(
    api.invitations.acceptOrRejectInvitation
  );

  const onAcceptOrRejectInvitation = (isAccept: boolean) => {
    const successMessages = {
      success: "Success, You are now collaborating on this document.",
      error: "Error, failed to accept invitation.",
      loading: "Accepting invitation.",
    };

    const ErrorMessages = {
      success: "You have denied this invitation.",
      error: "Error, failed to deny invitation.",
      loading: "Denying invitation.",
    };

    if (isAccept === true) {
      const promise = mutate({ isAccept, documentId });
      toast.promise(promise, {
        ...successMessages,
      });
    } else {
      if (pathname.includes("document")) {
        router.back();
      }
      const promise = mutate({ isAccept, documentId }).then(() => {});
      toast.promise(promise, {
        ...ErrorMessages,
      });
    }
  };

  return (
    <div className="flex flex-row items-center gap-6">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onAcceptOrRejectInvitation(true);
        }}
        size="sm"
        className="text-xs  bg-green-500 text-white hover:bg-green-600 "
      >
        <Check size={16} className="mr-0.5" />
        Accept
      </Button>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onAcceptOrRejectInvitation(false);
        }}
        size="sm"
        className="tex-xs bg-red-500  text-white hover:bg-red-600 "
      >
        <X size={16} className="mr-0.5" />
        Reject
      </Button>
    </div>
  );
};
