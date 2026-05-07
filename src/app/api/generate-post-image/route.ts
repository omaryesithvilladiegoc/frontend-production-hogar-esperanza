import { NextResponse } from "next/server";
import type { ICreatePostPayload } from "@/interfaces/interfaces";

type GenerateImageRequest = {
  topic?: string;
  currentPost?: Partial<ICreatePostPayload>;
};

type GeneratedImage = {
  imageBase64: string;
  mimeType: string;
};

const cleanString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const extractGeminiImage = (data: unknown) => {
  if (!data || typeof data !== "object") return null;

  const response = data as { candidates?: unknown };
  if (!Array.isArray(response.candidates)) return null;

  for (const candidate of response.candidates) {
    if (!candidate || typeof candidate !== "object") continue;

    const content = (candidate as { content?: unknown }).content;
    if (!content || typeof content !== "object") continue;

    const parts = (content as { parts?: unknown }).parts;
    if (!Array.isArray(parts)) continue;

    for (const part of parts) {
      if (!part || typeof part !== "object") continue;

      const inlineData =
        (part as { inlineData?: unknown; inline_data?: unknown }).inlineData ??
        (part as { inlineData?: unknown; inline_data?: unknown }).inline_data;
      if (!inlineData || typeof inlineData !== "object") continue;

      const image = inlineData as {
        data?: unknown;
        mimeType?: unknown;
        mime_type?: unknown;
      };
      if (typeof image.data === "string") {
        return {
          imageBase64: image.data,
          mimeType:
            typeof image.mimeType === "string"
              ? image.mimeType
              : typeof image.mime_type === "string"
                ? image.mime_type
                : "image/png",
        };
      }
    }
  }

  return null;
};

const buildImagePrompt = (body: GenerateImageRequest) => {
  const currentPost = body.currentPost ?? {};
  const topic = cleanString(body.topic);

  return `
Create a warm, highly photorealistic horizontal editorial cover photo for
Fundacion Hogar Esperanza, a foundation focused on dignified care for older
adults.

User topic:
${topic || "wellbeing and daily care for older adults"}

Post content:
${JSON.stringify(currentPost, null, 2)}

Visual requirements:
- Main image for a blog post.
- Show older adults with dignity, warmth, calm and natural expression.
- Photorealistic documentary photography, natural skin texture, real home or
  community-care environment, soft daylight, 35mm lens, shallow depth of field.
- Latin American / Colombian context when it fits naturally.
- Avoid text, logos, brands, signs or typography inside the image.
- Avoid dramatic hospitals, extreme sadness or alarming scenes.
- Use natural light, clean composition and hopeful mood.
- Do not show medical procedures or medication as the main subject.
- Avoid cartoon, illustration, 3D render, plastic skin, distorted hands, extra
  fingers, warped faces, duplicated people and artificial-looking smiles.
`;
};

const generateWithPollinations = async (
  prompt: string,
): Promise<GeneratedImage> => {
  void prompt;
  throw new Error("Pollinations esta desactivado. Usa IMAGE_PROVIDER=gemini.");
};

const generateWithGemini = async (
  prompt: string,
): Promise<GeneratedImage> => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Falta configurar GEMINI_API_KEY en el archivo .env del servidor.",
    );
  }

  const model = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message =
      typeof data?.error?.message === "string"
        ? data.error.message
        : "No se pudo generar la imagen con Gemini. Revisa si tu API key tiene acceso al modelo de imagen.";

    throw new Error(message);
  }

  const data = await response.json();
  const image = extractGeminiImage(data);

  if (!image) {
    throw new Error("Gemini no devolvio una imagen en esta respuesta.");
  }

  return image;
};

export async function POST(request: Request) {
  let body: GenerateImageRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "La solicitud no tiene un JSON valido." },
      { status: 400 },
    );
  }

  const prompt = buildImagePrompt(body);
  const provider = process.env.IMAGE_PROVIDER || "gemini";

  try {
    const image =
      provider === "gemini"
        ? await generateWithGemini(prompt)
        : await generateWithPollinations(prompt);

    return NextResponse.json({
      ...image,
      prompt,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No se pudo generar la imagen.";

    return NextResponse.json({ message }, { status: 502 });
  }
}
