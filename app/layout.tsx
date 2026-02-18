import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent ID — Name Your Agent",
  description: "Issue your agent's on-chain identity. Powered by ERC-8004 & .agent domains.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
