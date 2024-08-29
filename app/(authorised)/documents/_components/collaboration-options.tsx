"use client";

import { BookA, MoreHorizontal } from "lucide-react";
import { AuthorItem } from "./author-item";
import { cn } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useInviteModal } from "@/store/use-invite-modal";
import { AdminActions } from "./admin-actions";
import { Skeleton } from "@/components/ui/skeleton";

interface CollaborationOptionsProps {
  role: string;
  documentId: Id<"documents">;
}

export const CollaborationOptions = ({
  role,
  documentId,
}: CollaborationOptionsProps) => {
  const collaborators = useQuery(api.collaborations.getDocumentCollaborators, {
    documentId,
  });

  const { onOpen } = useInviteModal();

  

  if (collaborators === undefined) {
    return <div className="w-full flex flex-col gap-2">
      <Skeleton className="h-6 w-20"/>
      <Skeleton className="h-4 w-40"/>
      <Skeleton className="h-4 w-40"/>
      <Skeleton className="h-4 w-40"/>
    </div>
  }

  return (
    <div
      className={cn("flex flex-col gap-4 w-full", role === "owner" && "mt-16")}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookA size={16} />
          <p>Authors</p>
        </div>
        <AdminActions documentId={documentId}>
          <MoreHorizontal
            size={16}
            className={cn(role !== "admin" && "hidden")}
          />
        </AdminActions>
      </div>

      {collaborators && (
        <div className="flex flex-col gap-2">
          {collaborators.map((collaborator) => (
            <AuthorItem
              key={collaborator._id}
              documentId={documentId}
              authorId={collaborator.externalId}
              name={collaborator.name}
              image={collaborator.image}
              isAuthor={collaborator.isAuthor}
              role={role}
            />
          ))}
        </div>
      )}

      <div
        className={cn(
          "flex items-center justify-center w-full",
          role !== "owner" && "hidden"
        )}
      >
        <button
          onClick={() => {
            onOpen(documentId);
          }}
          className="px-6 py-2 font-semibold tracking-widest text-sm bg-green-500 rounded-sm mt-12"
        >
          Invite
        </button>
      </div>
    </div>
  );
};
