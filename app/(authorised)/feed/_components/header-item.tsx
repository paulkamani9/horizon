"use client";

import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface HeaderItemProps {
  name: string;
  link: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export const HeaderItem = ({ name, link, Icon }: HeaderItemProps) => {
  const pathname = usePathname();
  return (
    <Link href={link}>
      <div className={cn("flex items-center px-2 py-2 gap-2",
        pathname === link && "border-b-2 dark:border-white border-black"
      )}>
        <Icon />
      </div>
    </Link>
  );
};
