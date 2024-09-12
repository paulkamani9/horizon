"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Menu } from "lucide-react";

export const MenuItem = () => {
  const { onOpen } = useSidebar();
  return (
    <div className="lg:hidden cursor-pointer">
      <Menu
        size={24}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      />
    </div>
  );
};
