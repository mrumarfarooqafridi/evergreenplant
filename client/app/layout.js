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
  title: "Evergreen Plant Nursery | Premium Plants in UAE",
  description:
    "Discover a world of beautiful plants, expert care tips, and everything you need to create your perfect green space. Premium plant nursery in UAE with fast delivery.",
  keywords:
    "plants, nursery, UAE, indoor plants, outdoor plants, succulents, flowering plants, plant care, gardening",
  authors: [{ name: "Evergreen Nursery" }],
  creator: "Evergreen Nursery",
  publisher: "Evergreen Nursery",
  openGraph: {
    title: "Evergreen Plant Nursery | Premium Plants in UAE",
    description:
      "Discover a world of beautiful plants, expert care tips, and everything you need to create your perfect green space.",
    url: "https://evergreen-nursery.ae",
    siteName: "Evergreen Nursery",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Evergreen Plant Nursery",
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
    images: ["/og-image.jpg"],
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
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
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
