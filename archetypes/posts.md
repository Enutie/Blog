---
# ─── Required ────────────────────────────────────────────────
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
date: {{ .Date }}
draft: true                 # flip to false when the post is ready to publish

# One or two sentences — the excerpt shown under the title in the log list,
# and used for <meta description>, Open Graph & Twitter cards.
description: ""

# The tag decides which pursuit card this post feeds on enutie.com.
# Use EXACTLY one of these five slugs (must match, or the feed 404s):
#   drawing · gamedev · wargaming · writing · music
# Extra tags (devlog, learning, …) are fine — the main site ignores them.
tags: [""]

# ─── Optional (delete the ones you don't use) ────────────────
# summary: ""                # overrides Hugo's auto-generated excerpt
# lastmod: {{ .Date }}       # set when you edit an already-published post

# stats = feeds the "latest numbers" on the homepage pursuit card.
# Only the newest post that has a stats line is shown, so set it whenever
# the numbers change (leaving it off is harmless — old numbers keep showing).
# stats: ["4 lessons done", "250 boxes · 1 dragon"]
---

<!--
Writing notes (delete this block before publishing):

  Heading  — the title above is already the page <h1>, so DON'T start the body
             with `#`. Jump straight into text, or open with a `## Section`.

  Images   — drop image files in THIS folder, reference them by filename:
             ![alt text](feature.png)

  Quotes   — `> quoted line` renders as the oxblood-bordered callout.

  Statstrip — optional honest-numbers strip at the end of the post. Shortcode
              form is a less-than sign wrapped in double curly braces, e.g.
              statstrip "progress: lessons 4/8 · boxes 250/250 · dragons 1/∞"
              (see any existing post, or layouts/shortcodes/statstrip.html)
-->


<!-- Hook (1–2 sætninger): Hvad skete der? Sig det med det samme. "I finished the 250 box challenge last night." -->

<!-- Kontekst (1 kort afsnit): Hvorfor gjorde du det, og hvor kom du fra? Link til tidligere indlæg i stedet for at genfortælle. -->

<!-- Kernen (2–4 afsnit): Den ene ting du lærte, opdagede eller kæmpede med. Vær specifik — vis eksemplet, fejlen, billedet. -->


<!-- Ærligt status-tjek (1 afsnit): Hvad virkede ikke? Hvad er du stadig i tvivl om? (Det er dét, der gør loggen værd at genlæse.) -->


<!-- Næste skridt (1–2 sætninger): Konkret og lille. "Next up: lesson 4, texture." Aldrig et vagt "we'll see!" -->


{{< statstrip "41 models painted - Two Spearheads completed" >}}