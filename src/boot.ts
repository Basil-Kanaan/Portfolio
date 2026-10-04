/**
 * Entry point. The page is complete without JavaScript (the hero intro is pure CSS), so
 * the motion bundle is fetched only after the first contentful paint. That keeps it out of
 * the critical path entirely.
 */
let started = false;
const start = () => {
  if (started) return;
  started = true;
  void import('./main');
};

try {
  const po = new PerformanceObserver((list) => {
    if (list.getEntriesByName('first-contentful-paint').length) {
      po.disconnect();
      requestAnimationFrame(() => setTimeout(start, 0));
    }
  });
  po.observe({ type: 'paint', buffered: true });
} catch {
  // No paint timing support: fall through to the timer.
}
setTimeout(start, 1200);
