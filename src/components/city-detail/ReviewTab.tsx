import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import ReviewForm from "@/components/review/ReviewForm";

const MOCK_DETAIL_REVIEWS = [
  {
    id: 1,
    userName: "김노마드",
    duration: "3개월",
    rating: 5,
    tags: ["#카페많음", "#인터넷빠름"],
    text: "제주도는 정말 노마드의 천국입니다. 어디를 가든 카페가 있고, 인터넷 속도도 훌륭합니다. 제주 시내 중심가에는 코워킹스페이스도 많아서 업무 환경이 완벽했습니다.",
    avatar: "김",
  },
  {
    id: 2,
    userName: "박리모트",
    duration: "1개월",
    rating: 4,
    tags: ["#자연경관", "#조용함"],
    text: "자연 속에서 일하고 싶다면 제주를 강력 추천합니다. 다만 차 없이는 불편한 점이 있으니 렌트카는 필수입니다.",
    avatar: "박",
  },
  {
    id: 3,
    userName: "이워케이션",
    duration: "2주",
    rating: 4,
    tags: ["#맛집", "#바다뷰"],
    text: "짧은 기간이었지만 정말 만족스러웠어요. 숙소 주변에 맛집이 많고 저녁에는 바다 산책도 할 수 있어서 좋았습니다.",
    avatar: "이",
  },
];

export default function ReviewTab() {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-6">
        {MOCK_DETAIL_REVIEWS.map((review, idx) => (
          <div key={review.id}>
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarFallback className="bg-indigo-100 text-indigo-700">
                  {review.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{review.userName}</span>
                  <span className="text-xs text-gray-400">{review.duration} 체류</span>
                </div>
                <div className="my-1 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="mb-2 flex flex-wrap gap-1">
                  {review.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{review.text}</p>
              </div>
            </div>
            {idx < MOCK_DETAIL_REVIEWS.length - 1 && <Separator className="mt-6" />}
          </div>
        ))}
      </div>

      <Separator />

      <ReviewForm />
    </div>
  );
}
