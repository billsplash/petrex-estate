import HeroSection from '@/components/home/HeroSection';
import FeaturedListings from '@/components/home/FeaturedListings';
import AboutSection from '@/components/home/AboutSection';
import AgentsSection from '@/components/home/AgentsSection';
import BlogSection from '@/components/home/BlogSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedListings />
      <AboutSection />
      <AgentsSection />
      <BlogSection />
    </>
  );
}
