import { Button } from "@/components/ui/button";

export default function CtaBanner() {
  return (
    <section className="bg-indigo-600 py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          직접 살아봤다면 평가를 남겨주세요
        </h2>
        <p className="mt-4 text-indigo-200">
          당신의 경험이 다음 노마드에게 큰 도움이 됩니다
        </p>
        <Button
          size="lg"
          className="mt-8 bg-white text-indigo-700 hover:bg-indigo-50"
        >
          평가 작성하기
        </Button>
      </div>
    </section>
  );
}
