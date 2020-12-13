let db;

export async function initDB() {
  const request = window.indexedDB.open("videos", 1);
  return new Promise((resolve, reject) => {
    request.onerror = () => {
      reject();
    };

    request.onsuccess = () => {
      db = request.result;
      resolve();
    };

    request.onupgradeneeded = function (e) {
      let db = e.target.result;
      let objectStore = db.createObjectStore("videos", { keyPath: "name" });
      objectStore.createIndex("mp4", "mp4");
    };
  });
}

async function fetchVideoBlob(url) {
  const video = await fetch(url);
  return video.blob();
}

// Should return true if video is successfully removed.
export async function removeVideo(url) {
  return false;
}

// Should return true if video is successfully stored.
export const storeVideo = (mp4Blob, url) => {
  return false;
};

export async function isVideoSaved(url) {
  return false;
}

async function fetchFromDb(url) {

}

export async function fetchVideoIfNeeded(url) {
  return fetchVideoBlob(url);
}
