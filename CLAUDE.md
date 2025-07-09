# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo static site generator project for the blog at https://blog.enutie.com/. The site features blog posts about drawing, game development, and creative projects.

## Technology Stack

- **Hugo**: Static site generator
- **Theme**: Ananke (simple, reliable theme)
- **Deployment**: GitHub Pages via GitHub Actions
- **Content**: Markdown files in `/content/posts/`

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
hugo --minify
```

## Configuration

- `hugo.toml` - Main Hugo configuration
- Theme: Ananke (included in `/themes/ananke/`)
- Clean setup without submodules

## Deployment

The site deploys to GitHub Pages via GitHub Actions on pushes to the main branch.

## Content Structure

Posts are in `/content/posts/` as Markdown files with front matter.