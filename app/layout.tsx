// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AgriLink - Platform Pupuk Cerdas',
  description: 'Kalkulator pupuk, edukasi pertanian, dan koneksi distributor untuk petani Indonesia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}