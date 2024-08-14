import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
    // this the Clerk ID, stored in the subject JWT field
    externalId: v.string(),
  }).index("byExternalId", ["externalId"]),
  documents: defineTable({
    title: v.string(),
    icon: v.optional(v.string()),
    content: v.optional(v.string()),
    description: v.optional(v.string()),
    authorId: v.string(),
  })
    .index("byAuthorId", ["authorId"])
    .searchIndex("byTitle", { searchField: "title" })
});
