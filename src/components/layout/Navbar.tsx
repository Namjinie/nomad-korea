import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🇰🇷</span>
          <span className="text-xl font-bold text-indigo-600">노마드코리아</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.email}</span>
              <form action={signOut}>
                <Button type="submit" variant="ghost" size="sm">
                  로그아웃
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                로그인
              </Link>
              <Link href="/register" className={buttonVariants({ size: "sm" })}>
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
