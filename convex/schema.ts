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
    .index("byEmail", ["email"]),

  documents: defineTable({
    title: v.string(),
    icon: v.optional(v.string()),
    content: v.optional(v.string()),
    description: v.optional(v.string()),
    authorId: v.string(),
    isPublic: v.boolean(),
  })
    .index("byAuthorId", ["authorId"])
    .index("byAuthorIdPublicDocument", ["authorId", "isPublic"])
    .searchIndex("byTitle", { searchField: "title" }),
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
    isDenied: v.boolean(),
  })
    .index("byDocumentId", ["documentId"])
    .index("byInvitedId", ["invitedId"])
    .index("byOwnerId", ["ownerId"])
    .index("byOwnerIdAndInvitedId", ["ownerId", "invitedId"])
    .index("byDocumentIdAndInvitedId", ["documentId", "invitedId"]),
  tags: defineTable({
    documentId: v.id("documents"),
    // authorId: v.string(),
    tag: v.string(),
  }).index("byDocumentId", ["documentId"]),
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
    .index("byDocumentIdAndViewerId", ["documentId", "viewerId"]), // add indexes if necessary
});
