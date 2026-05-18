import { createClient } from "@/lib/supabase/server";
import { City } from "@/lib/mock-data";

export interface DbCity {
  slug: string;
  name: string;
  region: string;
  budget: string;
  region_filter: string;
  environment: string[];
  best_season: string;
  likes: number;
  dislikes: number;
}

export function mapDbCity(db: DbCity): City {
  return {
    slug: db.slug,
    name: db.name,
    region: db.region,
    budget: db.budget as City["budget"],
    regionFilter: db.region_filter as City["regionFilter"],
    environment: db.environment as City["environment"],
    bestSeason: db.best_season as City["bestSeason"],
    likes: db.likes,
    dislikes: db.dislikes,
  };
}

export async function getCities(): Promise<City[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .order("likes", { ascending: false });

  if (error || !data) return [];
  return (data as DbCity[]).map(mapDbCity);
}

export async function getUserReactions(
  userId: string,
): Promise<Record<string, "like" | "dislike">> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("city_reactions")
    .select("city_slug, reaction")
    .eq("user_id", userId);

  if (error || !data) return {};
  return Object.fromEntries(
    data.map((r: { city_slug: string; reaction: string }) => [
      r.city_slug,
      r.reaction as "like" | "dislike",
    ]),
  );
}
