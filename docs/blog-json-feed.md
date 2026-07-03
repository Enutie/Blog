# Blog JSON feed — wiring the pursuits board to the blog

The homepage's pursuit cards fetch per-tag JSON from the blog at load
(`src/composables/useBlogFeed.ts`) and fill in the "latest entry" block. This
doc is the **Hugo side** — drop it into the `blog.enutie.com` repo. Until it
exists, the cards fall back to the static content in `src/data/pursuits.ts`
(no spinner, no error — by design).

The site fetches: `https://blog.enutie.com/tags/<tag>/index.json`
for the five pursuit tags: `drawing`, `wargaming`, `gamedev`, `writing`, `music`.

## 1. Enable JSON output for taxonomy term pages

In `hugo.toml` (or `config.toml`):

```toml
[outputs]
  # a term page is a single tag page, e.g. /tags/drawing/
  term = ["HTML", "RSS", "JSON"]
```

> Older Hugo versions call this kind `taxonomy` instead of `term`
> (`taxonomy = ["HTML", "RSS", "JSON"]`). Use whichever your version reports.

## 2. Add the term JSON template

Create `layouts/_default/term.json` (older Hugo: `layouts/taxonomy/term.json`):

```go-html-template
{{- $posts := .Pages -}}
{
  "tag": {{ .Title | jsonify }},
  "count": {{ len $posts }},
  "posts": [
    {{- range $i, $p := first 10 $posts -}}
    {{- if $i }},{{ end }}
    {
      "title": {{ $p.Title | jsonify }},
      "url": {{ $p.Permalink | jsonify }},
      "date": {{ $p.Date.Format "2006-01-02T15:04:05Z07:00" | jsonify }},
      "stats": {{ with $p.Params.stats }}{{ . | jsonify }}{{ else }}[]{{ end }}
    }
    {{- end }}
  ]
}
```

This produces exactly the shape the site expects:

```json
{
  "tag": "Drawing",
  "count": 3,
  "posts": [
    { "title": "Lesson 3 Review",
      "url": "https://blog.enutie.com/posts/lesson-3-review/",
      "date": "2025-09-02T16:55:48+02:00",
      "stats": ["3 lessons done", "250 boxes · 1 dragon"] }
  ]
}
```

## What the homepage derives from this (autopilot)

- **Latest entry** on each pursuit card = `posts[0]` (newest first).
- **Stats lines** = the `stats` list of the newest post that has one. Set it in
  a post's frontmatter whenever the numbers change:

  ```toml
  stats = ['3 lessons done', '250 boxes · 1 dragon']
  ```

  Posts without `stats` are skipped, so the previous numbers keep showing —
  forgetting it is harmless.
- **State** (active/resting/queued) = posting recency: a post within ~90 days →
  `active`, older → `resting`, no posts at all → `queued`. A pursuit can pin its
  state with `stateOverride` in the Vite repo's `src/data/pursuits.ts`
  (Warbands does this).
- Successful responses are cached in the visitor's localStorage, so the cards
  survive blog downtime without going stale-prototype.

The site reads `posts[0]` (newest first — Hugo orders `.Pages` by date desc by
default) for the latest-entry block, and formats the date to `jun 26` style.
`count` is available if you later want to surface it in the stats line.

## 3. CORS

The fetch is cross-origin (`enutie.com` → `blog.enutie.com`). GitHub Pages
serves static files with `Access-Control-Allow-Origin: *`, so it works out of
the box. If the blog ever moves to a host that doesn't send that header, the
fetch will be blocked and the cards will simply keep the static fallback.

## 4. Tag names must match

The `tag` values in `src/data/pursuits.ts` must equal the blog's taxonomy term
slugs. If a blog post is tagged `game-dev` but the pursuit uses `gamedev`, the
feed 404s and that card stays on fallback. Keep the five slugs in sync.
