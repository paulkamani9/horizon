import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const getDocumentStars = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, { documentId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const document = await ctx.db.get(documentId);

    if (!document) {
      return null;
    }

    const stars = await ctx.db
      .query("stars")
      .withIndex("byDocumentId", (q) => q.eq("documentId", documentId))
      .collect();

    const isStar = stars.some((star) => star.starerId === externalId);

    return {
      starCount: stars.length,
      isStar,
    };
  },
});

export const toggleStarDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, { documentId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);
    const document = await ctx.db.get(documentId);

    if (!document || !document.isPublic) {
      return null;
    }

    const isStar = await ctx.db
      .query("stars")
      .withIndex("byDocumentIdAndStarerId", (q) =>
        q.eq("documentId", documentId).eq("starerId", externalId)
      )
      .unique();

    if (isStar) {
      await ctx.db.delete(isStar._id);
    } else {
      await ctx.db.insert("stars", {
        documentId,
        ownerId: document.authorId,
        starerId: externalId,
      });
    }
  },
});

export const getUserStars = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, { id }) => {
    try {
      await getCurrentUserOrThrow(ctx);

      const [userDocumentStars, collaborationStars] = await Promise.all([
        ctx.db
          .query("stars")
          .withIndex("byOwnerId", (q) => q.eq("ownerId", id))
          .collect(),
        ctx.db
          .query("collaboration")
          .withIndex("byCollaboratorId", (q) => q.eq("collaboratorId", id))
          .collect()
          .then((collaborations) =>
            Promise.all(
              collaborations.map((collaboration) =>
                ctx.db
                  .query("stars")
                  .withIndex("byDocumentId", (q) =>
                    q.eq("documentId", collaboration.documentId)
                  )
                  .collect()
              )
            )
          ),
      ]);

      const allStars =
        userDocumentStars.length + collaborationStars.flat(Infinity).length;

      return allStars;
    } catch (error) {
      return null;
    }
  },
});
