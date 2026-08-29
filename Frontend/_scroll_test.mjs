// End-to-end test for the scroll-driven horizontal strip (ServicesSection).
// Proves vertical scroll (wheel on desktop, native touch swipe on mobile)
// drives translateX on the pinned track — no direct left/right swipe needed.

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9334;
const BASE = "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url) {
  const res = await fetch(url);
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
        if (Date.now() - started > timeoutMs) reject(new Error("CDP timeout"));
        else setTimeout(tick, 250);
      }
    };
    tick();
  });
}

const userDataDir = mkdtempSync(join(tmpdir(), "corecraft-hscroll-"));
const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${userDataDir}`, "--no-first-run", "--no-default-browser-check",
  "--disable-gpu", "--hide-scrollbars", "--disable-background-networking",
  "--disable-extensions", "--mute-audio",
], { stdio: "ignore", windowsHide: true });

const reports = [];
let failed = 0;

const SAMPLER = `(() => {
  const section = [...document.querySelectorAll('section')].find(
    (s) => s.querySelector('.services-header')
  );
  if (!section) return { ok: false, reason: 'services section not found' };
  const firstCard = section.querySelector('article');
  const track = firstCard ? firstCard.parentElement : null;
  const viewport = track ? track.parentElement : null;
  if (!track || !viewport) return { ok: false, reason: 'track/viewport not found' };

  const tx = new DOMMatrix(getComputedStyle(track).transform).m41;
  const docTop = (el) => el.getBoundingClientRect().top + window.scrollY;

  return {
    ok: true,
    scrollY: Math.round(window.scrollY),
    docScrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    tx: Math.round(tx * 100) / 100,
    distance: Math.round(track.scrollWidth - viewport.clientWidth),
    sectionTop: Math.round(docTop(section)),
    viewportPos: getComputedStyle(viewport).position,
    viewportOverflowX: getComputedStyle(viewport).overflowX,
    viewportScrollSnap: getComputedStyle(viewport).scrollSnapType,
    nativeHScrollable: viewport.scrollWidth > viewport.clientWidth + 1,
    footers: document.querySelectorAll('footer').length,
    hasHScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
  };
})()`;