import React, { useRef, useEffect, useState } from "react";
//styles
import "./styles/app.scss";
//components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import LibraryButton from "./components/LibraryButton";
//song list
import musicList from "./util";

function App() {
  const [listOfSongs, setListOfSongs] = useState(musicList());
  const [currSong, setCurrSong] = useState(listOfSongs[0]);
  const [songInfo, setSongInfo] = useState({
    artist: currSong.artist,
    name: currSong.name,
    id: currSong.id,
    duration: 0,
    currentTime: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false); // Could set to true for automatic playback upon source load
  const [libraryActive, setLibraryActive] = useState(true);
  const audioRef = useRef(null);

  // Play the next song when the current one ends
  useEffect(() => {
    audioRef.current.addEventListener("ended", () => {
      let currentIndex = listOfSongs.findIndex(
        (song) => song.id === currSong.id
      );
      let nextIndex = (currentIndex + 1) % listOfSongs.length;
      setCurrSong(listOfSongs[nextIndex]);
    });
  });

  // Changing the song starts playback of the new song if playback is happening during the switch.
  // In other words, changing the song while paused doesn't un-pause
  useEffect(() => {
    if (isPlaying) {
      console.log("playpromise exec");
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log(error);
          audioRef.current.load();
          audioRef.current.play();
        });
      }
    }
  }, [isPlaying, currSong]);

  // Audio HTML element time update. Used by <input type="range"> in Player.js
  const timeUpdateHandler = (e) => {
    setSongInfo({
      ...songInfo,
      artist: currSong.artist,
      name: currSong.name,
      id: currSong.id,
      duration: e.target.duration || 0,
      currentTime: e.target.currentTime || 0,
    });
  };

  // Display song length upon page load, or if skip forward/backward button is pressed while audio is paused
  const loadedMetadataHandler = (e) => {
    setSongInfo({ ...songInfo, duration: e.target.duration });
  };

  return (
    <div className="App">
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={loadedMetadataHandler}
        ref={audioRef}
        src={currSong.songURL}
      />
      <LibraryButton
        libraryActive={libraryActive}
        setLibraryActive={setLibraryActive}
      />
      <Library
        currSong={currSong}
        setCurrSong={setCurrSong}
        listOfSongs={listOfSongs}
        libraryActive={libraryActive}
      />
      <div className="songAndPlayer">
        <Song currSong={currSong} />
        <Player
          currSong={currSong}
          setCurrSong={setCurrSong}
          listOfSongs={listOfSongs}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
        />
      </div>
    </div>
  );
}

export default App;
