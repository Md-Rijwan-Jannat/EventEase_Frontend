import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { siteConfig } from "../config/site";
import { fontSans } from "../config/fonts";
import Navbar from "../components/ui/navbar/navbar";
import Container from "../components/ui/container";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords:
    "EventEase, Event Management, Event Registration, Real-time Notifications, Conference, Attendee Registration, Online Events, Event Dashboard, Event Platform",
  authors: [{ name: "EventEase Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.jpg", // Add path to an image for social sharing (e.g., Open Graph image)
        width: 1200,
        height: 630,
        alt: "EventEase Platform - Manage and Register for Events",
      },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <Navbar />
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
