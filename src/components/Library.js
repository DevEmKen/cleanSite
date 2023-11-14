import React from "react";
import LibrarySong from "./LibrarySong";
import { v4 as uuidv4 } from "uuid";

const Library = ({ currSong, setCurrSong, listOfSongs, libraryActive }) => {
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
            key={uuidv4()}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
