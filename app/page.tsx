import { HeroSection } from '@/components/home/HeroSection';
import { OurStorySection } from '@/components/home/OurStorySection';
import { ComfortMeetsStyleSection } from '@/components/home/ComfortMeetsStyleSection';
import { CategorySection } from '@/components/home/CategorySection';
import { CommunityBanner } from '@/components/home/CommunityBanner';
import { BestSellersSection } from '@/components/home/BestSellersSection';
import { VoicesSection } from '@/components/home/VoicesSection';
import { JournalSection } from '@/components/home/JournalSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-[#0a0a0a]">
      {/* 1. Full Screen Cinematic Hero matching reference */}
      <HeroSection />

      {/* 2. Brand Story / "OUR STORY" with layered collage matching reference */}
      <OurStorySection />

      {/* 3. Feature Section: "COMFORT MEETS STYLE" with technical specs */}
      <ComfortMeetsStyleSection />

      {/* 4. Shop by Category / "Find Your Essentials" (Hoodies, Tees, Bottoms, Accessories) */}
      <CategorySection />

      {/* 5. Wide Community Banner: "Not Just a Brand, It's a Community." */}
      <CommunityBanner />

      {/* 6. Featured Collection / "Best Sellers" (Classic Hoodie, Oversized Tee, Cargo Pants, Baseball Cap) */}
      <BestSellersSection />

      {/* 7. Community Voices / Testimonials Carousel */}
      <VoicesSection />

      {/* 8. From Our Journal / "Style. Culture. Ideas." */}
      <JournalSection />

      {/* 9. Newsletter / "Join the Movement" */}
      <NewsletterSection />
    </div>
  );
}
