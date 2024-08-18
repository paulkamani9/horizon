import { Pencil } from "lucide-react";


export const EditDocument = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Pencil size={15} />
        <p className="font-semibold">Edit</p>
      </div>
      <div className="flex flex-col gap-2 ml-2">
        <p className="underline text-sm cursor-pointer">Rename document</p>

        <p className="underline text-sm cursor-pointer">Change icon</p>
      </div>
    </div>
  );
};
