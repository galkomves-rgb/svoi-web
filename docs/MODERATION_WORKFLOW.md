# Moderation Workflow

## Core Rule

Nothing public is published directly from public forms.

## Public Submission Flow

1. user opens `/add/listing`, `/add/service`, or `/add/event`
2. form is rendered from category schema
3. Zod validates on submit
4. submission is written to `submissions`
5. initial status is `pending_review`
6. moderator reviews in `/admin/moderation`

## Moderator Outcomes

- `changes_requested`
- `approved`
- `rejected`

After approval, editor/moderator can create or sync final content row into:

- `listings`
- `services`
- `events`

## Visibility Rules

- public users can read only `published + public`
- owners can read their own submissions
- moderators/admins can review queue, reports, and moderation logs

## Logs

Every moderation transition should create a `moderation_logs` entry with:

- entity table
- entity id
- previous status
- next status
- note

## Reports

Published content can be flagged into `reports`.
Reports remain separate from submissions to preserve audit history.
