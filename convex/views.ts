import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const getDocumentViewsCount = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, { documentId }) => {
    await getCurrentUserOrThrow(ctx);
    const document = await ctx.db.get(documentId);

    if (!document) {
      return null;
    }

    const viewsCount = await ctx.db
      .query("views")
      .withIndex("byDocumentId", (q) => q.eq("documentId", documentId))
      .collect();

    return viewsCount.length;
  },
});

export const addDocumentUniqueViews = mutation({
  args: {
    documentId: v.id("documents"),
    id: v.string(),
  },
  handler: async (ctx, { documentId, id }) => {
    const [{ externalId }, document, user] = await Promise.all([
      getCurrentUserOrThrow(ctx),
      ctx.db.get(documentId),
      ctx.db
        .query("users")
        .withIndex("byExternalId", (q) => q.eq("externalId", id))
        .unique(),
    ]);

    if (!user || !document) {
      return null;
    }

    const isViewed = await ctx.db
      .query("views")
      .withIndex("byDocumentIdAndViewerId", (q) =>
        q.eq("documentId", documentId).eq("viewerId", externalId)
      )
      .unique();

    if (isViewed) {
      return null;
    }
    await ctx.db.insert("views", {
      documentId,
      ownerId: id,
      viewerId: externalId,
    });
  },
});
