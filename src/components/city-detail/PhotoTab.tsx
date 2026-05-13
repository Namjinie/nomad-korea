import { Button } from "@/components/ui/button";
import { Camera, ImagePlus } from "lucide-react";

const PLACEHOLDER_PHOTOS = Array.from({ length: 6 }, (_, i) => i + 1);

const GRADIENTS = [
  "from-blue-300 to-cyan-400",
  "from-green-300 to-emerald-400",
  "from-orange-300 to-amber-400",
  "from-purple-300 to-pink-400",
  "from-rose-300 to-red-400",
  "from-indigo-300 to-blue-400",
];

export default function PhotoTab() {
  return (
    <div className="space-y-6 py-4">
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700">
        📷 사진 업로드 기능은 로그인 후 이용 가능합니다.
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PLACEHOLDER_PHOTOS.map((i) => (
          <div
            key={i}
            className={`relative h-32 overflow-hidden rounded-xl bg-gradient-to-br ${GRADIENTS[i - 1]} sm:h-40`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="h-8 w-8 text-white/60" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
        <div className="flex items-center gap-2 text-gray-400">
          <ImagePlus className="h-5 w-5" />
          <Button variant="outline" size="sm">
            사진 업로드
          </Button>
        </div>
      </div>
    </div>
  );
}
