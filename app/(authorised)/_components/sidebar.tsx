"use client";

import { Logo } from "@/components/Logo";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
import { Newspaper, NotebookPen, Settings, Users } from "lucide-react";
import { SidebarItem } from "./sidebar-items";
import { NewButton } from "./new-button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export const Sidebar = () => {
  const { isOpen, onClose } = useSidebar();
  const isMobile = useMobile();
  const { user } = useUser();
  const newNotificationsCount = useQuery(
    api.notifications.NewNotificationsStatus,
    {
      page: "general",
    }
  );

  const [positionX, setPositionX] = useState<number | undefined>();

  return (
    <aside
      onTouchMove={(e) => {
        if (positionX === undefined) {
          setPositionX(e.touches[0].clientX);
        }

        if (positionX && positionX - e.touches[0].clientX > 30) {
          setPositionX(undefined);
          onClose();
        }
      }}
      onTouchEnd={() => {
        setPositionX(undefined);
      }}
      className={cn(
        "xl:w-[300px] w-[250px] top-0 left-0 absolute drop-shadow-sm  bg-[--light-bg2] dark:bg-[--dark-bg2] h-full z-50 transition-transform",
        !isOpen && isMobile && "-translate-x-full",
        isMobile && isOpen && "w-[250px]"
      )}
    >
      <div className="h-full w-full flex flex-col justify-start items-start">
        <div className="w-full flex py-5 items-center justify-center border-b border-black dark:border-white">
          <Logo size="Logo" />
        </div>
        <div className="flex-1 flex flex-col items-start justify-between w-full mt-5">
          <nav className=" flex flex-col items-start justify-start w-full text-xl">
            <SidebarItem
              name="My documents"
              link="/my-documents"
              Icon={NotebookPen}
            />
            <SidebarItem name="People" link="/people" Icon={Users} />
            <SidebarItem
              name="Notifications"
              link="/feed"
              Icon={Newspaper}
              notificationCount={newNotificationsCount}
            />
            <SidebarItem name="Settings" link="/settings" Icon={Settings} />

            <div className="block mx-auto md:hidden mt-10">
              <NewButton />
            </div>
          </nav>
          <div className="w-full flex py-7 items-center justify-start pl-6 border-t border-black dark:border-white gap-6 ">
            <UserButton />
            <p className="text-xs">{user ? user.fullName : "...."}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
