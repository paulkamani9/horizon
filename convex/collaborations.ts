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
      throw new Error("document not found");
    }

    const { authorId } = document;

    const author = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", authorId))
      .unique();

    if (!author) {
      throw new Error("Author not found");
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
        const author = await ctx.db
          .query("users")
          .withIndex("byExternalId", (q) =>
            q.eq("externalId", collaborator.collaboratorId)
          )
          .unique();

        if (!author) {
          throw new Error("Author not found");
        }

        collaborationArray.push({ isAuthor: false, ...author });
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
      throw new Error("You are not even collaborating... at collaboration");
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
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const collaboration = await ctx.db
      .query("collaboration")
      .withIndex("byDocumentIdAndCollaboratorId", (q) =>
        q.eq("documentId", documentId).eq("collaboratorId", collaboratorId)
      )
      .unique();

    if (!collaboration) {
      throw new Error("Collaboration not found.");
    }

    if (collaboration.ownerId !== externalId) {
      throw new Error("You are not the owner of this document");
    }

    await ctx.db.delete(collaboration._id);
  },
});
