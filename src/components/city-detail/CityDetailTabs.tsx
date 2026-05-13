"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScoreTab from "./ScoreTab";
import LivingCostTab from "./LivingCostTab";
import WorkspaceTab from "./WorkspaceTab";
import WeatherTab from "./WeatherTab";
import ReviewTab from "./ReviewTab";
import PhotoTab from "./PhotoTab";
import CommunityTab from "./CommunityTab";

const TABS = [
  { value: "score", label: "종합점수" },
  { value: "cost", label: "생활비" },
  { value: "workspace", label: "작업공간" },
  { value: "weather", label: "날씨" },
  { value: "review", label: "리뷰" },
  { value: "photo", label: "사진" },
  { value: "community", label: "커뮤니티" },
];

export default function CityDetailTabs() {
  return (
    <Tabs defaultValue="score">
      <TabsList className="flex h-auto w-full flex-wrap gap-1 rounded-xl bg-gray-100 p-1">
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex-1 text-xs sm:text-sm"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="score">
        <ScoreTab />
      </TabsContent>
      <TabsContent value="cost">
        <LivingCostTab />
      </TabsContent>
      <TabsContent value="workspace">
        <WorkspaceTab />
      </TabsContent>
      <TabsContent value="weather">
        <WeatherTab />
      </TabsContent>
      <TabsContent value="review">
        <ReviewTab />
      </TabsContent>
      <TabsContent value="photo">
        <PhotoTab />
      </TabsContent>
      <TabsContent value="community">
        <CommunityTab />
      </TabsContent>
    </Tabs>
  );
}
