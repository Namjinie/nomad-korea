import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { signIn } from "@/app/auth/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl">🇰🇷</span>
            <span className="text-2xl font-bold text-indigo-600">노마드코리아</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">다시 만나서 반가워요</h1>
          <p className="mt-2 text-sm text-gray-500">
            아직 계정이 없으신가요?{" "}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              회원가입
            </Link>
          </p>
        </div>

        {/* 카드 */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <form action={signIn} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">이메일</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="nomad@example.com"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">비밀번호</label>
                <Link href="#" className="text-xs text-indigo-600 hover:text-indigo-500">
                  비밀번호 찾기
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="pl-9"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
              로그인
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
