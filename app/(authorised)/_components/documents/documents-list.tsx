"use client";

import { useQuery } from "convex/react";
import { DocumentItem } from "./document-item";
import { api } from "@/convex/_generated/api";

export const DocumentsList = () => {
  const documents = useQuery(api.documents.getMyDocuments);
  return (
    <div className="w-full grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 ">
      {documents?.map((document) => (
        <DocumentItem
          key={document._id}
          documentId={document._id}
          title={document.title}
          icon={document.icon}
        />
      ))}
    </div>
  );
};
