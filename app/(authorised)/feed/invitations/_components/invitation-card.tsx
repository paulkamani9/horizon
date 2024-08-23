"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import { AcceptOrReject } from "./accept-or-reject";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface InvitationCardProps {
  message?: string | undefined;
  documentId: Id<"documents">;
  ownerId: string;
}

export const InvitationCard = ({
  message,
  documentId,
  ownerId,
}: InvitationCardProps) => {
  const collaborationInfo = useQuery(
    api.collaborations.getDocumentCollaborators,
    { documentId }
  );

  const owner = useQuery(api.users.getAnotherUser, { externalId: ownerId });
  const document = useQuery(api.invitations.getInvitationDocuments, {
    documentId,
  });

  if (
    owner === undefined ||
    document === undefined ||
    collaborationInfo === undefined
  ) {
    return (
      <div className="w-full flex flex-col items-center">
        <InvitationCardsSkeleton />
      </div>
    );
  }

  const otherCollaborators = collaborationInfo.filter(
    (collaborator) => collaborator.externalId !== ownerId
  );

  if (owner === null || document === null) {
    return <p>no owner anymore...</p>;
  }

  return (
    <Card>
      <CardContent>
        <div className="flex gap-1 mt-6">
          <div className="px-1 py-2">
            <Link href={`/people/${ownerId}`}>
              <div className="h-6 w-6 relative overflow-clip rounded-[50%]">
                <Image
                  src={owner.image}
                  alt={owner.name}
                  fill
                  objectFit="center"
                />
              </div>
            </Link>
          </div>
          <div className="flex-1 flex flex-col px-2 p-2 gap-6">
            <div>
              <p className="text-sm">
                <span className="font-bold">
                  <Link href={`/people/${ownerId}`}>{owner.name}</Link>
                </span>{" "}
                has invited you to collaborate on{" "}
                <Link href={`/documents/${documentId}`}>
                  <span className="font-semibold underline">
                    {document.title}
                  </span>
                </Link>
                .
              </p>
              {otherCollaborators.length > 0 && (
                <>
                  <span className="text-sm">Other collaborators</span>
                  {otherCollaborators.map((collaborator, index) => (
                    <Link
                      key={collaborator.externalId}
                      href={`/people/${collaborator.externalId}`}
                    >
                      <span className="text-sm font-semibold">
                        {index > 0 ? ", " : ": "}
                        {collaborator.name}
                      </span>
                    </Link>
                  ))}
                  .
                </>
              )}
            </div>
            {message && (
              <div className="flex gap-1 items-start px-2">
                <MessageCircle size={16} className="mt-2" />
                <div className="px-2 py-2 border rounded flex-1">
                  <span className="text-sm">{message}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-center">
          <AcceptOrReject documentId={documentId} />
        </div>
      </CardFooter>
    </Card>
  );
};

export const InvitationCardsSkeleton = () => {
  return <Skeleton className="w-full max-w-xl h-40" />;
};
