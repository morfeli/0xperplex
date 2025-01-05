import Image from "next/image";
import Link from "next/link";

import OxPerplexLogo from "../public/assets/0xperplex-logo.png";

export function Nav() {
  return (
    <header className="">
      <div className="mx-auto py-2 flex justify-between items-center bg-black w-full px-2 xl:px-10">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src={OxPerplexLogo}
            alt="Oxperplex logo"
            width={35}
            height={35}
            className="rounded-xl"
          />
          <p className="text-white text-sm font-mono">0xperplex</p>
        </Link>
        <nav className="flex items-center">
          <ul className="flex space-x-4 text-white font-mono text-sm">
            {["Home", "About", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-purple-300 transition-colors duration-200 ease-in-out"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
