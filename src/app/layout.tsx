import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fractalverse - Visualização Interativa de Fractais",
  description: "Explore o fascinante mundo dos fractais através de visualizações interativas. Descubra a beleza matemática e geométrica que se esconde em padrões infinitos.",
  keywords: ["fractais", "matemática", "geometria", "visualização", "interativo", "Mandelbrot", "Julia", "Sierpinski"],
  openGraph: {
    title: "Fractalverse - Visualização Interativa de Fractais",
    description: "Explore o fascinante mundo dos fractais através de visualizações interativas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
