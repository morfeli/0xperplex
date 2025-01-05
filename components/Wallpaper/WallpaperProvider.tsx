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
      className="bg-wallpaper bg-cover bg-center bg-no-repeat min-h-screen flex flex-col"
      style={{ backgroundImage: `url(${wallpaper.src})` }}
    >
      <div className="flex-grow">{children}</div>
      <div className="w-fit mx-auto">
        <WallpaperCarousel onWallpaperChangeAction={handleWallpaperChange} />
      </div>
    </div>
  );
}
