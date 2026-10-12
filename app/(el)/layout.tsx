import type { Metadata, Viewport } from "next";
import "../globals.css";
import SiteShell from "@/components/site-shell";
import { alternates, getContent } from "@/lib/i18n";

const { doctor, siteUrl, ui } = getContent("el");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: ui.meta.titleDefault,
    template: `%s · ${doctor.name}`,
  },
  description: ui.meta.description,
  keywords: [...ui.meta.keywords],
  openGraph: {
    type: "website",
    locale: ui.ogLocale,
    siteName: doctor.fullName,
    title: `${doctor.fullName} · ${doctor.specialty}`,
    description: ui.meta.description,
    images: [{ url: "/brand/og.png", width: 1200, height: 630 }],
  },
  alternates: alternates("home", "el"),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="el">{children}</SiteShell>;
}
