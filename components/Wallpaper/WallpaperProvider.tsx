"use client";

import { useState, ReactNode } from "react";
import { WallpaperCarousel } from "./WallpaperCarousel";
import { StaticImageData } from "next/image";

interface WallpaperProviderProps {
  children: ReactNode;
  defaultWallpaper: StaticImageData;
}

export function WallpaperProvider({
  children,
  defaultWallpaper,
}: WallpaperProviderProps) {
  const [wallpaper, setWallpaper] = useState(defaultWallpaper);

  const handleWallpaperChange = (src: StaticImageData) => {
    setWallpaper(src);
  };

  return (
    <div
      className="bg-wallpaper bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${wallpaper.src})` }}
    >
      <div className="min-h-screen">
        {children}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <WallpaperCarousel onWallpaperChangeAction={handleWallpaperChange} />
        </div>
      </div>
    </div>
  );
}
