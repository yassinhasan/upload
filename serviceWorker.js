const staticName = "Dr-nobody"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/css/components.css",
  "/css/upload.css",
  "/css/files.css",
  "/js/script.js",
  "/js/config.js",
  "/js/files.js",
  "/js/firebase.js",
  "/js/helper.js",
  "/js/upload.js",
  "/js/validation.js",

  "/images/icon-192x192.png",
  "/images/icon-256x256.png",
  "/images/icon-384x384.png",
  "/images/icon-512x512.png",
  "/images/profile.jpg",
 

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