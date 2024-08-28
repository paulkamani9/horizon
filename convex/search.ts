import { v } from "convex/values";
import { query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const searchDocuments = query({
  args: {
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    if (!search) {
      return null;
    }

    const [
      allMyDocsByTitle,
      collabDocsByTitle,
      allPublicDocsByTitle,
      invitationDocsByTitle,
    //   allMyDocsByContent,
    //   collabDocsByContent,
    //   allPublicDocsByContent,
    //   invitationDocsByContent,
    ] = await Promise.all([
      // my docs by title
      ctx.db
        .query("documents")
        .withSearchIndex("byTitle", (q) => q.search("title", search))
        .filter((q) => q.eq(q.field("authorId"), externalId))
        .collect(),

      // all my collabs by title
      ctx.db
        .query("collaboration")
        .withIndex("byCollaboratorId", (q) =>
          q.eq("collaboratorId", externalId)
        )
        .collect()
        .then(async (collaborations) => {
          const collabDocs = await Promise.all(
            collaborations.map((collaboration) =>
              ctx.db
                .query("documents")
                .withSearchIndex("byTitle", (q) => q.search("title", search))
                .filter((q) => q.eq(q.field("_id"), collaboration.documentId))
                .collect()
            )
          );
          return collabDocs.flat();
        }),

      // all public docs by title
      ctx.db
        .query("documents")
        .withSearchIndex("byTitle", (q) => q.search("title", search))
        .filter((q) => q.eq(q.field("isPublic"), true))
        .collect(),

      //all invitations by title
      ctx.db
        .query("invitations")
        .withIndex("byInvitedId", (q) => q.eq("invitedId", externalId))
        .collect()
        .then(async (invitations) => {
          const invitationDocuments = await Promise.all(
            invitations.map((invitation) =>
              ctx.db
                .query("documents")
                .withSearchIndex("byTitle", (q) => q.search("title", search))
                .filter((q) => q.eq(q.field("_id"), invitation.documentId))
                .collect()
            )
          );
          return invitationDocuments.flat();
        }),

      // // my docs by content
      // ctx.db
      //   .query("documents")
      //   .withSearchIndex("byStringContent", (q) =>
      //     q.search("stringContent", search)
      //   )
      //   .filter((q) => q.eq(q.field("authorId"), externalId))
      //   .collect(),

      //  my collabs by content
      // ctx.db
      //   .query("collaboration")
      //   .withIndex("byCollaboratorId", (q) =>
      //     q.eq("collaboratorId", externalId)
      //   )
      //   .collect()
      //   .then(async (collaborations) => {
      //     const collabDocs = await Promise.all(
      //       collaborations.map((collaboration) =>
      //         ctx.db
      //           .query("documents")
      //           .withSearchIndex("byStringContent", (q) =>
      //             q.search("stringContent", search)
      //           )
      //           .filter((q) => q.eq(q.field("_id"), collaboration.documentId))
      //           .collect()
      //       )
      //     );
      //     return collabDocs.flat();
      //   }),

    //   // all docs by content
    //   ctx.db
    //     .query("documents")
    //     .withSearchIndex("byStringContent", (q) =>
    //       q.search("stringContent", search)
    //     )
    //     .filter((q) => q.eq(q.field("isPublic"), true))
    //     .collect(),

    //   // my invitations by content
    //   ctx.db
    //     .query("invitations")
    //     .withIndex("byInvitedId", (q) => q.eq("invitedId", externalId))
    //     .collect()
    //     .then(async (invitations) => {
    //       const invitationDocuments = await Promise.all(
    //         invitations.map((invitation) =>
    //           ctx.db
    //             .query("documents")
    //             .withSearchIndex("byStringContent", (q) =>
    //               q.search("stringContent", search)
    //             )
    //             .filter((q) => q.eq(q.field("_id"), invitation.documentId))
    //             .collect()
    //         )
    //       );
    //       return invitationDocuments.flat();
    //     }),
    ]);

    const allAllowedDocs = [
      ...allMyDocsByTitle,
      ...collabDocsByTitle,
      ...allPublicDocsByTitle,
      ...invitationDocsByTitle,
    //   ...allMyDocsByContent,
    //   ...collabDocsByContent,
    //   ...allPublicDocsByContent,
    //   ...invitationDocsByContent,
    ];

    const uniqueAllowedDocs = Array.from(
      new Map(
        allAllowedDocs.map((document) => [document._id, document])
      ).values()
    );

    return uniqueAllowedDocs;
  },
});
