import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ZenithPhysics | AI-Powered JEE Problem-Solving Platform',
  description:
    'Don’t just solve questions. Master the concepts behind them. Production EdTech platform for JEE Main & JEE Advanced with diagnostic AI mentoring.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-background text-slate-100 antialiased selection:bg-blue-600/30 selection:text-electric">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
