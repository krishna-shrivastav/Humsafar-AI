# NagrikSetu Website — Product Scope & Feature Mapping

## Source basis
This website is a web-first adaptation of the supplied `Virasat-main.zip` project and the supplied four-page UP AI Mission `AI Tourism Companion — Use Case and Problem Statement Document`.

## Original Virasat capabilities retained as website modules
1. Image-based monument identification (`POST /predict`, multipart: `file`, `include_info`, `include_similar`, `context_hint`).
2. Video / YouTube monument analysis (`POST /process-youtube`, multipart: `youtube_url`, `fps`, `max_frames`, `confidence_threshold`, optional `video_title`). The website provides both YouTube URL and video-file selection UI; the supplied backend contract documents YouTube URL processing, not a video-file upload contract.
3. Nearby heritage explorer with configurable 10–200 km radius (`POST /nearby-heritage`, JSON `latitude`, `longitude`, `radius` in metres).
4. AI-generated five-question quiz (`POST /heritage-quiz`, JSON `monument_name`, `difficulty`, `num_questions`).
5. Heritage chatbot (`POST /chat`, JSON `message`, optional `monument_context`, `history`). The original mobile client uses SSE; this website's current integration displays the response body and should be adapted to the deployed server's exact SSE event format if streaming is enabled.
6. Virtual tours (`POST /monument-story`, JSON `monument_name`, `style` = narrative/documentary/poetic). Browser speech synthesis provides a local narration fallback.
7. Heritage timeline (`POST /heritage-timeline`, JSON `monument_name`).
8. Multi-day travel planner (`POST /travel-itinerary`, JSON `monument_name`, optional `location`, `days`).
9. Monument comparison (`POST /compare-monuments`, JSON `monument1`, `monument2`).
10. Authentication/profile: original source uses Firebase email/password. This website currently offers a local-device visitor profile only; secure Firebase web authentication must be configured separately.
11. Light/dark theme.

## UP AI Mission mapping
- UC-1: text and voice guide, language selection, follow-up context.
- UC-2: image capture/upload and recognition integration point.
- UC-3: separate history vs folklore labels in guide guidance and editorial workflow.
- UC-4: self-guided audio stops, browser narration and optional proximity alerts.
- UC-5: preference-based sample itinerary, local craft/food suggestions (including regional craft starter cards) and destination discovery; official ODOP status, sellers, events and live details require trusted sources.
- UC-6: nearby facility categories and one-tap emergency call 112; map-provider searches are not verified listings.
- UC-7: quick, child-friendly, detailed and devotional experience modes.
- UC-8: text enlargement, page read-aloud control, keyboard-friendly controls, accessible-route and ramp/rest-point map searches; verified step-free route data still needs a trusted source.
- UC-9: Tourism Insights dashboard layout with synthetic demo figures; production needs a privacy-safe aggregate analytics pipeline.

## Website modules
Overview, Heritage Atlas, Visual Lens, Ask NagrikSetu, Nearby Explorer, Audio Journeys, Trip Planner, Heritage Timeline, Compare Monuments, Heritage Quiz, Saved Places, Visitor Essentials, Offline Packs, My Profile and Tourism Insights.

## Catalogue
The bundled JSON contains 54 starter records with special coverage for Gorakhpur and Lucknow and broader Uttar Pradesh / India landmarks. Every record is marked `review_required`; coordinates are approximate. It is not an official tourism directory.

## Honest capability boundary
Works locally: navigation, filters, saved places, local sample guide answers, local quiz, sample itinerary, sample timeline records, monument comparison from catalogue, browser speech, local audio narration, location permission and proximity checks, map pins, facility map-search links, offline JSON download, theme, accessibility text enlargement and local profile.

Requires a backend or provider: actual image recognition, YouTube frame analysis, AI chatbot responses, AI quiz generation, generated virtual-tour narratives, AI timeline, AI travel itinerary, authoritative live nearby facilities, account authentication and real visitor analytics.

The original upload did not include the custom Python AI backend. Configure `config.js` with its stable HTTPS base URL to connect supported endpoints. Do not use the temporary trycloudflare URL from the original source.
