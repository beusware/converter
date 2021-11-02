import { videoInfo } from "ytdl-core";
import * as path from "path";

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
    let directory = process.platform == "win32" ? path.join(process.env.HOME, "../../Music/") : "/tmp/";

    return `${directory}${safeTitle}.wav`;
  }
}