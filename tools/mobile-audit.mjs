// Mobile audit: drives headless Chrome over every route at a phone viewport and
// reports the things that quietly break a layout - horizontal overflow, tap
// targets too small to hit, and text too small to read.
//
//   node tools/mobile-audit.mjs <baseUrl> <width> <height> [outDir]
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const [base, W = '390', H = '844', outDir] = process.argv.slice(2);
const ROUTES = ['/', '/iatros', '/ypiresies', '/prosopo', '/iatreio', '/epikoinonia'];
const port = 9800 + Math.floor(Math.random() * 400);

const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`,
   `--window-size=${W},${H}`, '--user-data-dir=/tmp/cb-audit-' + port, 'about:blank'],
  { stdio: 'ignore' });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let target;
for (let i = 0; i < 60; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    target = list.find(t => t.type === 'page');
    if (target) break;
  } catch {}
  await sleep(150);
}

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pending = new Map();
ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value;
};

const AUDIT = `(() => {
  const vw = window.innerWidth;
  const out = { overflow: [], smallTap: [], smallText: [], scrollWidth: document.documentElement.scrollWidth, vw };
  const seen = new Set();
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || cs.opacity === '0') continue;

    // Anything sticking past the right edge, or starting off the left.
    if (r.right > vw + 1 || r.left < -1) {
      if (cs.position !== 'fixed' && cs.overflowX !== 'auto' && cs.overflowX !== 'scroll') {
        const key = el.tagName + (el.className || '').toString().slice(0, 60);
        if (!seen.has(key)) {
          seen.add(key);
          out.overflow.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 80),
            left: Math.round(r.left), right: Math.round(r.right), text: (el.textContent || '').trim().slice(0, 40) });
        }
      }
    }

    // Interactive things people actually have to hit with a thumb.
    if (el.matches('a, button, [role=button], input, select')) {
      const h = r.height, w = r.width;
      if (h > 0 && (h < 40 || w < 40)) {
        out.smallTap.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 60),
          w: Math.round(w), h: Math.round(h), text: (el.textContent || '').trim().slice(0, 40) });
      }
    }

    // Body-ish text under 12px is a strain on a phone.
    const fs = parseFloat(cs.fontSize);
    const ownText = Array.from(el.childNodes).filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join('');
    if (ownText.length > 2 && fs < 12) {
      out.smallText.push({ tag: el.tagName, size: fs, text: ownText.slice(0, 40) });
    }
  }
  return JSON.stringify(out);
})()`;

await send('Page.enable');
await send('Runtime.enable');
if (outDir) mkdirSync(outDir, { recursive: true });

const report = {};
for (const route of ROUTES) {
  await send('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: 2, mobile: true });
  await send('Page.navigate', { url: base + route });
  await sleep(3800);
  report[route] = JSON.parse(await evaluate(AUDIT));

  if (outDir) {
    // Capture by scrolling a real phone-sized viewport, never by growing the
    // viewport to the page height: these layouts use dvh units, so a tall
    // viewport stretches the hero to the full document and the shot goes blank.
    const name = route === '/' ? 'home' : route.slice(1);
    await evaluate("document.documentElement.style.scrollBehavior='auto'");
    const full = await evaluate('document.documentElement.scrollHeight');
    const steps = Math.min(Math.ceil(full / +H), 12);
    for (let i = 0; i < steps; i++) {
      await evaluate(`window.scrollTo(0, ${i} * ${+H})`);
      await sleep(900);
      const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      writeFileSync(`${outDir}/${name}-${String(i + 1).padStart(2, '0')}.png`, Buffer.from(shot.result.data, 'base64'));
    }
    await evaluate('window.scrollTo(0, 0)');
  }
}

console.log(JSON.stringify(report, null, 1));
ws.close(); chrome.kill();
