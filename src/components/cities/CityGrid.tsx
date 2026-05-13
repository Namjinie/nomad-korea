import CityCard from "@/components/cities/CityCard";
import FilterBar from "@/components/cities/FilterBar";
import { MOCK_CITIES } from "@/lib/mock-data";
import Link from "next/link";

export default function CityGrid() {
  return (
    <div>
      <FilterBar />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_CITIES.map((city) => (
          <Link key={city.slug} href={`/cities/${city.slug}`}>
            <CityCard city={city} />
          </Link>
        ))}
      </div>
    </div>
  );
}
