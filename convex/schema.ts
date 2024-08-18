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
  })
    .index("byDocumentId", ["documentId"])
    .index("byDocumentIdAndCollaboratorId", ["documentId", "collaboratorId"])
    .index("byCollaboratorId", ["collaboratorId"]),
  invitations: defineTable({
    documentId: v.id("documents"),
    invitedId: v.string(),
    message: v.optional(v.string()),
    isDenied: v.boolean(),
  })
    .index("byDocumentId", ["documentId"])
    .index("byInvitedId", ["invitedId"])
    .index("byDocumentIdAndInvitedId", ["documentId", "invitedId"]),
});
