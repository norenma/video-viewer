let db;

export async function initDB() {
  const request = window.indexedDB.open("videos", 1);
  return new Promise((resolve, reject) => {
    request.onerror = () => {
      reject();
    };

    request.onsuccess = () => {
      console.log("Database opened succesfully");

      db = request.result;
      resolve();
    };

    request.onupgradeneeded = function (e) {
      let db = e.target.result;
      let objectStore = db.createObjectStore("videos", { keyPath: "name" });
      objectStore.createIndex("mp4", "mp4", { unique: false });
    };
  });
}

async function fetchVideoBlob(url) {
  const video = await fetch(url);
  return video.blob();
}

export async function removeMovie(url) {

}

export const storeMovie = (mp4Blob, url) => {

};

export async function isMovieSaved(url) {

}

async function fetchFromDb(url) {

}

export async function fetchVideoIfNeeded(url) {

}
