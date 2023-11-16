import { createPortal } from "react-dom";

import ConnectFour from "./ConnectFour/ConnectFour";

const ProfilePage = ({ currSong, musicMax }) => {
  const Bad = () => {
    return (
      <div>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <img src={currSong.coverURL} style={{ width: "200px" }}></img>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
        <h1>blah</h1>
      </div>
    );
  };

  return (
    <div className={`prof-page ${musicMax ? "" : "music-min"}`}>
      <ConnectFour currSong={currSong} />
      <Bad />
    </div>
  );
};

export default ProfilePage;
