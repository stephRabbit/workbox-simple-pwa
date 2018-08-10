// Require WorkBox build
const { generateSW } = require('workbox-build');

generateSW({
  swDest: 'app/sw.js',
  globDirectory: 'app',
  globPatterns: [
    '**/*.{html,css}',
    'main.js',
    'Classes/*.js'
  ],
  skipWaiting: true,
  clientsClaim: true,

  runtimeCaching: [
    {
      urlPattern: /\.(css|js)/,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /^https:\/\/use\.fontawesome\.com.*/,
      handler: 'staleWhileRevalidate',
      options: {
        cacheName: 'fontawesome'
      }
    }
  ]
})
.then(({ count, size }) => {
  console.log(`Generating ${count} precached files, totaling ${size} bytes`)
})
.catch(err => console.log(err))