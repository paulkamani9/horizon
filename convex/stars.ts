import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const getAllUserStars = async (ctx: QueryCtx, id: string) => {
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
              .order("desc")
              .collect()
          )
        )
      ),
  ]);

  return [...userDocumentStars, ...collaborationStars.flat()];
};

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
      await Promise.all([
        ctx.db.insert("stars", {
          documentId,
          ownerId: document.authorId,
          starerId: externalId,
        }),

        externalId === document.authorId
          ? Promise.resolve()
          : ctx.db.insert("notifications", {
              type: "starGazing",
              documentId,
              notifiedId: document.authorId,
              notifierId: externalId,
              isSeen: false,
            }),

        ctx.db
          .query("collaboration")
          .withIndex("byDocumentId", (q) => q.eq("documentId", documentId))
          .collect()
          .then(async (collaborations) => {
            await Promise.all(
              collaborations.map((collaboration) =>
                ctx.db.insert("notifications", {
                  type: "starGazing",
                  documentId,
                  notifiedId: collaboration.collaboratorId,
                  notifierId: externalId,
                  isSeen: false,
                })
              )
            );
          }),
      ]);
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

      const allStars = await getAllUserStars(ctx, id);

      return allStars.length;
    } catch (error) {
      return null;
    }
  },
});
