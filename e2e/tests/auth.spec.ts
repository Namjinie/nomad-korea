import { test } from '@playwright/test'

test.describe('인증', () => {
  test.describe('로그인', () => {
    test.fixme('A-01: /login 접속 시 로그인 폼이 렌더링된다', async () => {})
    test.fixme('A-02: 잘못된 자격증명 제출 시 에러 메시지가 표시된다', async () => {})
  })

  test.describe('회원가입', () => {
    test.fixme('A-03: /register 접속 시 회원가입 폼이 렌더링된다', async () => {})
    test.fixme('A-04: 회원가입 성공 시 이메일 인증 안내 화면이 표시된다', async () => {})
    test.fixme('A-05: 비밀번호 8자 미만 입력 시 제출이 막힌다', async () => {})
  })

  test.describe('미들웨어 리다이렉트', () => {
    test.fixme('A-06: 로그인 상태에서 /login 접속 시 /로 리다이렉트된다', async () => {})
    test.fixme('A-07: 로그인 상태에서 /register 접속 시 /로 리다이렉트된다', async () => {})
  })
})
