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
    "Articulos y novedades sobre bienestar, cuidado y acompanamiento para adultos mayores en Hogar Esperanza.",
  alternates: {
    canonical: buildAbsoluteUrl("/blog"),
  },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description:
      "Articulos y novedades sobre bienestar, cuidado y acompanamiento para adultos mayores en Hogar Esperanza.",
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
      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#0d3b25] pt-30">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          La vida en Hogar Esperanza...
        </h1>

        <p className="text-center text-white/80">
          Aun no hay publicaciones disponibles.
        </p>
      </section>
    );
  }

  return (
    <section className=" mx-auto  px-4 sm:px-6 lg:px-8 py-8 bg-[#0d3b25] pt-30">

      <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
        La vida en Hogar Esperanza...
      </h1>

      <p className="max-w-3xl mx-auto text-center text-white/80 mb-10">
        Descubre articulos, consejos y novedades sobre cuidado, bienestar y
        acompanamiento para adultos mayores y sus familias.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
        {posts.map((post) => (
          <article
            key={post.id}
            className="relative rounded-3xl overflow-hidden group md:col-span-6 lg:col-span-4"
            style={{
              gridColumn: `span ${Math.min(Math.max(post.size, 1), 12)} / span ${Math.min(Math.max(post.size, 1), 12)}`,
            }}
          >
            <Link href={`/blog/${post.id}`} className="absolute inset-0 z-10">
              <span className="sr-only">Leer {post.title}</span>
            </Link>
            <Image
              src={post.image || "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1772863000/620429637_17932356405170762_5379083252956222494_n-removebg-preview_vl44qj.png"}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"/>

            <div className="absolute bottom-0 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">
                {new Date(post.createdAt).toLocaleDateString("es-CO")}
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </h2>

              <p className="text-white/90 text-sm">
                {post.subtitle}
              </p>
            </div>
          </article>
        ))}

      </div>

      <div className="flex justify-center mt-12">
        <button className="px-10 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-emerald-800 transition-all">
          Ver más +
        </button>
      </div>

    </section>
  );
}
