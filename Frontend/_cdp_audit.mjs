// Layout audit via Chrome DevTools Protocol — no external deps (Node 22+ WebSocket).
// Tests every route at every required breakpoint for horizontal overflow,
// single footer, and gathers overflow diagnostics.

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9333;
const BASE = "http://localhost:3000";

const ROUTES = ["/", "/services", "/work", "/about", "/contact", "/privacy-policy", "/terms-conditions"];
const VIEWPORTS = [
  { label: "mobile-375", width: 375, height: 812, mobile: true, dsf: 2 },
  { label: "mobile-414", width: 414, height: 896, mobile: true, dsf: 2 },
  { label: "tablet-768", width: 768, height: 1024, mobile: true, dsf: 2 },
  { label: "laptop-1024", width: 1024, height: 768, mobile: false, dsf: 1 },
  { label: "laptop-1280", width: 1280, height: 800, mobile: false, dsf: 1 },
  { label: "desktop-1440", width: 1440, height: 900, mobile: false, dsf: 1 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url} -> ${res.status}`);
  return res.json();
}

function waitForPort(host, port, timeoutMs) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        await fetch(`http://${host}:${port}/json/version`);
        resolve();
      } catch {
        if (Date.now() - started > timeoutMs) reject(new Error("Chrome CDP port did not come up"));
        else setTimeout(tick, 250);
      }
    };
    tick();
  });
}

const userDataDir = mkdtempSync(join(tmpdir(), "corecraft-cdp-"));

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${userDataDir}`,
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-gpu",
  "--hide-scrollbars",
  "--disable-background-networking",
  "--disable-extensions",
  "--mute-audio",
], { stdio: "ignore", windowsHide: true });

const results = [];
let passed = 0;
let failed = 0;

try {
  await waitForPort("127.0.0.1", PORT, 20000);

  for (const vp of VIEWPORTS) {
    const targets = await fetchJson(`http://127.0.0.1:${PORT}/json/list`);
    const page = targets.find((t) => t.type === "page");
    if (!page) throw new Error("No page target");

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 0;
    const pending = new Map();
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && pending.has(data.id)) {
        const { resolve, reject } = pending.get(data.id);
        pending.delete(data.id);
        if (data.error) reject(new Error(data.error.message));
        else resolve(data.result);
      }
    };
    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = ++msgId;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });

    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.dsf,
      mobile: vp.mobile,
    });

    for (const route of ROUTES) {
      await send("Page.navigate", { url: BASE + route });
      await sleep(2600);

      const evalResult = await send("Runtime.evaluate", {
        returnByValue: true,
        expression: `(() => {
          const innerW = window.innerWidth;
          const docW = document.documentElement.scrollWidth;
          const bodyW = document.body.scrollWidth;
          const footers = document.querySelectorAll('footer').length;
          const hasHScroll = docW > innerW + 1 || bodyW > innerW + 1;
          const offenders = [];
          if (hasHScroll) {
            document.querySelectorAll('body *').forEach((el) => {
              const r = el.getBoundingClientRect();
              if (r.width > 0 && (r.right > innerW + 2 || r.left < -2)) {
                let p = el.parentElement;
                let clipped = false;
                while (p && p !== document.body) {
                  const cs = window.getComputedStyle(p);
                  if (/(hidden|clip|auto|scroll)/.test(cs.overflowX)) { clipped = true; break; }
                  p = p.parentElement;
                }
                if (!clipped) {
                  offenders.push({
                    tag: el.tagName,
                    cls: (typeof el.className === "string" ? el.className : "").slice(0, 60),
                    right: Math.round(r.right),
                    left: Math.round(r.left),
                  });
                }
              }
            });
          }
          const navVisible = !!document.querySelector('nav');
          const mbBtn = document.querySelector('header, nav') ;
          const mobileButtonVisible = (() => {
            const btn = document.querySelector('nav button[aria-expanded]');
            if (!btn) return "N/A";
            const r = btn.getBoundingClientRect();
            return r.width > 0 && r.height > 0;
          })();
          return {
            route: location.pathname,
            innerW, docW, bodyW, hasHScroll, footers, navVisible,
            mobileMenuButton: mobileButtonVisible,
            offenders: offenders.slice(0, 5),
          };
        })()`,
      });

      const value = evalResult.result?.value;
      const ok = value && !value.hasHScroll && value.footers === 1 && value.navVisible;
      if (ok) passed++; else failed++;
      results.push({ vp: vp.label, route, ok, ...value });
      console.log(JSON.stringify({ vp: vp.label, route, ok, ...value }));
    }

    ws.close();
  }
} catch (err) {
  console.error("CDP audit error:", err.message);
  process.exitCode = 2;
} finally {
  chrome.kill();
  try { rmSync(userDataDir, { recursive: true, force: true }); } catch {}
}

console.log(`\n==== AUDIT SUMMARY: ${passed} passed, ${failed} failed ====`);
process.exit(failed > 0 ? 1 : 0);