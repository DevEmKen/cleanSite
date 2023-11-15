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
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={playPauseHandler}
        />
      </div>
      <div className="img-container">
        <img src={currSong.coverURL} alt="album art"></img>
      </div>
    </div>
  );
};

export default ToolbarPlayer;
