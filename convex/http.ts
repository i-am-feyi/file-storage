import { Webhook } from "svix";
import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import { WebhookEvent } from "@clerk/backend";
import { httpAction } from "./_generated/server";

// Validating Webhook Request
const validatePayload = async (req: Request): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();

  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

  const webhook = new Webhook(webhookSecret);

  try {
    const event = webhook.verify(payload, svixHeaders) as WebhookEvent;
    console.log(event);
    return event;
  } catch (error) {
    console.log("Clerk webhook request could not be verified!");
  }
};

// Handling Clerk Webhook Events
export const handleClerkUserWebhook = httpAction(async (ctx, req) => {
  // Validate Webhook Event
  const event = await validatePayload(req);
  if (!event) {
    return new Response("Could not validate Clerk payload", {
      status: 400,
    });
  }

  // Execute different logic based on the event type
  switch (event.type) {
    case "user.created":
    case "user.updated": {
      try {
        await ctx.runMutation(internal.users.upsertClerkUser, {
          data: event.data,
        });
      } catch (error) {
        console.error(`Error processing ${event.type}:`, error);
      }
      break;
    }

    // case "user.deleted": {
    //   try {
    //     await ctx.runMutation(internal.users.deleteClerkUser, {
    //       clerkUserId: event.data.id!,
    //     });
    //   } catch (error) {
    //     console.error(`Error processing ${event.type}:`, error);
    //   }
    //   break;
    // }

    case "organizationMembership.created": {
    }
    case "organizationMembership.updated": {
    }

    default: {
      console.log("Clerk webhook event not supported", event.type);
    }
  }

  return new Response(null, {
    status: 200,
  });
});

const http = httpRouter();

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleClerkUserWebhook,
});

export default http;
