import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";
import { Id } from "./_generated/dataModel";

export const createDocument = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, { title }) => {
    const user = await getCurrentUserOrThrow(ctx);

    const newDocument = await ctx.db.insert("documents", {
      title,
      icon: "😎",
      authorId: user.externalId,
      authorName: user.name,
      isPublic: false,
    });

    return newDocument;
  },
});

export const getMyDocuments = query({
  handler: async (ctx) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    let documents: {
      _id: Id<"documents">;
      _creationTime: number;
      icon?: string;
      content?: string;
      description?: string;
      title: string;
      authorId: string;
      isPublic: boolean;
    }[] = [];

    const [myDocuments, collaborationsDocuments, invitationsDocuments] =
      await Promise.all([
        ctx.db
          .query("documents")
          .withIndex("byAuthorId", (q) => q.eq("authorId", externalId))
          .order("desc")
          .collect(),
        ctx.db
          .query("collaboration")
          .withIndex("byCollaboratorId", (q) =>
            q.eq("collaboratorId", externalId)
          )
          .order("desc")
          .collect()
          .then(async (collaborations) => {
            const documents = await Promise.all(
              collaborations.map((collaboration) =>
                ctx.db.get(collaboration.documentId)
              )
            );
            return documents;
          }),
        ctx.db
          .query("invitations")
          .withIndex("byInvitedId", (q) => q.eq("invitedId", externalId))
          .order("desc")
          .collect()
          .then(async (invitations) => {
            const documents = await Promise.all(
              invitations.map((invitation) => ctx.db.get(invitation.documentId))
            );
            return documents;
          }),
      ]);

    documents = [
      ...collaborationsDocuments.filter((doc) => doc !== null),
      ...invitationsDocuments.filter((doc) => doc !== null),
      ...myDocuments.filter((doc) => doc !== null),
    ];

    return documents;
  },
});

export const deleteMyDocument = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, { documentId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);
    const existingDocument = await ctx.db.get(documentId);

    if (!existingDocument) {
      return null;
    }

    if (existingDocument.authorId !== externalId) {
      return null;
    }

    // Fetch related invitations and collaborations
    const [invitations, collaborations, stars, views, notifications, tags] =
      await Promise.all([
        ctx.db
          .query("invitations")
          .withIndex("byDocumentId", (q) => q.eq("documentId", documentId))
          .collect(),
        ctx.db
          .query("collaboration")
          .withIndex("byDocumentId", (q) => q.eq("documentId", documentId))
          .collect(),
        ctx.db
          .query("stars")
          .withIndex("byDocumentId", (q) => q.eq("documentId", documentId))
          .collect(),
        ctx.db
          .query("views")
          .withIndex("byDocumentId", (q) => q.eq("documentId", documentId))
          .collect(),
        ctx.db
          .query("notifications")
          .withIndex("byDocumentId", (q) => q.eq("documentId", documentId))
          .collect(),
        ctx.db
          .query("tags")
          .withIndex("byDocumentId", (q) => q.eq("documentId", documentId))
          .collect(),
      ]);

    // Collect IDs to delete
    const invitationIds = invitations.map((invitation) => invitation._id);
    const collaborationIds = collaborations.map(
      (collaboration) => collaboration._id
    );
    const starsId = stars.map((star) => star._id);
    const viewsId = views.map((view) => view._id);
    const notificationsId = notifications.map(
      (notification) => notification._id
    );
    const tagsId = tags.map((tag) => tag._id);

    // Perform deletions in parallel
    await Promise.all([
      ...invitationIds.map((id) => ctx.db.delete(id)),
      ...collaborationIds.map((id) => ctx.db.delete(id)),
      ...starsId.map((id) => ctx.db.delete(id)),
      ...viewsId.map((id) => ctx.db.delete(id)),
      ...notificationsId.map((id) => ctx.db.delete(id)),
      ...tagsId.map((id) => ctx.db.delete(id)),
      ctx.db.delete(existingDocument._id),
    ]);
  },
});

export const updateMyDocument = mutation({
  args: {
    documentId: v.id("documents"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, { documentId, title, description, icon, content }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);
    const document = await ctx.db.get(documentId);

    if (!document) {
      return null;
    }

    if (document.authorId !== externalId) {
      const collaborator = await ctx.db
        .query("collaboration")
        .withIndex("byDocumentIdAndCollaboratorId", (q) =>
          q.eq("documentId", documentId).eq("collaboratorId", externalId)
        )
        .unique();

      if (!collaborator) {
        return null;
      }
    }

    // Prepare patch data
    const patchData: {
      title?: string;
      icon?: string;
      content?: string;
      description?: string;
    } = {};

    if (title !== undefined) {
      patchData.title = title || "Untitled";
    }

    if (icon !== undefined) {
      patchData.icon = icon || "😎";
    }

    if (content !== undefined) {
      patchData.content = content;
    }

    if (description !== undefined) {
      patchData.description = description;
    }

    // Apply patch
    if (Object.keys(patchData).length > 0) {
      await ctx.db.patch(documentId, patchData);
    }
  },
});

