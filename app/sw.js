/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "48588cda3f44365e87c6e7888d6f4e2d"
  },
  {
    "url": "main.js",
    "revision": "c6b166a3abf940c364a24cb299ba0805"
  },
  {
    "url": "Classes/Camera.js",
    "revision": "e744941d8c2a9a64dd9733763fac5aeb"
  },
  {
    "url": "Classes/Message.js",
    "revision": "03ef45781333d07a21c20e5d64a39972"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(css|js)/, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute(/^https:\/\/use\.fontawesome\.com.*/, workbox.strategies.staleWhileRevalidate({ cacheName: "fontawesome", plugins: [] }), 'GET');
