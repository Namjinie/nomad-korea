"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["전체", "해안", "산악", "대도시", "소도시", "농촌"];
const INTERNET_OPTIONS = ["상관없음", "100Mbps 이상", "300Mbps 이상", "500Mbps 이상"];
const SEASONS = ["전체 계절", "봄", "여름", "가을", "겨울"];

export default function FilterBar() {
  return (
    <div className="mb-6 space-y-4 rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <Select defaultValue="score">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="score">종합점수순</SelectItem>
            <SelectItem value="cost">저렴한순</SelectItem>
            <SelectItem value="popular">인기순</SelectItem>
            <SelectItem value="recent">최근 평가순</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat, i) => (
            <Button
              key={cat}
              variant={i === 0 ? "default" : "outline"}
              size="sm"
              className="text-xs"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t pt-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">인터넷 속도:</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {INTERNET_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">계절:</span>
          <Select defaultValue="전체 계절">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SEASONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
