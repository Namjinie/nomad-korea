import { Badge } from "@/components/ui/badge";
import CityDetailTabs from "@/components/city-detail/CityDetailTabs";
import { MOCK_CITIES } from "@/lib/mock-data";
import { Train, Wifi, Star } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const city = MOCK_CITIES.find((c) => c.slug === slug) ?? MOCK_CITIES[0];

  const weatherEmoji =
    city.weather.icon === "sunny" ? "☀️" : city.weather.icon === "rainy" ? "🌧️" : "☁️";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 text-indigo-200 text-sm">{city.region}</div>
              <h1 className="text-4xl font-extrabold sm:text-5xl">{city.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 text-yellow-300">
                  <Star className="h-5 w-5 fill-yellow-300" />
                  <span className="font-semibold">{city.rating}</span>
                  <span className="text-indigo-200 text-sm">({city.reviewCount}개 평가)</span>
                </div>
                <div className="flex items-center gap-1 text-indigo-200">
                  <span>{weatherEmoji}</span>
                  <span>{city.weather.temp}°C</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
                <div className="text-3xl font-extrabold">{city.score}</div>
                <div className="text-xs text-indigo-200">종합점수</div>
              </div>
              <div className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
                <div className="flex items-center gap-1 text-xl font-bold">
                  <Wifi className="h-4 w-4" />
                  {city.internetSpeed}
                </div>
                <div className="text-xs text-indigo-200">Mbps</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
              <Train className="mr-1 h-3 w-3" />
              {city.ktxTime}
            </Badge>
            {city.subsidy !== "없음" && (
              <Badge className="bg-yellow-400/90 text-yellow-900 hover:bg-yellow-400">
                💰 {city.subsidy}
              </Badge>
            )}
            {city.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <CityDetailTabs />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return MOCK_CITIES.map((city) => ({ slug: city.slug }));
}
