# Beliani WXT Chrome Extension Boilerplate

## Quick project summary

This repo is a WXT-based Chrome extension boilerplate using React + TypeScript. It contains popup UI, content script entrypoints and build tooling configured via `wxt`.

## Requirements

- Node.js
- [npm/pnpm (up to step 4.)](https://gist.github.com/kkazzann/b50c70d7ad0babf255231269399219dd)

or all-in-one replacement - [Bun](https://bun.com/docs/installation)

## Useful links

```
WXT Docs:
```

- https://wxt.dev/guide/essentials/entrypoints.html
- https://wxt.dev/guide/essentials/config/auto-imports.html
- https://wxt.dev/guide/essentials/extension-apis.html
- https://wxt.dev/storage.html

```
Misc:
```

- [fnm installation](https://github.com/Schniz/fnm)
- [fnm env setup](https://github.com/Schniz/fnm?tab=readme-ov-file#powershell)
- [Bun installation](https://bun.com/docs/installation)

## Usage

```
Build to production:
```

- `wxt build` - bundles code into ./output/chrome-mv3/
- `wxt zip` - zips ./output/chrome-mv3/ into ./output/chrome-mv3/[pkg.name].[pkg.version]-chrome.zip

```
Development:
```

- `wxt dev` - runs dev server with hot reload & opens browser with declared starting pages
