import "./globals.css";
import {
  orbitron,
  inter,
  spaceGrotesk,
  sora,
  jetbrainsMono,
} from "./fonts.js";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import PauseOffscreen from "@/components/PauseOffscreen";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from "./site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  // the preview image comes from app/opengraph-image.jpg / twitter-image.jpg
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Team Ardra",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

// Scroll-reveal content starts hidden only once we know JS is running (html.js).
// If the app scripts haven't initialised within 4 s (flaky network), drop the
// class so nothing below the hero stays invisible.
const REVEAL_GUARD = `document.documentElement.classList.add("js");setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.remove("js")},4000);`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} ${spaceGrotesk.variable} ${sora.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_GUARD }} />
      </head>
      <body className="bg-black text-[var(--text-primary)] antialiased overflow-x-hidden font-inter">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1100] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <PauseOffscreen />
      </body>
    </html>
  );
}
