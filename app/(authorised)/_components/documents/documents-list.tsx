"use client";

import { useQuery } from "convex/react";
import { DocumentItem, DocumentItemSkeleton } from "./document-item";
import { api } from "@/convex/_generated/api";
import { EmptyState } from "./empty-state";
import { NotAllowed } from "../not-allowed";

export const MyDocumentsList = () => {
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
          content={document.content}
        />
      ))}
    </div>
  );
};

interface AnotherUserDocumentsListProps {
  params: {
    id: string;
  };
}

export const AnotherUserDocumentsList = ({
  params: { id },
}: AnotherUserDocumentsListProps) => {
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

  if (documents === null) {
    return <NotAllowed type={"User"} />;
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
          content={document.content}
        />
      ))}
    </div>
  );
};
