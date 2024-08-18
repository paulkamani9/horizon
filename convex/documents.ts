import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const createDocument = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, { title }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    await ctx.db.insert("documents", {
      title,
      icon: "😎",
      authorId: externalId,
      isPublic: false,
    });
  },
});

export const getMyDocuments = query({
  handler: async (ctx) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const documents = await ctx.db
      .query("documents")
      .withIndex("byAuthorId", (q) => q.eq("authorId", externalId))
      .collect();

    return documents;
  },
});

export const deleteMyDocument = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, { documentId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);
    const existingDocument = await ctx.db.get(documentId);

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    if (existingDocument.authorId !== externalId) {
      throw new Error("You are not the owner of this document");
    }

    await ctx.db.delete(existingDocument._id);
  },
});

export const renameMyDocument = mutation({
  args: {
    documentId: v.id("documents"),
    title: v.optional(v.string()),
  },
  handler: async (ctx, { documentId, title }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);
    const existingDocument = await ctx.db.get(documentId);

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    if (existingDocument.authorId !== externalId) {
      throw new Error("You are not the owner of this document");
    }
    let newTitle = title;
    if (!title) {
      newTitle = "Untitled";
    }

    await ctx.db.patch(existingDocument._id, {
      title: newTitle,
    });
  },
});

export const changeMyDocumentIcon = mutation({
  args: {
    documentId: v.id("documents"),
    icon: v.string(),
  },
  handler: async (ctx, { documentId, icon }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);
    const existingDocument = await ctx.db.get(documentId);

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    if (existingDocument.authorId !== externalId) {
      throw new Error("You are not the owner of this document");
    }

    let newIcon = icon;
    if (!icon) {
      newIcon = "😎";
    }

    await ctx.db.patch(existingDocument._id, {
      icon: newIcon,
    });
  },
});

export const toggleMyDocumentsPublicity = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, { documentId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const document = await ctx.db.get(documentId);

    if (!document) {
      throw new Error("Document not found");
    }

    if (document.authorId !== externalId) {
      throw new Error("You are not the owner of this document");
    }

    await ctx.db.patch(document._id, {
      isPublic: !document.isPublic,
    });
  },
});

export const getAnotherUsersPublicDocuments = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    await getCurrentUserOrThrow(ctx);

    const documents = await ctx.db
      .query("documents")
      .withIndex("byAuthorIdPublicDocument", (q) =>
        q.eq("authorId", args.id).eq("isPublic", true)
      )
      .collect();

    return documents;
  },
});

export const checkRoleAndReturnDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, { documentId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const document = await ctx.db.get(documentId);

    if (!document) {
      throw new Error("Document not found");
    }

    if (document.authorId !== externalId) {
      const collaboration = await ctx.db
        .query("collaboration")
        .withIndex("byDocumentIdAndCollaboratorId", (q) =>
          q.eq("documentId", document._id).eq("collaboratorId", externalId)
        )
        .unique();

      if (collaboration) {
        return {
          ...document,
          role: "admin",
        };
      }
      return {
        ...document,
        role: "member",
      };
    }

    return {
      ...document,
      role: "owner",
    };
  },
});
