import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkConvexProvider } from "@/providers/clerk-convex-provider";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/providers/modal-provider";
import { EdgeStoreProvider } from "@/utils/edgestore";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Horizon Application",
  description: "Share thoughts, Believe in you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          font.className,
          "antialiased bg-[--light-bg] dark:bg-[--dark-bg2] text-black dark:text-white "
        )}
      >
        <ClerkConvexProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}

              <Toaster position="bottom-center" />
              <ModalProvider />
            </ThemeProvider>
          </EdgeStoreProvider>
        </ClerkConvexProvider>
      </body>
    </html>
  );
}
