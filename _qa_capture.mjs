const [width, height, output, targetY, path = "/"] = process.argv.slice(2);
const pages = await fetch("http://127.0.0.1:9222/json/list").then((r) => r.json());
const page = pages.find(({ type }) => type === "page");
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});
let id = 0;
const pending = new Map();
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.id) pending.get(message.id)?.(message);
});
const call = (method, params = {}) => new Promise((resolve, reject) => {
  const messageId = ++id;
  pending.set(messageId, (message) => {
    pending.delete(messageId);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });
  socket.send(JSON.stringify({ id: messageId, method, params }));
});
await call("Page.enable");
await call("Emulation.setDeviceMetricsOverride", { width: Number(width), height: Number(height), deviceScaleFactor: 1, mobile: false });
await call("Page.addScriptToEvaluateOnNewDocument", { source: "sessionStorage.setItem('cc_intro', '1');" });
await call("Page.navigate", { url: `http://localhost:3100${path}` });
await new Promise((resolve) => setTimeout(resolve, 2500));
for (let y = 0; y <= 22000; y += 700) {
  await call("Runtime.evaluate", { expression: `window.scrollTo(0, ${y})` });
  await new Promise((resolve) => setTimeout(resolve, 80));
}
await call("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" });
await new Promise((resolve) => setTimeout(resolve, 500));
if (targetY) {
  await call("Runtime.evaluate", { expression: `window.scrollTo(0, ${Number(targetY)})` });
  await new Promise((resolve) => setTimeout(resolve, 700));
}
const shot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: !targetY });
await import("node:fs/promises").then(({ writeFile }) => writeFile(output, Buffer.from(shot.data, "base64")));
socket.close();
