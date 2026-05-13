import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Clock, MapPin } from "lucide-react";

const WORKSPACES = [
  {
    name: "제주 코워킹스페이스 허브",
    type: "코워킹",
    wifi: "500 Mbps",
    hours: "07:00 ~ 22:00",
    address: "제주시 연동 123-45",
  },
  {
    name: "카페 노마드",
    type: "카페",
    wifi: "300 Mbps",
    hours: "08:00 ~ 21:00",
    address: "제주시 이도2동 456",
  },
  {
    name: "워크앤커피 제주점",
    type: "카페",
    wifi: "450 Mbps",
    hours: "09:00 ~ 20:00",
    address: "서귀포시 중문동 789",
  },
];

export default function WorkspaceTab() {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        {WORKSPACES.map((ws) => (
          <Card key={ws.name} className="border shadow-sm">
            <CardContent className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <h4 className="font-semibold text-gray-900">{ws.name}</h4>
                <Badge variant={ws.type === "코워킹" ? "default" : "secondary"}>
                  {ws.type}
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Wifi className="h-3.5 w-3.5 text-indigo-500" />
                  <span>와이파이 {ws.wifi}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-indigo-500" />
                  <span>{ws.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                  <span>{ws.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex h-48 items-center justify-center rounded-xl bg-gray-100 border-2 border-dashed border-gray-300">
        <div className="text-center text-gray-400">
          <MapPin className="mx-auto mb-2 h-8 w-8" />
          <p className="text-sm font-medium">네이버 지도 준비 중</p>
          <p className="text-xs">지도 서비스가 곧 제공됩니다</p>
        </div>
      </div>
    </div>
  );
}
