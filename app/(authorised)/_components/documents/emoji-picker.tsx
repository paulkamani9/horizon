"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { useEmojiPicker } from "@/store/use-emoji-picker";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface IconPickerProps {
  documentId: Id<"documents">;
  children: React.ReactNode;
  isDropdown?: boolean;
}
export const IconPicker = ({
  documentId,
  children,
  isDropdown,
}: IconPickerProps) => {
  const changeIcon = useMutation(api.documents.updateMyDocument);
  const { toClose, open, toOpen } = useEmojiPicker();

  const onChange = (icon: string) => {
    const promise = changeIcon({ icon, documentId });
    toClose();

    toast.promise(promise, {
      success: "Icon changed",
      loading: "Changing icon..",
      error: "Failed to change icon.",
    });
  };

  const { resolvedTheme } = useTheme();
  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;
  const theme = themeMap[currentTheme];

  if (isDropdown) {
    return (
      <Popover open={open}>
        <PopoverTrigger onClick={toOpen}>{children}</PopoverTrigger>
        <PopoverContent className="p-0 w-full border-none shadow-none">
          <EmojiPicker
            className="absolute bottom-2"
            height={350}
            theme={theme}
            onEmojiClick={(data, e) => {
              onChange(data.emoji);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger onClick={toOpen}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
          open={open}
          className="absolute bottom-2"
          height={350}
          theme={theme}
          onEmojiClick={(data, e) => {
            onChange(data.emoji);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
