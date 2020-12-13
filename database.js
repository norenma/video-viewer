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
  return new Promise((resolve) => {
    const request = db
      .transaction(["videos"], "readwrite")
      .objectStore("videos")
      .delete(url);
    request.onsuccess = () => {
      resolve();
    };
  });
}

export const storeMovie = (mp4Blob, url) => {
  const objectStore = db
    .transaction(["videos"], "readwrite")
    .objectStore("videos");
  const record = {
    mp4: mp4Blob,
    name: url,
  };

  const request = objectStore.add(record);

  request.onsuccess = () => {
    console.log("Video stored in database");
  };

  request.onerror = () => {
    console.log(request.error);
  };
};

export async function isMovieSaved(url) {
  return new Promise((resolve) => {
    const request = db
      .transaction(["videos"], "readonly")
      .objectStore("videos")
      .get(url);
    request.onsuccess = (e) => {
      if (e.target.result) {
        resolve(true);
      }
      resolve(false);
    };
  });
}

async function fetchFromDb(url) {
  return new Promise((resolve) => {
    const request = db
      .transaction(["videos"], "readonly")
      .objectStore("videos")
      .get(url);
    request.onsuccess = (e) => {
      if (e.target.result) {
        console.log("e", e.target);
        resolve(e.target.result.mp4);
      }
      resolve(null);
    };
  });
}

export async function fetchVideoIfNeeded(url) {
  const fromDb = await fetchFromDb(url);
  if (fromDb) {
    return fromDb;
  }
  return fetchVideoBlob(url);
}
