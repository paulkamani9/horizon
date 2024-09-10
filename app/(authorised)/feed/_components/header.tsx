"use client";
import { usePathname } from "next/navigation";
import { HeaderWrapper } from "../../_components/wrapper";
import { HeaderItems } from "./header-items";

export const Header = () => {
  const pathname = usePathname();
  return (
    <HeaderWrapper size="large">
      <div className="w-full h-full flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          {pathname === "/feed" && "General"}
          {pathname === "/feed/invitations" && "Invitations"}
          {pathname === "/feed/messages" && "Messages"}
        </h1>
        <div>
          <HeaderItems />
        </div>
      </div>
    </HeaderWrapper>
  );
};
