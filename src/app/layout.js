import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../../components/header";
import Footer from "../../components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Al-Qalam Pre-Primary,Primary and Middle Level School P.L.C.",
  description: "Alqalam School",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
