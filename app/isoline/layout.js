import Image from "next/image";
import Link from "next/link";

// Shared shell for the Isoline App Store pages (privacy, support). Server-rendered, no client JS needed.
export default function IsolineLayout({ children }) {
  return (
    <>
      <header className="section-container pt-10">
        <Link href="/" aria-label="HarmoniQ Solutions home">
          <Image src="/images/logo-horizontal.png" alt="HarmoniQ Solutions" width={360} height={60} className="nav-logo" priority />
        </Link>
      </header>
      <main className="section-container section-padding">
        <article className="max-w-[65ch]">{children}</article>
      </main>
    </>
  );
}
