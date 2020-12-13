self.addEventListener("install", function (e) {
  e.waitUntil(
    caches
      .open("video-store")
      .then((cache) =>
        cache.addAll(["index.html", "movie-viewer.e31bb0bc.js", "/", "movie-viewer.e31bb0bc.css"])
      )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
