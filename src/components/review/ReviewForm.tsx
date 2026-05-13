"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";

const SCORE_CATEGORIES = ["작업환경", "생활편의", "가격대비", "자연환경", "외국인친화도"];
const TAGS = ["#카페많음", "#인터넷빠름", "#조용함", "#자연경관", "#맛집", "#안전함", "#교통편리", "#저렴함", "#코워킹", "#커뮤니티"];
const DURATIONS = ["1주일 미만", "1~2주", "1개월", "2~3개월", "3~6개월", "6개월 이상"];

export default function ReviewForm() {
  return (
    <div className="rounded-xl border bg-gray-50 p-6" id="review">
      <h3 className="mb-6 text-lg font-bold text-gray-900">평가 작성하기</h3>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">체류 기간</label>
          <Select>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="체류 기간 선택" />
            </SelectTrigger>
            <SelectContent>
              {DURATIONS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-gray-700">항목별 점수</label>
          <div className="space-y-3">
            {SCORE_CATEGORIES.map((cat) => (
              <div key={cat} className="flex items-center justify-between rounded-lg bg-white p-3 border">
                <span className="text-sm text-gray-700">{cat}</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 cursor-pointer text-gray-200 hover:fill-yellow-400 hover:text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            태그 선택 <span className="text-gray-400">(최대 5개)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <Button key={tag} variant="outline" size="sm" className="text-xs">
                {tag}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            한 줄 요약 <span className="text-gray-400">(최대 50자)</span>
          </label>
          <Input
            className="bg-white"
            placeholder="이 도시를 한 문장으로 표현한다면?"
            maxLength={50}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            상세 후기 <span className="text-gray-400">(선택, 최대 500자)</span>
          </label>
          <textarea
            className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]"
            placeholder="워케이션 경험을 자세히 공유해주세요..."
            maxLength={500}
          />
        </div>

        <Button className="w-full" size="lg">
          평가 제출하기
        </Button>
      </div>
    </div>
  );
}
