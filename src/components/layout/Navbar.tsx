import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🇰🇷</span>
          <span className="text-xl font-bold text-indigo-600">노마드코리아</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/cities"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600"
          >
            도시 탐색
          </Link>
          <Link
            href="#review"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600"
          >
            평가 남기기
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            로그인
          </Button>
          <Button size="sm">회원가입</Button>
        </div>

        <button className="md:hidden">
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </nav>
  );
}
