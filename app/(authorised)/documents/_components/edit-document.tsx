import { Id } from "@/convex/_generated/dataModel";
import { Pencil } from "lucide-react";
import { IconPicker } from "../../_components/documents/emoji-picker";
import { useRenameModal } from "@/store/use-rename-modal";

interface EditDocumentProps {
  documentId: Id<"documents">;
  title:string;
}

export const EditDocument = ({ documentId,title }: EditDocumentProps) => {
  const {onOpen} = useRenameModal()
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Pencil size={15} />
        <p className="font-semibold">Edit</p>
      </div>
      <div className="flex flex-col gap-2 ml-2">
        <p onClick={()=>{
          onOpen(documentId,title)
        }} className="underline text-sm cursor-pointer">Rename document</p>
        <IconPicker documentId={documentId}>
          <p className="underline text-sm cursor-pointer text-left">
            Change icon
          </p>
        </IconPicker>
      </div>
    </div>
  );
};
