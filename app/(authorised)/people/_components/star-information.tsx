import { Star, Users } from "lucide-react";

export const StarInformation = () => {
  return (
    <div className="flex items-center gap-2 opacity-80">
      <div className="flex items-end gap-1">
        <Star size={16} /> <span className="text-xs"> 2.2mil</span>
      </div>
      <div className="flex items-end gap-1">
        <Users size={16} /> <span className="text-xs"> 2.2mil</span>
      </div>
    </div>
  );
};
