import { del } from "@vercel/blob";
import { z } from "zod";
import { env } from "@/env.mjs";

const requestSchema = z.object({
  blobUrl: z.string(),
});

export async function DELETE(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const apiKey = authHeader.split(" ")[1];

  if (apiKey !== env.BAKERY_API_TOKEN) {
    return new Response(JSON.stringify({ error: "Invalid API key" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await request.json();
    const validatedBody = requestSchema.parse(body);

    const { blobUrl } = validatedBody;

    await del(blobUrl);

    return new Response(
      JSON.stringify({
        message: "Blob deleted successfully.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Invalid data provided.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
