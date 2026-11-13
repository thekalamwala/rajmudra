-- Repoint the lead-lifecycle webhook from the old Timewheel domain to Rajmudra.
-- Run once in the Supabase SQL Editor for project nefmwittrybufjqhpxip
-- (same manual-apply pattern as 0002 — this file stays out of CI).
--
-- ⚠️ PREREQUISITE — DO NOT RUN THIS UNTIL IT IS TRUE, or you WILL break the
--    lifecycle emails:
--
--    The new Vercel project behind rajmudramedia.com must have LIFECYCLE_SECRET
--    set to the SAME value used below. As of this migration it is NOT set:
--      POST https://rajmudramedia.com/api/lifecycle  ->  503 {"error":"Not configured."}
--      POST https://timewheel.co.in/api/lifecycle    ->  401 (secret IS set on the old project)
--    So today the trigger still works via the old domain/project. Only after
--    rajmudramedia.com/api/lifecycle returns 401 (not 503) should you apply this.
--
-- Before running: replace <LIFECYCLE_SECRET> below with the same value set as
-- LIFECYCLE_SECRET on the new Vercel project. Keep it out of git (do not commit
-- the real value here).
--
-- Only the function body changes (the URL); the existing trigger
-- `lead_lifecycle_webhook` keeps calling it, so it does not need recreating.

create or replace function public.notify_lead_lifecycle()
returns trigger
language plpgsql
security definer
as $$
begin
  if new.status is distinct from old.status
     and new.status in ('delivered', 'upsell') then
    perform net.http_post(
      url     := 'https://rajmudramedia.com/api/lifecycle',
      body    := jsonb_build_object(
                   'stage',    new.status,
                   'email',    new.email,
                   'name',     new.name,
                   'site_url', new.delivered_url
                 ),
      headers := jsonb_build_object(
                   'Content-Type',       'application/json',
                   'x-lifecycle-secret', '<LIFECYCLE_SECRET>'
                 )
    );
  end if;
  return new;
end;
$$;
