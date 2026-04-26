import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FfetchPosts } from "@/services/fetchPosts";
import {
  buildAbsoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos y novedades sobre bienestar, cuidado y acompañamiento para adultos mayores en Hogar Esperanza.",
  alternates: {
    canonical: buildAbsoluteUrl("/blog"),
  },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description:
      "Artículos y novedades sobre bienestar, cuidado y acompañamiento para adultos mayores en Hogar Esperanza.",
    url: buildAbsoluteUrl("/blog"),
    siteName: SITE_NAME,
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Blog de Hogar Esperanza",
      },
    ],
  },
};

export default async function BlogPage() {
  const posts = await FfetchPosts();

  if (!posts.length) {
    return (
      <section className="mx-auto bg-[#0d3b25] px-4 py-8 pt-30 sm:px-6 lg:px-8">
        <h1 className="mb-12 text-center text-4xl font-bold text-white md:text-5xl">
          La vida en Hogar Esperanza...
        </h1>

        <p className="text-center text-white/80">
          Aún no hay publicaciones disponibles.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto bg-[#0d3b25] px-4 py-8 pt-30 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-center text-4xl font-bold text-white md:text-5xl">
        La vida en Hogar Esperanza...
      </h1>

      <p className="mx-auto mb-10 max-w-3xl text-center text-white/80">
        Descubre artículos, consejos y novedades sobre cuidado, bienestar y
        acompañamiento para adultos mayores y sus familias.
      </p>

      <div className="grid auto-rows-[280px] grid-cols-1 gap-6 md:grid-cols-12">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group relative overflow-hidden rounded-3xl md:col-span-6 lg:col-span-4"
            style={{
              gridColumn: `span ${Math.min(Math.max(post.size, 1), 12)} / span ${Math.min(Math.max(post.size, 1), 12)}`,
            }}
          >
            <Link href={`/blog/${post.id}`} className="absolute inset-0 z-10">
              <span className="sr-only">Leer {post.title}</span>
            </Link>
            <Image
              src={
                post.image ||
                "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772863000/620429637_17932356405170762_5379083252956222494_n-removebg-preview_vl44qj.png"
              }
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute bottom-0 p-6">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/70">
                {new Date(post.createdAt).toLocaleDateString("es-CO")}
              </p>

              <h2 className="mb-2 text-xl font-bold text-white md:text-2xl">
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </h2>

              <p className="text-sm text-white/90">{post.subtitle}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button className="rounded-full border-2 border-white px-10 py-3 text-white transition-all hover:bg-white hover:text-emerald-800">
          Ver más +
        </button>
      </div>
    </section>
  );
}
