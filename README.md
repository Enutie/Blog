# Enutie Blog — blog.enutie.com

"The log" — the chronological diary side. Built with
[Hugo](https://gohugo.io) and **no theme**: all design lives in custom layouts.
The main site (enutie.com) pulls
the "latest entry" per pursuit from a JSON feed served here.

## Quick start

```bash
hugo server                             # local preview at http://localhost:1313 (auto-reload)
hugo --gc --minify --cleanDestinationDir # build to ./public (clears stale files first)
```

Requires **Hugo extended**. Check your version with `hugo version` (developed on
v0.140).

New post:

```bash
hugo new posts/my-post/index.md
```

Put images in the same folder as `index.md` and reference them relatively
(`![alt](image.jpg)`) — these are "page bundles".

## Writing a post

A post is one folder under `content/posts/<slug>/` with an `index.md` and any
images beside it. Start from this template:

```markdown
---
title: "Lesson 4 review"
date: 2026-07-02
draft: false
description: "One or two sentences — this is the excerpt shown in the log list."
tags: ["drawing"]
---

Opening paragraph. The title above is already the page heading, so **do not
start the body with `#`** — jump straight into text or a `## Section`.

## A section heading

Some writing. Link like [this](https://example.com).

![what the image shows](my-screenshot.jpg)

> A quote or piece of feedback. Renders as the oxblood-bordered callout.

{{< statstrip "progress: lessons 4/8 · boxes 250/250 · dragons 1/∞" >}}
```

**Frontmatter fields**

| Field | Needed? | Notes |
|-------|---------|-------|
| `title` | yes | Becomes the page `<h1>`. Don't repeat it in the body. |
| `date` | yes | Controls order (newest first) and the meta line. |
| `draft` | optional | `true` hides it from the built site; preview with `hugo server -D`. |
| `description` | recommended | The one-line excerpt under the title in the log list. Omit it and the row simply has no excerpt (that's allowed). |
| `tags` | for the feed | See the tag convention below. |

## Following the design — cheat sheet

The design is recreated in the layouts + `static/css/main.css`; you get it for
free **as long as the Markdown uses the right elements**. Match design element
to Markdown like this:

| Design element | Write in Markdown | Don't |
|----------------|-------------------|-------|
| Page title | `title:` in frontmatter | a body `# H1` (there is no `.prose h1` style — it renders unstyled) |
| Section heading (Bitter 24px) | `## Heading` | skipping to `###` for a top-level section |
| Sub-heading (Bitter 18px) | `### Heading` | |
| Body text | plain paragraphs | |
| Prose link (oxblood, underlined) | `[text](url)` | pasting a bare URL for anything but throwaway links |
| Figure (white card, 1px border) | `![alt](image.jpg)` in a page bundle | linking to an external image host |
| Feedback / quote (oxblood left band) | `> quoted line` | indenting text 4 spaces — that becomes a code block |
| Honest-numbers strip | `{{< statstrip "…" >}}` shortcode | inventing percentages or streaks |
| Emphasis | `*italic*`, `**bold**` | ALL CAPS for emphasis |

## How it fits together

```
hugo.toml                     # config: outputs (JSON feed), taxonomies (tags)
content/posts/<slug>/index.md # the posts (page bundles with their own images)
archetypes/default.md         # template for new posts
layouts/
  _default/baseof.html        # HTML skeleton: fonts, banner, footer
  _default/list.html          # "The log" + tag filters (also tag pages)
  _default/single.html        # single post: header, prose, older/newer nav
  _default/term.json          # the JSON feed for the main site (see below)
  index.html                  # front page = the log
  partials/{banner,footer}.html
  shortcodes/statstrip.html   # honest-numbers stat strip
static/
  css/main.css                # design tokens + all components (light, radius 0)
  favicon.svg + pngs          # the Enutie favicon
docs/blog-json-feed.md        # the feed contract (from the design system)
```

## The JSON feed for the main site

The main site's pursuit cards fetch `https://blog.enutie.com/tags/<tag>/index.json`
and fill in the "latest entry" block. The shape is defined in
`docs/blog-json-feed.md` and produced by `layouts/_default/term.json`:

```json
{ "tag": "Drawing", "count": 5,
  "posts": [ { "title": "…", "url": "…", "date": "2025-09-02T…" } ] }
```

### The tag convention (important!)

The main site fetches **five fixed slugs — one per pursuit**:

```
drawing · gamedev · wargaming · writing · music
```

A post shows up on a pursuit card by carrying that exact tag. Write `game-dev`
or `game dev` instead of `gamedev` and the feed 404s, so the card falls back to
static content (no error, by design). Keep the five slugs in sync. Other tags
(`devlog`, `learning`, …) are fine — the main site just doesn't read them.

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/hugo.yml`) builds with
`hugo --minify` and deploys to GitHub Pages. `public/` is build output and is
**not** committed (see `.gitignore`).

## Design principles (from the handoff — keep them)

No gradients, no shadows, no rounded corners, no emoji, no vague marketing copy.
Red (`#6E1A1A`) is budgeted: banner + one rule/band per view + links. No fake
progress — only countable artifacts (lessons done, games shipped, models
painted). Voice is first-person, specific, lightly self-deprecating.
