import type { Metadata } from 'next';
import './globals.css';
import { ShopProvider } from '@/lib/store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchOverlay } from '@/components/layout/SearchOverlay';

export const metadata: Metadata = {
  title: 'VELANT — Premium Streetwear | Better Fits Bigger Dreams',
  description:
    'VELANT is a modern streetwear and lifestyle essentials brand. Designed for comfort, built for your journey. Better Fits Bigger Dreams.',
  openGraph: {
    title: 'VELANT — Premium Streetwear | Better Fits Bigger Dreams',
    description:
      'VELANT is a modern streetwear and lifestyle essentials brand. Designed for comfort, built for your journey. Better Fits Bigger Dreams.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VELANT — Premium Streetwear | Better Fits Bigger Dreams',
    description:
      'VELANT is a modern streetwear and lifestyle essentials brand. Designed for comfort, built for your journey. Better Fits Bigger Dreams.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className="bg-[#0a0a0a] text-neutral-100 antialiased selection:bg-white selection:text-black">
        <ShopProvider>
          <Navbar />
          <main className="min-h-screen flex flex-col">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
        </ShopProvider>
      </body>
    </html>
  );
}
