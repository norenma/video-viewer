export function renderDownloadButton (isDownloaded, element) {
    const button = document.getElementById("download-button");
    if (isDownloaded) {
        button.innerHTML = 'Saved to offline ♥';
    }
    else {
        button.innerHTML = 'Save to offline ♡';
    }
    element.appendChild(button);
    return button;
}

export function renderVideo(mp4Blob, element) {
    const mp4URL = URL.createObjectURL(mp4Blob);

    const video = document.createElement("video");
    video.controls = true;
    video.width = "700";
    const source = document.createElement("source");
    source.src = mp4URL;
    source.type = "video/mp4";

    element.appendChild(video);
    video.appendChild(source);
}
