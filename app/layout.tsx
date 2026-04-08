import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/toaster";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MKX Industries Pvt Ltd",
  "url": "https://mkxindustries.vercel.app",
  "logo": "https://mkxindustries.vercel.app/icon.svg",
  "description": "Enterprise-grade HRMS, CRMS, and POS systems built for scale and business growth.",
  "sameAs": [
    "https://twitter.com/mkxindustries", // Update with actual social links
    "https://linkedin.com/company/mkxindustries"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXXXXXXXXX", // Update with actual phone
    "contactType": "customer service",
    "email": "mkxindustries@gmail.com"
  }
};

export const metadata: Metadata = {
  title: {
    default: "MKX Industries | Enterprise HRMS, CRMS & POS Solutions",
    template: "%s | MKX Industries",
  },
  description:
    "MKX Industries Pvt Ltd provides enterprise-grade business solutions including HRMS, CRMS, and POS systems built for scale and efficiency.",
  keywords: [
    "HRMS",
    "CRMS",
    "POS System",
    "Business Solutions",
    "MKX Industries",
    "Enterprise Software",
    "SaaS",
    "Inventory Management",
    "Employee Management",
  ],
  authors: [{ name: "MKX Industries Pvt Ltd" }],
  creator: "MKX Industries",
  publisher: "MKX Industries Pvt Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mkxindustries.vercel.app"),
   alternates: {
     canonical: "/",
   },
   openGraph: {
     title: "MKX Industries | Enterprise Business Solutions",
     description: "Enterprise-grade HRMS, CRMS, and POS systems built for scale.",
     url: "https://mkxindustries.vercel.app",
     siteName: "MKX Industries",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "MKX Industries Enterprise Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MKX Industries | Enterprise Business Solutions",
    description: "Enterprise-grade HRMS, CRMS, and POS systems built for scale.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
