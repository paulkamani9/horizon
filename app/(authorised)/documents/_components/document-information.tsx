import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";

interface DocumentInformationProps {
  role?: string;
}

export const DocumentInformation = ({ role }: DocumentInformationProps) => {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center gap-2">
        <InfoIcon size={20} />
        <p>Description</p>
      </div>
      <div
        className={cn(
          "w-full flex flex-col justify-center gap-2 ml-2",
          role == "owner" && "hidden"
        )}
      >
        <Textarea
          rows={10}
          placeholder="Add description"
          className="resize-none w-full text-sm "
        />
        <p className="text-xs text-left opacity-80 cursor-help">
          Description is saved automatically.
        </p>
      </div>
      <p
        className={cn(
          "text-xs ml-2 opacity-80 ",
          role == "member" && "hidden"
        )}
      >
        We put the description here if we have the, balalalalalalla
      </p>
      <div className="flex flex-col gap-2 ml-2 opacity-80">
        <div className="flex flex-col">
          <p className="text-sm  gap-1">Created at:</p>
          <p className="text-xs ml-4"> a date and time</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm  gap-1">Last updated:</p>
          <p className="text-xs  ml-4"> a date and time</p>
        </div>
      </div>
    </div>
  );
};
