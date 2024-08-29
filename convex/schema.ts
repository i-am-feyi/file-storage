import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(v.literal("image"), v.literal("csv"), v.literal("pdf"));

export const roles = v.union(v.literal("admin"), v.literal("member"));

export default defineSchema(
  {
    files: defineTable({
      fileId: v.string(),
      name: v.string(),
      type: fileTypes,
      orgId: v.string(),
      fileStorageId: v.id("_storage"),
      userId: v.id("users"),
      shouldDelete: v.optional(v.boolean()),
    })
      .index("by_fileId", ["fileId"])
      .index("by_fileStorageId", ["fileStorageId"])
      .index("by_orgId", ["orgId"])
      .index("by_shouldDelete", ["shouldDelete"]),

    favorites: defineTable({
      fileId: v.id("files"),
      orgId: v.string(),
      userId: v.id("users"),
    }).index("by_userId_orgId_fileId", ["userId", "orgId", "fileId"]),

    users: defineTable({
      userId: v.string(),
      clerkId: v.string(),
      firstName: v.string(),
      lastName: v.string(),
      fullName: v.string(),
      email: v.string(),
      phone: v.optional(v.string()),
      imageUrl: v.string(),
      updated_at: v.number(),
      banned: v.boolean(),
      // last_active_at: v.optional(v.number()),
      date_joined: v.number(),
      orgIds: v.array(
        v.object({
          orgId: v.string(),
          role: roles,
        })
      ),
    })
      .index("by_userId", ["userId"])
      .index("by_email", ["email"])
      .index("by_clerkId", ["clerkId"]),
  },
  {
    schemaValidation: false,
  }
);
