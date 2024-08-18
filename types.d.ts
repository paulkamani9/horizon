type DocumentsProps =
  | {
      _id: Id<"documents">;
      _creationTime: number;
      icon?: string | undefined;
      content?: string | undefined;
      description?: string | undefined;
      title: string;
      authorId: string;
    }[]
  | undefined;
