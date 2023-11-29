import React from "react";
import { v4 as uuidv4 } from "uuid";

const Library = ({
  currSong,
  setCurrSong,
  listOfSongs,
  libraryActive,
  setIsPlaying,
}) => {
  const songColor = {
    background: `linear-gradient(to bottom, ${currSong.color}, white, white)`,
  };

  return (
    <div
      className={`library ${libraryActive ? "library-active" : ""}`}
      style={songColor}
    >
      <div className="library-songs">
        {listOfSongs.map((song) => (
          <LibrarySong
            song={song}
            currSong={currSong}
            setCurrSong={setCurrSong}
            setIsPlaying={setIsPlaying}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
};

const LibrarySong = ({ song, currSong, setCurrSong, setIsPlaying }) => {
  const librarySongSelectHandler = () => {
    setIsPlaying(true);
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

export default React.memo(Library);
