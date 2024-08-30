import { XCircle } from "lucide-react";

interface NotAllowedProps {
  type: "User" | "Document";
}
export const NotAllowed = ({ type }: NotAllowedProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <XCircle className="stroke-red-500 h-8 w-8" />
      <p className="text-lg italic opacity-80">
        {type === "Document"
          ? "Document not available to you."
          : "User not found"}
      </p>
    </div>
  );
};
