import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const checkAnotherUserByEmailAndInvitation = query({
  args: {
    email: v.string(),
    documentId: v.id("documents"),
  },
  handler: async (ctx, { email, documentId }) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    let isFound;
    let message;

    const user = await ctx.db
      .query("users")
      .withIndex("byEmail", (q) => q.eq("email", email))
      .unique();

    if (!user) {
      return {
        isFound: false,
        message: "Author with this email not found.",
        user: null,
      };
    }

    if (user.externalId === currentUser.externalId) {
      return {
        isFound: false,
        message: "This email belongs to you",
        user: null,
      };
    }

    const collaboration = await ctx.db
      .query("collaboration")
      .withIndex("byDocumentIdAndCollaboratorId", (q) =>
        q.eq("documentId", documentId).eq("collaboratorId", user.externalId)
      )
      .unique();

    if (collaboration) {
      return {
        isFound: false,
        message: `${user.name} is already collaborating on this document.`,
        user: null,
      };
    }

    const invitation = await ctx.db
      .query("invitations")
      .withIndex("byDocumentIdAndInvitedId", (q) =>
        q.eq("documentId", documentId).eq("invitedId", user.externalId)
      )
      .unique();

    if (invitation) {
      if (invitation.isDenied) {
        return {
          isFound: false,
          message: `Your invitation has already been denied by ${user.name}.`,
          user: null,
        };
      }
      return {
        isFound: false,
        message: `You have already sent an invitation to this ${user.name}.`,
        user: null,
      };
    }

    return {
      isFound: true,
      message: `Author with name ${user.name} has been found.`,
      user,
    };
  },
});

export const inviteAuthor = mutation({
  args: {
    documentId: v.id("documents"),
    email: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Document not found at invitations");
    }

    if (document.authorId !== externalId) {
      throw new Error("You are not the owner of this document at invitations");
    }

    const invited = await ctx.db
      .query("users")
      .withIndex("byEmail", (q) => q.eq("email", args.email))
      .unique();

    if (!invited) {
      throw new Error("Invitee not found at invitations");
    }

    await ctx.db.insert("invitations", {
      message: args.message,
      invitedId: invited.externalId,
      documentId: document._id,
      ownerId: externalId,
      isDenied: false,
    });
  },
});

export const getAllMyInvitations = query({
  args: {},
  handler: async (ctx) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const invitations = await ctx.db
      .query("invitations")
      .withIndex("byInvitedId", (q) => q.eq("invitedId", externalId))
      .filter((q) => q.neq(q.field("isDenied"), true))
      .collect();

    return invitations;
  },
});

export const getInvitationDocuments = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, { documentId }) => {
    await getCurrentUserOrThrow(ctx);

    const document = await ctx.db.get(documentId);

    return document;
  },
});

export const acceptOrRejectInvitation = mutation({
  args: {
    documentId: v.id("documents"),
    isAccept: v.boolean(),
  },
  handler: async (ctx, { documentId, isAccept }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const invitation = await ctx.db
      .query("invitations")
      .withIndex("byDocumentIdAndInvitedId", (q) =>
        q.eq("documentId", documentId).eq("invitedId", externalId)
      )
      .unique();

    if (!invitation) {
      throw new Error("Invitation not found at invitations");
    }

    if (!isAccept) {
      await ctx.db.patch(invitation._id, {
        isDenied: true,
      });
      return;
    }

    await ctx.db.insert("collaboration", {
      documentId,
      collaboratorId: externalId,
      ownerId: invitation.ownerId,
    });

    await ctx.db.delete(invitation._id);
  },
});
