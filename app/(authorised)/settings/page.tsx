import { Palette } from "lucide-react";
import { SettingsItem } from "./_components/settings-item";
import { ModeToggle } from "@/components/mode-toggle";

const SettingsPage = () => {
  return (
    <div className="w-full flex flex-col mt-10 px-4 gap-6">
      <SettingsItem header="Display" Icon={Palette}>
        <div className="w-full flex items-center justify-between ">
          <p>Change theme</p>
          <ModeToggle />
        </div>
      </SettingsItem>
    </div>
  );
};
export default SettingsPage;
