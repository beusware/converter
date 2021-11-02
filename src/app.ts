import * as ytdl from "ytdl-core";
import * as ytsr from "ytsr";
import * as ytpl from "ytpl";

import { Song } from "./helper/song_class";
import { download } from "./helper/downloader";

const logSongDetails = (song: Song) => {
  console.log(`Gefundener Song:        "${song.info.videoDetails.title}"`);
  console.log(`Speicherpfad des Songs: "${song.savePath}"`);
}

const getSong = async () => {
  let args: Array<string> = process.argv.slice(2);

  console.log("Suche...");

  if (ytdl.validateURL(args[0])) {
    await handleVideo(args);
  } else if (ytpl.validateID(args[0])) {
    await handleCollection(args);
  } else {
    await handleSearch(args);
  }
}

const handleVideo = async (args: Array<string>) => {
  const song = new Song(args[0], await ytdl.getInfo(args[0]));

  logSongDetails(song);
  download(song);
}

const handleCollection = async (args: Array<string>) => {
  const playlist: ytpl.Result = await ytpl(args[0]);

  for (let item of playlist.items) {
    const song = new Song(item.url, await ytdl.getInfo(item.url));

    logSongDetails(song);
    download(song);
  }
}

const handleSearch = async (args: Array<string>) => {
  const filters = await ytsr.getFilters(args.join(" "));
  const filter = filters.get("Type").get("Video");
  const search = await ytsr(filter.url, { limit: 1 });
  const songURL = (search.items[0] as ytsr.Video).url;
  const song =  new Song(songURL, await ytdl.getInfo(songURL));

  logSongDetails(song);
  download(song);
}

getSong();