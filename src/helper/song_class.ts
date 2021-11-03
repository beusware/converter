import { videoInfo } from "ytdl-core";

const windowsPath = "C:/Users/FORUM II/Music/";
const linuxPath = "/tmp/";

export class Song {
  url: string;
  info: videoInfo;
  savePath: string;

  constructor(url: string, info: videoInfo) {
    this.url = url;
    this.info = info;
    this.savePath = this._getSavePathFromInfo();
  }

  _getSavePathFromInfo() {
    let safeTitle: string = this.info.videoDetails.title.replace(/[\\\/:"*?<>| ]+/gu, "_");
    let directory = process.platform == "win32" ? windowsPath : linuxPath;

    return `${directory}${safeTitle}.wav`;
  }
}