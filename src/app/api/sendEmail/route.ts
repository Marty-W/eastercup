import { sendPostRegEmail } from "@/server/api/helpers";
import { type NextRequest } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { env } from "@/env.mjs";

const emailSchema = z.object({
  lang: z.enum(["cs", "en"]),
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  const headersList = headers();
  if (headersList.get("EMAIL_SECRET") !== env.EMAIL_SECRET) {
    return new Response("Get outta here", { status: 500 });
  }
  try {
    const rawBody = await req.json();
    const reqBody = emailSchema.parse(rawBody);

    await sendPostRegEmail({
      lang: reqBody.lang,
      recipientEmail: reqBody.email,
    });

    return new Response("OK", { status: 200 });
  } catch (e) {
    console.error("Failed to request email sending:", e);
    return new Response("Error", { status: 500 });
  }
}
