# How to update the event database

1. Replace **`src/data/eventsAll.json`** with your full events JSON array.
2. Commit and push to `main`.
3. GitHub Actions will rebuild and deploy automatically.

Expected format: a JSON **array** of events (same as `life_glitch_events_final.json`).

Each event needs:
- `id`, `category`, `minAge`, `maxAge`, `conditions`
- `text`: `{ "en": "...", "zh": "..." }`  (optional `zhCN` for 简体)
- `choices`: two options with `text` + `effects`

Current target: **227 events**.
