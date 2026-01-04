import "./globals.css";
import { anton, audiowide, nicoMoji, ocrA } from "./fonts.js";
import Navbar from "@/components/navbar";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${audiowide.variable} ${nicoMoji.variable} ${ocrA.variable}`}
    >
      <body className="bg-black text-white antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
