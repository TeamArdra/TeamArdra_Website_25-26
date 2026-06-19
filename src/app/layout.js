import "./globals.css";
import {
  orbitron,
  inter,
  spaceGrotesk,
  sora,
  jetbrainsMono,
  anton,
  audiowide,
  nicoMoji,
  ocrA,
} from "./fonts.js";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Team Ardra · SEDS VIT Vellore",
  description:
    "Team Ardra — the UAV team of SEDS VIT Vellore. Designing, building and flying autonomous drones. Throttling towards excellence.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} ${spaceGrotesk.variable} ${sora.variable} ${jetbrainsMono.variable} ${anton.variable} ${audiowide.variable} ${nicoMoji.variable} ${ocrA.variable}`}
    >
      <body className="bg-black text-[var(--text-primary)] antialiased overflow-x-hidden font-inter">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
