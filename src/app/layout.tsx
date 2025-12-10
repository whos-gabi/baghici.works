import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Builder's Hub | Architecting Digital Ecosystems",
  description:
    "Full-stack engineer shipping SaaS, decentralized apps, mobile, and AI products.",
  openGraph: {
    title: "Builder's Hub | Architecting Digital Ecosystems",
    description:
      "Full-stack engineer shipping SaaS, decentralized apps, mobile, and AI products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WN07WSC84E"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WN07WSC84E');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
