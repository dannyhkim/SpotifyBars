import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const lyrics = () => {
  const [noLyrics, setNoLyrics] = useState(false);

  const lyrics = useSelector(state => {
    return state.lyrics.lyrics;
  });

  return (
    <div>{lyrics}</div>
  )
}



export default lyrics;
