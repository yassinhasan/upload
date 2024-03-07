const staticName = "hasanmeady-portfolio"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/scriptjs",
  "/images/icon-192x192.png",
  "/images/icon-256x256.png",
  "/images/icon-384x384.png",
  "/images/icon-512x512.png",
  "/one.png",
  "/two.png",
  "/three.png",
  "/profile.jpg",
  "/profile2.jpg",
  "/health.png",
  "/landing.png",
  "/wedding.png",

]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticName).then(cache => {
      cache.addAll(assets)
    })
  )
})
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }