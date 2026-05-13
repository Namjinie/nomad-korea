import CityCard from "@/components/cities/CityCard";
import { MOCK_CITIES } from "@/lib/mock-data";

export default function TopCitiesSection() {
  const top3 = MOCK_CITIES.slice(0, 3);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            🏆 이번달 인기 도시 Top 3
          </h2>
          <p className="mt-2 text-gray-500">노마드들이 가장 많이 선택한 도시</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {top3.map((city) => (
            <CityCard key={city.slug} city={city} showRank />
          ))}
        </div>
      </div>
    </section>
  );
}
