"use client";

import { useChangeProfilePicture } from "@/store/use-change-profilePicture";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { SingleImageDropzone } from "../single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/utils/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export const ChangeProfilePicture = () => {
  const [file, setFile] = useState<File>();
  const [isSubmiting, setIsSubmitting] = useState(false);
  const { isOpen, onClose, url } = useChangeProfilePicture();
  const { edgestore } = useEdgeStore();
  const updateImage = useMutation(api.users.updateMyInformation);

  const toClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    onClose();
  };
  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      let res;
      if (url && url.includes("edgestore")) {
        res = await edgestore.publicFiles.upload({
          file,
          options: {
            replaceTargetUrl: url,
          },
        });
      } else {
        res = await edgestore.publicFiles.upload({
          file,
        });
      }
      await updateImage({
        imageUrl: res.url,
      });
      toClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Profile Picture</h2>
        </DialogHeader>
        <SingleImageDropzone
          onChange={onChange}
          value={file}
          disabled={isSubmiting}
          className="w-full outline-none"
          width={300}
          height={300}
        />
      </DialogContent>
    </Dialog>
  );
};
