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

interface AuthorizedLayoutProps {
  children: React.ReactNode;
}

const AuthorizedLayout = ({ children }: AuthorizedLayoutProps) => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { onClose, isOpen } = useSidebar();
  const router = useRouter();
  const isMobile = useMobile();

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
          <div className="h-full w-full flex flex-col xl:pl-[342px] pl-[250px]">
            <Toolbar />
            <section className="flex-1 px-6 max-h-[calc(100vh-28px)] md:max-h-[calc(100vh-136px)] overflow-auto">
              {children}
            </section>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-full w-full bg-[--light-bg] dark:bg-[--dark-bg] flex flex-col relative">
      <Topper />
      <Toolbar />
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className={cn(
          "absolute h-full w-full bg-[--light-bg] dark:bg-[--dark-bg] opacity-60",
          !isOpen && "hidden"
        )}
      />
      <Sidebar />
      <section className="px-4 flex-1 sm:px-6  overflow-auto max-h-[calc(100vh-145px)]">
        {children}
      </section>
    </main>
  );
};

export default AuthorizedLayout;
