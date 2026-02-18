import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "범우주적 아이덴티티 | Pan-Universal Identity",
  description: "인간, AI 에이전트, 메타버스 아바타, 그 너머를 위한 보편적 이름을 설계합니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+KR:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
