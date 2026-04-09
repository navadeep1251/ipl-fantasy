create table if not exists public.users (
  username text primary key,
  display_name text not null,
  password text not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.matches (
  id bigint primary key,
  home text not null,
  away text not null,
  date text not null,
  time_label text not null,
  lock_time timestamptz not null,
  manual_lock_state boolean null
);

create table if not exists public.results (
  match_id bigint primary key references public.matches (id) on delete cascade,
  winning_team text,
  win_by_runs boolean,
  run_margin integer,
  wicket_margin integer,
  top_scorer text,
  top_scorer_runs integer,
  best_bowler text,
  best_bowler_points integer,
  powerplay_winner text,
  powerplay_score integer,
  powerplay_diff integer,
  powerplay_home_score integer default 0,
  powerplay_away_score integer default 0,
  powerplay_home_wickets integer default 0,
  powerplay_away_wickets integer default 0,
  dot_ball_leader text,
  dot_balls integer,
  total_wickets integer,
  wickets_range text,
  duck_batsmen jsonb default '[]'::jsonb,
  match_top_player text,
  match_bottom_player text
);

alter table public.results add column if not exists powerplay_home_score integer default 0;
alter table public.results add column if not exists powerplay_away_score integer default 0;
alter table public.results add column if not exists powerplay_home_wickets integer default 0;
alter table public.results add column if not exists powerplay_away_wickets integer default 0;

create table if not exists public.selections (
  username text not null references public.users (username) on delete cascade,
  match_id bigint not null references public.matches (id) on delete cascade,
  winning_team text,
  best_batsman text,
  best_bowler text,
  powerplay_winner text,
  dot_ball_bowler text,
  total_wickets text,
  duck_batsman text,
  double_category text,
  winning_horse text,
  losing_horse text,
  saved_at timestamptz,
  primary key (username, match_id)
);

create table if not exists public.match_insights (
  match_id bigint primary key references public.matches (id) on delete cascade,
  generated_at timestamptz,
  home_probable_xi jsonb,
  away_probable_xi jsonb,
  home_form_batsmen text,
  away_form_batsmen text,
  home_form_bowlers text,
  away_form_bowlers text,
  pitch_report text,
  head_to_head text,
  key_matchups text,
  prediction_summary text
);

create table if not exists public.player_scores (
  match_id bigint not null references public.matches (id) on delete cascade,
  player_name text not null,
  runs integer,
  fours integer,
  sixes integer,
  wickets integer,
  maidens integer,
  dot_balls integer,
  batsman_score integer,
  bowler_score integer,
  dot_ball_score integer,
  primary key (match_id, player_name)
);

grant usage on schema public to anon, authenticated;

grant select, insert, update, delete on public.users to anon, authenticated;
grant select, insert, update, delete on public.matches to anon, authenticated;
grant select, insert, update, delete on public.results to anon, authenticated;
grant select, insert, update, delete on public.selections to anon, authenticated;
grant select, insert, update, delete on public.match_insights to anon, authenticated;
grant select, insert, update, delete on public.player_scores to anon, authenticated;

alter table public.users disable row level security;
alter table public.matches disable row level security;
alter table public.results disable row level security;
alter table public.selections disable row level security;
alter table public.match_insights disable row level security;
alter table public.player_scores disable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'matches'
  ) then
    alter publication supabase_realtime add table public.matches;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'results'
  ) then
    alter publication supabase_realtime add table public.results;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'selections'
  ) then
    alter publication supabase_realtime add table public.selections;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'match_insights'
  ) then
    alter publication supabase_realtime add table public.match_insights;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'player_scores'
  ) then
    alter publication supabase_realtime add table public.player_scores;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'users'
  ) then
    alter publication supabase_realtime add table public.users;
  end if;
end $$;