import "./globals.css";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClientLayout from "../components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL("https://evergreen-nursery.ae"),
  title: {
    default: "Evergreen Plant Nursery | Premium Plants in UAE",
    template: "%s | Evergreen Nursery",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  description:
    "Discover a world of beautiful plants, expert care tips, and everything you need to create your perfect green space. Premium plant nursery in UAE with fast delivery across Dubai and the Emirates.",
  keywords:
    "plants, nursery, UAE, Dubai, indoor plants, outdoor plants, succulents, flowering plants, plant care, gardening, houseplants, office plants, plant delivery, plant shop",
  authors: [{ name: "Evergreen Nursery" }],
  creator: "Evergreen Nursery",
  publisher: "Evergreen Nursery",
  alternates: {
    canonical: "https://evergreen-nursery.ae",
  },
  openGraph: {
    title: "Evergreen Plant Nursery | Premium Plants in UAE",
    description:
      "Discover a world of beautiful plants, expert care tips, and everything you need to create your perfect green space. Premium plant nursery in UAE.",
    url: "https://evergreen-nursery.ae",
    siteName: "Evergreen Nursery",
    images: [
      {
        url: "/HeroBackground.png",
        width: 1200,
        height: 630,
        alt: "Evergreen Plant Nursery - Premium Plants in UAE",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evergreen Plant Nursery | Premium Plants in UAE",
    description:
      "Discover a world of beautiful plants, expert care tips, and everything you need to create your perfect green space.",
    images: ["/HeroBackground.png"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#22c55e" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Evergreen Plant Nursery",
              description:
                "Premium plant nursery in UAE offering indoor and outdoor plants",
              url: "https://evergreen-nursery.ae",
              logo: "https://evergreen-nursery.ae/logo.png",
              address: {
                "@type": "PostalAddress",
                addressCountry: "AE",
                addressRegion: "Dubai",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+971-XX-XXX-XXXX",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} ${playfair.variable} ${poppins.variable} antialiased font-sans`}
      >
        <ClientLayout>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
