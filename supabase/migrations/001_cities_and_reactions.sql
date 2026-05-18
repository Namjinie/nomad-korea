-- ============================================================
-- 1. cities 테이블
-- ============================================================
create table if not exists cities (
  slug         text primary key,
  name         text not null,
  region       text not null,
  budget       text not null check (budget in ('under100', '100to200', 'over200')),
  region_filter text not null check (region_filter in ('수도권', '경상도', '전라도', '강원도', '제주도', '충청도')),
  environment  text[] not null,
  best_season  text not null check (best_season in ('봄', '여름', '가을', '겨울')),
  likes        integer not null default 0,
  dislikes     integer not null default 0
);

alter table cities enable row level security;

create policy "anyone can read cities"
  on cities for select using (true);

-- ============================================================
-- 2. city_reactions 테이블
-- ============================================================
create table if not exists city_reactions (
  user_id   uuid references auth.users(id) on delete cascade not null,
  city_slug text references cities(slug) on delete cascade not null,
  reaction  text not null check (reaction in ('like', 'dislike')),
  primary key (user_id, city_slug)
);

alter table city_reactions enable row level security;

create policy "users can manage own reactions"
  on city_reactions for all using (auth.uid() = user_id);

-- ============================================================
-- 3. 트리거: city_reactions 변경 시 cities 카운트 자동 갱신
-- ============================================================
create or replace function sync_city_reaction_counts()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    if NEW.reaction = 'like' then
      update cities set likes = likes + 1 where slug = NEW.city_slug;
    else
      update cities set dislikes = dislikes + 1 where slug = NEW.city_slug;
    end if;

  elsif TG_OP = 'DELETE' then
    if OLD.reaction = 'like' then
      update cities set likes = greatest(likes - 1, 0) where slug = OLD.city_slug;
    else
      update cities set dislikes = greatest(dislikes - 1, 0) where slug = OLD.city_slug;
    end if;

  elsif TG_OP = 'UPDATE' then
    -- 기존 반응 취소
    if OLD.reaction = 'like' then
      update cities set likes = greatest(likes - 1, 0) where slug = OLD.city_slug;
    else
      update cities set dislikes = greatest(dislikes - 1, 0) where slug = OLD.city_slug;
    end if;
    -- 새 반응 적용
    if NEW.reaction = 'like' then
      update cities set likes = likes + 1 where slug = NEW.city_slug;
    else
      update cities set dislikes = dislikes + 1 where slug = NEW.city_slug;
    end if;
  end if;

  return coalesce(NEW, OLD);
end;
$$ language plpgsql security definer;

create trigger sync_reaction_counts
  after insert or update or delete on city_reactions
  for each row execute function sync_city_reaction_counts();

-- ============================================================
-- 4. 시드 데이터
-- ============================================================
insert into cities (slug, name, region, budget, region_filter, environment, best_season, likes, dislikes)
values
  ('jeju',      '제주시',   '제주특별자치도', '100to200', '제주도',  array['자연친화', '카페작업'],    '봄',  234, 12),
  ('gangneung', '강릉',     '강원도',         '100to200', '강원도',  array['자연친화', '카페작업'],    '여름', 187,  8),
  ('busan',     '부산',     '부산광역시',     '100to200', '경상도',  array['도심선호', '카페작업'],    '가을', 312, 15),
  ('gyeongju',  '경주',     '경상북도',       'under100', '경상도',  array['자연친화'],                '봄',   98,  5),
  ('yeosu',     '여수',     '전라남도',       '100to200', '전라도',  array['자연친화', '카페작업'],    '여름', 143,  9),
  ('sokcho',    '속초',     '강원도',         '100to200', '강원도',  array['자연친화', '코워킹 필수'], '여름',  89,  4),
  ('jeonju',    '전주',     '전라북도',       'under100', '전라도',  array['카페작업', '코워킹 필수'], '봄',  112,  7),
  ('tongyeong', '통영',     '경상남도',       '100to200', '경상도',  array['자연친화'],                '가을',  76,  6)
on conflict (slug) do nothing;
