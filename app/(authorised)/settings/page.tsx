import { Palette } from "lucide-react";
import { SettingsItem } from "./_components/settings-item";
import { ModeToggle } from "@/components/mode-toggle";
import { AccountSettings } from "./_components/account-settings";

const SettingsPage = () => {
  return (
    <div className="w-full flex flex-col mt-10 px-4 gap-12">
      <SettingsItem header="Display" Icon={Palette}>
        <div className="w-full flex items-center justify-between ">
          <p>Change theme</p>
          <ModeToggle />
        </div>
      </SettingsItem>
      <AccountSettings />
    </div>
  );
};
export default SettingsPage;
