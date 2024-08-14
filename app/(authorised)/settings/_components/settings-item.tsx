import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface SettingsItemProps {
  header: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  children: React.ReactNode;
}

export const SettingsItem = ({ header, Icon, children }: SettingsItemProps) => {
  return (
    <div className="w-full xl:pr-20 flex flex-col gap-4">
      <div className="w-full flex items-center justify-start gap-4">
        <Icon /> <span>{header}</span>
      </div>
      <div className="ml-4 border-b border-black dark:border-white pb-4 flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
};
