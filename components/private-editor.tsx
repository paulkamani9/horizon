"use client";
import { useEffect, useState } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react/suspense";
import { useEdgeStore } from "@/utils/edgestore";
import { useTheme } from "next-themes";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { extractFileUrls } from "@/lib/extract-file-urls";

type EditorProps = {
  doc: Y.Doc;
  provider: any;
  role: boolean;
  name: string;
  documentId: Id<"documents">;
};

interface Editor {
  role: boolean;
  name: string;
  content?: string;
  documentId: Id<"documents">;
}

function PrivateEditor({ role, name, content, documentId }: Editor) {
  const room = useRoom();

  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return (
    <BlockNote
      doc={doc}
      provider={provider}
      role={role}
      name={name}
      documentId={documentId}
    />
  );
}

function BlockNote({
  doc,
  provider,
  role,
  name,
  documentId,
}: EditorProps) {
  const { edgestore } = useEdgeStore();
  const { resolvedTheme } = useTheme();
  const [previousContent, setPreviousContent] = useState<PartialBlock[] | undefined>()
  const updateContent = useMutation(api.documents.updateDocumentContent);

  const editor: BlockNoteEditor = useCreateBlockNote({
    // there is no initial document here
    // the room provider(yjs) loads the content of the page real time
    // with other collaborators
    // public access users and invitation users are not served this component
    uploadFile: async (file: File) => {
      const res = await edgestore.publicFiles.upload({ file });
      return res.url;
    },
    collaboration: {
      provider,

      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),

      // Information for this user:
      user: {
        name: name,
        color: "#f5f5f5",
      },
    },
  });

  const handleChange = () => {
    // our db is not excellent for storing the content from a collab doc.
    // but we can still listen for change so that we can update
    // or delete edgestore files
    const currentContent = editor.document;
    const previousFiles:string[]  = extractFileUrls(previousContent);
    const currentFiles:string[]  = extractFileUrls(currentContent);
    const deletedFiles = previousFiles.filter(
      (url) => !currentFiles.includes(url)
    );

    // Delete files that are no longer present
    deletedFiles.forEach((url) => {
      edgestore.publicFiles.delete({ url });
    });

    setPreviousContent(currentContent);
  };

  // however we will save it in our convex db
  // using Effect hook , it runs in background
  // for users not allowed here, we will just serve them a static using convex query
  // without affecting the collab document.
  // this will even work better in production
  useEffect(() => {
    updateContent({
      content: JSON.stringify(previousContent),
      documentId: documentId,
    });
  }, [previousContent]);

  return (
    <BlockNoteView
      editor={editor}
      editable={role}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={handleChange}
    />
  );
}

export default PrivateEditor;
