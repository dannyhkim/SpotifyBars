import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from './Lyrics.module.css';

const Lyrics = () => {

  const lyrics = useSelector((state) => {
    return state.lyrics.lyrics;
  });
  const song = useSelector((state) => state.song.song);

  const songHasNoLyrics = () => {
    return song.isPlaying && song.duration > 0 && !lyrics;
  };

  let lyricsContainer = '';

  if (song && song.isPlaying) {
    if (lyrics && !songHasNoLyrics) {
      lyricsContainer = <div className={classes.lyricsContainer}>{lyrics}</div>
    } else if (songHasNoLyrics) {
      lyricsContainer = <div><h3>Sorry, no lyrics are available for this song at the moment.</h3></div>
    }
  }
  return (
  <div>
    {lyricsContainer}
  </div>);
};

export default Lyrics;
