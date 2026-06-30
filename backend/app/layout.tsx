import type { ReactNode } from 'react';

export const metadata = {
  title: 'RivoraMart Backend API',
  description: 'Next.js API backend connected to Supabase',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
