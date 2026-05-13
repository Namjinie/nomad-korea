import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { MOCK_REVIEWS } from "@/lib/mock-data";

export default function RecentReviewsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">최근 리뷰</h2>
          <p className="mt-2 text-gray-500">노마드들의 생생한 경험담</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {MOCK_REVIEWS.map((review) => (
            <Card key={review.id} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-indigo-100 text-indigo-700">
                      {review.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{review.userName}</div>
                    <div className="text-xs text-gray-500">
                      {review.cityName} · {review.duration} 체류
                    </div>
                  </div>
                </div>

                <div className="mb-3 flex items-center gap-1">
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

                <div className="mb-3 flex flex-wrap gap-1">
                  {review.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-gray-600">{review.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
