import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const getDocumentCollaborators = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, { documentId }) => {
    await getCurrentUserOrThrow(ctx);

    const document = await ctx.db.get(documentId);

    if (!document) {
      return null
    }

    const { authorId } = document;

    const author = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", authorId))
      .unique();

    if (!author) {
      return null;
    }

    const collaborationArray = [
      {
        isAuthor: true,
        ...author,
      },
    ];

    const collaborations = await ctx.db
      .query("collaboration")
      .withIndex("byDocumentId", (q) => q.eq("documentId", documentId))
      .collect();

    await Promise.all(
      collaborations.map(async (collaborator) => {
        const user = await ctx.db
          .query("users")
          .withIndex("byExternalId", (q) =>
            q.eq("externalId", collaborator.collaboratorId)
          )
          .unique();

        if (!user) {
          return null;
        }

        collaborationArray.push({ isAuthor: false, ...user });
      })
    );

    return collaborationArray;
  },
});

export const leaveCollaboration = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, { documentId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const collaboration = await ctx.db
      .query("collaboration")
      .withIndex("byDocumentIdAndCollaboratorId", (q) =>
        q.eq("documentId", documentId).eq("collaboratorId", externalId)
      )
      .unique();

    if (!collaboration) {
      return null;
    }

    await ctx.db.delete(collaboration._id);
  },
});

export const removeCollaborator = mutation({
  args: {
    documentId: v.id("documents"),
    collaboratorId: v.string(),
  },
  handler: async (ctx, { documentId, collaboratorId }) => {
    const [user, collaboration] = await Promise.all([
      getCurrentUserOrThrow(ctx),
      ctx.db
        .query("collaboration")
        .withIndex("byDocumentIdAndCollaboratorId", (q) =>
          q.eq("documentId", documentId).eq("collaboratorId", collaboratorId)
        )
        .unique(),
    ]);

    if (!collaboration) {
      return null;
    }

    if (collaboration.ownerId !== user.externalId) {
      return null;
    }

    await ctx.db.delete(collaboration._id);
  },
});
