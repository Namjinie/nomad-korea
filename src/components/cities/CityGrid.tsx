import CityCard from "@/components/cities/CityCard";
import { City } from "@/lib/mock-data";

interface CityGridProps {
  cities: City[];
  userReactions: Record<string, "like" | "dislike">;
}

export default function CityGrid({ cities, userReactions }: CityGridProps) {
  if (cities.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        조건에 맞는 도시가 없습니다
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((city) => (
        <CityCard
          key={city.slug}
          city={city}
          initialReaction={userReactions[city.slug] ?? null}
        />
      ))}
    </div>
  );
}
