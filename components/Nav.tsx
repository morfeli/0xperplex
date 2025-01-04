import Image from "next/image";

import OxPerplexLogo from "../public/assets/0xperplex-logo.png";

export function Nav() {
  return (
    <nav className="flex justify-between items-center py-2 px-4 bg-transparent font-mono xl:px-10">
      <Image
        src={OxPerplexLogo}
        alt="Oxperplex logo"
        width={35}
        height={35}
        className="rounded-xl"
      />
      <p className="text-2xl text-white">0xperplex</p>
    </nav>
  );
}
