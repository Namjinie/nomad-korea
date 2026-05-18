import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { signUp } from "@/app/auth/actions";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;
  const checkEmail = message === "check_email";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl">🇰🇷</span>
            <span className="text-2xl font-bold text-indigo-600">노마드코리아</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">노마드 커뮤니티에 합류하세요</h1>
          <p className="mt-2 text-sm text-gray-500">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              로그인
            </Link>
          </p>
        </div>

        {/* 카드 */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          {checkEmail ? (
            <div className="rounded-xl bg-emerald-50 p-6 text-center text-sm text-emerald-700">
              <p className="font-medium">📩 메일함을 확인하세요</p>
              <p className="mt-2 text-emerald-600">
                인증 링크를 보냈습니다. 메일의 링크를 클릭하면 가입이 완료됩니다.
              </p>
            </div>
          ) : (
            <form action={signUp} className="space-y-4">
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
                <label className="text-sm font-medium text-gray-700">비밀번호</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    placeholder="8자 이상 입력"
                    className="pl-9"
                  />
                </div>
              </div>

              {/* 혜택 안내 */}
              <div className="rounded-xl bg-indigo-50 p-4 text-sm text-indigo-700">
                <p className="font-medium">가입하면 이런 혜택이 있어요 ✨</p>
                <ul className="mt-2 space-y-1 text-indigo-600">
                  <li>• 텍스트 리뷰 작성 가능</li>
                  <li>• 나만의 관심 도시 저장</li>
                  <li>• 노마드 커뮤니티 참여</li>
                </ul>
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
                회원가입
              </Button>
            </form>
          )}

          <p className="mt-4 text-center text-xs text-gray-400">
            가입 시{" "}
            <Link href="#" className="underline hover:text-gray-600">이용약관</Link>
            {" "}및{" "}
            <Link href="#" className="underline hover:text-gray-600">개인정보처리방침</Link>
            에 동의하게 됩니다
          </p>
        </div>
      </div>
    </div>
  );
}
