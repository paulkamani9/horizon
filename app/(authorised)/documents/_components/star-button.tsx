import { Eye, Star } from "lucide-react";

export const StarButton = () => {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center cursor-pointer gap-2 transition-transform">
        <Star className=""/>
        <p>120</p>
      </div>
      <div className="flex items-center gap-2">
        <Eye />
        <p>120,222</p>
      </div>
    </div>
  );
};
