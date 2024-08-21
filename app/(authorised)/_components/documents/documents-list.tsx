"use client";

import { useQuery } from "convex/react";
import { DocumentItem, DocumentItemSkeleton } from "./document-item";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { EmptyState } from "./empty-state";

export const DocumentsList = () => {
  const params = useParams();

  const id = params.id as string;

  if (!id) {
    const documents = useQuery(api.documents.getMyDocuments);

    if (documents === undefined) {
      return (
        <div className="w-full grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 ">
          <DocumentItemSkeleton />
          <DocumentItemSkeleton />
          <DocumentItemSkeleton />
          <DocumentItemSkeleton />
        </div>
      );
    }

    if (documents.length < 1) {
      return <EmptyState isUser={true} />;
    }

    return (
      <div className="w-full grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 ">
        {documents.map((document) => (
          <DocumentItem
            key={document._id}
            documentId={document._id}
            title={document.title}
            icon={document.icon}
            authorId={document.authorId}
            isPublic={document.isPublic}
          />
        ))}
      </div>
    );
  }

  const documents = useQuery(api.documents.getAnotherUsersPublicDocuments, {
    id,
  });

  if (documents === undefined) {
    return (
      <div className="w-full grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 ">
        <DocumentItemSkeleton />
        <DocumentItemSkeleton />
        <DocumentItemSkeleton />
        <DocumentItemSkeleton />
      </div>
    );
  }

  if (documents.length < 1) {
    return <EmptyState isUser={false} />;
  }

  return (
    <div className="w-full grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 ">
      {documents?.map((document) => (
        <DocumentItem
          key={document._id}
          documentId={document._id}
          title={document.title}
          icon={document.icon}
          authorId={document.authorId}
          isPublic={document.isPublic}
        />
      ))}
    </div>
  );
};
