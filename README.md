# NagrikSetu — Complete Website

**A website-only heritage discovery and tourism companion for India, with special regional coverage for Gorakhpur and Lucknow.**

This project is a web-first adaptation of the supplied Virasat Flutter source and the UP AI Mission AI Tourism Companion problem statement. It contains no Flutter, Android or iOS project.

## 1. Run locally

Recommended: Node.js 18+.

```bash
# from the NagrikSetu_Website folder
npx serve .
```

Open the URL shown in the terminal (usually `http://localhost:3000`).

Alternative:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

Do not open `index.html` directly as a `file://` URL: browser fetch, service worker, and offline catalogue loading require a local web server.

## 2. Website modules

- Overview and regional spotlights
- Heritage Atlas (54 starter destinations, search, city/state/category filters)
- Visual Lens (image upload/camera selection, YouTube URL/video selection)
- Ask NagrikSetu (text, browser voice input, visitor modes, source/folklore guidance)
- Nearby Explorer (Leaflet + OpenStreetMap, geolocation, radius 10–200 km)
- Audio Journeys (narrative/documentary/poetic, browser text-to-speech, Hindi/English speech)
- Trip Planner (days, interests, group, budget and pace)
- Heritage Timeline
- Compare Monuments
- Heritage Quiz (five-question local demo, difficulty selection)
- Saved Places
- Visitor Essentials (hospitals, police, toilets, parking, water, tourist help, food and crafts; emergency 112)
- Offline Packs (download city-level JSON data)
- My Profile (local preferences)
- Tourism Insights (synthetic demo dashboard, not real visitor data)
- Dark mode and larger text accessibility setting
- PWA shell caching

## 3. Enable the original Virasat backend

Open `config.js` for the original Virasat backend. Open `firebase-config.js` to enable optional Firebase Web email/password authentication.\n\nOpen `config.js`:

```js
window.NAGRIKSETU_CONFIG = {
  API_BASE_URL: "https://YOUR_STABLE_HTTPS_API_DOMAIN",
  API_TIMEOUT_MS: 75000,
  ENABLE_ANALYTICS: false
};
```

The original `trycloudflare.com` URL in the supplied Flutter project was temporary and included trailing whitespace. It is intentionally not reused.

Supported original endpoints:
- `POST /predict`
- `POST /process-youtube`
- `POST /chat`
- `POST /heritage-quiz`
- `POST /monument-story` (available in backend contract; website narration has a browser fallback)
- `POST /heritage-timeline`
- `POST /travel-itinerary`
- `POST /compare-monuments`
- `POST /nearby-heritage`
- `GET /health`

The deployed backend must allow your website domain through CORS. Use HTTPS. Never put provider secrets in `app.js` or `config.js`; secrets belong on the server.

The original mobile source documents Firebase email/password auth, but this website currently uses local-device visitor preferences rather than secure account authentication. Configure Firebase Web Auth or another identity provider before using real accounts.

## 4. Deploy

### Vercel
1. Create a GitHub repository and upload the contents of this folder.
2. Import the repository in Vercel.
3. Framework preset: Other.
4. Build command: leave blank.
5. Output directory: `.`.
6. Deploy.

### Netlify
1. Drag the project folder into Netlify Drop, or connect GitHub.
2. Publish directory: `.`.
3. No build command required.

### Static hosting
Upload the full folder while preserving the `assets/` and `docs/` directories. Enable HTTPS.

## 5. How to use the website

1. Open Overview.
2. Use the Gorakhpur or Lucknow regional cards, or open Heritage Atlas.
3. Search by place, city, state or category.
4. Open a place card for its Place Passport and map directions.
5. Save favourite destinations with the heart icon.
6. Open Visual Lens to select a photograph or a YouTube link.
7. Open Ask NagrikSetu to type or speak a question and choose a visitor mode.
8. Use Nearby Explorer to select a city or share browser location and choose a radius.
9. Build Audio Journeys and press play at each stop; optionally enable proximity alerts.
10. Use Trip Planner, Timeline, Compare and Quiz.
11. Download a city pack in Offline Packs before travelling.
12. Visitor Essentials opens map-provider searches and offers emergency call 112.
13. Tourism Insights is a sample dashboard for presentation; replace synthetic data with an approved analytics source before official use.

## 6. Content accuracy and public launch

The 54-record catalogue is a starter dataset, not an official verified directory. All entries are marked `review_required`, and coordinates are approximate. Verify exact locations, site access, current timings, fees, emergency facilities, accessibility, historical facts and sources before public release.

Suggested verification sources:
- Archaeological Survey of India: https://asi.nic.in/
- Ministry of Tourism: https://tourism.gov.in/
- Uttar Pradesh Tourism: https://uptourism.gov.in/
- Incredible India: https://www.incredibleindia.gov.in/

Do not present unverified opening hours, fees, route accessibility or emergency facility availability as confirmed facts.

## 7. Test checklist

- [ ] Desktop and mobile navigation
- [ ] Search/filter by Gorakhpur and Lucknow
- [ ] Save/remove a place and refresh
- [ ] Image preview and configured backend recognition
- [ ] YouTube link validation and backend response
- [ ] Chat local demo and live API
- [ ] Browser microphone permission
- [ ] Nearby city search and browser geolocation
- [ ] Leaflet map and OSM attribution
- [ ] Audio narration and proximity alerts
- [ ] Itinerary generation and backend integration
- [ ] Timeline and comparison
- [ ] Quiz scoring
- [ ] Download offline packs
- [ ] PWA offline shell
- [ ] Keyboard navigation, contrast, larger text
- [ ] Production privacy notice, consent and account security
