import { Star } from "lucide-react";

export const DocumentStar = () => {
  return (
    <div className="flex items-center gap-2">
      <Star size={20}/>
      <span className="text-xs xl:text-sm">230</span>
    </div>
  );
}