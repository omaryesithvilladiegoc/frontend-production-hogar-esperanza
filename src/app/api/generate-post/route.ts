import { NextResponse } from "next/server";
import type { ICreatePostPayload } from "@/interfaces/interfaces";

type GeneratePostRequest = {
  topic?: string;
  currentPost?: Partial<ICreatePostPayload>;
};

type GeneratedPostContent = {
  title: string;
  subtitle: string;
  header: string;
  mainContent: string;
  footer: string;
  keywords: string[];
  size: number;
};

const generatedPostSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Titulo atractivo y claro para el post.",
    },
    subtitle: {
      type: "string",
      description: "Subtitulo corto que resuma el valor del post.",
    },
    header: {
      type: "string",
      description: "Entrada breve y calida para abrir la publicacion.",
    },
    mainContent: {
      type: "string",
      description:
        "Contenido principal de 350 a 550 palabras, en parrafos faciles de leer.",
    },
    footer: {
      type: "string",
      description: "Cierre humano con una recomendacion o invitacion amable.",
    },
    keywords: {
      type: "array",
      description: "Entre 5 y 8 palabras o frases cortas para busqueda.",
      items: {
        type: "string",
      },
    },
    size: {
      type: "integer",
      description: "Numero entre 1 y 12 para el tamano del post en el grid.",
    },
  },
  required: [
    "title",
    "subtitle",
    "header",
    "mainContent",
    "footer",
    "keywords",
    "size",
  ],
};

const defaultPrompt = `
Eres un redactor experto para la Fundacion Hogar Esperanza, una fundacion
dedicada al cuidado digno, calido y responsable de adultos mayores.
Genera contenido de blog en espanol colombiano, claro, humano y confiable.

Contexto editorial:
- Escribe sobre adultos mayores, bienestar, cuidados diarios, alimentacion,
  salud preventiva, acompanamiento emocional, familia, rutinas, actividades,
  historias esperanzadoras y recomendaciones practicas.
- El tono debe ser cercano, respetuoso, esperanzador y profesional.
- No inventes datos medicos especificos ni promesas de cura.
- Si das recomendaciones de salud o alimentacion, mantenlas generales y sugiere
  consultar profesionales cuando aplique.
- No generes ni describas imagenes.

Devuelve exclusivamente JSON valido con estas claves:
title, subtitle, header, mainContent, footer, keywords, size.
keywords debe ser un arreglo de 5 a 8 palabras o frases cortas.
size debe ser un numero entre 1 y 12.
`;

const cleanString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const normalizeGeneratedPost = (value: unknown): GeneratedPostContent | null => {
  if (!value || typeof value !== "object") return null;

  const data = value as Partial<GeneratedPostContent>;
  const keywords = Array.isArray(data.keywords)
    ? data.keywords.map(cleanString).filter(Boolean).slice(0, 8)
    : [];

  const size = typeof data.size === "number" ? Math.round(data.size) : 1;

  return {
    title: cleanString(data.title),
    subtitle: cleanString(data.subtitle),
    header: cleanString(data.header),
    mainContent: cleanString(data.mainContent),
    footer: cleanString(data.footer),
    keywords,
    size: Math.min(12, Math.max(1, size)),
  };
};

const extractOutputText = (data: unknown) => {
  if (!data || typeof data !== "object") return "";

  const response = data as { output_text?: unknown; output?: unknown };
  if (typeof response.output_text === "string") return response.output_text;

  if (!Array.isArray(response.output)) return "";

  return response.output
    .flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const content = (item as { content?: unknown }).content;
      return Array.isArray(content) ? content : [];
    })
    .map((content) => {
      if (!content || typeof content !== "object") return "";
      const text = (content as { text?: unknown }).text;
      return typeof text === "string" ? text : "";
    })
    .join("");
};

const extractGeminiText = (data: unknown) => {
  if (!data || typeof data !== "object") return "";

  const response = data as { candidates?: unknown };
  if (!Array.isArray(response.candidates)) return "";

  return response.candidates
    .flatMap((candidate) => {
      if (!candidate || typeof candidate !== "object") return [];
      const content = (candidate as { content?: unknown }).content;
      if (!content || typeof content !== "object") return [];
      const parts = (content as { parts?: unknown }).parts;
      return Array.isArray(parts) ? parts : [];
    })
    .map((part) => {
      if (!part || typeof part !== "object") return "";
      const text = (part as { text?: unknown }).text;
      return typeof text === "string" ? text : "";
    })
    .join("");
};

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          "Falta configurar GEMINI_API_KEY en el archivo .env del servidor.",
      },
      { status: 500 },
    );
  }

  let body: GeneratePostRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "La solicitud no tiene un JSON valido." },
      { status: 400 },
    );
  }

  const topic = cleanString(body.topic);
  const currentPost = body.currentPost ?? {};

  const userPrompt = `
Idea o enfoque del usuario:
${topic || "Propone un tema util para familias y cuidadores de adultos mayores."}

Contenido actual para mejorar o completar:
${JSON.stringify(currentPost, null, 2)}

Genera una version lista para publicar. El contenido principal debe tener entre
350 y 550 palabras, con parrafos faciles de leer. Mantente fiel al contexto de
Fundacion Hogar Esperanza y no incluyas campos de imagen.

Responde solo con json valido, sin texto adicional.
`;

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
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
            parts: [
              {
                text: `${defaultPrompt}\n\n${userPrompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseJsonSchema: generatedPostSchema,
        },
      }),
    },
  );

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message =
      typeof data?.error?.message === "string"
        ? data.error.message
        : "No se pudo generar el contenido con Gemini.";

    return NextResponse.json({ message }, { status: response.status });
  }

  const data = await response.json();
  const outputText = extractGeminiText(data) || extractOutputText(data);

  try {
    const generated = normalizeGeneratedPost(JSON.parse(outputText));

    if (!generated) {
      throw new Error("Respuesta vacia");
    }

    return NextResponse.json(generated);
  } catch {
    return NextResponse.json(
      { message: "OpenAI respondio en un formato inesperado." },
      { status: 502 },
    );
  }
}
