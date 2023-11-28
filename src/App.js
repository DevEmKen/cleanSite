import React, { useRef, useEffect, useState } from "react";
//styles
import "./styles/app.scss";
//components
import Player from "./components/MusicPlayer/Player";
import ToolbarPlayer from "./components/ToolbarPlayer";
import Song from "./components/MusicPlayer/Song";
import Library from "./components/MusicPlayer/Library";
import LibraryButton from "./components/MusicPlayer/LibraryButton";
import ProfilePage from "./components/ProfilePage";
//song list
import musicList from "./util";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
// Improve performance of onTimeUpdate function with lodash
import { throttle } from "lodash";

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
  // Could initialize isPlaying to true for automatic playback upon page load
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryActive, setLibraryActive] = useState(true);
  const [musicMax, setMusicMax] = useState(false);
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
  }, []);

  // Changing the song starts playback of the new song if playback is happening during the switch.
  // In other words, changing the song while paused doesn't un-pause
  useEffect(() => {
    if (isPlaying) {
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

  // Audio HTML element time update. Used by <input type="range"> in Player.js.
  // Throttled by lodash to run only once every second to improve performance.
  const timeUpdateHandler = throttle((e) => {
    setSongInfo({
      ...songInfo,
      artist: currSong.artist,
      name: currSong.name,
      id: currSong.id,
      duration: e.target.duration || 0,
      currentTime: e.target.currentTime || 0,
    });
  }, 1000);

  // Display song length upon page load, or if skip forward/backward button
  // is pressed while audio is paused
  const loadedMetadataHandler = (e) => {
    setSongInfo({ ...songInfo, duration: e.target.duration });
  };

  return (
    <div className="App">
      <div className={`app-holder ${musicMax ? "" : "music-min"}`}>
        <div className={`music-page ${musicMax ? "" : "music-min"}`}>
          <audio
            onTimeUpdate={timeUpdateHandler}
            onLoadedMetadata={loadedMetadataHandler}
            ref={audioRef}
            src={currSong.songURL}
          />
          <LibraryButton
            libraryActive={libraryActive}
            setLibraryActive={setLibraryActive}
            musicMax={musicMax}
            setMusicMax={setMusicMax}
          />
          <Library
            currSong={currSong}
            setCurrSong={setCurrSong}
            listOfSongs={listOfSongs}
            libraryActive={libraryActive}
            setIsPlaying={setIsPlaying}
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
        <ToolbarPlayer
          musicMax={musicMax}
          setMusicMax={setMusicMax}
          currSong={currSong}
          setCurrSong={setCurrSong}
          listOfSongs={listOfSongs}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
        />
        <ProfilePage currSong={currSong} musicMax={musicMax} />
      </div>
    </div>
  );
}

export default App;
