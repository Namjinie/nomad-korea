import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🇰🇷</span>
              <span className="text-lg font-bold text-white">노마드코리아</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              한국의 디지털 노마드를 위한 도시 평가 플랫폼. 실제 거주 경험을 공유하고 최적의 워케이션 도시를 찾아보세요.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
              서비스
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  평가 남기기
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  자주 묻는 질문
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
              연락처
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>이메일: hello@nomadkorea.kr</li>
              <li>카카오톡 오픈채팅: 노마드코리아</li>
              <li>인스타그램: @nomad_korea</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-xs text-gray-500">
          © 2025 노마드코리아. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
