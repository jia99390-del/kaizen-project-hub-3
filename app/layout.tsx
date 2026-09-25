import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
const display = Newsreader({ subsets: ["latin"], variable: "--font-display" });
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
export const metadata: Metadata = {
  title: { default: "Kaizen Project Hub", template: "%s | Kaizen Project Hub" },
  description: "Build-it-yourself guides with budget, standard and premium versions, full material lists and cost estimates.",
  verification: {
    google: "<meta name="google-site-verification" content="xRk5oZdhz6Ieqvi42vaIOmnXUN8XnlVD4AVSozpv1Mc" />",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${sans.variable} font-sans antialiased`}>
        <Header />
        <main className="mx-auto max-w-6xl px-4 pb-20">{children}</main>
        <footer className="border-t border-line py-8 text-center text-sm text-mute">© Kaizen Project Hub. Costs are estimates.</footer>
      </body>
    </html>
  );
}
