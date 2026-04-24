"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog"

interface GalleryImage {
  src: string
  alt: string
  gridClass: string
}

const imagePool = [
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096347/8e2a9988-4985-4419-976a-40703132f295_zdogcn.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096346/IMG_9295_ekszgk.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096345/IMG_9290_tkm6ti.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096343/IMG_8963_pncodl.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096342/IMG_8964_x57esp.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096338/IMG_8962_uwmonm.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096337/IMG_8961_nnnnvx.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096337/IMG_8960_uryqzp.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096335/IMG_6872_pzzbof.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096335/IMG_6286_bqcxkt.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096334/IMG_6069_i7lgne.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096333/IMG_6063_1_bcxouh.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096329/IMG_6044_1_fjs8ev.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096328/IMG_5909_qmkc9l.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096328/IMG_5925_tpthlm.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096328/IMG_5921_ztgnkp.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096327/IMG_5912_hlf24v.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096325/IMG_5721_s3ygtk.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096322/IMG_5442_i7zxe2.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096322/IMG_3711_1_nhdthq.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096322/IMG_3705_xu9htj.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096319/IMG_3666_1_bl4nka.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096318/IMG_3278_q5dsqa.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096317/IMG_2879_ksm4he.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096314/IMG_2158_fynytq.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096310/IMG_2092_1_ywkphr.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096309/IMG_2091_fr9lhu.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096309/IMG_2002_torkkw.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096306/IMG_1992_eotypv.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096305/IMG_1991_nipxnn.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096304/IMG_1984_y31sbt.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096303/IMG_1982_ewujy9.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096302/IMG_1979_zdiooi.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096300/IMG_1962_lji7lg.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096299/IMG_1946_vmvo6a.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096298/IMG_1954_ihizfz.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096298/IMG_1960_my5vho.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096296/IMG_1939_b2r7sy.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096295/IMG_1923_a9l8lx.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096293/IMG_1917_gfyuyx.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096293/IMG_1914_dxopod.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096292/IMG_1905_y1782q.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096290/IMG_1886_rzalwq.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096289/IMG_1882_fcj1ey.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096288/IMG_1879_yoaxrq.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096287/IMG_1784_jqdomp.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096287/IMG_1780_fkknck.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096286/IMG_1779_vxs5wu.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096285/IMG_1762_edeigf.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096284/IMG_1776_x6tyqo.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096283/IMG_0132_zhs8tq.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096282/IMG_0143_lw2ye2.webp",
  "https://res.cloudinary.com/dbzbkk9l6/image/upload/v1773096281/b4bb9089-0e75-4d53-bafc-84dd2bf83df0_vsbci1.webp"
]

function createGallery(images: string[], startIndex = 0): GalleryImage[] {
  const layout = [
    { gridClass: "row-span-2" },
    { gridClass: "" },
    { gridClass: "" },
    { gridClass: "" },
    { gridClass: "row-span-2" },
    { gridClass: "" },
    { gridClass: "" },
    { gridClass: "" },
  ]

  return layout.map((item, i) => ({
    src: images[(startIndex + i) % images.length],
    alt: `Imagen de la galeria ${i + 1}`,
    gridClass: item.gridClass,
  }))
}

export default function Gallery() {
  const [galleryStartIndex, setGalleryStartIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const galleryImages = createGallery(imagePool, galleryStartIndex)

  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryStartIndex((current) => (current + 8) % imagePool.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 px-4 py-8 sm:px-6 md:py-12 lg:px-8 xl:px-12">
        <h1 className="mb-8 text-center text-2xl font-bold text-emerald-600 sm:text-3xl md:mb-12 md:text-4xl lg:text-5xl">
          Aqui tambien se vive, se rie y se disfruta.
        </h1>

        <div className="hidden max-w-6xl mx-auto auto-rows-[200px] grid-cols-4 gap-4 md:grid">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`${image.gridClass} relative group cursor-pointer overflow-hidden rounded-2xl`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                loading="lazy"
                fill
                src={image.src}
                alt={image.alt}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                index === 0 || index === 4
                  ? "row-span-2 aspect-[3/4]"
                  : "aspect-square"
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                loading="lazy"
                fill
                src={image.src}
                alt={image.alt}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </div>
          ))}
        </div>
      </main>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent
          showCloseButton={false}
          className="w-[96vw] max-w-6xl overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(5,36,26,0.96)_0%,rgba(3,15,11,0.98)_100%)] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
        >
          <DialogTitle className="sr-only">
            Imagen ampliada de la galeria
          </DialogTitle>

          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-black/55"
          >
            <X className="h-6 w-6" />
          </button>

          {selectedImage && (
            <div className="relative">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5 pr-20 text-white">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-brand-mint)]">
                    Galeria Hogar Esperanza
                  </p>
                  <p className="mt-2 text-sm text-white/70 sm:text-base">
                    {selectedImage.alt}
                  </p>
                </div>

                <span className="hidden rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.26em] text-white/[0.75] sm:inline-flex">
                  Vista ampliada
                </span>
              </div>

              <div className="relative flex max-h-[82vh] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(53,226,168,0.10)_0%,rgba(3,15,11,0)_48%)] px-3 py-3 sm:px-6 sm:py-6">
                <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(53,226,168,0.08)_0%,rgba(3,15,11,0)_100%)]" />

                <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    width={1600}
                    height={1200}
                    className="max-h-[72vh] w-full object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
