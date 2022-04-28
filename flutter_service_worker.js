'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "afa8678f8010bc766f3a7d048bb27675",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/images/app_painter.png": "a1d568c6f204ef25b12d0fc7db86094a",
"assets/images/email_icon.svg": "904ce2ab636362b1d65cc8b1d0b4ac57",
"assets/images/forestPath.jpg": "b27c075af8445debf1bda2cbe02551c9",
"assets/images/github_icon.svg": "104e26e53be7da53ff63697bf10c11ae",
"assets/images/linkedin_icon.svg": "7499d5c5579d43f6b3cbb9ed1dc07833",
"assets/images/logo.png": "07d385a1c523d55480ef985fda9a08ac",
"assets/images/phone_icon.svg": "3c1dfa5a6c60ef9031745d45482b9a86",
"assets/images/proglang_logos.png": "fdc6d49cde3ed9377e86c1c42b0c7664",
"assets/images/random_face.png": "a0aad982aaf0820db6a69fce51d7b279",
"assets/images/Screenshot_20220331_113219_com.example.spim.jpg": "23add6e835da1ceef912ff6b66bc5d90",
"assets/images/Screenshot_20220331_113230_com.example.spim.jpg": "3ffb9bb830dbf2b4ef70706101d0c195",
"assets/images/Screenshot_20220331_113237_com.example.spim.jpg": "e70c628d2c0cc7f9e73d46cd2cf45655",
"assets/images/Screenshot_20220331_113240_com.example.spim.jpg": "12f1b7eef93f8748ecb3e4145a513f31",
"assets/images/SimpleSpaceship2.svg": "bde189c6c81d7e807a932d082f2868b2",
"assets/images/spaceship.png": "cd367c0d38be1e35d58bd3c1618f1b6c",
"assets/images/Thomas%2520Giros%2520CV%2520en.pdf": "559ac52359e4ef0df7638e678b39de47",
"assets/images/Thomas%2520Giros%2520CV%2520fr.pdf": "3fcc6979148a9357ce3c860b4ee31514",
"assets/NOTICES": "7d8a8e99a05c023f0634a79cb8c2944d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/texts/app_painter_en.txt": "73b411ab2b8de3154221e356fe4dc1e3",
"assets/texts/app_painter_fr.txt": "6011d4763757363b01dc70da1e91ce76",
"assets/texts/bio_en.txt": "6e77be01e03e329e2688779faad9513f",
"assets/texts/bio_fr.txt": "636c8bb7c6d9fed0e8f8bedbdc0e26e5",
"assets/texts/presentation_en.txt": "1697b350d5941b5a041ebd2035daa6bb",
"assets/texts/presentation_fr.txt": "55eb7cd06ee4b8ede795c2152b3154e2",
"assets/texts/random_face_en.txt": "77a227a3206af2ae03fbb89fcfcc746e",
"assets/texts/random_face_fr.txt": "c83c1a821021915f49564a0d5301c558",
"assets/texts/skills_en.txt": "1eb7e1d092702d8aa5593a0451ad5d71",
"assets/texts/skills_fr.txt": "1409aab0f72a7e673317243f84c52db7",
"assets/texts/spim_en.txt": "fad00710b64d5a3088cec416fac9fa32",
"assets/texts/spim_fr.txt": "c5f1d36bcbdc9481df7e66a47bededbf",
"assets/videos/spim_demo.mp4": "2bec5587641d12620dd3a06fe56f2608",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "aa380b4c85424bde96b7229e72965016",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "8a9975cad303acc0a02cd8b9893ed8c0",
"/": "8a9975cad303acc0a02cd8b9893ed8c0",
"main.dart.js": "e4dde240f9c98e969c9e495ea9e52c6b",
"manifest.json": "d155d8c88683454dde816bc14bc2ad17",
"version.json": "009c9e65172e010890f7f65fde438006"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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
