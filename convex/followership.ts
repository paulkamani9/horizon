import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const followingStatus = async (ctx: QueryCtx, followedId: string) => {
  const { externalId } = await getCurrentUserOrThrow(ctx);
  const isFollow = await ctx.db
    .query("followership")
    .withIndex("byFollowedIdAndFollowerId", (q) =>
      q.eq("followedId", followedId).eq("followerId", externalId)
    )
    .unique();

  return isFollow;
};

export async function allUserFollowers(ctx: QueryCtx, followedId: string) {
  await getCurrentUserOrThrow(ctx);
  const allFollowers = await ctx.db
    .query("followership")
    .withIndex("byFollowedId", (q) => q.eq("followedId", followedId))
    .order("desc")
    .collect();

  return allFollowers;
}

export const getFollowershipStatus = query({
  args: {
    followedId: v.string(),
  },
  handler: async (ctx, { followedId }) => {
    const isFollow = await followingStatus(ctx, followedId);
    return !!isFollow;
  },
});

export const toggleFollowership = mutation({
  args: {
    followedId: v.string(),
  },
  handler: async (ctx, { followedId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const isFollow = await followingStatus(ctx, followedId);

    if (!isFollow) {
      await ctx.db.insert("followership", {
        followedId,
        followerId: externalId,
      });
      await ctx.db.insert("notifications", {
        type: "following",
        notifiedId: followedId,
        notifierId: externalId,
        isSeen: false,
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
    const allFollowers = await allUserFollowers(ctx, followedId);

    return allFollowers.length;
  },
});

export const myFollowers = query({
  handler: async (ctx) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);
    const allFollowers = await allUserFollowers(ctx, externalId);

    return allFollowers;
  },
});
