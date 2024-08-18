import { v } from "convex/values";
import { query } from "./_generated/server";
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

    await collaborations.map(async (collaborator) => {
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
    });

    return collaborationArray;
  },
});
