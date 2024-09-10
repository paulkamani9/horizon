"use client";

import { Loading } from "@/components/Loading";
import { useMobile } from "@/hooks/use-mobile";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { Topper } from "./_components/topper";
import { Sidebar } from "./_components/sidebar";
import { Toolbar } from "./_components/toolbar";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AuthorizedLayoutProps {
  children: React.ReactNode;
}

const AuthorizedLayout = ({ children }: AuthorizedLayoutProps) => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { onClose, isOpen } = useSidebar();
  const router = useRouter();
  const isMobile = useMobile();
  const [positionX, setPositionX] = useState<number | undefined>();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !isAuthenticated) {
    router.push("/");
  }

  if (!isMobile) {
    return (
      <main className="h-full w-full dark:bg-[--dark-bg] flex flex-col">
        <Topper />
        <div className="flex-1 relative flex">
          <Sidebar />
          <div className="h-full w-full flex flex-col xl:pl-[300px] pl-[250px]">
            <Toolbar />
            <section className="flex-1  max-h-[calc(100vh-96px)] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600">
              {children}
            </section>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-full w-full bg-[--light-bg] dark:bg-[--dark-bg] flex flex-col relative ">
      <Topper />
      <Toolbar />
      <div
        onClick={(e) => {
          onClose();
        }}
        onTouchMove={(e) => {
          if (positionX === undefined) {
            setPositionX(e.touches[0].clientX);
          }

          if (positionX && positionX - e.touches[0].clientX > 15) {
            setPositionX(undefined);
            onClose();
          }
        }}
        onTouchEnd={(e) => {
          setPositionX(undefined);
        }}
        className={cn(
          "absolute h-full w-full bg-[--light-bg] dark:bg-[--dark-bg] opacity-60 z-50",
          !isOpen && "hidden"
        )}
      />
      <Sidebar />
      <section className="flex-1 overflow-auto max-h-[calc(100vh-80px)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600">
        {children}
      </section>
    </main>
  );
};

export default AuthorizedLayout;
