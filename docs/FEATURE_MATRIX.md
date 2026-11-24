# Production Feature Matrix

| Area | Included implementation | External setup / remaining work |
|---|---|---|
| Phase 1: Backend | Express API, health checks, validation, rate limiting, security headers, PostgreSQL migrations | Deploy API and database; configure HTTPS/CORS/monitoring |
| Firebase | Firebase Web Auth compatibility retained; API verifies Firebase ID tokens | Add Firebase Web config and Admin credentials; set roles |
| File uploads | S3 presigned upload and short-lived read URLs; ownership check | Create private bucket, IAM policy, CORS and lifecycle |
| Privacy | Consent endpoint, opt-in analytics gate, policy/terms templates | Complete legal placeholders, retention and deletion workflows |
| Errors/backups | Central error handler, request rate limits, pg_dump script | Schedule encrypted off-site backups and restore drills |
| Phase 2: Recognition | Secure image upload + provider adapter | Configure a vision provider and test its payload/accuracy |
| Chatbot | Authenticated OpenAI-compatible chat endpoint, verified site context support | Configure API key/model, evaluate grounding and safety |
| YouTube | Validates YouTube URL and calls transcript/analysis adapter | Configure authorised transcript service; rights/terms review |
| Audio | Verified story endpoint; browser speech synthesis | Populate verified stories; optional hosted TTS provider |
| Itinerary/maps | Verified place selection, time/pace output, map directions links | Add routing API for live distance/time/traffic/transit |
| Phase 3: Passport | QR generation, HMAC visit code, user stamp collection, achievements schema | Set secret; print codes; anti-copy approach for on-site use |
| Living Lens | Existing Visual Lens retained; image upload recognition integration | Provider key and calibrated model; optional camera overlays/AR later |
| Smart Trails | City-based itinerary endpoint and UI | Curated trails, routing provider, hours/accessibility data |
| Artisan Connect | Verified artisan public directory + admin moderation | Obtain artisan consent, verify profiles and contact channels |
| Accessibility | Large text, read aloud, contrast, simple guidance controls | Human accessibility audit; verified place-level access facts |
| Phase 4: Admin | CMS, verification queue, districts, feedback, artisans, CSV report, audit log | Assign roles, train operators, governance policy |
| Tourism analytics | Aggregated opt-in event schema and 90-day CSV report | Add consented event instrumentation and privacy thresholds |

A source-code integration is not equivalent to a live third-party service. Production claims must reflect configured and tested services only.
