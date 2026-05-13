"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ROOM_TYPES = ["원룸", "게스트하우스", "에어비앤비", "코리빙"];

const COST_ITEMS = [
  { label: "숙소비", amount: 700000, note: "관리비 포함" },
  { label: "식비", amount: 300000, note: "외식 포함" },
  { label: "교통비", amount: 50000, note: "대중교통" },
  { label: "코워킹스페이스", amount: 150000, note: "월정액" },
  { label: "기타 생활비", amount: 100000, note: "통신·쇼핑 등" },
];

export default function LivingCostTab() {
  const total = COST_ITEMS.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6 py-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">숙소 유형 선택</label>
        <div className="flex flex-wrap gap-2">
          {ROOM_TYPES.map((type, i) => (
            <Button
              key={type}
              variant={i === 0 ? "default" : "outline"}
              size="sm"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">항목</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-600">금액</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">비고</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {COST_ITEMS.map((item) => (
              <tr key={item.label} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800">{item.label}</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">
                  {item.amount.toLocaleString()}원
                </td>
                <td className="px-4 py-3 text-gray-500">{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Separator />
        <div className="flex items-center justify-between bg-indigo-50 px-4 py-3">
          <span className="font-semibold text-gray-900">월 총 예상 비용</span>
          <span className="text-xl font-bold text-indigo-600">
            {total.toLocaleString()}원
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4 text-sm text-yellow-700">
        ⚠️ 실제 계산기는 준비 중입니다. 위 금액은 노마드 평균 지출을 참고한 예시입니다.
      </div>
    </div>
  );
}
