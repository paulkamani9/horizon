import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const sendMessage = mutation({
  args: {
    receiverId: v.string(),
    title: v.optional(v.string()),
    body: v.string(),
    parentMessageId: v.optional(v.id("messages")),
  },
  handler: async (ctx, { receiverId, title, body, parentMessageId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);
    const user = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", externalId))
      .unique();

    if (!user) {
      return null;
    }
    
    if (parentMessageId) {
      const parentMessage = await ctx.db.get(parentMessageId);

      if (!parentMessage) {
        return null;
      }
      return await ctx.db.insert("messages", {
        title: parentMessage.title,
        senderId: externalId,
        receiverId,
        body,
        parentMessageId,
      });
    }

    await ctx.db.insert("messages", {
      title,
      senderId: externalId,
      receiverId,
      body,
    });
  },
});

export const getMyMessages = query({
  handler: async (ctx) => {
    const { externalId: receiverId } = await getCurrentUserOrThrow(ctx);

    const messages = await ctx.db
      .query("messages")
      .withIndex("byReceiverId", (q) => q.eq("receiverId", receiverId))
      .order("desc")
      .collect();

    if (!messages) {
      return null;
    }

    return messages;
  },
});
