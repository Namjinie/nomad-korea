import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Calendar, MapPin, Users } from "lucide-react";

const MEETUPS = [
  {
    id: 1,
    title: "제주 노마드 월례 네트워킹",
    date: "2025년 6월 15일 (토)",
    location: "제주 코워킹허브 2층",
    attendees: 18,
    type: "네트워킹",
  },
  {
    id: 2,
    title: "제주 개발자 모임 - 웹 기술 공유",
    date: "2025년 6월 22일 (토)",
    location: "이도동 카페 라운지",
    attendees: 12,
    type: "스터디",
  },
  {
    id: 3,
    title: "한라산 하이킹 & 피크닉",
    date: "2025년 7월 5일 (토)",
    location: "한라산 어리목 탐방로",
    attendees: 25,
    type: "액티비티",
  },
];

const TYPE_COLOR: Record<string, string> = {
  네트워킹: "bg-indigo-100 text-indigo-700",
  스터디: "bg-green-100 text-green-700",
  액티비티: "bg-orange-100 text-orange-700",
};

export default function CommunityTab() {
  return (
    <div className="space-y-6 py-4">
      <Card className="border-indigo-200 bg-indigo-50">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-yellow-400 p-3">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">카카오 오픈채팅 — 제주 노마드</h4>
              <p className="mt-1 text-sm text-gray-600">
                현재 230명 참여 중 · 실시간 정보 공유, 맛집 추천, 일상 교류
              </p>
              <Button className="mt-3" size="sm">
                오픈채팅 참여하기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h4 className="mb-4 font-semibold text-gray-900">지역 밋업 일정</h4>
        <div className="space-y-3">
          {MEETUPS.map((meetup) => (
            <Card key={meetup.id} className="border shadow-sm">
              <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h5 className="font-medium text-gray-900">{meetup.title}</h5>
                  <Badge className={`text-xs ${TYPE_COLOR[meetup.type]}`} variant="outline">
                    {meetup.type}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                    <span>{meetup.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                    <span>{meetup.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-indigo-400" />
                    <span>참가자 {meetup.attendees}명</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
