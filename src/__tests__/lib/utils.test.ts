import { cn } from '@/lib/utils'

describe('cn', () => {
  it('U-01: 단순 클래스 병합', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
  })

  it('U-02: Tailwind 충돌 클래스 덮어쓰기', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8')
  })

  it('U-03: 조건부 클래스 - true 조건', () => {
    expect(cn('base', true && 'active')).toBe('base active')
  })

  it('U-04: 조건부 클래스 - false 조건', () => {
    expect(cn('base', false && 'active')).toBe('base')
  })

  it('U-05: undefined/null 입력 무시', () => {
    expect(cn('base', undefined, null)).toBe('base')
  })

  it('U-06: 빈 입력', () => {
    expect(cn()).toBe('')
  })
})
