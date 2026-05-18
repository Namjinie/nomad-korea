import HeroSection from "@/components/home/HeroSection";
import CityListSection from "@/components/cities/CityListSection";
import RecentReviewsSection from "@/components/home/RecentReviewsSection";
import SeasonalRecommendations from "@/components/home/SeasonalRecommendations";
import CtaBanner from "@/components/home/CtaBanner";
import { createClient } from "@/lib/supabase/server";
import { getCities, getUserReactions } from "@/lib/supabase/queries";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [cities, userReactions] = await Promise.all([
    getCities(),
    user ? getUserReactions(user.id) : Promise.resolve({}),
  ]);

  return (
    <>
      <HeroSection />
      <CityListSection initialCities={cities} userReactions={userReactions} />
      <RecentReviewsSection />
      <SeasonalRecommendations />
      <CtaBanner />
    </>
  );
}