export const toggleMyDocumentsPublicity = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, { documentId }) => {
    const { externalId } = await getCurrentUserOrThrow(ctx);

    const document = await ctx.db.get(documentId);

    if (!document) {
      return null;
    }

    if (document.authorId !== externalId) {
      return null;
    }

    if (document.isPublic === true) {
      await ctx.db.patch(document._id, {
        isPublic: false,
      });
    } else {
      await Promise.all([
        ctx.db.patch(document._id, {
          isPublic: true,
        }),
        ctx.db
          .query("collaboration")
          .withIndex("byDocumentId", (q) => q.eq("documentId", document._id))
          .collect()
          .then(async (collaborations) => {
            await Promise.all(
              collaborations.map((collaboration) =>
                ctx.db.insert("notifications", {
                  type: "publicity",
                  documentId,
                  notifiedId: collaboration.collaboratorId,
                  notifierId: externalId,
                  isSeen: false,
                })
              )
            );
          }),

        // perhaphs all followers, should get a publicity notice as well
      ]);
    }
  },
});

export const getAnotherUsersPublicDocuments = query({
  args: {
    id: v.string(), // The ID of the other user whose documents we're interested in
  },
  handler: async (ctx, args) => {
    // Identify the current user (required to determine what they can access)
    const { externalId } = await getCurrentUserOrThrow(ctx);

    // Initialize an array to collect all documents the current user can access
    let documents = [];

    // check the users existence
    const user = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", args.id))
      .unique();

    if (!user) {
      return null;
    }

    // Fetch all public documents authored by the specified user
    const publicDocuments = await ctx.db
      .query("documents")
      .withIndex("byAuthorIdPublicDocument", (q) =>
        q.eq("authorId", args.id).eq("isPublic", true)
      )
      .collect();

    // Fetch all documents where the specified user owns the document and the current user is a collaborator
    const userDocuments = await ctx.db
      .query("collaboration")
      .withIndex("byOwnerIdAndCollaboratorId", (q) =>
        q.eq("ownerId", args.id).eq("collaboratorId", externalId)
      )
      .collect()
      .then((collaborations) =>
        Promise.all(
          collaborations.map((collaboration) =>
            ctx.db.get(collaboration.documentId)
          )
        )
      );

    // Fetch all documents where the specified user is a collaborator
    const allUserCollaborationsDocuments = await ctx.db
      .query("collaboration")
      .withIndex("byCollaboratorId", (q) => q.eq("collaboratorId", args.id))
      .collect()
      .then((collaborations) =>
        Promise.all(
          collaborations.map((collaboration) =>
            ctx.db.get(collaboration.documentId)
          )
        )
      );

    // Filter out the documents where the current user is the owner
    const myDocuments = allUserCollaborationsDocuments.filter(
      (document) => document?.authorId === externalId
    );

    // Filter out the documents where the current user is not the owner
    const otherUsersDocuments = allUserCollaborationsDocuments.filter(
      (document) => document?.authorId !== externalId
    );

    // Find documents where both the current user and the specified user are collaborators but neither is the owner
    const sharedDocuments = await Promise.all(
      otherUsersDocuments.map(async (document) => {
        if (document) {
          const collaboration = await ctx.db
            .query("collaboration")
            .withIndex("byDocumentIdAndCollaboratorId", (q) =>
              q.eq("documentId", document._id).eq("collaboratorId", externalId)
            )
            .unique();
          if (collaboration) {
            return ctx.db.get(collaboration.documentId);
          }
        }
      })
    );

    // Fetch all invitations from the specified user to the current user (excluding denied invitations)
    const invitationDocuments = await ctx.db
      .query("invitations")
      .withIndex("byOwnerIdAndInvitedId", (q) =>
        q.eq("ownerId", args.id).eq("invitedId", externalId)
      )
      .collect()
      .then((invitations) =>
        Promise.all(
          invitations.map((invitation) => ctx.db.get(invitation.documentId))
        )
      );

    // Combine all fetched documents into a single array, filtering out null values and duplicates
    documents = [
      ...userDocuments
        .filter((doc) => doc !== null)
        .filter((doc) => doc.isPublic === false),
      ...invitationDocuments.filter((doc) => doc !== null),
      ...myDocuments.filter((doc) => doc !== null),
      ...sharedDocuments
        .filter((doc) => doc !== null)
        .filter((doc) => doc !== undefined),
      ...otherUsersDocuments
        .filter((doc) => doc !== null)
        .filter((doc) => doc.isPublic === true),
      ...publicDocuments,
    ];

    // Remove duplicate documents by their unique ID
    const uniqueDocuments = Array.from(
      new Map(documents.map((doc) => [doc._id, doc])).values()
    );

    // Return the final collection of documents the current user is allowed to see
    return uniqueDocuments;
  },
});

export const checkRoleAndReturnDocument = query({
  args: { documentId: v.optional(v.id("documents")) },
  handler: async (ctx, { documentId }) => {
    if (!documentId) {
      return null;
    }

    const { externalId } = await getCurrentUserOrThrow(ctx);

    const document = await ctx.db.get(documentId);

    if (!document) {
      return null;
    }

    if (document.authorId !== externalId) {
      const [collaboration, invitation] = await Promise.all([
        ctx.db
          .query("collaboration")
          .withIndex("byDocumentIdAndCollaboratorId", (q) =>
            q.eq("documentId", document._id).eq("collaboratorId", externalId)
          )
          .unique(),
        ctx.db
          .query("invitations")
          .withIndex("byDocumentIdAndInvitedId", (q) =>
            q.eq("documentId", document._id).eq("invitedId", externalId)
          )
          .unique(),
      ]);

      if (collaboration) {
        return {
          ...document,
          role: "admin",
        };
      }

      if (invitation) {
        return {
          ...document,
          role: "invited",
        };
      }

      if (document.isPublic) {
        return {
          ...document,
          role: "member",
        };
      }

      return null;
    }

    return {
      ...document,
      role: "owner",
    };
  },
});
