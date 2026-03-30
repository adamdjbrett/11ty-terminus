# Terminus (Eleventy Port)

Eleventy `3.1.5` port of the original Terminus Zola theme.

## Credit

- Original theme: `ebkalderon/terminus`
- Upstream inspirations: `panr/hugo-theme-terminal`, `ejmg/zerm`, `welpo/tabi`
- This repository is an Eleventy/Nunjucks port.

## Stack

- Eleventy `3.1.5`
- Nunjucks templates
- Luxon date filters
- Pagefind search indexing

## Commands

```bash
npm ci
npm run start
npm run build
```

`npm run build` is the CI/deploy build command. It outputs the site to `_site/` and generates Pagefind search files at `_site/pagefind/`.

## Deployment

This repository deploys with GitHub Actions + GitHub Pages:

1. `npm ci`
2. `npm run build`
3. Upload `_site` as the Pages artifact
4. Deploy via `actions/deploy-pages`

Workflow file: `.github/workflows/zola.yml` (Eleventy-based despite filename).

## Notes

- Project structure now follows a standard Eleventy pattern: content in `content/`, passthrough assets in `public/`, shared templates in `_includes/`, and global data in `_data/`.
- KaTeX assets and math rendering are kept for existing math posts (for example `content/posts/2025-12-23-math-typesetting.md`).
- `scripts/build-css.mjs` remains in place. Sass currently emits deprecation warnings (`to-upper-case`); migrate to `string.to-upper-case` in a follow-up to avoid future breakage.

## Routes

- `/`
- `/blog/`
- `/archive/`
- `/tags/` and `/tags/:tag/`
- `/categories/` and `/categories/:category/`
- `/projects/`
- `/feed/feed.xml`
- `/sitemap.xml`
- `/robots.txt`
- `/humans.txt`

## License

See [LICENSE](LICENSE).
