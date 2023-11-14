import React from "react";

const Song = ({ currSong }) => {
  const songColor = {
    background: `linear-gradient(to bottom, ${currSong.color}, white)`,
  };

  return (
    <div className="song-container" style={songColor}>
      <img src={currSong.coverURL} alt="sugma"></img>
      <h1>{currSong.name}</h1>
      <h2>{currSong.artist}</h2>
    </div>
  );
};

export default Song;
