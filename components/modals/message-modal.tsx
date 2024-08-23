"use client";

import { Dialog, DialogContent } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerFooter } from "../ui/drawer";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useMobile } from "@/hooks/use-mobile";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { useMessageModal } from "@/store/use-message-modal";
import { toast } from "sonner";

export const MessageModal = () => {
  const isMobile = useMobile();
  const { isOpen, onClose } = useMessageModal((state) => state);

  if (isMobile) {
    return (
      <Drawer
        open={isOpen}
        onClose={onClose}
        onOpenChange={(isOpen) => !isOpen}
      >
        <DrawerContent>
          <DrawerFooter>
            <MessageForm />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <MessageForm />
      </DialogContent>
    </Dialog>
  );
};

const MessageForm = () => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const {
    initialValues: { receiverId, email, name, title: subject, parentMessageId },
    onClose,
  } = useMessageModal();
  const { mutate, pending } = useApiMutation(api.messages.sendMessage);

  const onSendMessage: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const promise = mutate({
      receiverId,
      title: subject || title,
      body,
      parentMessageId,
    }).then(() => onClose());

    toast.promise(promise, {
      success: `Success, your message has been sent to ${name}.`,
      error: "Failed, to send your message",
      loading: "Sending your message",
    });
  };

  return (
    <form onSubmit={onSendMessage}>
      <div className="w-full flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center">
          {parentMessageId ? (
            <>
              <p className="font-bold">Reply Message</p>
              <p className="text-sm opacity-80">Send Reply {name}</p>
            </>
          ) : (
            <>
              <p className="font-bold">Send Message</p>
              <p className="text-sm opacity-80">Send a new message to {name}</p>
            </>
          )}
        </div>
        <div className="w-full flex flex-col gap-4">
          <span className="text-sm opacity-80">to : {email}</span>

          {parentMessageId ? (
            <span className={cn("text-sm opacity-80", !subject && "hidden")}>
              title : {subject || "*no title*"}
            </span>
          ) : (
            <>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Message title (optional)"
                value={title}
              />
            </>
          )}

          <Textarea
            className="resize-none"
            placeholder="Enter Message body"
            value={body}
            required
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <Button type="submit" disabled={pending}>
            Send
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
