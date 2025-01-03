import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";

import OxPerplexWallpaper2 from "../../public/assets/Oxperplex-bgwallpaper2.png";
import { WallpaperProvider } from "../../components/Wallpaper/WallpaperProvider";

export const metadata: Metadata = {
  title: "0xperplex",
  description:
    "An AI-powered answer engine with RAG implementation, built with love.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <WallpaperProvider defaultWallpaper={OxPerplexWallpaper2}>
          {children}
        </WallpaperProvider>
      </body>
    </html>
  );
}
