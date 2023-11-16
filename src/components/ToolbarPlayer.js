import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const ToolbarPlayer = ({
  musicMax,
  setMusicMax,
  currSong,
  setCurrSong,
  listOfSongs,
  audioRef,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
}) => {
  const toolbarColor = {
    background: `${currSong.color}`,
  };
  const musicMaxHandler = () => {
    setMusicMax(!musicMax);
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
  return (
    <div
      className={`toolbar-player ${musicMax ? "" : "music-min"}`}
      style={toolbarColor}
    >
      <div className="min-max">
        <FontAwesomeIcon
          icon={!musicMax ? faAngleDown : faAngleUp}
          onClick={musicMaxHandler}
          size="2x"
        />
      </div>
      <div className={`play-pause ${musicMax ? "play-pause-hidden" : ""}`}>
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipHandler("skip-back")}
          style={{ paddingRight: "40px" }}
        />

        <FontAwesomeIcon
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          style={{ width: "30px" }} //faPause and faPlay are a different width, so even them out
          onClick={playPauseHandler}
        />

        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipHandler("skip-forward")}
          style={{ paddingLeft: "40px" }}
        />
      </div>
      <div className={`img-container ${musicMax ? "img-hidden" : ""}`}>
        <img src={currSong.coverURL} alt="album art"></img>
      </div>
    </div>
  );
};

export default ToolbarPlayer;
