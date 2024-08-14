"use client";

import { useRenameModal } from "@/store/use-rename-modal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useMobile } from "@/hooks/use-mobile";

export const RenameModal = () => {
  const isMobile = useMobile();
  const { isOpen, onClose, initialValues } = useRenameModal((state) => state);

  const [title, setTitle] = useState(initialValues.title);
  const { mutate, pending } = useApiMutation(api.documents.renameMyDocument);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const promise = mutate({
      documentId: initialValues.id,
      title,
    }).then(() => {
      onClose();
    });

    toast.promise(promise, {
      success: "Board renamed",
      loading: "Renaming board",
      error: "Failed to rename board",
    });
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(isOpen) => !isOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Rename document</DrawerTitle>
            <DrawerDescription>
              Enter a new name for your document
            </DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                disabled={false}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex flex-col w-full items-center justify-center gap-2">
                <Button disabled={false} type="submit" className="w-full">
                  Save
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </div>
            </form>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename document</DialogTitle>
          <DialogDescription>
            Enter a new name for your document
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogFooter className="w-full flex gap-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
