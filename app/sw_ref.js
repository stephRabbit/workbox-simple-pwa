importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay!!! Workbox is loaded 🎉`);
  // Skip waiting on install
  workbox.skipWaiting()
  // Take over other tabs
  workbox.clientsClaim()

  // Cache .js files - Cache First Stratergy
  workbox.routing.registerRoute(/\.js$/, workbox.strategies.cacheFirst())
}
else {
  console.log(`Boo! Workbox didn't load 😬`);
}