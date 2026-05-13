import { Progress } from "@/components/ui/progress";

const SCORES = [
  { label: "작업환경", value: 85, icon: "💻" },
  { label: "생활편의", value: 78, icon: "🏪" },
  { label: "가격", value: 72, icon: "💰" },
  { label: "자연환경", value: 91, icon: "🌿" },
  { label: "외국인친화도", value: 65, icon: "🌍" },
];

export default function ScoreTab() {
  const avg = Math.round(SCORES.reduce((sum, s) => sum + s.value, 0) / SCORES.length);

  return (
    <div className="space-y-6 py-4">
      <div className="rounded-xl bg-indigo-50 p-6 text-center">
        <div className="text-5xl font-extrabold text-indigo-600">{avg}</div>
        <div className="mt-1 text-sm text-gray-500">노마드 종합점수 (100점 만점)</div>
      </div>

      <div className="space-y-4">
        {SCORES.map((item) => (
          <div key={item.label}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 font-medium text-gray-700">
                <span>{item.icon}</span>
                {item.label}
              </span>
              <span className="font-semibold text-gray-900">{item.value}/100</span>
            </div>
            <Progress value={item.value} className="h-3" />
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
        💡 점수는 실제 방문한 노마드 234명의 평가를 기반으로 산출됩니다.
      </div>
    </div>
  );
}
