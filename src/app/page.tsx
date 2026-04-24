import type { Metadata } from "next";
import LandingPage from "./landing_page/LandingPage"
import {
  buildAbsoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/seo";
import { FfetchPlans } from "@/services/fetchPlans";

export const metadata: Metadata = {
  title: SITE_NAME,
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
};

export default async function App() {
  const plans = await FfetchPlans();
  return <LandingPage initialPlans={plans} />;
}
