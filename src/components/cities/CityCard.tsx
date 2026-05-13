import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Wifi, Star, Shield } from "lucide-react";
import { City } from "@/lib/mock-data";

const GRADIENT_MAP = [
  "from-blue-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-orange-400 to-amber-500",
  "from-purple-400 to-pink-500",
  "from-rose-400 to-red-500",
  "from-indigo-400 to-blue-500",
  "from-yellow-400 to-orange-500",
  "from-teal-400 to-green-500",
];

const SAFETY_COLOR: Record<string, string> = {
  매우좋음: "bg-green-100 text-green-700",
  좋음: "bg-blue-100 text-blue-700",
  보통: "bg-yellow-100 text-yellow-700",
  나쁨: "bg-red-100 text-red-700",
};

interface CityCardProps {
  city: City;
  showRank?: boolean;
}

export default function CityCard({ city, showRank = false }: CityCardProps) {
  const gradient = GRADIENT_MAP[(city.rank - 1) % GRADIENT_MAP.length];
  const weatherEmoji = city.weather.icon === "sunny" ? "☀️" : city.weather.icon === "rainy" ? "🌧️" : "☁️";

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className={`relative h-40 bg-gradient-to-br ${gradient}`}>
        {showRank && (
          <div className="absolute left-3 top-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-indigo-600 shadow">
              {city.rank}위
            </span>
          </div>
        )}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-sm font-medium text-gray-700">
          <span>{weatherEmoji}</span>
          <span>{city.weather.temp}°C</span>
        </div>
        <div className="absolute bottom-3 left-3 text-white">
          <div className="text-lg font-bold">{city.name}</div>
          <div className="text-xs text-white/80">{city.region}</div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">노마드 종합점수</span>
            <span className="font-bold text-indigo-600">{city.score}점</span>
          </div>
          <Progress value={city.score} className="h-2" />
        </div>

        <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">월 생활비</span>
            <div className="font-semibold text-gray-800">{city.monthlyCost}만원~</div>
          </div>
          <div>
            <span className="text-gray-500">인터넷</span>
            <div className="flex items-center gap-1 font-semibold text-gray-800">
              <Wifi className="h-3 w-3 text-indigo-500" />
              {city.internetSpeed} Mbps
            </div>
          </div>
        </div>

        <div className="mb-3 flex items-center gap-1">
          <Shield className="h-3 w-3 text-gray-400" />
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${SAFETY_COLOR[city.safety]}`}
          >
            안전 {city.safety}
          </span>
        </div>

        <div className="mb-3 flex flex-wrap gap-1">
          {city.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{city.rating}</span>
            <span className="text-gray-400">({city.reviewCount})</span>
          </div>
          <span className="text-xs text-gray-400">노마드 {city.nomadCount}명</span>
        </div>
      </CardContent>
    </Card>
  );
}
