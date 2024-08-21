import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const createTag = mutation({
  args: { documentId: v.id("documents"), tag: v.string() },
  handler: async (ctx, { documentId, tag }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const document = await ctx.db.get(documentId);

    if (!document) {
      throw new Error("Document, does not exist at tags.");
    }

    if (externalId !== document.authorId) {
      const collaboration = await ctx.db
        .query("collaboration")
        .withIndex("byDocumentIdAndCollaboratorId", (q) =>
          q.eq("documentId", document._id).eq("collaboratorId", externalId)
        )
        .unique();

      if (!collaboration) {
        throw new Error("You are not allowed create. At tags");
      }
    }

    if (tag.trim() === "") {
      return null;
    }

    await ctx.db.insert("tags", {
      documentId,
      tag,
    });
  },
});

export const getAllDocumentTags = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, { documentId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const document = await ctx.db.get(documentId);

    if (!document) {
      throw new Error("Document, does not exist at tags.");
    }

    if (externalId !== document.authorId) {
      const collaboration = await ctx.db
        .query("collaboration")
        .withIndex("byDocumentIdAndCollaboratorId", (q) =>
          q.eq("documentId", document._id).eq("collaboratorId", externalId)
        )
        .unique();

      if (!collaboration) {
        return null;
      }
    }

    const tags = await ctx.db
      .query("tags")
      .withIndex("byDocumentId", (q) => q.eq("documentId", document._id))
      .collect();

    return tags;
  },
});

export const deleteDocumentTags = mutation({
  args: { documentId: v.id("documents"), tagId: v.id("tags") },
  handler: async (ctx, { documentId, tagId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const document = await ctx.db.get(documentId);

    if (!document) {
      throw new Error("Document, does not exist at tags.");
    }

    if (externalId !== document.authorId) {
      const collaboration = await ctx.db
        .query("collaboration")
        .withIndex("byDocumentIdAndCollaboratorId", (q) =>
          q.eq("documentId", document._id).eq("collaboratorId", externalId)
        )
        .unique();

      if (!collaboration) {
        return null;
      }
    }

    const tag = await ctx.db.get(tagId);

    if (!tag || tag.documentId !== documentId) {
      return null;
    }

    await ctx.db.delete(tag._id);
  },
});
