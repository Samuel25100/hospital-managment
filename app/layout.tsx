import type { Metadata, Viewport } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Space_Grotesk, Inter, IBM_Plex_Mono, Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Wardline — Hospital & Clinic Management",
  description:
    "Run every ward, every shift, every claim from one dashboard. Subscription plans for clinics and hospitals.",
};

// This is the fix: without it, mobile browsers render the page at a
// desktop-sized virtual viewport (~980px) and scale it down, which is
// what causes text to wrap word-by-word and layouts to look squeezed.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html
        lang="en"
        className={cn(display.variable, body.variable, mono.variable, "font-sans", geist.variable)}
      >
        <ClerkProvider>
        <body className="bg-[#FAFAF8] text-[#14171A] suppressHydrationWarning antialiased">
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </body>
        </ClerkProvider>
      </html>
  );
}