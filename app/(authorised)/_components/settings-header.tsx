import { Menu, Settings } from "lucide-react";
import { MenuItem } from "./menu-item";

const settingsCount = [1, 2, 3, 4, 5];

export const SettingsHeader = () => {
  // here we imitate the general tool bar sizes and paddings, but with a different toolbar
  return (
    <div className="h-[72px] lg:h-[88px] w-full flex items-center px-4 sm:px-6 md:px-10  lg:px-10 xl:px-16 2xl:px-20">
      <MenuItem />
      <div className="flex items-center justify-center gap-2 pr-12 flex-1 justify-self-center ">
        {settingsCount.map((setting) => (
          <Settings
            key={settingsCount.indexOf(setting)}
            className="hover:animate-bounce"
          />
        ))}
      </div>
    </div>
  );
};
