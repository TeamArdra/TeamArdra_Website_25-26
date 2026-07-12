import localFont from "next/font/local";
import {
  Orbitron,
  Inter,
  Space_Grotesk,
  Sora,
  JetBrains_Mono,
} from "next/font/google";

/* ===== Google Fonts (new design system) ===== */
export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

export const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

/* ===== Local fonts (retained for the drone HUD modal) ===== */
export const anton = localFont({
  src: "../../public/fonts/Anton-Regular.woff",
  variable: "--font-anton",
  display: "swap",
});

export const audiowide = localFont({
  src: "../../public/fonts/Audiowide-Regular.woff",
  variable: "--font-audiowide",
  display: "swap",
});

export const nicoMoji = localFont({
  src: "../../public/fonts/NicoMoji-Regular.woff",
  variable: "--font-nico-moji",
  display: "swap",
});

export const ocrA = localFont({
  src: "../../public/fonts/ocraextended.woff",
  variable: "--font-ocr-a",
  display: "swap",
});
