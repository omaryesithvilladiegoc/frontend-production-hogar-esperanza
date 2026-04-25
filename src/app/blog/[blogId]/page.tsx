
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  buildAbsoluteUrl,
  buildPostDescription,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
} from "@/lib/seo";
import { FfetchPostById } from "@/services/fetchPosts";

interface Props {
  params: Promise<{ blogId: string }>;
}

const FALLBACK_POST_IMAGE = DEFAULT_OG_IMAGE;

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("es-CO", {
    dateStyle: "long",
  }).format(new Date(date));

const splitIntoParagraphs = (...sections: string[]) =>
  sections
    .flatMap((section) => section.split(/\n{2,}|\r\n\r\n/))
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const getGalleryImages = (images: Array<string | null | undefined>) => {
  const seen = new Set<string>();

  return images.filter((image): image is string => {
    if (!image) return false;
    if (seen.has(image)) return false;

    seen.add(image);
    return true;
  });
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogId } = await params;
  const post = await FfetchPostById(blogId);

  if (!post) {
    return {
      title: "Post no encontrado",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = buildPostDescription(post.mainContent, post.subtitle);
  const imageUrl = post.image || post.extraImages[0] || DEFAULT_OG_IMAGE;
  const canonicalUrl = buildAbsoluteUrl(`/blog/${post.id}`);

  return {
    title: post.title,
    description,
    keywords: post.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "es_CO",
      type: "article",
      publishedTime: post.createdAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { blogId } = await params;
  const post = await FfetchPostById(blogId);
  

 

  if (!post) return notFound();

  const coverImage = post.image || post.extraImages[0] || FALLBACK_POST_IMAGE;
  const galleryImages = getGalleryImages([post.image, ...post.extraImages]);
  const contentParagraphs = splitIntoParagraphs(post.header, post.mainContent);
  const formattedDate = formatDate(post.createdAt);
  const estimatedReadTime = Math.max(
    1,
    Math.ceil(
      [post.header, post.mainContent, post.footer]
        .join(" ")
        .trim()
        .split(/\s+/)
        .filter(Boolean).length / 180,
    ),
  );

  return (
    <article className="bg-[#041b13] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f6f52_0%,rgba(4,27,19,0.88)_42%,#041b13_100%)]" />
        <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(53,226,168,0.24)_0%,rgba(4,27,19,0)_100%)]" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pb-14">
          <Link
           href="/blog"
            className="z-10000 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/[0.88] transition hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            <span aria-hidden="true">&larr;</span>
            Volver al blog
          </Link>

          <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-brand-mint)]">
                Historias que acompanamos con cuidado
              </p>

              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              {post.subtitle ? (
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/[0.76] sm:text-lg">
                  {post.subtitle}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/[0.74]">
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2">
                  Publicado el {formattedDate}
                </span>
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2">
                  Lectura de {estimatedReadTime} min
                </span>
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2">
                  {galleryImages.length} imagen{galleryImages.length === 1 ? "" : "es"}
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.06] shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
              <div className="relative aspect-[4/4.2] sm:aspect-[16/11] lg:aspect-[4/4.6]">
                <Image
                  src={coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,27,19,0.04)_0%,rgba(4,27,19,0.2)_48%,rgba(4,27,19,0.72)_100%)]" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/[0.8] backdrop-blur-sm">
                  Blog {SITE_NAME}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 lg:py-16">
        <div className="space-y-10">
          {post.header ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.16)] sm:p-8">
              <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-brand-mint)]">
                Introduccion
              </p>
              <p className="mt-4 text-xl leading-9 text-white/90 sm:text-2xl">
                {post.header}
              </p>
            </div>
          ) : null}

          <div className="rounded-[2rem] border border-white/8 bg-[#071f16] p-6 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/8 pb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-brand-mint)]">
                  Relato completo
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  Cada detalle del acompanamiento importa
                </h2>
              </div>
            </div>

            <div className="space-y-6 text-base leading-8 text-white/[0.82] sm:text-lg">
              {contentParagraphs.map((paragraph, index) => (
                <p key={`${post.id}-paragraph-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>

          {galleryImages.length > 1 ? (
            <section className="rounded-[2rem] border border-white/8 bg-white/[0.04] p-6 sm:p-8">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-brand-mint)]">
                    Galeria visual
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                    Momentos que acompanaron esta historia
                  </h2>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-12">
                {galleryImages.map((image, index) => {
                  const isFeatured = index === 0;
                  const isWide = index % 5 === 0;

                  return (
                    <figure
                      key={`${post.id}-gallery-${index}`}
                      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b2d21] ${
                        isFeatured
                          ? "md:col-span-12"
                          : isWide
                            ? "md:col-span-7"
                            : "md:col-span-5"
                      }`}
                    >
                      <div
                        className={`relative ${
                          isFeatured
                            ? "aspect-[16/9]"
                            : isWide
                              ? "aspect-[4/3]"
                              : "aspect-[3/4]"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${post.title} - imagen ${index + 1}`}
                          fill
                          sizes={
                            isFeatured
                              ? "(max-width: 768px) 100vw, 80vw"
                              : "(max-width: 768px) 100vw, 40vw"
                          }
                          className="object-cover transition duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,27,19,0.05)_0%,rgba(4,27,19,0.16)_56%,rgba(4,27,19,0.58)_100%)]" />
                      </div>

                      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 text-sm text-white/[0.8]">
                        <span>Registro visual {String(index + 1).padStart(2, "0")}</span>
                        <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.24em]">
                          {index === 0 ? "Portada" : "Galeria"}
                        </span>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </section>
          ) : null}

          {post.footer ? (
            <section
              className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(53,226,168,0.14)_0%,rgba(4,27,19,0.76)_100%)] p-6 sm:p-8"
              style={{ border: "1px solid rgba(53, 226, 168, 0.2)" }}
            >
              <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-brand-mint)]">
                Cierre
              </p>
              <p className="mt-4 text-lg leading-8 text-white/90 sm:text-xl">
                {post.footer}
              </p>
            </section>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <div className="border-b border-white/10 px-6 py-5">
              <p className="text-sm uppercase tracking-[0.32em] text-[var(--color-brand-mint)]">
                Resumen del articulo
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Claves de esta publicacion
              </h2>
            </div>

            <div className="space-y-6 px-6 py-6">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/[0.12] p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-white/[0.56]">
                  Fecha
                </p>
                <p className="mt-2 text-base text-white/[0.88]">{formattedDate}</p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/[0.12] p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-white/[0.56]">
                  Tono del contenido
                </p>
                <p className="mt-2 text-base leading-7 text-white/[0.78]">
                  Una mirada cercana al bienestar, la compania y el cuidado que
                  sostienen la vida diaria de nuestros residentes.
                </p>
              </div>

              {post.keywords.length ? (
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/[0.56]">
                    Temas relacionados
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-2 text-sm text-white/[0.8]"
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div
                className="rounded-[1.5rem] bg-[rgba(53,226,168,0.08)] p-4"
                style={{ border: "1px solid rgba(53, 226, 168, 0.25)" }}
              >
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-brand-mint)]">
                  Hogar Esperanza
                </p>
                <p className="mt-2 text-base leading-7 text-white/[0.82]">
                  Seguimos compartiendo historias reales, aprendizajes y
                  momentos que reflejan una vejez acompanada con dignidad y
                  afecto.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: buildPostDescription(post.mainContent, post.subtitle),
            image: galleryImages.length ? galleryImages : [coverImage],
            datePublished: post.createdAt,
            mainEntityOfPage: buildAbsoluteUrl(`/blog/${post.id}`),
            keywords: post.keywords,
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              logo: {
                "@type": "ImageObject",
                url: DEFAULT_OG_IMAGE,
              },
            },
          }),
        }}
      />
    </article>
  );
}
