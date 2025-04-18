"use client";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useSidebar } from "@/store/use-sidebar";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const NewButton = () => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.documents.createDocument);
  const { onClose } = useSidebar();

  const onCreateDocument = () => {
    const promise = mutate({ title: "New document" })
      .then((document) => {
        onClose();
        router.push(`/documents/${document}`);
      })
      .catch(() => {
        return null;
      });

    toast.promise(promise, {
      success: "Success! New document created.",
      error: "Error. Failed to create new document.",
      loading: "Creating new document...",
    });
  };

  return (
    <button
      onClick={onCreateDocument}
      disabled={pending}
      className="bg-blue-800 text-white flex items-center justify-center px-4 py-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Plus size={20} className="mr-2" />
      <span className="text-base lg:text-xl">New</span>
    </button>
  );
};
