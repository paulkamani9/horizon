import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const getNotifications = query({
  handler: async (ctx) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const notifications = await ctx.db
      .query("notifications")
      .withIndex("byNotifiedId", (q) => q.eq("notifiedId", externalId))
      .filter((q) => q.neq(q.field("notifierId"), externalId))
      .order("desc")
      .collect();

    return notifications;
  },
});

const getNewNotifications = async (ctx: QueryCtx, externalId: string) => {
  const [notifications, messages, invitations] = await Promise.all([
    ctx.db
      .query("notifications")
      .withIndex("byNotifiedIdAndIsSeen", (q) =>
        q.eq("notifiedId", externalId).eq("isSeen", false)
      )
      .collect(),
    ctx.db
      .query("messages")
      .withIndex("byReceiverIdAndIsSeen", (q) =>
        q.eq("receiverId", externalId).eq("isSeen", false)
      )
      .collect(),
    ctx.db
      .query("invitations")
      .withIndex("byInvitedIdAndIsSeen", (q) =>
        q.eq("invitedId", externalId).eq("isSeen", false)
      )
      .collect(),
  ]);

  return {
    notifications,
    messages,
    invitations,
  };
};

export const NewNotificationsStatus = query({
  args: {
    page: v.union(v.literal("general"), v.literal("both")),
  },
  handler: async (ctx, { page }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const { notifications, messages, invitations } = await getNewNotifications(
      ctx,
      externalId
    );

    if (page === "general") {
      return notifications.length + messages.length + invitations.length;
    }

    if (page === "both") {
      return {
        messagesCount: messages.length,
        invitationsCount: invitations.length,
      };
    }
    return 0;
  },
});

export const clearNotifications = mutation({
  args: {
    page: v.union(
      v.literal("general"),
      v.literal("messages"),
      v.literal("invitations")
    ),
  },
  handler: async (ctx, { page }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const { notifications, messages, invitations } = await getNewNotifications(
      ctx,
      externalId
    );

    if (page === "general") {
      await Promise.all(
        notifications.map(
          async (notification) =>
            await ctx.db.patch(notification._id, {
              isSeen: true,
            })
        )
      );
    }
    if (page === "invitations") {
      await Promise.all(
      invitations.map(
          async (invitation) =>
            await ctx.db.patch(invitation._id, {
              isSeen: true,
            })
        )
      );
    }
    if (page === "messages") {
      await Promise.all(
        messages.map(
          async (message) =>
            await ctx.db.patch(message._id, {
              isSeen: true,
            })
        )
      );
    }
  },
});
