import type { Metadata } from "next";
import { Fredoka, Baloo_2 as Baloo, Poppins, Lexend_Deca, Quicksand } from "next/font/google";
import "./globals.css";

// Bold display fonts
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baloo = Baloo({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Thin app UI fonts
const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ownabee - 아이의 상상이 책이 되는 순간",
  description: "Ownabee는 아이가 말하거나 글로 표현한 내용을 바탕으로 AI가 그림과 오디오북을 생성하는 창의력 기반 동화책 제작 플랫폼입니다.",
  keywords: ["아동 도서", "AI 동화책", "오디오북", "창의력 교육", "유치원 교육", "아이 교육", "스토리텔링", "인공지능 동화"],
  authors: [{ name: "Ownabee Team" }],
  creator: "Ownabee",
  publisher: "Ownabee",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://ownabee.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/assets/brand/ownabee-logo.png",
    apple: "/assets/brand/ownabee-logo.png",
  },
  openGraph: {
    title: "Ownabee - 아이의 상상이 책이 되는 순간",
    description: "아이가 말하거나 글로 표현한 내용을 바탕으로 AI가 그림과 오디오북을 생성하는 창의력 기반 동화책 제작 플랫폼",
    url: "https://ownabee.com",
    siteName: "Ownabee",
    images: [
      {
        url: "/assets/brand/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Ownabee - 아이의 상상이 책이 되는 순간",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ownabee - 아이의 상상이 책이 되는 순간",
    description: "아이가 말하거나 글로 표현한 내용을 바탕으로 AI가 그림과 오디오북을 생성하는 창의력 기반 동화책 제작 플랫폼",
    images: ["/assets/brand/og-image.svg"],
    creator: "@ownabee",
  },
};

import { TranslationProvider } from './i18n/TranslationContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${baloo.variable} ${poppins.variable} ${lexendDeca.variable} ${quicksand.variable} font-sans antialiased`}
      >
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
