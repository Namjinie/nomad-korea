import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 py-24 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          한국의 노마드 성지를
          <br />
          찾아보세요
        </h1>
        <p className="mt-6 text-lg text-indigo-100 sm:text-xl">
          30개 이상의 도시에서 1,200명의 노마드가 평가한 진짜 정보
        </p>

        <div className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-xl bg-white p-2 shadow-xl">
          <Search className="ml-2 h-5 w-5 shrink-0 text-gray-400" />
          <Input
            className="border-0 bg-transparent text-gray-800 placeholder:text-gray-400 focus-visible:ring-0"
            placeholder="도시 이름 검색..."
          />
          <Button className="shrink-0">검색</Button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50">
            도시 탐색하기
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            평가 남기기
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-indigo-200">
          <div>
            <span className="block text-2xl font-bold text-white">30+</span>
            등록 도시
          </div>
          <div>
            <span className="block text-2xl font-bold text-white">1,200+</span>
            노마드 평가
          </div>
          <div>
            <span className="block text-2xl font-bold text-white">4.6★</span>
            평균 만족도
          </div>
        </div>
      </div>
    </section>
  );
}
