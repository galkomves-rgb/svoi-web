insert into geography_countries (slug, code, name)
values ('spain', 'ES', 'Іспанія')
on conflict (slug) do nothing;

insert into geography_regions (country_id, slug, name)
select id, 'valencia', 'Comunidad Valenciana'
from geography_countries
where slug = 'spain'
on conflict (country_id, slug) do nothing;

insert into geography_cities (region_id, slug, name, hero_title, hero_lead)
select id, 'torrevieja', 'Торревʼєха', 'Локальна платформа для українців у Торревʼєсі', 'Житло, події, послуги та корисні контакти в одному зрозумілому просторі.'
from geography_regions
where slug = 'valencia'
on conflict (region_id, slug) do nothing;

insert into geography_cities (region_id, slug, name, hero_title, hero_lead)
select id, 'alicante', 'Аліканте', 'Локальна платформа для українців в Аліканте', 'Швидкий доступ до оголошень, сервісів, подій і стартових гідів по місту.'
from geography_regions
where slug = 'valencia'
on conflict (region_id, slug) do nothing;

insert into geography_districts (city_id, slug, name)
select c.id, v.slug, v.name
from geography_cities c
join (
  values
    ('torrevieja', 'playa-del-cura', 'Playa del Cura'),
    ('torrevieja', 'centro', 'Centro'),
    ('torrevieja', 'marina', 'Marina'),
    ('alicante', 'centro', 'Centro'),
    ('alicante', 'san-blas', 'San Blas'),
    ('alicante', 'ensanche', 'Ensanche')
) as v(city_slug, slug, name)
on c.slug = v.city_slug
on conflict (city_id, slug) do nothing;

insert into categories (module_key, slug, label, schema_key)
values
  ('listings', 'hiring', 'Hiring', 'listing-job'),
  ('listings', 'looking-for-work', 'Looking for work', 'listing-job'),
  ('listings', 'rent-offer', 'Rent offer', 'listing-housing'),
  ('listings', 'rent-request', 'Rent request', 'listing-housing'),
  ('listings', 'sale-offer', 'Sale offer', 'listing-marketplace'),
  ('listings', 'roommate-search', 'Roommate search', 'listing-housing'),
  ('listings', 'need-help', 'Need help', 'listing-help'),
  ('listings', 'can-help', 'Can help', 'listing-help'),
  ('listings', 'sell', 'Sell', 'listing-marketplace'),
  ('listings', 'buy', 'Buy', 'listing-marketplace'),
  ('listings', 'exchange', 'Exchange', 'listing-marketplace'),
  ('listings', 'local-request', 'Local request', 'listing-community'),
  ('listings', 'looking-for-contacts', 'Looking for contacts', 'listing-community'),
  ('services', 'legal', 'Legal', 'service-standard'),
  ('services', 'translation', 'Translation', 'service-standard'),
  ('services', 'real-estate', 'Real estate', 'service-standard'),
  ('services', 'healthcare', 'Healthcare', 'service-standard'),
  ('services', 'beauty', 'Beauty', 'service-standard'),
  ('services', 'education', 'Education', 'service-standard'),
  ('services', 'repairs', 'Repairs', 'service-standard'),
  ('services', 'transport', 'Transport', 'service-standard'),
  ('services', 'finance', 'Finance', 'service-standard'),
  ('services', 'psychology', 'Psychology', 'service-standard'),
  ('services', 'childcare', 'Childcare', 'service-standard'),
  ('events', 'meetup', 'Meetup', 'event-standard'),
  ('events', 'workshop', 'Workshop', 'event-standard'),
  ('events', 'networking', 'Networking', 'event-standard'),
  ('events', 'volunteering', 'Volunteering', 'event-standard'),
  ('events', 'family', 'Family', 'event-standard'),
  ('events', 'kids', 'Kids', 'event-standard'),
  ('events', 'culture', 'Culture', 'event-standard'),
  ('events', 'sport', 'Sport', 'event-standard'),
  ('guides', 'documents', 'Documents', 'guide-standard'),
  ('guides', 'housing', 'Housing', 'guide-standard'),
  ('guides', 'healthcare', 'Healthcare', 'guide-standard'),
  ('guides', 'banking', 'Banking', 'guide-standard'),
  ('guides', 'education', 'Education', 'guide-standard'),
  ('guides', 'transport', 'Transport', 'guide-standard'),
  ('guides', 'local-life', 'Local life', 'guide-standard')
on conflict (module_key, slug) do nothing;

insert into category_schemas (schema_key, module_key, title, fields_json)
values
  ('listing-job', 'listings', 'Job listing', '[{"key":"salary_range","label":"Діапазон оплати","type":"text"},{"key":"employment_type","label":"Тип зайнятості","type":"select","options":["full-time","part-time","project"]}]'::jsonb),
  ('listing-housing', 'listings', 'Housing listing', '[{"key":"budget_eur","label":"Бюджет або ціна","type":"text"},{"key":"rooms","label":"Кімнати","type":"number"}]'::jsonb),
  ('listing-help', 'listings', 'Help listing', '[{"key":"urgency_note","label":"Терміновість","type":"text"}]'::jsonb),
  ('listing-marketplace', 'listings', 'Marketplace listing', '[{"key":"price_label","label":"Ціна","type":"text"}]'::jsonb),
  ('listing-community', 'listings', 'Community listing', '[{"key":"contact_goal","label":"Що саме шукаєте","type":"text"}]'::jsonb),
  ('service-standard', 'services', 'Service profile', '[{"key":"contact_label","label":"Підпис кнопки контакту","type":"text"},{"key":"website_url","label":"Сайт","type":"text"}]'::jsonb),
  ('event-standard', 'events', 'Event profile', '[{"key":"starts_at","label":"Початок події","type":"text"},{"key":"ends_at","label":"Кінець події","type":"text"}]'::jsonb),
  ('guide-standard', 'guides', 'Guide article', '[]'::jsonb)
on conflict (schema_key) do nothing;
