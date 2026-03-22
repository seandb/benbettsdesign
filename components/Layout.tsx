import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/logos", label: "Logos" },
  { href: "/packaging", label: "Packaging" },
  { href: "/print", label: "Print" },
  { href: "/digital", label: "Digital" },
  { href: "/photo", label: "Photo" },
];

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function Layout({ title = "Ben Betts Design", children }: LayoutProps) {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      <header className="site-header">
        <Link href="/" className="site-logo">
          <img
            src="https://www.benbettsdesign.com/uploads/1/3/2/1/132156171/published/ben-betts-design-mrs-eves-4x.png"
            alt="Ben Betts Design"
          />
        </Link>
        <button className="nav-toggle" onClick={() => setNavOpen(!navOpen)}>
          Menu
        </button>
        <ul className={`site-nav${navOpen ? " open" : ""}`}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={router.asPath === href ? "active" : ""}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <ul className="footer-nav">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
}
