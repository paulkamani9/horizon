"use client";

import { Palette } from "lucide-react";
import { SettingsItem } from "./_components/settings-item";
import { ModeToggle } from "@/components/mode-toggle";
import { AccountSettings } from "./_components/account-settings";
import { useTheme } from "next-themes";

const SettingsPage = () => {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div className="w-full flex flex-col mt-10 px-4 gap-12">
      <SettingsItem header="Display" Icon={Palette}>
        <div
          role="button"
          onClick={() => {
            setTheme(resolvedTheme === "light" ? "dark" : "light");
          }}
          className="w-full flex items-center justify-between hover:bg-[--light-bg2] dark:hover:bg-[--dark-bg2] px-2 rounded-lg py-2"
        >
          <p className="text-sm">
            {resolvedTheme === "light"
              ? "Change to dark mode"
              : "Change to light mode"}
          </p>
          <ModeToggle />
        </div>
      </SettingsItem>
      <AccountSettings />
    </div>
  );
};
export default SettingsPage;
