import {
  internalMutation,
  mutation,
  query,
  QueryCtx,
} from "./_generated/server";
import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {
    const userAttributes = {
      name: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses[0].email_address,
      image: data.image_url,
      externalId: data.id,
    };

    const user = await userByExternalId(ctx, data.id);
    if (user === null) {
      await ctx.db.insert("users", userAttributes);
    } else {
      await ctx.db.patch(user._id, userAttributes);
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByExternalId(ctx, clerkUserId);

    if (user !== null) {
      // document specific tables
      const documents = await ctx.db
        .query("documents")
        .withIndex("byAuthorId", (q) => q.eq("authorId", user.externalId))
        .collect();

      await documents.map(async (document) => {
        const collaborations = await ctx.db
          .query("collaboration")
          .withIndex("byDocumentId", (q) => q.eq("documentId", document._id))
          .collect();

        await collaborations.map(async (collaboration) => {
          await ctx.db.delete(collaboration._id);
        });

        const invitations = await ctx.db
          .query("invitations")
          .withIndex("byDocumentId", (q) => q.eq("documentId", document._id))
          .collect();

        await invitations.map(async (invitation) => {
          await ctx.db.delete(invitation._id);
        });

        await ctx.db.delete(document._id);
      });

      // user specific tables

      const collaborations = await ctx.db
        .query("collaboration")
        .withIndex("byCollaboratorId", (q) =>
          q.eq("collaboratorId", user.externalId)
        )
        .collect();

      await collaborations.map(async (collaboration) => {
        await ctx.db.delete(collaboration._id);
      });

      const invitations = await ctx.db
        .query("invitations")
        .withIndex("byInvitedId", (q) => q.eq("invitedId", user.externalId))
        .collect();

      await invitations.map(async (invitation) => {
        await ctx.db.delete(invitation._id);
      });

      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`
      );
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, externalId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byExternalId", (q) => q.eq("externalId", externalId))
    .unique();
}

export const getMyData = query({
  handler: async (ctx) => {
    const me = await getCurrentUserOrThrow(ctx);

    return me;
  },
});

export const updateMyInformation = mutation({
  args: {
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, { name, imageUrl }) => {
    const me = await getCurrentUserOrThrow(ctx);

    if (name) {
      await ctx.db
        .query("documents")
        .withIndex("byAuthorId", (q) => q.eq("authorId", me.externalId))
        .collect()
        .then(async (documents) => {
          await Promise.all(
            documents.map((document) =>
              ctx.db.patch(document._id, {
                authorName: name,
              })
            )
          );
        });
      return await ctx.db.patch(me._id, {
        name,
      });
    }
    if (imageUrl) {
      return await ctx.db.patch(me._id, {
        image: imageUrl,
      });
    }

    return null;
  },
});

export const getAllUsers = query({
  args: { search: v.optional(v.string()) },
  handler: async (ctx, { search }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    if (search) {
      const usersByName = await ctx.db
        .query("users")
        .withSearchIndex("searchName", (q) => q.search("name", search))
        .filter((q) => q.neq(q.field("externalId"), externalId))
        .collect();

      const usersByEmail = await ctx.db
        .query("users")
        .withSearchIndex("searchEmail", (q) => q.search("email", search))
        .filter((q) => q.neq(q.field("externalId"), externalId))
        .collect();

      // Combine results, removing duplicates if necessary
      const combinedResults = [...usersByName, ...usersByEmail];

      // Optionally, remove duplicates based on a unique field (e.g., externalId)
      const uniqueResults = Array.from(
        new Map(combinedResults.map((user) => [user.externalId, user])).values()
      );

      return uniqueResults;
    }

    const users = await ctx.db
      .query("users")
      .filter((q) => q.neq(q.field("externalId"), externalId))
      .collect();

    return users;
  },
});

export const getAnotherUser = query({
  args: {
    externalId: v.string(),
  },
  handler: async (ctx, { externalId }) => {
    await getCurrentUserOrThrow(ctx);
    const user = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", externalId))
      .unique();

    if (!user) {
      return null;
    }

    return user;
  },
});
