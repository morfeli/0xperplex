import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import OxPerplexLogo from "../public/assets/0xperplex-logo.png";

export function Nav() {
  return (
    <nav className="flex justify-between items-center py-2 px-8 bg-background">
      <Link href="/" className="text-2xl font-bold">
        <Image
          src={OxPerplexLogo}
          alt="Oxperplex logo"
          width={50}
          height={50}
          className="rounded-xl"
        />
      </Link>
      <ModeToggle />
    </nav>
  );
}
