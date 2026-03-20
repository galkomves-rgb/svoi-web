alter table geography_countries enable row level security;
alter table geography_regions enable row level security;
alter table geography_cities enable row level security;
alter table geography_districts enable row level security;
alter table users_profile enable row level security;
alter table business_profiles enable row level security;
alter table categories enable row level security;
alter table category_schemas enable row level security;
alter table listings enable row level security;
alter table services enable row level security;
alter table events enable row level security;
alter table guides enable row level security;
alter table media enable row level security;
alter table entity_media enable row level security;
alter table submissions enable row level security;
alter table moderation_logs enable row level security;
alter table reports enable row level security;
alter table search_index enable row level security;
alter table promotions enable row level security;

create or replace function public.is_moderator()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from users_profile
    where id = auth.uid()
      and role in ('moderator', 'admin')
  );
$$;

create policy "public can read geography countries"
on geography_countries for select
using (true);

create policy "public can read geography regions"
on geography_regions for select
using (true);

create policy "public can read geography cities"
on geography_cities for select
using (true);

create policy "public can read geography districts"
on geography_districts for select
using (true);

create policy "public can read categories"
on categories for select
using (true);

create policy "public can read category schemas"
on category_schemas for select
using (true);

create policy "public can read published public listings"
on listings for select
using (status = 'published' and visibility = 'public');

create policy "public can read published public services"
on services for select
using (status = 'published' and visibility = 'public');

create policy "public can read published public events"
on events for select
using (status = 'published' and visibility = 'public');

create policy "public can read published public guides"
on guides for select
using (status = 'published' and visibility = 'public');

create policy "public can read active search index"
on search_index for select
using (true);

create policy "public can read active promotions"
on promotions for select
using (true);

create policy "users manage own profile"
on users_profile for all
using (id = auth.uid())
with check (id = auth.uid());

create policy "owners read own business profile"
on business_profiles for select
using (owner_user_id = auth.uid() or is_moderator());

create policy "owners manage own business profile"
on business_profiles for all
using (owner_user_id = auth.uid() or is_moderator())
with check (owner_user_id = auth.uid() or is_moderator());

create policy "users read own submissions"
on submissions for select
using (created_by = auth.uid() or is_moderator());

create policy "users create submissions"
on submissions for insert
with check (created_by = auth.uid());

create policy "users update own draft-like submissions"
on submissions for update
using (created_by = auth.uid() or is_moderator())
with check (
  created_by = auth.uid()
  or is_moderator()
);

create policy "moderators read moderation logs"
on moderation_logs for select
using (is_moderator());

create policy "moderators write moderation logs"
on moderation_logs for insert
with check (is_moderator());

create policy "users create reports"
on reports for insert
with check (created_by = auth.uid());

create policy "users read own reports or moderators"
on reports for select
using (created_by = auth.uid() or is_moderator());

create policy "moderators update reports"
on reports for update
using (is_moderator())
with check (is_moderator());

create policy "users manage own media"
on media for all
using (owner_user_id = auth.uid() or is_moderator())
with check (owner_user_id = auth.uid() or is_moderator());

create policy "moderators manage entity media"
on entity_media for all
using (is_moderator())
with check (is_moderator());

create policy "moderators manage listings"
on listings for all
using (is_moderator())
with check (is_moderator());

create policy "moderators manage services"
on services for all
using (is_moderator())
with check (is_moderator());

create policy "moderators manage events"
on events for all
using (is_moderator())
with check (is_moderator());

create policy "moderators manage guides"
on guides for all
using (is_moderator())
with check (is_moderator());

create policy "moderators manage search index"
on search_index for all
using (is_moderator())
with check (is_moderator());

create policy "moderators manage promotions"
on promotions for all
using (is_moderator())
with check (is_moderator());
