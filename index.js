import {
  fetchVideoIfNeeded,
  isVideoSaved,
  storeVideo,
  removeVideo,
  initDB,
} from "./database";
import { renderDownloadButton, renderVideo } from "./renderers";
import video from "./video.mp4";
import "./styles.css";

async function onToggleDownload(videoBlob, element, url) {
  const isDownloaded = await isVideoSaved(url);
  let operationSuccessful;
  if (!isDownloaded) {
    operationSuccessful = await storeVideo(videoBlob, url);
  } else {
    operationSuccessful = await removeVideo(url);
  }
  if (!operationSuccessful) {
      return;
  }
  renderDownloadButton(!isDownloaded, element);
}

window.addEventListener("load", async () => {
  await initDB();
  let videoBlob;
  const rootElement = document.querySelector("section");
  try {
      videoBlob = await fetchVideoIfNeeded(video);
  }
  catch (e) {
      rootElement.innerHTML = "Could not fetch video.";
      return;
  }
  renderVideo(videoBlob, rootElement);
  const isDownloaded = await isVideoSaved(video);
  const button = renderDownloadButton(isDownloaded, rootElement);
  button.addEventListener("click", () =>
    onToggleDownload(videoBlob, rootElement, video)
  );

//   if ("serviceWorker" in navigator) {
//     await navigator.serviceWorker.register("sw.js");
//     console.log("Service Worker Registered");
//   }
});
