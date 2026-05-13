import HeroSection from "@/components/home/HeroSection";
import TopCitiesSection from "@/components/home/TopCitiesSection";
import CityGrid from "@/components/cities/CityGrid";
import RecentReviewsSection from "@/components/home/RecentReviewsSection";
import SeasonalRecommendations from "@/components/home/SeasonalRecommendations";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TopCitiesSection />

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">전체 도시 탐색</h2>
            <p className="mt-2 text-gray-500">조건에 맞는 도시를 찾아보세요</p>
          </div>
          <CityGrid />
        </div>
      </section>

      <RecentReviewsSection />
      <SeasonalRecommendations />
      <CtaBanner />
    </>
  );
}
