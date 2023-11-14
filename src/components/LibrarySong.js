import React from "react";

const LibrarySong = ({ song, currSong, setCurrSong }) => {
  const librarySongSelectHandler = () => {
    setCurrSong(song);
  };

  return (
    <div
      className={`library-song ${song === currSong ? "active-song" : ""}`}
      onClick={librarySongSelectHandler}
    >
      <img src={song.coverURL} alt="No img"></img>
      <div className="library-song-info">
        <h1>{song.name}</h1>
        <h2>{song.artist}</h2>
      </div>
    </div>
  );
};

export default LibrarySong;
