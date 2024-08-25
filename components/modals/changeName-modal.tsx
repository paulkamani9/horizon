"use client";

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
import { useChangeNameModal } from "@/store/use-changeName-modal";

export const ChangeNameModal = () => {
  const isMobile = useMobile();
  const { isOpen, onClose, initialValues } = useChangeNameModal((state) => state);

  const [name, setName] = useState(initialValues.name);
  const { mutate, pending } = useApiMutation(api.users.updateMyInformation);

  useEffect(() => {
    setName(initialValues.name);
  }, [initialValues]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const promise = mutate({
      name
    }).then(() => {
      onClose();
    });

    toast.promise(promise, {
      success: "Success, you have changed your name.",
      loading: "Changing your name",
      error: "Failed to change your name",
    });
  };

  if (isMobile) {
    return (
      <Drawer
        open={isOpen}
        onClose={onClose}
        onOpenChange={(isOpen) => !isOpen}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Change your name</DrawerTitle>
            <DrawerDescription>Enter a new name</DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                disabled={false}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
          <DialogTitle>Change your name</DialogTitle>
          <DialogDescription>
          Enter a new name
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
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
