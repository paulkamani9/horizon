import { Settings } from "lucide-react";

const settingsCount = [1, 2, 3, 4, 5];

export const SettingsHeader = () => {
  return (
    <div className="h-9 w-full flex items-center justify-center gap-2 pr-12">
      {settingsCount.map((setting) => (
        <Settings
          key={settingsCount.indexOf(setting)}
          className="hover:animate-bounce"
        />
      ))}
    </div>
  );
};
