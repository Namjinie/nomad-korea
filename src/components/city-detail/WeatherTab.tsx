import { Badge } from "@/components/ui/badge";

const MONTHLY_WEATHER = [
  { month: "1월", avgTemp: 5, rain: 45, icon: "❄️" },
  { month: "2월", avgTemp: 7, rain: 50, icon: "🌤️" },
  { month: "3월", avgTemp: 11, rain: 60, icon: "🌸" },
  { month: "4월", avgTemp: 15, rain: 70, icon: "☀️" },
  { month: "5월", avgTemp: 19, rain: 65, icon: "☀️" },
  { month: "6월", avgTemp: 23, rain: 180, icon: "🌧️" },
  { month: "7월", avgTemp: 28, rain: 220, icon: "⛈️" },
  { month: "8월", avgTemp: 29, rain: 200, icon: "⛈️" },
  { month: "9월", avgTemp: 24, rain: 110, icon: "🌤️" },
  { month: "10월", avgTemp: 19, rain: 55, icon: "🍂" },
  { month: "11월", avgTemp: 13, rain: 60, icon: "🌥️" },
  { month: "12월", avgTemp: 7, rain: 50, icon: "❄️" },
];

const MAX_TEMP = Math.max(...MONTHLY_WEATHER.map((m) => m.avgTemp));

export default function WeatherTab() {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">월별 평균 기온 차트</h4>
        <div className="flex h-36 items-end gap-1 rounded-xl bg-gray-50 p-4">
          {MONTHLY_WEATHER.map((m) => (
            <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-indigo-400"
                style={{ height: `${(m.avgTemp / MAX_TEMP) * 100}%` }}
              />
              <span className="text-[10px] text-gray-500">{m.month.replace("월", "")}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-700">베스트 시즌</h4>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">🌸 3월~5월 (봄)</Badge>
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">🍂 9월~11월 (가을)</Badge>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">월</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">날씨</th>
              <th className="px-4 py-2 text-right font-semibold text-gray-600">평균기온</th>
              <th className="px-4 py-2 text-right font-semibold text-gray-600">강수량</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {MONTHLY_WEATHER.map((m) => (
              <tr key={m.month} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-800">{m.month}</td>
                <td className="px-4 py-2">{m.icon}</td>
                <td className="px-4 py-2 text-right text-gray-700">{m.avgTemp}°C</td>
                <td className="px-4 py-2 text-right text-gray-700">{m.rain}mm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
