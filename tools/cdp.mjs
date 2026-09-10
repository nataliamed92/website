// Minimal Chrome DevTools Protocol driver: node cdp.mjs <url> <width> <height> <outPng> [evalExpr]
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
const [url, w, h, out, expr] = process.argv.slice(2);
const port = 9333 + Math.floor(Math.random() * 500);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--window-size=${w},${h}`, '--user-data-dir=/tmp/cb-cdp-' + port, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let target;
for (let i = 0; i < 40; i++) { try { const r = await fetch(`http://127.0.0.1:${port}/json`); const list = await r.json(); target = list.find(t => t.type === 'page'); if (target) break; } catch {} await sleep(150); }
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pending = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 800 });
await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url });
await sleep(+(process.env.CDP_WAIT || 1800));
if (expr) { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); console.log(JSON.stringify(r.result?.result?.value ?? r.result, null, 1)); }
if (out) { const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }); writeFileSync(out, Buffer.from(shot.result.data, 'base64')); }
ws.close(); chrome.kill();
