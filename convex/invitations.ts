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

    const invitation = await ctx.db
      .query("invitations")
      .withIndex("byDocumentIdAndInvitedId", (q) =>
        q.eq("documentId", documentId).eq("invitedId", user.externalId)
      )
      .unique();

    if (invitation) {
      return {
        isFound: false,
        message: "You have already sent and invitation to this Author.",
        user: null,
      };
    }

    return {
      isFound: true,
      message: "Author found.",
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
      isDenied: false,
    });
  },
});
