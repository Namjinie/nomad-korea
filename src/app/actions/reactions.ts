"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleReaction(
  citySlug: string,
  reaction: "like" | "dislike",
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "login_required" };

  const { data: existing } = await supabase
    .from("city_reactions")
    .select("reaction")
    .eq("user_id", user.id)
    .eq("city_slug", citySlug)
    .single();

  if (existing?.reaction === reaction) {
    // 같은 버튼 재클릭 → 취소
    await supabase
      .from("city_reactions")
      .delete()
      .eq("user_id", user.id)
      .eq("city_slug", citySlug);
  } else {
    // 새 반응 또는 반전 (트리거가 카운트 자동 갱신)
    await supabase.from("city_reactions").upsert({
      user_id: user.id,
      city_slug: citySlug,
      reaction,
    });
  }

  revalidatePath("/");
  return {};
}
