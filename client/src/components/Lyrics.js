import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./Lyrics.module.css";

const Lyrics = () => {
  const lyrics = useSelector((state) => state.lyrics.lyrics);
  const song = useSelector((state) => state.song.currentSong);

  console.log("Lyrics song " + song);
  console.log("Lyrics lyrics " + lyrics);


  const songHasNoLyrics = () => {
    if (song.isPlaying && song.duration > 0 && !lyrics) {
      return true;
    }
    return false;
  };

  let lyricsContainer = "Something went wrong";

  if (song && song.isPlaying) {
    if (lyrics && !songHasNoLyrics()) {
      lyricsContainer = <div className={classes.lyricsContainer}>{lyrics}</div>;
    } else if (songHasNoLyrics()) {
      lyricsContainer = (
        <div>
          <h3>Sorry, no lyrics are available for this song at the moment.</h3>
        </div>
      );
    }
  }
  return <div>{lyricsContainer}</div>;
};

export default Lyrics;
