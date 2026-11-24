# NagrikSetu Production Runbook

This project preserves the existing static website and adds a Node.js API, PostgreSQL data model, Firebase ID-token verification, S3-compatible private uploads, content governance, QR passport, smart trails, artisan directory, consent-aware analytics and admin APIs.

## Important status distinction

The source code and integration contracts are included. A live production service still requires operator-owned cloud resources, DNS/HTTPS, Firebase web and Admin setup, PostgreSQL, object storage, provider keys, verified content, security review and deployment. The website must not be described as fully live until those dependencies are configured and tested.

## 1. Local backend

Requirements: Node.js 20+, npm, PostgreSQL 15+.

```bash
cd backend
cp .env.example .env
# Edit .env; set DATABASE_URL, Firebase Admin credentials, S3 settings and a long random PASSPORT_SECRET.
npm install
npm run migrate
npm run seed
npm run dev
```

Seed imports the existing 54 catalogue entries as **draft** records. It does not mark them verified. Add source URLs and have an authorised verifier review each record before publishing.

## 2. Docker local stack

Copy `.env.example` to `backend/.env`. For Docker Compose, set `DATABASE_URL=postgresql://postgres:<password>@db:5432/nagriksetu`, `DATABASE_SSL=false`, and ensure `POSTGRES_PASSWORD` in the shell environment matches the Compose database password. Then:

```bash
cd backend
docker compose up --build -d
```

Run migrations from the API container or a local Node environment after the database is healthy.

## 3. Firebase

1. Create a Firebase project and register a Web App.
2. Enable Email/Password sign-in (and configure authorised domains).
3. Put only the public Web App configuration in `firebase-config.js`.
4. For the API, use a dedicated service identity / Application Default Credentials. Do not commit its JSON key. Set `FIREBASE_PROJECT_ID` and `GOOGLE_APPLICATION_CREDENTIALS` in the backend secret manager.
5. Sign in once using the account intended to administer the platform. Set `BOOTSTRAP_ADMIN_UID` to that Firebase UID, restart the API, then sign in again. Remove or rotate bootstrap configuration after confirming admin role assignment.
6. Create separate editor, verifier and district_admin role assignments using `node scripts/grant-role.js <firebase-uid> <role>` after each user has signed in once. Never allow the browser to set its own role.

## 4. Website connection

Set `PRODUCTION_API_BASE_URL` in `config.js` to the deployed API origin, e.g. `https://api.example.org`. Keep `API_BASE_URL` blank unless you separately deploy the original Virasat legacy backend. The website must be served over HTTPS. Add its exact origin to `CORS_ORIGINS`.

## 5. Object storage

Create a private S3 bucket in the selected region. Enable block-public-access, default encryption, versioning if appropriate, lifecycle expiry for temporary uploads, and least-privilege API credentials. Configure CORS to allow PUT only from the website origin and required headers. The API creates short-lived presigned PUT and GET URLs; bucket objects are not public.

## 6. Provider integrations

- Image recognition: configure `VISION_API_URL` and `VISION_API_KEY`. The adapter sends a short-lived signed image URL and optional context hint. The provider must accept this payload contract.
- Chatbot: configure `OPENAI_API_KEY` and `OPENAI_MODEL`. Only verified site context is attached when a `siteSlug` is supplied by an authenticated client. The current frontend passes general questions; enrich it with selected site context when required.
- YouTube: configure `YOUTUBE_TRANSCRIPT_API_URL` and key for a transcript/analysis service you are authorised to use. The service must accept `{url}` and return JSON. Respect YouTube terms, copyright and creator rights; do not download or redistribute videos without permission.
- Audio: verified story text is returned by the API and spoken by browser speech synthesis. A natural voice TTS provider can be added later; do not synthesize or publish unreviewed factual narration.
- Maps: current website uses Leaflet/OpenStreetMap. Smart Trails currently returns verified city places in editorial order with map directions links. Connect a routing provider for travel-time-aware sequencing, traffic and transit.

## 7. Admin workflows

- Content editor creates a draft place and adds source references.
- Editor submits draft for review.
- Verifier/admin records a decision, notes and one or more source URLs.
- Only `verified` places are visible through the public API, used for audio stories and itinerary generation, and eligible for official QR passport codes.
- Admin Studio includes district, feedback, artisan and report operations.
- Admin access is enforced server-side using Firebase token verification and database roles.

## 8. QR Heritage Passport

Set a high-entropy `PASSPORT_SECRET` (32+ random bytes). An admin/editor/verifier generates an official QR for a verified place from Admin Studio. Print and place it at the site. Visitors scan the URL, sign in, and select Collect stamp. Static QR codes can be photographed/copied; for higher assurance, replace static tokens with rotating signed tokens or staff/geo confirmation.

## 9. Privacy and consent

The public privacy and terms templates in `/legal` contain placeholders. Complete them with the operator's legal identity, grievance contact, providers, retention periods, deletion process and jurisdiction-specific review. Analytics writes require a signed-in user with `consent_analytics=true`. Keep analytics aggregated and do not store precise visitor location trails by default. Implement deletion requests across DB, S3 and backup lifecycle before launch.

## 10. Backups and recovery

`npm run backup` uses `pg_dump` and writes a local SQL dump with restrictive file permissions. For production, schedule encrypted backups to a separate account/bucket, enable database point-in-time recovery where available, define retention, and run a restore drill. Back up object storage separately. A backup is not proven until restore has been tested.

## 11. Monitoring and operations

Put the API behind a managed HTTPS load balancer/reverse proxy. Configure health checks at `/health`, structured log collection, alerting on 5xx/latency/database saturation, uptime monitoring, dependency patching, WAF/rate limits, secret rotation and incident response. Do not expose database ports publicly.

## 12. Pre-launch acceptance

- [ ] HTTPS and CORS allowlist correct
- [ ] Firebase web sign-in and Admin token verification tested
- [ ] RBAC tested for visitor/editor/verifier/district_admin/admin
- [ ] PostgreSQL migration and backup restore tested
- [ ] S3 private bucket and presigned upload/download tested
- [ ] Provider adapters tested with real keys and abuse limits
- [ ] 54 starter catalogue records reviewed; no approximate coordinates presented as verified
- [ ] Opening hours, fees, accessibility and facilities checked with official sources
- [ ] Privacy, terms, retention and deletion process approved
- [ ] QR codes installed and anti-fraud approach agreed
- [ ] Mobile/desktop accessibility, security and performance tests passed
