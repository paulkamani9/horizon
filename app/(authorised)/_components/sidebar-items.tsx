"use client";

import { useSidebar } from "@/store/use-sidebar";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface SidebarItemProps {
  name: string;
  link: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export const SidebarItem = ({ name, link, Icon }: SidebarItemProps) => {
  const { onClose } = useSidebar();
  return (
    <Link href={link} className="w-full">
      <div
        role="button"
        onClick={() => {
          onClose();
        }}
        className="pl-6 flex items-center py-4 w-full hover:bg-[--light-bg] hover:dark:bg-[--dark-bg] cursor-pointer"
      >
        <Icon className="mr-4 xl:w-6 xl:h-6 h-5 w-5 " />
        <span className="text-base xl:text-xl">{name}</span>
      </div>
    </Link>
  );
};
