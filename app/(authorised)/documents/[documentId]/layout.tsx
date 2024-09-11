"use client";
import { useEditBar } from "@/store/use-edit-bar";
import { EditBar } from "../_components/edit-bar";
import { Header, HeaderSkeleton } from "../_components/header";
import { cn } from "@/lib/utils";
// import { usePC } from "@/hooks/use-Pc";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { DocumentEditor } from "./_components/DocumentEditor";
import { NotAllowed } from "../../_components/not-allowed";
import { PageWrapper } from "../../_components/wrapper";

interface DocumentLayoutProps {
  children: React.ReactNode;
}

const DocumentLayout = ({ children }: DocumentLayoutProps) => {
  // const isPC = usePC();
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
          // isPC && "hidden",
          !isOpen && "hidden"
        )}
      />
      {/* we overwrite the default PageWrapper margin to lower it
      so we take add the difference of 12 px from the max-height, 
      we also give it a padding of 0 - meaning more space at the sides and top,
       for better typing and reading experience*/}
      <PageWrapper
        size={document.role === "invited" ? "large" : "compact"}
        className={
          document.role !== "invited"
            ? "mt-2 max-h-[calc(100%-48px)] px-0"
            : "mt-2 max-h-[calc(100%-104px)] px-0"
        }
      >
        <div className="mt-4 h-full w-full overflow-auto">
          <DocumentEditor {...document} />
          {/* {children} */}
        </div>
      </PageWrapper> 
    </div>
  );
};
export default DocumentLayout;
