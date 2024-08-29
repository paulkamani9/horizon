import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
    // this the Clerk ID, stored in the subject JWT field
    externalId: v.string(),
  })
    .index("byExternalId", ["externalId"])
    .index("byEmail", ["email"])
    .searchIndex("searchName", {
      searchField: "name",
    })
    .searchIndex("searchEmail", {
      searchField: "email",
    }),

  documents: defineTable({
    title: v.string(),
    icon: v.optional(v.string()),
    content: v.optional(v.string()),
    // stringContent: v.optional(v.string()),
    description: v.optional(v.string()),
    authorId: v.string(),
    authorName: v.string(),
    isPublic: v.boolean(),
  })
    .index("byAuthorId", ["authorId"])
    .index("byAuthorIdPublicDocument", ["authorId", "isPublic"])
    .searchIndex("byTitle", { searchField: "title" }),
  // .searchIndex("byStringContent", { searchField: "stringContent" }),
  collaboration: defineTable({
    documentId: v.id("documents"),
    collaboratorId: v.string(),
    ownerId: v.string(),
  })
    .index("byDocumentId", ["documentId"])
    .index("byOwnerId", ["ownerId"])
    .index("byOwnerIdAndCollaboratorId", ["ownerId", "collaboratorId"])
    .index("byDocumentIdAndCollaboratorId", ["documentId", "collaboratorId"])
    .index("byCollaboratorId", ["collaboratorId"]),
  invitations: defineTable({
    documentId: v.id("documents"),
    invitedId: v.string(),
    message: v.optional(v.string()),
    ownerId: v.string(),
    isSeen: v.boolean(),
  })
    .index("byDocumentId", ["documentId"])
    .index("byInvitedId", ["invitedId"])
    .index("byOwnerId", ["ownerId"])
    .index("byOwnerIdAndInvitedId", ["ownerId", "invitedId"])
    .index("byDocumentIdAndInvitedId", ["documentId", "invitedId"])
    .index("byInvitedIdAndIsSeen", ["invitedId", "isSeen"]),
  tags: defineTable({
    documentId: v.id("documents"),
    // authorId: v.string(),
    tag: v.string(),
  })
    .index("byDocumentId", ["documentId"])
    .searchIndex("byTag", {
      searchField: "tag",
    }),
  // .index("byAuthorId", ["authorId"])
  // .index("byDocumentIdAndByDocumentId", ["documentId", "authorId"]),
  stars: defineTable({
    documentId: v.id("documents"),
    ownerId: v.string(),
    starerId: v.string(),
  })
    .index("byDocumentId", ["documentId"])
    .index("byOwnerId", ["ownerId"])
    .index("byDocumentAndOwnerId", ["documentId", "ownerId"])
    .index("byStarerId", ["starerId"])
    .index("byDocumentIdAndStarerId", ["documentId", "starerId"]),
  followership: defineTable({
    followedId: v.string(),
    followerId: v.string(),
  })
    .index("byFollowedId", ["followedId"])
    .index("byFollowerId", ["followerId"])
    .index("byFollowedIdAndFollowerId", ["followedId", "followerId"]),
  views: defineTable({
    documentId: v.id("documents"),
    ownerId: v.string(),
    viewerId: v.string(),
  })
    .index("byDocumentId", ["documentId"])
    .index("byDocumentIdAndViewerId", ["documentId", "viewerId"]),
  messages: defineTable({
    senderId: v.string(),
    receiverId: v.string(),
    title: v.optional(v.string()),
    body: v.string(),
    parentMessageId: v.optional(v.id("messages")),
    isSeen: v.boolean(),
  })
    .index("byReceiverId", ["receiverId"])
    .index("byReceiverIdAndIsSeen", ["receiverId", "isSeen"]),
  notifications: defineTable({
    type: v.union(
      v.literal("following"),
      v.literal("starGazing"),
      v.literal("publicity"),
      v.literal("invitationAccept"),
      v.literal("invitationReject")
    ),
    notifierId: v.string(),
    notifiedId: v.string(),
    documentId: v.optional(v.string()),
    isSeen: v.boolean(),
  })
    .index("byNotifierId", ["notifierId"])
    .index("byNotifiedId", ["notifiedId"])
    .index("byNotifiedIdAndIsSeen", ["notifiedId", "isSeen"])
    .index("byDocumentId", ["documentId"]),
});
