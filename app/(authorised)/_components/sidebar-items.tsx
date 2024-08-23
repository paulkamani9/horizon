"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  return (
    <Link href={link} className="w-full">
      <div
        role="button"
        onClick={() => {
          onClose();
        }}
        className={cn(
          "pl-6 flex items-center py-4 w-full hover:bg-[--light-bg] hover:dark:bg-[--dark-bg] cursor-pointer",
          pathname === link && "bg-[--light-bg] dark:bg-[--dark-bg] border-r"
        )}
      >
        <Icon className="mr-4 xl:w-6 xl:h-6 h-5 w-5 " />
        <span className="text-base ">{name}</span>
      </div>
    </Link>
  );
};
