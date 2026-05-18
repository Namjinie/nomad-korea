import { test as setup } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'

const authFile = 'e2e/.auth/user.json'

setup('authenticate', async ({ page }) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const email = process.env.TEST_USER_EMAIL!
  const password = process.env.TEST_USER_PASSWORD!

  // UI 대신 Supabase API로 직접 로그인 → 빠르고 안정적
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(`Auth setup 실패: ${error.message}`)

  // 발급된 토큰을 브라우저 쿠키로 주입
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('세션을 가져오지 못했습니다')

  await page.goto('/')
  await page.evaluate((token) => {
    document.cookie = `sb-access-token=${token}; path=/`
  }, session.access_token)

  await page.context().storageState({ path: authFile })
})
