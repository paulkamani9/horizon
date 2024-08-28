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
  notificationCount?:
    | number
    | {
        messagesCount: number;
        invitationsCount: number;
      }
}

export const SidebarItem = ({ name, link, Icon,notificationCount }: SidebarItemProps) => {
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
          "pl-6 flex items-center py-4 w-full hover:bg-[--light-bg] hover:dark:bg-[--dark-bg] cursor-pointer relative group",
          pathname === link && "bg-[--light-bg] dark:bg-[--dark-bg] border-r"
        )}
      >
        {!!notificationCount && (
          <div className="absolute bg-red-500 text-white rounded-[50%] p-1.5  group-hover:p-1 top-3 left-4 ">
            <span className="text-sm hidden group-hover:block">
              {typeof notificationCount === "number"  && notificationCount} 
            </span>
          </div>
        )}
        <Icon className="mr-4 xl:w-6 xl:h-6 h-5 w-5 " />
        <span className="text-base ">{name}</span>
      </div>
    </Link>
  );
};
