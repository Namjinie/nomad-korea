"use client";

import { useState } from "react";
import { City } from "@/lib/mock-data";
import FilterBar, { FilterState } from "@/components/cities/FilterBar";
import CityGrid from "@/components/cities/CityGrid";

const INITIAL_FILTERS: FilterState = {
  budget: "all",
  regionFilter: "all",
  environment: "all",
  bestSeason: "all",
};

export function filterCities(cities: City[], filters: FilterState): City[] {
  return cities
    .filter(
      (city) => filters.budget === "all" || city.budget === filters.budget,
    )
    .filter(
      (city) =>
        filters.regionFilter === "all" ||
        city.regionFilter === filters.regionFilter,
    )
    .filter(
      (city) =>
        filters.environment === "all" ||
        city.environment.includes(filters.environment as never),
    )
    .filter(
      (city) =>
        filters.bestSeason === "all" || city.bestSeason === filters.bestSeason,
    )
    .sort((a, b) => b.likes - a.likes);
}

interface CityListSectionProps {
  initialCities: City[];
  userReactions: Record<string, "like" | "dislike">;
}

export default function CityListSection({
  initialCities,
  userReactions,
}: CityListSectionProps) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const cities = filterCities(initialCities, filters);

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            도시 리스트
          </h2>
        </div>
        <FilterBar filters={filters} onFiltersChange={setFilters} />
        <CityGrid cities={cities} userReactions={userReactions} />
      </div>
    </section>
  );
}
