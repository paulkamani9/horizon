import { XCircle } from "lucide-react";

export const NoDocument = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <XCircle className="stroke-red-500 h-8 w-8" />
      <p className="text-lg italic opacity-80">
        Document not available to you.
      </p>
    </div>
  );
};
