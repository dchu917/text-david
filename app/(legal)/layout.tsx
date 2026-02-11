import Link from "next/link";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black/5 px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-black"
        >
          Text David.
        </Link>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="prose prose-neutral prose-sm max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-neutral-700 [&_ul]:text-[15px] [&_ul]:text-neutral-700 [&_li]:mb-1 [&_a]:text-[#007aff] [&_a]:no-underline hover:[&_a]:underline">
          {children}
        </div>
      </main>
      <footer className="border-t border-black/5 py-6">
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-[#8e8e93] px-6">
          <Link
            href="/privacy-policy"
            className="hover:text-black transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-black transition-colors"
          >
            Terms
          </Link>
          <Link href="/eula" className="hover:text-black transition-colors">
            EULA
          </Link>
          <a
            href="mailto:founders@manaflow.com"
            className="hover:text-black transition-colors"
          >
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
