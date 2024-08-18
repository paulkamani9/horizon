"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { useEmojiPicker } from "@/store/use-emoji-picker";

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
}
export const IconPicker = ({
  onChange,
  children,
}: IconPickerProps) => {
  const {open,toOpen} = useEmojiPicker()
  const { resolvedTheme } = useTheme();
  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;
  const theme = themeMap[currentTheme];

  return (
    <Popover open={open}>
      <PopoverTrigger onClick={toOpen}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
          className="absolute bottom-2"
          height={350}
          theme={theme}
          onEmojiClick={(data,e) => {
           
            onChange(data.emoji);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
