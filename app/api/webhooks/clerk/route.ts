import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";



export async function POST(req: Request) {
  
  const body = await req.text();

  const headerPayload = await headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let event: WebhookEvent;

  try {
    event = wh.verify(body, svixHeaders) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook signature:", error);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "user.created":
        await prisma.user.create({
          data: {
            clerkId: event.data.id,
            name: `${event.data.first_name} ${event.data.last_name}`,
            email: event.data.email_addresses[0].email_address,
            emailVerified: event.data.email_addresses[0].verification?.status === "verified" || false,
          }
        });
        console.log(`User created: ${event.data.id}`);
        return NextResponse.json({ success: true }, { status: 200 });
      case "user.updated":
        await prisma.user.update({
          where: {
            clerkId: event.data.id,
          },
          data: {
            name: `${event.data.first_name} ${event.data.last_name}`
          }});
        console.log(`User updated: ${event.data.id}`);
        return NextResponse.json({ success: true }, { status: 200 });
      case "user.deleted":
        await prisma.user.deleteMany({
          where: {
            clerkId: event.data.id,
          }
        });
        console.log(`User deleted: ${event.data.id}`);
        return NextResponse.json({ success: true }, { status: 200 });
    }
  } catch(error) {
    console.error("Error verifying webhook signature:", error);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  console.log(event);

  return NextResponse.json({ success: true }, { status: 200 });
}