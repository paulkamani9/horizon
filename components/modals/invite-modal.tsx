"use client";

import { Dialog, DialogContent } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerFooter } from "../ui/drawer";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useMobile } from "@/hooks/use-mobile";
import { useInviteModal } from "@/store/use-invite-modal";
import { Id } from "@/convex/_generated/dataModel";
import { Textarea } from "../ui/textarea";
import { CircleCheck, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";

export const InviteModal = () => {
  const isMobile = useMobile();
  const { isOpen, onClose } = useInviteModal((state) => state);

  if (isMobile) {
    return (
      <Drawer
        open={isOpen}
        onClose={onClose}
        onOpenChange={(isOpen) => !isOpen}
      >
        <DrawerContent>
          <DrawerFooter>
            <InviteForm />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <InviteForm />
      </DialogContent>
    </Dialog>
  );
};

const InviteForm = () => {
  const { documentId, onClose } = useInviteModal();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const results = useQuery(
    api.invitations.checkAnotherUserByEmailAndInvitation,
    {
      email,
      documentId: documentId as Id<"documents">,
    }
  );
  const { mutate, pending } = useApiMutation(api.invitations.inviteAuthor);

  const onSendInvitation: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const promise = mutate({
      documentId: documentId,
      email,
      message,
    }).then(() => {
      onClose();
    });

    toast.promise(promise, {
      success: "Success, invitation sent.",
      loading: "Sending invitation.",
      error: "Failed to send invitations.",
    });
  };

  return (
    <form onSubmit={onSendInvitation}>
      <div className="w-full flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center">
          <p className="font-bold">Invite Author to Collaborate</p>
          <p className="text-sm opacity-80">
            Enter Author's Email to send invitation.
          </p>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-2">
            <Input
              required
              placeholder="Enter Author's Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && (
              <div className="text-xs flex items-center gap-2">
                <CircleCheck
                  size={16}
                  className={cn(
                    "stroke-emerald-500 hidden",
                    results?.isFound && "inline"
                  )}
                />
                <CircleX
                  size={16}
                  className={cn(
                    "stroke-rose-500 hidden",
                    !results?.isFound && "inline"
                  )}
                />
                <span>{results?.message}</span>
              </div>
            )}
          </div>
          <Textarea
            className="resize-none"
            placeholder="Enter Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <Button type="submit" disabled={!results?.isFound || pending}>
            Invite
          </Button>
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};
