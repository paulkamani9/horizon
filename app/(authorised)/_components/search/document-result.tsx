import { Id } from "@/convex/_generated/dataModel";
import { FileIcon } from "lucide-react";
import { StarButton } from "../../documents/_components/star-button";
import { StarItem } from "../star-item";

interface DocumentResultProps {
  _id: Id<"documents">;
  _creationTime: number;
  icon?: string | undefined;
  content?: string | undefined;
  stringContent?: string | undefined;
  description?: string | undefined;
  title: string;
  authorId: string;
  authorName: string;
  isPublic: boolean;
}

export const DocumentResult = ({
  title,
  authorId,
  _id,
  isPublic,
  authorName,
}: DocumentResultProps) => {
  return (
    <div
      role="button"
      className="flex gap-2 items-center py-1 px-0.5 border-b hover:bg-gray-100 dark:hover:bg-gray-800 max-w-full "
    >
      <FileIcon size={16} />
      <div className="flex flex-col flex-1 justify-start truncate">
        <p className="text-sm font-semibold truncate">{title}</p>
        <p className="text-xs ml-2 opacity-80 truncate">{authorName}</p>
      </div>
      <StarItem documentId={_id} isPublic={isPublic} size="small" />
    </div>
  );
};
