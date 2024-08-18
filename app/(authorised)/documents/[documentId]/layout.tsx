"use client";
import { useEditBar } from "@/store/use-edit-bar";
import { EditBar } from "../_components/edit-bar";
import { Header } from "../_components/header";
import { cn } from "@/lib/utils";
import { usePC } from "@/hooks/use-Pc";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

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

  if(!document){
    return (
      <p>no found doc</p>
    )
  }

  return (
    <div className="h-full w-full relative ">
      <Header />
      <EditBar
       role={document.role}
        isPublic={document.isPublic}
        documentId={document._id} />
      <div
        role="button"
        onClick={() => {
          onClose();
        }}
        className={cn(
          "fixed bg-transparent h-full w-full top-0 left-0",
          isPC && "hidden",
          !isOpen && "hidden"
        )}
      />
      <div className="mt-4 w-full xl:w-[calc(100%-288px)]  h-[calc(100%-112px)] ">
        {children}
      </div>
    </div>
  );
};
export default DocumentLayout;
