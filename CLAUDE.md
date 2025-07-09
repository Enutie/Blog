# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo static site generator project for the blog at https://blog.enutie.com/. The site features blog posts about drawing, game development, and creative projects.

## Technology Stack

- **Hugo**: Static site generator (version 0.137.1 as specified in GitHub Actions)
- **Theme**: LoveIt (installed as Git submodule)
- **Deployment**: GitHub Pages via GitHub Actions
- **Content**: Markdown files organized by categories (posts, drawing, games, writing)

## Development Commands

### Building the Site
```bash
hugo
```

### Development Server
```bash
hugo server
```

### Production Build
```bash
hugo --gc --minify --baseURL "https://blog.enutie.com/"
```

### Module Updates
```bash
hugo mod get -u
hugo mod tidy
```

## Architecture

### Content Structure
- `/content/posts/` - Blog posts with various topics (drawing, game dev, etc.)
- `/content/drawing/` - Drawing-related content and lessons
- `/content/games/` - Game development projects and devlogs
- `/content/writing/` - Writing-related content

### Configuration
- `/config/_default/` - Hugo configuration split into multiple TOML files
- `/hugo.toml` - Main Hugo configuration (legacy, prefer config/_default/)
- Theme configuration uses Congo v2 theme system

### Static Assets
- `/static/` - Static files served directly
- `/assets/` - Assets processed by Hugo (images, etc.)
- `/layouts/shortcodes/` - Custom Hugo shortcodes (iframe.html)

### Content Organization
Posts use Hugo's page bundle system with `index.md` files and associated media in the same directory. Each post typically includes:
- Feature images
- Inline images for content
- Proper front matter with tags and categories

## Deployment

The site auto-deploys to GitHub Pages on pushes to the main branch via `.github/workflows/hugo.yaml`. The workflow:
1. Installs Hugo CLI (extended version)
2. Installs Dart Sass
3. Builds the site with production settings
4. Deploys to GitHub Pages

## Content Guidelines

When working with content:
- Use page bundles (directory with index.md) for posts with media
- Place images in the same directory as the post
- Use Hugo's image processing features for optimization
- Follow existing tag and category conventions
- Maintain consistent front matter structure