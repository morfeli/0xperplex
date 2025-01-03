"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "motion/react";

import OxPerplexWallpaper2 from "../../public/assets/Oxperplex-bgwallpaper2.png";
import OxPerplexWallpaper3 from "../../public/assets/Oxperplex-bgwallpaper3.jpg";
import OxPerplexWallpaper4 from "../../public/assets/Oxperplex-bgwallpaper4.jpg";
import OxPerplexWallpaper5 from "../../public/assets/Oxperplex-bgwallpaper5.png";
import OxPerplexWallpaper6 from "../../public/assets/Oxperplex-bgwallpaper6.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/Carousel";

type Wallpaper = {
  src: StaticImageData;
  alt: string;
};

const wallpapers: Wallpaper[] = [
  { src: OxPerplexWallpaper2, alt: "Wallpaper 2" },
  { src: OxPerplexWallpaper3, alt: "Wallpaper 3" },
  { src: OxPerplexWallpaper4, alt: "Wallpaper 4" },
  { src: OxPerplexWallpaper5, alt: "Wallpaper 5" },
  { src: OxPerplexWallpaper6, alt: "Wallpaper 6" },
];

interface WallpaperCarouselProps {
  onWallpaperChangeAction: (src: StaticImageData) => void;
}

export function WallpaperCarousel({
  onWallpaperChangeAction,
}: WallpaperCarouselProps) {
  return (
    <motion.div
      className="w-full mx-auto px-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[500px]"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {wallpapers.map((wallpaper) => (
            <CarouselItem key={wallpaper.alt} className="basis-1/3">
              <div
                className="relative aspect-square overflow-hidden rounded-md cursor-pointer w-[100%] h-10 md:h-16 transition-all duration-500"
                onClick={() => onWallpaperChangeAction(wallpaper.src)}
              >
                <Image
                  src={wallpaper.src}
                  alt={wallpaper.alt}
                  fill
                  className="object-cover transition-transform duration-300"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div>
          <CarouselPrevious className=" -left-12" />
          <CarouselNext className="-right-12" />
        </div>
      </Carousel>
    </motion.div>
  );
}
