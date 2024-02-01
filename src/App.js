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
import ChatBox from "./components/ChatBox";
//song list
import musicList from "./util";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import MeAndBro from "./assets/MeAndBro.jpg";
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
  const [chatMax, setChatMax] = useState(false);
  const [aboutMeVisible, setAboutMeVisible] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setChatMax(true);
    // Play the next song when the current one ends
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
        <AboutMe
          aboutMeVisible={aboutMeVisible}
          setAboutMeVisible={setAboutMeVisible}
          chatMax={chatMax}
        />
        <ChatBox musicMax={musicMax} chatMax={chatMax} />
        <ChatBoxMaxButton
          musicMax={musicMax}
          chatMax={chatMax}
          setChatMax={setChatMax}
        />
        <Sidebar musicMax={musicMax} setAboutMeVisible={setAboutMeVisible} />
        <ProfilePage
          currSong={currSong}
          musicMax={musicMax}
          chatMax={chatMax}
          aboutMeVisible={aboutMeVisible}
          setAboutMeVisible={setAboutMeVisible}
        />
      </div>
    </div>
  );
}

const Sidebar = ({ musicMax, setAboutMeVisible }) => {
  const aboutMeHandler = () => {
    setAboutMeVisible(true);
  };
  const resumeHandler = () => {
    window.open(
      "https://drive.google.com/file/d/1gAzDyCKX3BdHQi0V2aAbB4vEuXvD8Xqo/view",
      "_blank",
      "noreferrer"
    );
  };
  const githubHandler = () => {
    window.open("https://github.com/devemken", "_blank", "noreferrer");
  };
  const sourceCodeHandler = () => {
    window.open(
      "https://github.com/DevEmKen/cleanSite",
      "_blank",
      "noreferrer"
    );
  };
  return (
    <ul id="Sidebar" className={`side-bar ${musicMax ? "side-min" : ""}`}>
      <li onClick={aboutMeHandler} onAuxClick={aboutMeHandler}>
        About me
      </li>
      <li onClick={resumeHandler} onAuxClick={resumeHandler}>
        Resume
      </li>
      <li onClick={githubHandler} onAuxClick={githubHandler}>
        Github
      </li>
      <li onClick={sourceCodeHandler} onAuxClick={sourceCodeHandler}>
        Source
        <br />
        Code
      </li>
    </ul>
  );
};

const AboutMe = ({ aboutMeVisible, setAboutMeVisible, chatMax }) => {
  const handleClose = () => {
    setAboutMeVisible(false);
  };

  const handleNotClose = (e) => {
    // Don't want the about-me card to close when you click
    // inside of the card, only when you click outside of it
    e.stopPropagation();
  };

  return (
    <div
      className={`about-me ${aboutMeVisible ? "" : "abt-hide"} `}
      onClick={handleClose}
    >
      <div
        className={`abt-card ${chatMax ? "" : "chat-min"}`}
        onClick={handleNotClose}
      >
        <FontAwesomeIcon
          onClick={handleClose}
          className="x-btn"
          icon={faCircleXmark}
        />
        <img src={MeAndBro}></img>
        <div className="about-text">
          <h1>Emerson Kendall</h1>
          <h2>Colorado State University Global</h2>
          <div className="about-me-body">
            <p>
              A computer science student from the Pacific NW, seeking a position
              as a Junior Software Engineer.
            </p>
            <br></br>
            <p>
              With experience developing a diverse array of personal projects, I
              can bring to any team a strong foundation in fundamentals and a
              passion for developing solutions that are clean and maintainable.
              I am determined to contribute meaningfully to future projects,
              seamlessly integrating into your team's workflow. The ability to
              independently tackle problems without affecting the performance of
              existing team members is critical for junior developers, and much
              of my study has been focused around developing this skill.
            </p>
            <br></br>
            <p>
              With a graduation date in late 2024, I am excited to bring my
              skills, dedication, and enthusiasm to your organization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatBoxMaxButton = ({ chatMax, setChatMax, musicMax }) => {
  const chatMinHandler = () => {
    setChatMax(!chatMax);
  };

  return (
    <div
      onClick={chatMinHandler}
      className={`chatbox-max-button ${chatMax ? "" : "chat-min"} ${
        musicMax ? "music-max" : ""
      }`}
    >
      {chatMax ? ">" : "<"}
    </div>
  );
};

export default App;
