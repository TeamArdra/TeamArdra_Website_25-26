import "./globals.css";
import { anton, audiowide, nicoMoji, ocrA } from "./fonts.js";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${audiowide.variable} ${nicoMoji.variable} ${ocrA.variable}`}
    >
      <body className="bg-black text-white antialiased overflow-x-hidden">
        <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        </div>
      </body>
    </html>
  );
}
