(() => {
  const counters = document.querySelectorAll("[data-live-feature-count]");
  if (!counters.length) return;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  counters.forEach((counter) => {
    const feature = counter.getAttribute("data-live-feature-count") || "kidsverse";
    const key = `kidsverseLiveCount:${feature}`;
    const fallbackBase = Number(counter.getAttribute("data-live-feature-base")) || 89;
    let saved = null;

    try {
      saved = JSON.parse(localStorage.getItem(key) || "null");
    } catch (error) {
      saved = null;
    }

    const startingCount = clamp(fallbackBase + Math.floor(Math.random() * 9) - 4, 54, 99);
    const previousCount = Number(saved?.count) || startingCount;
    const gentleShift = Math.floor(Math.random() * 5) - 2;
    const nextCount = clamp(previousCount + gentleShift, 54, 99);

    try {
      localStorage.setItem(key, JSON.stringify({ count: nextCount, at: Date.now() }));
    } catch (error) {
      // Private browser modes can block storage; the visible counter still works.
    }

    counter.textContent = String(nextCount);
  });
})();
