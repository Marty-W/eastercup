import { sendPostRegEmail } from "@/server/api/helpers";
import { type NextRequest } from "next/server";
import { z } from "zod";

const emailSchema = z.object({
  lang: z.enum(["cs", "en"]),
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const reqBody = emailSchema.parse(rawBody);

    await sendPostRegEmail({
      lang: reqBody.lang,
      recipientEmail: reqBody.email,
    });

    return new Response("OK", { status: 200 });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
