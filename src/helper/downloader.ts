import * as ffmpeg from "fluent-ffmpeg";
import * as ytdl from "ytdl-core";
import * as fs from "fs";

import { Song } from "./song_class";

export const download = (song: Song) => {
  let res = fs.createWriteStream(song.savePath);

  let stream = ytdl(song.url, { 
    filter: "audioonly",
    highWaterMark: 1 << 25
  });

  ffmpeg({ source: stream }).format("wav").pipe(res, { end: true });
}