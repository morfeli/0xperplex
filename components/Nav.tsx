"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import OxPerplexLogo from "../public/assets/0xperplex-logo.png";

export function Nav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

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
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`transition-colors duration-200 ease-in-out ${
                    pathname === item.path
                      ? "text-purple-300"
                      : "hover:text-purple-200"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
