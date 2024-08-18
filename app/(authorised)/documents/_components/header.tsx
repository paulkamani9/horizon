"use client";

import { cn } from "@/lib/utils";
import { useEditBar } from "@/store/use-edit-bar";
import { ChevronLeft } from "lucide-react";

export const Header = () => {
  const { onClose, isOpen, onOpen } = useEditBar();

  return (
    <div className="w-full xl:w-[calc(100%-256px)] h-24 flex items-center justify-between">
      <p>This is a title. OG is a goat</p>
      <ChevronLeft
        onClick={() => {
          if (!isOpen) {
            onOpen();
          } else {
            onClose();
          }
        }}
        className={cn(
          "cursor-pointer transition-transform xl:hidden hover:-translate-x-1",
          isOpen && "rotate-180 hover:translate-x-1"
        )}
      />
    </div>
  );
};
