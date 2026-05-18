"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { City } from "@/lib/mock-data";
import { toggleReaction } from "@/app/actions/reactions";

export function calcCounts(
  cityLikes: number,
  cityDislikes: number,
  reaction: "like" | "dislike" | null,
  initialReaction: "like" | "dislike" | null
): { likeCount: number; dislikeCount: number } {
  return {
    likeCount:
      cityLikes +
      (reaction === "like" ? 1 : 0) -
      (initialReaction === "like" ? 1 : 0),
    dislikeCount:
      cityDislikes +
      (reaction === "dislike" ? 1 : 0) -
      (initialReaction === "dislike" ? 1 : 0),
  };
}

export function calcGradientIndex(slug: string, mapLength: number): number {
  return slug.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0) % mapLength;
}

export function calcNextReaction(
  current: "like" | "dislike" | null,
  type: "like" | "dislike"
): "like" | "dislike" | null {
  return current === type ? null : type;
}

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

const BUDGET_LABEL: Record<string, string> = {
  under100: "100만원 이하",
  "100to200": "100~200만원",
  over200: "200만원 이상",
};

const SEASON_EMOJI: Record<string, string> = {
  봄: "🌸",
  여름: "☀️",
  가을: "🍂",
  겨울: "❄️",
};

interface CityCardProps {
  city: City;
  initialReaction?: "like" | "dislike" | null;
}

export default function CityCard({
  city,
  initialReaction = null,
}: CityCardProps) {
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(
    initialReaction,
  );
  const [isPending, startTransition] = useTransition();

  // DB의 likes/dislikes는 initialReaction 포함 → 낙관적 UI 보정
  const { likeCount, dislikeCount } = calcCounts(
    city.likes,
    city.dislikes,
    reaction,
    initialReaction,
  );

  const handleReaction = (type: "like" | "dislike") => {
    const next = calcNextReaction(reaction, type);
    setReaction(next);
    startTransition(async () => {
      const result = await toggleReaction(city.slug, type);
      if (result.error === "login_required") {
        setReaction(reaction); // 롤백
      }
    });
  };

  const gradientIndex = calcGradientIndex(city.slug, GRADIENT_MAP.length);
  const gradient = GRADIENT_MAP[gradientIndex];

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className={`relative h-40 bg-gradient-to-br ${gradient}`}>
        <div className="absolute bottom-3 left-3 text-white">
          <div className="text-lg font-bold">{city.name}</div>
          <div className="text-xs text-white/80">{city.region}</div>
        </div>
      </div>

      <CardContent className="p-4">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">예산</dt>
            <dd className="font-medium text-gray-800">
              {BUDGET_LABEL[city.budget]}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">지역</dt>
            <dd className="font-medium text-gray-800">{city.regionFilter}</dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="shrink-0 text-gray-500">환경</dt>
            <dd className="flex flex-wrap justify-end gap-1">
              {city.environment.map((env) => (
                <Badge key={env} variant="secondary" className="text-xs">
                  {env}
                </Badge>
              ))}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">최고 계절</dt>
            <dd className="font-medium text-gray-800">
              {SEASON_EMOJI[city.bestSeason]} {city.bestSeason}
            </dd>
          </div>
        </dl>

        <div className="mt-3 flex gap-4 border-t pt-3">
          <button
            onClick={() => handleReaction("like")}
            disabled={isPending}
            className="flex items-center gap-1 text-sm disabled:opacity-60"
            aria-label="좋아요"
          >
            <ThumbsUp
              className={`h-4 w-4 ${reaction === "like" ? "text-indigo-600" : "text-gray-400"}`}
            />
            <span>{likeCount}</span>
          </button>
          <button
            onClick={() => handleReaction("dislike")}
            disabled={isPending}
            className="flex items-center gap-1 text-sm disabled:opacity-60"
            aria-label="싫어요"
          >
            <ThumbsDown
              className={`h-4 w-4 ${reaction === "dislike" ? "text-red-500" : "text-gray-400"}`}
            />
            <span>{dislikeCount}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
