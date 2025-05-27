import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import darkFavIcon from "@/assets/favDark.ico";
import lightFavIcon from "@/assets/favLight.ico";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Portfolio | Ayan Kumar",
  description: "Ayan Kumar's Portfolio",
  icons: [
    {
      url: lightFavIcon.src,
      type: "image/x-icon",
      media: "(prefers-color-scheme: light)",
    },
    {
      url: darkFavIcon.src,
      type: "image/x-icon",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
