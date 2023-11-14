import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currSong,
  setCurrSong,
  listOfSongs,
  audioRef,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
}) => {
  const formatTime = (duration) => {
    let ret = "";
    ret += Math.floor(duration / 60) + ":";
    if (Math.floor(duration % 60) < 10) {
      ret += "0";
    }
    ret += Math.floor(duration % 60);
    return ret;
  };

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(function (error) {
            console.log(error);
            audioRef.current.load();
            audioRef.current.play();
          });
      }
    }
  };

  const skipHandler = (icon) => {
    let ind = listOfSongs.findIndex((song) => song.id === currSong.id);
    if (icon === "skip-back") {
      // Set currSong to previous song. Modulus handles edge case.
      // Must add listOfSongs.length to the index before the modulus, as Javascript modulus can have negative remainders
      setCurrSong(
        listOfSongs[(ind - 1 + listOfSongs.length) % listOfSongs.length]
      );
    }
    if (icon === "skip-forward") {
      // Set currSong to next song. Modulus handles edge case
      setCurrSong(listOfSongs[(ind + 1) % listOfSongs.length]);
    }
  };

  const dragHandler = (e) => {
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };

  return (
    <div className="controls">
      <div className="time-controls">
        <p>{formatTime(songInfo.currentTime)}</p>
        <input
          type="range"
          onChange={dragHandler}
          value={songInfo.currentTime ?? ""}
          min={0}
          max={songInfo.duration}
        />
        <p>{formatTime(songInfo.duration)}</p>
      </div>
      <div className="song-controls">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipHandler("skip-back")}
        />
        <FontAwesomeIcon
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={playPauseHandler}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
