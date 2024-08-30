"use client";
import { useEditBar } from "@/store/use-edit-bar";
import { EditBar } from "../_components/edit-bar";
import { Header, HeaderSkeleton } from "../_components/header";
import { cn } from "@/lib/utils";
import { usePC } from "@/hooks/use-Pc";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { DocumentEditor } from "./_components/DocumentEditor";
import { NotAllowed } from "../../_components/not-allowed";

interface DocumentLayoutProps {
  children: React.ReactNode;
}

const DocumentLayout = ({ children }: DocumentLayoutProps) => {
  const isPC = usePC();
  const { isOpen, onClose } = useEditBar();
  const params = useParams();
  const documentId = params.documentId as string;

  const document = useQuery(api.documents.checkRoleAndReturnDocument, {
    documentId: documentId as Id<"documents">,
  });

  if (document === undefined) {
    return <HeaderSkeleton />;
  }

  if (document === null) {
    return <NotAllowed type="Document" />;
  }

  return (
    <div className="h-full w-full relative ">
      <Header
        documentId={document._id}
        role={document.role}
        icon={document.icon}
        title={document.title}
      />
      <EditBar
        role={document.role}
        isPublic={document.isPublic}
        documentId={document._id}
        authorId={document.authorId}
        title={document.title}
        description={document.description}
        createdAt={document._creationTime}
      />
      <div
        role="button"
        onClick={() => {
          onClose();
        }}
        className={cn(
          "fixed h-full w-full top-0 left-0",
          isPC && "hidden",
          !isOpen && "hidden"
        )}
      />
      <div className="mt-4 w-full xl:w-[calc(100%-288px)]  h-[calc(100%-112px)] overflow-auto">
        <DocumentEditor {...document} />
        {/* {children} */}
      </div>
    </div>
  );
};
export default DocumentLayout;
