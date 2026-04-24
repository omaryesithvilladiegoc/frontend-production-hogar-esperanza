export const SITE_NAME = "Hogar Esperanza";
export const SITE_DESCRIPTION =
  "Hogar Esperanza brinda cuidado, compania y bienestar para adultos mayores, con programas, donaciones y contenido educativo para familias y cuidadores.";
export const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772863000/620429637_17932356405170762_5379083252956222494_n-removebg-preview_vl44qj.png";

export const getSiteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const buildAbsoluteUrl = (path = "") => {
  const baseUrl = getSiteUrl();
  return new URL(path, baseUrl).toString();
};

export const buildPostDescription = (content: string, fallback: string) => {
  const source = content?.trim() || fallback.trim();
  if (source.length <= 160) return source;
  return `${source.slice(0, 157).trim()}...`;
};
