import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

import { toggleReaction } from "@/app/actions/reactions";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// 각 테스트에서 재사용할 mock 빌더
function buildMockSupabase(singleResult: { data: unknown; error: unknown }) {
  const mockSingle = vi.fn().mockResolvedValue(singleResult);

  const mockFromSelect = {
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: mockSingle,
        }),
      }),
    }),
    delete: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({}),
      }),
    }),
    upsert: vi.fn().mockResolvedValue({}),
  };

  const mockSupabase = {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-1" } } }),
    },
    from: vi.fn().mockReturnValue(mockFromSelect),
  };

  return { mockSupabase, mockFromSelect, mockSingle };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("toggleReaction", () => {
  // R-01: 미인증 사용자 → login_required
  it("R-01: 미인증 사용자는 login_required 에러를 반환한다", async () => {
    const { mockSupabase } = buildMockSupabase({ data: null, error: null });
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

    const result = await toggleReaction("jeju", "like");

    expect(result).toEqual({ error: "login_required" });
  });

  // R-02: 같은 반응 재클릭 → DELETE 호출
  it("R-02: 같은 반응을 재클릭하면 DELETE를 호출하고 {}를 반환한다", async () => {
    const { mockSupabase, mockFromSelect } = buildMockSupabase({
      data: { reaction: "like" },
      error: null,
    });
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

    const result = await toggleReaction("jeju", "like");

    expect(mockFromSelect.delete).toHaveBeenCalledOnce();
    expect(mockFromSelect.upsert).not.toHaveBeenCalled();
    expect(result).toEqual({});
  });

  // R-03: 새 반응 등록 (기존 없음) → UPSERT 호출
  it("R-03: 기존 반응이 없으면 UPSERT를 호출하고 {}를 반환한다", async () => {
    const { mockSupabase, mockFromSelect } = buildMockSupabase({
      data: null,
      error: null,
    });
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

    const result = await toggleReaction("jeju", "like");

    expect(mockFromSelect.upsert).toHaveBeenCalledOnce();
    expect(mockFromSelect.upsert).toHaveBeenCalledWith({
      user_id: "user-1",
      city_slug: "jeju",
      reaction: "like",
    });
    expect(mockFromSelect.delete).not.toHaveBeenCalled();
    expect(result).toEqual({});
  });

  // R-04: 반응 전환 (like → dislike) → UPSERT 호출
  it("R-04: 기존 반응(like)과 다른 반응(dislike) 클릭 시 UPSERT를 호출한다", async () => {
    const { mockSupabase, mockFromSelect } = buildMockSupabase({
      data: { reaction: "like" },
      error: null,
    });
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

    const result = await toggleReaction("jeju", "dislike");

    expect(mockFromSelect.upsert).toHaveBeenCalledOnce();
    expect(mockFromSelect.upsert).toHaveBeenCalledWith({
      user_id: "user-1",
      city_slug: "jeju",
      reaction: "dislike",
    });
    expect(mockFromSelect.delete).not.toHaveBeenCalled();
    expect(result).toEqual({});
  });

  // R-05: 성공 시 revalidatePath('/') 호출
  it("R-05: 성공 시 revalidatePath('/')를 호출한다", async () => {
    const { mockSupabase } = buildMockSupabase({ data: null, error: null });
    vi.mocked(createClient).mockResolvedValue(mockSupabase as any);

    await toggleReaction("jeju", "like");

    expect(revalidatePath).toHaveBeenCalledOnce();
    expect(revalidatePath).toHaveBeenCalledWith("/");
  });
});
