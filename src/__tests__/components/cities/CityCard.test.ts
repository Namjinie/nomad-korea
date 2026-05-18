import {
  calcCounts,
  calcGradientIndex,
  calcNextReaction,
} from "@/components/cities/CityCard";

const BASE_LIKES = 100;
const BASE_DISLIKES = 10;

// ─── Group 1: calcCounts ───────────────────────────────────────────────────

describe("calcCounts", () => {
  // C-01
  it("initialReaction=null, reaction=null → 변화 없음", () => {
    const result = calcCounts(BASE_LIKES, BASE_DISLIKES, null, null);
    expect(result).toEqual({ likeCount: 100, dislikeCount: 10 });
  });

  // C-02
  it("initialReaction=null, reaction='like' → likeCount +1", () => {
    const result = calcCounts(BASE_LIKES, BASE_DISLIKES, "like", null);
    expect(result).toEqual({ likeCount: 101, dislikeCount: 10 });
  });

  // C-03
  it("initialReaction='like', reaction='like' → +1-1 상쇄, 변화 없음", () => {
    const result = calcCounts(BASE_LIKES, BASE_DISLIKES, "like", "like");
    expect(result).toEqual({ likeCount: 100, dislikeCount: 10 });
  });

  // C-04
  it("initialReaction='like', reaction=null → like 취소, likeCount -1", () => {
    const result = calcCounts(BASE_LIKES, BASE_DISLIKES, null, "like");
    expect(result).toEqual({ likeCount: 99, dislikeCount: 10 });
  });

  // C-05
  it("initialReaction='like', reaction='dislike' → like -1, dislike +1 (전환)", () => {
    const result = calcCounts(BASE_LIKES, BASE_DISLIKES, "dislike", "like");
    expect(result).toEqual({ likeCount: 99, dislikeCount: 11 });
  });

  // C-06
  it("initialReaction='dislike', reaction='like' → like +1, dislike -1 (전환)", () => {
    const result = calcCounts(BASE_LIKES, BASE_DISLIKES, "like", "dislike");
    expect(result).toEqual({ likeCount: 101, dislikeCount: 9 });
  });
});

// ─── Group 2: calcGradientIndex ───────────────────────────────────────────

describe("calcGradientIndex", () => {
  // C-07
  it("동일 slug는 항상 같은 인덱스를 반환 (결정론적)", () => {
    const first = calcGradientIndex("jeju", 8);
    const second = calcGradientIndex("jeju", 8);
    expect(first).toBe(second);
  });

  // C-08
  it("결과는 항상 0 이상 mapLength-1 이하 범위", () => {
    const slugs = ["jeju", "busan", "seoul", "gangneung", "jeonju", "yeosu"];
    for (const slug of slugs) {
      const idx = calcGradientIndex(slug, 8);
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(8);
    }
  });

  // C-09
  it("'jeju' 슬러그의 인덱스는 6 (j=106+e=101+j=106+u=117=430, 430%8=6)", () => {
    expect(calcGradientIndex("jeju", 8)).toBe(6);
  });
});

// ─── Group 3: calcNextReaction ────────────────────────────────────────────

describe("calcNextReaction", () => {
  // C-10
  it("같은 타입 재클릭 → null (토글 해제)", () => {
    expect(calcNextReaction("like", "like")).toBeNull();
    expect(calcNextReaction("dislike", "dislike")).toBeNull();
  });

  // C-11
  it("다른 타입 클릭 → 새 타입으로 전환", () => {
    expect(calcNextReaction(null, "like")).toBe("like");
    expect(calcNextReaction("like", "dislike")).toBe("dislike");
  });
});
