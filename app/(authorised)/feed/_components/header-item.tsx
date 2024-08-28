"use client";

import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface HeaderItemProps {
  link: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  count?: number;
}

export const HeaderItem = ({ link, Icon, count }: HeaderItemProps) => {
  const pathname = usePathname();
  return (
    <Link href={link}>
      <div
        className={cn(
          "flex items-center px-2 py-2 gap-2 relative",
          pathname === link && "border-b-2 dark:border-white border-black"
        )}
      >
        {!!count && (
          <div className="absolute rounded-[50%] bg-red-500 p-1.5 top-0 right-0" />
        )}

        <Icon />
      </div>
    </Link>
  );
};
