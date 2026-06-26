# Launch Board

A tiny local kanban for everything still on Meher's side before go-live
(credentials, assets, sign-offs). Dragging a card between columns rewrites the
**`## Launch board status`** section of [`docs/PENDING_ASSETS.md`](../docs/PENDING_ASSETS.md)
on disk — so the markdown always mirrors the board.

This is an internal tool. It is **not** part of the website and is never
deployed (Astro only builds `src/pages/`; the deploy uploads `dist/`).

## Run it

```bash
node board/server.mjs
```

Then open **http://localhost:5050**. No dependencies, no install — it uses only
the Node standard library. (Override the port with `PORT=8080 node board/server.mjs`.)

- **Drag** a card to another column, or use the **◀ ▶** buttons on each card
  (works on trackpad, touch, and keyboard).
- Every move saves immediately to `board/tasks.json` (the source of truth) and
  regenerates the managed section of `docs/PENDING_ASSETS.md`.
- The **📄 link** on each card opens its source doc (read-only).

## Why a server instead of just an HTML file?

Browsers sandbox `file://` pages — they cannot write to disk. A static board
opened by double-click could not update the markdown. This ~150-line local
server is the bridge that lets a drag persist to the file.

## Just update the markdown (no UI)

```bash
node board/server.mjs --sync
```

Regenerates the `docs/PENDING_ASSETS.md` board section from `board/tasks.json`
and exits. Useful in CI or after hand-editing `tasks.json`.

## Files

| File | Role |
|------|------|
| `tasks.json` | Source of truth — the task list and each card's column. |
| `board.html` | The kanban UI (self-contained). |
| `server.mjs` | Zero-dep HTTP server: serves the UI, persists moves, syncs the md. |
| `board-render.mjs` | Pure functions: move a task, render the markdown mirror. |

## Add or edit tasks

Edit `board/tasks.json` (each task: `id`, `title`, `category`, `priority`
`high|med|low`, `gate` bool, `detail`, `source: { file, ref }`, `column`), then
either reload the board or run `node board/server.mjs --sync`.
