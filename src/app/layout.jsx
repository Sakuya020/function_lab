import { Chivo_Mono } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/Footer";

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
});

const twkLausanne = localFont({
  src: "../fonts/TWKLausanne-550.woff",
  variable: "--font-twk-lausanne",
});

export const metadata = {
  title: "Function Lab",
  description:
    "Function Lab is a design practice that creates systems and experiences across brand, print and digital.",
  openGraph: {
    title: "Function Lab",
    description:
      "Function Lab is a design practice that creates systems and experiences across brand, print and digital.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1920,
        height: 1080,
        alt: "Function Lab",
      },
    ],
  },
};

// revalidate every 24 hours
export const revalidate = 24 * 60 * 60;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${chivoMono.variable} ${twkLausanne.variable} antialiased font-twk w-full overflow-x-hidden`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
