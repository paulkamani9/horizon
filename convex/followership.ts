import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const getFollowershipStatus = query({
  args: {
    followedId: v.string(),
  },
  handler: async (ctx, { followedId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const isFollow = await ctx.db
      .query("followership")
      .withIndex("byFollowedIdAndFollowerId", (q) =>
        q.eq("followedId", followedId).eq("followerId", externalId)
      )
      .unique();

    return !!isFollow;
  },
});

export const toggleFollowership = mutation({
  args: {
    followedId: v.string(),
  },
  handler: async (ctx, { followedId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const isFollow = await ctx.db
      .query("followership")
      .withIndex("byFollowedIdAndFollowerId", (q) =>
        q.eq("followedId", followedId).eq("followerId", externalId)
      )
      .unique();

    if (!isFollow) {
      await ctx.db.insert("followership", {
        followedId,
        followerId: externalId,
      });
    } else {
      await ctx.db.delete(isFollow._id);
    }
  },
});

export const followersCount = query({
  args: {
    followedId: v.string(),
  },
  handler: async (ctx, { followedId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);
    const allFollowers = await ctx.db
      .query("followership")
      .withIndex("byFollowedId", (q) => q.eq("followedId", followedId))
      .collect();

    return allFollowers.length;
  },
});
