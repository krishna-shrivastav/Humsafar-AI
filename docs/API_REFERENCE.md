# NagrikSetu API Reference (v1)

Base path: `/api/v1`. JSON requests use `Content-Type: application/json`. Protected routes require `Authorization: Bearer <Firebase ID token>`.

## Public

| Method | Route | Purpose |
|---|---|---|
| GET | `/health` | API and database health |
| GET | `/api/v1/public/config` | Provider readiness flags (never secrets) |
| GET | `/api/v1/sites?q=&city=&state=&limit=` | Verified heritage records only |
| GET | `/api/v1/sites/:slug` | Verified place details and source references |
| GET | `/api/v1/districts` | Active districts |
| GET | `/api/v1/artisans` | Verified artisan profiles |
| GET | `/api/v1/trails` | Published editorial trails |
| POST | `/api/v1/feedback` | Submit a visitor correction / feedback |
| POST | `/api/v1/itinerary` | Verified-place city itinerary |
| POST | `/api/v1/audio-story` | Reviewed English or Hindi story text |
| GET | `/api/v1/passport/qr/:slug` | Public place QR (not a visit token) |

## Authenticated visitor

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/v1/consent` | Save analytics consent choice and version |
| POST | `/api/v1/uploads/presign` | Create private, short-lived S3 upload URL |
| POST | `/api/v1/recognition` | Process an owned uploaded image through configured vision provider |
| POST | `/api/v1/youtube/analyze` | Send a validated YouTube URL to configured transcript provider |
| POST | `/api/v1/chat` | Heritage assistant grounded in verified site records |
| GET | `/api/v1/passport/me` | Visitor's stamps |
| GET | `/api/v1/passport/achievements` | Earned and locked achievements |
| POST | `/api/v1/passport/stamp` | Collect a stamp using an official on-site QR token |
| POST | `/api/v1/analytics/event` | Store an event only when analytics consent is true |

## Admin (Firebase token + role required)

| Method | Route | Minimum role |
|---|---|---|
| GET | `/api/v1/admin/dashboard` | editor/verifier/district_admin/admin |
| GET | `/api/v1/admin/sites` and `/sites/:id` | editor/verifier/district_admin/admin |
| POST / PUT | `/api/v1/admin/sites` or `/sites/:id` | editor/district_admin/admin |
| POST | `/api/v1/admin/sites/:id/submit-review` | editor/district_admin/admin |
| POST | `/api/v1/admin/sites/:id/verify` | verifier/admin |
| GET / POST | `/api/v1/admin/districts` | district_admin/admin |
| GET | `/api/v1/admin/feedback` | editor/verifier/district_admin/admin |
| PATCH | `/api/v1/admin/feedback/:id` | editor/district_admin/admin |
| GET / POST | `/api/v1/admin/artisans` | editor/district_admin/admin |
| PATCH | `/api/v1/admin/artisans/:id/verify` | verifier/admin |
| GET / PATCH | `/api/v1/admin/users` | admin only |
| GET | `/api/v1/admin/reports/visitors.csv` | district_admin/admin |
| GET | `/api/v1/admin/audit` | admin only |
| GET | `/api/v1/admin/passport/qr/:slug` | editor/verifier/admin |

## Provider payload contracts

- Vision provider: `POST VISION_API_URL`, JSON `{ "image_url": "<short-lived-signed-url>", "hint": "..." }`, bearer `VISION_API_KEY`.
- YouTube transcript provider: `POST YOUTUBE_TRANSCRIPT_API_URL`, JSON `{ "url": "https://www.youtube.com/..." }`, bearer `YOUTUBE_TRANSCRIPT_API_KEY`.
- Chat provider: OpenAI-compatible `POST https://api.openai.com/v1/chat/completions` from the server. The browser never receives the API key.

Use HTTPS, a strict CORS origin allowlist and provider-specific request limits. Do not expose raw uploads publicly.
