"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SEASONAL_CITIES } from "@/lib/mock-data";

const SEASON_LABELS = [
  { key: "spring", label: "🌸 봄" },
  { key: "summer", label: "☀️ 여름" },
  { key: "autumn", label: "🍂 가을" },
  { key: "winter", label: "❄️ 겨울" },
];

export default function SeasonalRecommendations() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">시즌별 추천 도시</h2>
          <p className="mt-2 text-gray-500">계절에 따라 달라지는 최적의 노마드 도시</p>
        </div>

        <Tabs defaultValue="spring">
          <TabsList className="mb-6 grid w-full grid-cols-4">
            {SEASON_LABELS.map((s) => (
              <TabsTrigger key={s.key} value={s.key}>
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {SEASON_LABELS.map((s) => (
            <TabsContent key={s.key} value={s.key}>
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">도시</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">추천 이유</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">평균 기온</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">점수</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {SEASONAL_CITIES[s.key as keyof typeof SEASONAL_CITIES].map((city) => (
                      <tr key={city.name} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{city.name}</td>
                        <td className="px-4 py-3 text-gray-600">{city.reason}</td>
                        <td className="px-4 py-3 text-gray-600">{city.avgTemp}</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                            {city.score}점
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
