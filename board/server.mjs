#!/usr/bin/env node
/**
 * server.mjs — tiny zero-dependency server for the MyKhanWrites launch board.
 *
 * Why a server at all? A static HTML file opened via file:// cannot write to
 * disk (browser sandbox). This local server is what lets dragging a card
 * rewrite docs/PENDING_ASSETS.md. Uses only the Node standard library.
 *
 *   node board/server.mjs          → serve the board at http://localhost:5050
 *   node board/server.mjs --sync   → just rewrite the markdown mirror and exit
 *   PORT=8080 node board/server.mjs → override the port
 *
 * Routes:
 *   GET  /              → the kanban UI (board.html)
 *   GET  /api/tasks     → current board state (board/tasks.json)
 *   POST /api/move      → { id, column }; persists tasks.json + syncs the md
 *   GET  /open?path=…   → read-only view of a repo file (sandboxed to repo root)
 *
 * Source of truth is board/tasks.json. docs/PENDING_ASSETS.md gets a managed
 * "Launch board status" section (between BOARD markers) regenerated on every
 * move — that is the markdown that "automatically updates".
 */
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join, relative, sep } from 'node:path';
import {
  validateBoard,
  applyMove,
  renderMarkdownSection,
  upsertSection,
} from './board-render.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const TASKS_PATH = join(__dirname, 'tasks.json');
const BOARD_HTML = join(__dirname, 'board.html');
const MD_TARGET = join(REPO_ROOT, 'docs', 'PENDING_ASSETS.md');
const PORT = Number(process.env.PORT) || 5050;
const MAX_BODY = 1_000_000;

async function loadBoard() {
  const raw = await readFile(TASKS_PATH, 'utf8');
  return validateBoard(JSON.parse(raw));
}

async function saveBoard(board) {
  await writeFile(TASKS_PATH, `${JSON.stringify(board, null, 2)}\n`, 'utf8');
}

async function syncMarkdown(board) {
  const section = renderMarkdownSection(board);
  const current = existsSync(MD_TARGET) ? await readFile(MD_TARGET, 'utf8') : '';
  const next = upsertSection(current, section);
  if (next !== current) await writeFile(MD_TARGET, next, 'utf8');
  return MD_TARGET;
}

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
}

function sendJson(res, status, obj) {
  send(res, status, JSON.stringify(obj));
}

function readBody(req) {
  return new Promise((resolvePromise, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(new Error('request body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolvePromise(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

// Serve a repo file read-only, sandboxed to REPO_ROOT (rejects path traversal).
async function serveRepoFile(res, relPath) {
  const target = resolve(REPO_ROOT, relPath);
  if (target !== REPO_ROOT && !target.startsWith(REPO_ROOT + sep)) {
    return sendJson(res, 403, { error: 'path outside repo' });
  }
  if (!existsSync(target)) {
    return sendJson(res, 404, { error: 'file not found', path: relPath });
  }
  try {
    const content = await readFile(target, 'utf8');
    return send(res, 200, content, 'text/plain; charset=utf-8');
  } catch (err) {
    return sendJson(res, 500, { error: String(err?.message ?? err) });
  }
}

async function handleMove(req, res) {
  const body = await readBody(req);
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return sendJson(res, 400, { error: 'invalid JSON body' });
  }
  const { id, column } = payload ?? {};
  if (typeof id !== 'string' || typeof column !== 'string') {
    return sendJson(res, 400, { error: 'id and column are required strings' });
  }
  const board = await loadBoard();
  let next;
  try {
    next = applyMove(board, id, column, new Date().toISOString());
  } catch (err) {
    return sendJson(res, 400, { error: String(err?.message ?? err) });
  }
  await saveBoard(next);
  await syncMarkdown(next);
  return sendJson(res, 200, next);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const path = url.pathname;

    if (req.method === 'GET' && (path === '/' || path === '/index.html')) {
      return send(res, 200, await readFile(BOARD_HTML, 'utf8'), 'text/html; charset=utf-8');
    }
    if (req.method === 'GET' && path === '/api/tasks') {
      return sendJson(res, 200, await loadBoard());
    }
    if (req.method === 'POST' && path === '/api/move') {
      return await handleMove(req, res);
    }
    if (req.method === 'GET' && path === '/open') {
      const p = url.searchParams.get('path');
      if (!p) return sendJson(res, 400, { error: 'path query param required' });
      return await serveRepoFile(res, p);
    }
    return sendJson(res, 404, { error: 'not found' });
  } catch (err) {
    return sendJson(res, 500, { error: String(err?.message ?? err) });
  }
});

async function main() {
  const board = await loadBoard();
  const target = await syncMarkdown(board);
  if (process.argv.includes('--sync')) {
    console.log(`✓ Synced launch board status → ${relative(REPO_ROOT, target)}`);
    return;
  }
  server.listen(PORT, () => {
    console.log('');
    console.log('  MyKhanWrites — Launch Board');
    console.log(`  ▸ open  http://localhost:${PORT}`);
    console.log('  ▸ drag a card and docs/PENDING_ASSETS.md updates on disk');
    console.log('  ▸ Ctrl-C to stop');
    console.log('');
  });
}

main().catch((err) => {
  console.error('✗ board server failed:', err?.message ?? err);
  process.exit(1);
});
