import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '真实几种 — 真实感的 N 次建构',
  description: '一场关于"真实"的可滚动 Presentation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-black text-text font-cn antialiased">
        {children}
      </body>
    </html>
  );
}
