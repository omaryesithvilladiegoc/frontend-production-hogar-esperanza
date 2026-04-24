import type { Metadata } from "next";
import "./globals.css";
import Footer from "./sections/Footer";
import { Providers } from "./Providers";
import ParentComponent from "./hooks/useComponentColorBg";
import { Toaster } from "sonner";
import {
  buildAbsoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/seo";





export const metadata: Metadata = {
  metadataBase: new URL(buildAbsoluteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: buildAbsoluteUrl("/"),
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: buildAbsoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Hogar Esperanza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: DEFAULT_OG_IMAGE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Providers>
        <body>
          {children}
          <Toaster
            position="top-center"
            richColors
            closeButton
            expand
            visibleToasts={3}
            toastOptions={{
              className: "mt-6",
              duration: 4000,
            }}
          />
          <ParentComponent color="#0d3b25">
            <Footer />
          </ParentComponent>
        </body>
      </Providers>
    </html>
  );
}
