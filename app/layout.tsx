import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from "./context/AuthContext";

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
      <Analytics />
    </html>
  );
}
