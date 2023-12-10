'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "eaf03a70af1b39308d77199fb69fdaab",
"assets/AssetManifest.bin.json": "015aabbe3148d7a04dcbab263f3f892e",
"assets/AssetManifest.json": "30ced7754371fa87085ec47c803ed07e",
"assets/assets/duck.gif": "d1922508ed3e3459db548589826f67aa",
"assets/assets/fonts/Montserrat-Bold.ttf": "ed86af2ed5bbaf879e9f2ec2e2eac929",
"assets/assets/fonts/Montserrat-Regular.ttf": "5e077c15f6e1d334dd4e9be62b28ac75",
"assets/assets/images/admin.png": "dd84581f1330786d79bfe7060c527ae7",
"assets/assets/images/attendance.png": "f420870f7d90e98949fdd5bdcb32c012",
"assets/assets/images/black.png": "8159eff0a5c0a31c3a1fc42156410b0c",
"assets/assets/images/blue.jpg": "812ce5359ba6ee79f2bc50117b9ab916",
"assets/assets/images/estab.png": "337a7f16d5404cb8ef03449cec62382c",
"assets/assets/images/face.jpg": "61e3eebb8e8b6d37522701e0f33e027f",
"assets/assets/images/face.png": "63bed71a23223e65451a63ef1725e374",
"assets/assets/images/fb.png": "3eb2d16ed61a1467e6f59f76e0d92b80",
"assets/assets/images/google.png": "ff629c02385f2f3a199b7e0b3065d077",
"assets/assets/images/green.jpg": "7cf4cb7eae236cc080ae02c874af0ec7",
"assets/assets/images/green.png": "dbf82af5105958c5301ab53dc74fdf0d",
"assets/assets/images/green2.png": "33452527e76300d810865dafaae05591",
"assets/assets/images/laptop.jpg": "7907e0988066c359fcf01d7cd85f89fc",
"assets/assets/images/logo.png": "367f0fd3a15433e34de6ae3157d7b991",
"assets/assets/images/neon.jpg": "8617b31e2e193241e7d53bf38d3bf6de",
"assets/assets/images/scan.png": "282b360235bf9ded2820de99ad9572ae",
"assets/assets/loading.gif": "d32c4a6cc65991bdc4b10389bf056a37",
"assets/assets/loading.json": "06ae92ad76d56578611302955684fef2",
"assets/assets/mobilefacenet.tflite": "7945c78f4484c99560df461df85baa2f",
"assets/assets/nmsct.jpg": "38df0573e9929dc6df5fe97daed88c03",
"assets/assets/scan.gif": "55db32d2063068b0c6acc79f7651444e",
"assets/assets/scan.json": "a6b5a47023bda8acf9b72f94f2b4e360",
"assets/assets/scanning.json": "3d4304b4c0a319e366edebe7c6289f7d",
"assets/assets/splash.png": "f420870f7d90e98949fdd5bdcb32c012",
"assets/FontManifest.json": "db39e261cadedfb313090df5a6959149",
"assets/fonts/MaterialIcons-Regular.otf": "6d245e73ba808cb3efcd620759953f63",
"assets/NOTICES": "2cd6e8685a3a699ea6d3e38d200ac801",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "f25e8e701660fb45e2a81ff3f43c6d5c",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "382a52575f8728a4acd4549954f1b9ad",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "bfd01e0b108f90bd1abaec79eee49734",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "f9f86b777913223dc2a2e95ea61d9dbc",
"/": "f9f86b777913223dc2a2e95ea61d9dbc",
"main.dart.js": "a2535ef1a8735d48e635666329664417",
"manifest.json": "39aa051e7dfb53a9a9193256131e75ef",
"version.json": "84967b6fe2a972155f51b2aa0ad55ea7"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
