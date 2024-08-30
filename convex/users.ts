import { ConvexError, v, Validator } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation, query } from "./_generated/server";
import { roles } from "./schema";
import { hasAccessToOrg } from "./files";
import { UserJSON } from "@clerk/backend";
import { v4 as uuidv4 } from "uuid";

// export async function getUser(ctx: QueryCtx | MutationCtx, tokenIdentifier: string) {
//   const user = await ctx.db
//     .query("users")
//     .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", tokenIdentifier))
//     .first();

//   if (!user) {
//     throw new ConvexError("expected user to be defined");
//   }

//   return user;
// }

export const upsertClerkUser = internalMutation({
  args: { data: v.any() as Validator<UserJSON> },

  async handler(ctx, { data }) {
    const user_values = {
      userId: uuidv4(),
      clerkId: data.id,
      firstName: data.first_name!,
      lastName: data.last_name!,
      fullName: `${data.first_name!} ${data.last_name!}`,
      imageUrl: data.image_url!,
      email: data.email_addresses[0].email_address!,
      // phone: data.phone_numbers[0].phone_number ?? "",
      // last_active_at: data.last_sign_in_at!,
      updated_at: data.updated_at!,
      date_joined: data.created_at!,
      banned: data.banned!,
      orgIds: [],
    };

    const user = await userByClerkId(ctx, data.id);

    if (user === null) {
      const addedUser = await ctx.db.insert("users", user_values);

      if (!addedUser) {
        throw new ConvexError(
          "[CONVEX_USERS] There was an error adding user data to DB."
        );
      }
    } else if (user !== null) {
      await ctx.db.patch(user._id, user_values);
    }
  },
});

export const addOrgIdToUser = internalMutation({
  args: { clerkId: v.string(), orgId: v.string(), role: roles },
  async handler(ctx, { clerkId, orgId, role }) {
    const user = await userByClerkId(ctx, clerkId);

    if (!user)
      throw new ConvexError("[addOrgIdToUser] - Could not find user with Clerk ID");

    await ctx.db.patch(user._id, {
      orgIds: [...user.orgIds, { orgId: orgId, role: role }],
    });
  },
});

// export const updateRoleInOrgForUser = internalMutation({
//   args: { tokenIdentifier: v.string(), orgId: v.string(), role: roles },
//   async handler(ctx, args) {
//     const user = await getUser(ctx, args.tokenIdentifier);

//     const org = user.orgIds.find((org) => org.orgId === args.orgId);

//     if (!org) {
//       throw new ConvexError(
//         "expected an org on the user but was not found when updating"
//       );
//     }

//     org.role = args.role;

//     await ctx.db.patch(user._id, {
//       orgIds: user.orgIds,
//     });
//   },
// });

// export const getMe = query({
//   args: {},
//   async handler(ctx) {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       return null;
//     }

//     const user = await getUser(ctx, identity.tokenIdentifier);

//     if (!user) {
//       return null;
//     }

//     return user;
//   },
// });

// New

export const current = query({
  args: { throwError: v.optional(v.boolean()) },
  handler: async (ctx, { throwError }) => {
    if (throwError) {
      return await getCurrentUserOrThrow(ctx);
    }

    return await getCurrentUser(ctx);
  },
});

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByClerkId(ctx, identity.subject);
}

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new ConvexError("Can't get current user");
  return userRecord;
}

export async function userByClerkId(ctx: QueryCtx | MutationCtx, clerkId: string) {
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .unique();

  return user;
}

export const getUserProfile = query({
  args: { userId: v.id("users") },
  async handler(ctx, { userId }) {
    const user = await ctx.db.get(userId);

    return {
      name: user?.fullName,
      image: user?.imageUrl,
    };
  },
});

// export const getUserInfo = query({
//   args: { clerk_id: v.string() },
//   async handler(ctx, { clerk_id }) {
//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_clerk_id", (q) => q.eq("clerk_id", clerk_id))
//       .unique();

//     return user;
//   },
// });

// export const deleteClerkUser = internalMutation({
//   args: { clerkUserId: v.string() },
//   async handler(ctx, { clerkUserId }) {
//     const user = await userByClerkId(ctx, clerkUserId);

//     if (user !== null) {
//       const userInvestment = await ctx.db
//         .query("investments")
//         .withIndex("by_user", (q) => q.eq("user", user._id))
//         .unique();

//       if (userInvestment !== null) {
//         await ctx.db.delete(userInvestment._id);
//       }

//       await ctx.db.delete(user._id);
//     } else {
//       console.warn(`Can't delete user, there is none for Clerk user ID: ${clerkUserId}`);
//     }
//   },
// });
